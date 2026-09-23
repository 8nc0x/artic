import React, { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Sparkles,
  Compass,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Share2,
  Check,
  X,
  MapPin,
  Clock
} from 'lucide-react';

export default function ReportsLibrary() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('All');
  const [expeditionFilter, setExpeditionFilter] = useState('All');
  const [activeReport, setActiveReport] = useState(null);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      q: query,
      region: regionFilter,
      expedition: expeditionFilter
    });

    setLoading(true);
    fetch(`/api/reports?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setReports(d.items);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [query, regionFilter, expeditionFilter]);

  const handleOpenAiSummary = (report) => {
    setActiveReport(report);
  };

  const handleCopyCitation = (report) => {
    const citation = `${report.lead_author} et al. (${report.year}). ${report.title}. National Centre for Polar and Ocean Research (NCPOR), Technical Cruise Series. DOI: ${report.doi}`;
    navigator.clipboard.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-blue-50 text-polar-blue">
                <Compass className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                Expedition &amp; Scientific Cruise Reports
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Official technical cruise reports, winter-over logistics debriefs, and scientific compilations from the Indian Antarctic, Arctic, and Southern Ocean Expeditions.
            </p>
          </div>

          <div className="flex items-center space-x-4 border-l border-slate-100 pl-4">
            <div>
              <span className="text-lg font-extrabold text-slate-900">{reports.length}</span>
              <span className="text-[11px] text-slate-400 block font-medium">Reports Listed</span>
            </div>
            <div>
              <span className="text-lg font-extrabold text-emerald-600">100%</span>
              <span className="text-[11px] text-slate-400 block font-medium">Open Access</span>
            </div>
          </div>
        </div>

        {/* 2. Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search reports by title, author, vessel, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
            />
          </div>

          <div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-polar-blue"
            >
              <option value="All">All Regions (Global Poles)</option>
              <option value="Antarctica">Antarctica (Maitri &amp; Bharati)</option>
              <option value="Arctic">Arctic (Himadri &amp; Svalbard)</option>
              <option value="Southern Ocean">Southern Ocean &amp; Prydz Bay</option>
            </select>
          </div>

          <div>
            <select
              value={expeditionFilter}
              onChange={(e) => setExpeditionFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-polar-blue"
            >
              <option value="All">All Expeditions</option>
              <option value="43rd Indian Antarctic Expedition">43rd Indian Antarctic Expedition (2023–24)</option>
              <option value="42nd Indian Antarctic Expedition">42nd Indian Antarctic Expedition (2022–23)</option>
              <option value="Indian Arctic Expedition 2023">Indian Arctic Expedition (2023)</option>
              <option value="12th Southern Ocean Expedition">12th Southern Ocean Expedition (ORV Sagar Nidhi)</option>
              <option value="41st Indian Antarctic Expedition">41st Indian Antarctic Expedition (2021–22)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="group bg-white rounded-2xl border border-polar-border p-5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Badges Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {report.expedition}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{report.release_date || report.year}</span>
                </span>
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-polar-blue transition-colors leading-snug">
                {report.title}
              </h3>

              {/* Lead author & Institution */}
              <p className="text-[11px] text-slate-500 font-medium mt-1">
                Lead: <span className="text-slate-800 font-semibold">{report.lead_author}</span> • {report.institution}
              </p>

              {/* Abstract Snippet */}
              <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                {report.abstract}
              </p>

              {/* Key metadata pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 text-[10px] text-slate-500 font-semibold">
                <span className="bg-slate-100 px-2 py-0.5 rounded-md flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{report.region}</span>
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                  {report.pages} Pages
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-md">
                  {report.file_size}
                </span>
                <span className="text-blue-600 font-mono">
                  {report.doi}
                </span>
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
              <button
                onClick={() => handleOpenAiSummary(report)}
                className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>AI Insights &amp; Findings</span>
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopyCitation(report)}
                  title="Copy Citation"
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>

                <a
                  href={report.download_url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading official PDF: ${report.title} (${report.file_size})`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-polar-blue text-white font-bold text-xs flex items-center space-x-1.5 transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. AI Document Summary Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden text-left animate-scaleUp max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-blue-950 text-white p-6 relative flex-shrink-0">
              <button
                onClick={() => setActiveReport(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>NCPOR AI Document Intelligence &amp; Extraction</span>
              </div>
              <h2 className="text-base md:text-lg font-bold text-white mt-1 leading-snug">
                {activeReport.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {activeReport.expedition} • Lead Investigator: {activeReport.lead_author}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
              {/* Executive Summary */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Executive Summary</span>
                </h4>
                <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-slate-800">
                  {activeReport.abstract}
                </div>
              </div>

              {/* Key Scientific Findings */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>Key Observational &amp; Technical Findings</span>
                </h4>
                <div className="space-y-2">
                  {activeReport.key_findings?.map((finding, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700 font-medium">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Observational Methodology */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Methodology &amp; Instrumentation Used</span>
                </h4>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-700">
                  {activeReport.methodology}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
              <button
                onClick={() => handleCopyCitation(activeReport)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? "Citation Copied!" : "Copy BibTeX / Citation"}</span>
              </button>

              <button
                onClick={() => {
                  alert(`Downloading complete report: ${activeReport.title}`);
                }}
                className="px-4 py-2 rounded-xl bg-polar-blue hover:bg-sky-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Report ({activeReport.file_size})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
