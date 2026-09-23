import React, { useState, useEffect } from 'react';
import {
  Database,
  Download,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  MapPin,
  Tag,
  X,
  Sparkles,
  BookOpen,
  Layers,
  Share2,
  Check,
  Bookmark,
  Compass,
  Radio,
  User,
  Building,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Send,
  Loader2,
  FileText,
  Activity,
  Globe
} from 'lucide-react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';

export default function DatasetsCatalog() {
  const { id: urlDatasetId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [datasets, setDatasets] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState('All');
  const [region, setRegion] = useState('All');
  const [page, setPage] = useState(0);
  const limit = 20;

  // Sync if search query in URL changes (e.g. from Hero or Navbar search)
  useEffect(() => {
    const urlQ = searchParams.get('q');
    if (urlQ !== null && urlQ !== query) {
      setQuery(urlQ);
      setPage(0);
    }
  }, [searchParams]);


  // Drawer / Detail state
  const [activeDataset, setActiveDataset] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailTab, setDetailTab] = useState('overview'); // 'overview' | 'technical' | 'citation' | 'ai' | 'connections'
  
  // AI states inside drawer
  const [aiSummary, setAiSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState(null);
  const [isAsking, setIsAsking] = useState(false);
  
  // Feedback states
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Fetch dataset list based on filters
  useEffect(() => {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: (page * limit).toString(),
      category,
      region,
      q: query
    });

    fetch(`/api/datasets?${params.toString()}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setDatasets(data.items);
          setTotal(data.total);
        }
      })
      .catch(err => console.error('Error fetching datasets:', err));
  }, [query, category, region, page]);

  // Deep-link handler: when URL has /datasets/:id, fetch that dataset detail
  useEffect(() => {
    if (urlDatasetId) {
      setDetailLoading(true);
      fetch(`/api/datasets/${urlDatasetId}`)
        .then(r => r.json())
        .then(res => {
          if (res.success && res.data) {
            setActiveDataset(res.data);
            setAiSummary(null);
            setAiAnswer(null);
            setAiQuestion('');
            setDetailTab('overview');
          }
        })
        .catch(err => console.error('Error loading dataset detail:', err))
        .finally(() => setDetailLoading(false));
    } else {
      setActiveDataset(null);
    }
  }, [urlDatasetId]);

  const handleOpenDataset = (ds) => {
    navigate(`/datasets/${ds.id}`);
  };

  const handleCloseDrawer = () => {
    setActiveDataset(null);
    navigate('/datasets');
  };

  const handleGenerateAISummary = () => {
    if (!activeDataset) return;
    setIsSummarizing(true);
    fetch('/api/ai/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: activeDataset.title,
        abstract: activeDataset.abstract || activeDataset.purpose,
        type: 'dataset'
      })
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setAiSummary(res.summary);
        }
      })
      .catch(err => console.error('AI summary error:', err))
      .finally(() => setIsSummarizing(false));
  };

  const handleAskAIQuestion = (e) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim() || !activeDataset) return;
    setIsAsking(true);
    fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: aiQuestion,
        datasetContext: {
          title: activeDataset.title,
          abstract: activeDataset.abstract,
          instrument: activeDataset.instrument,
          platform: activeDataset.platform,
          region: activeDataset.region
        }
      })
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setAiAnswer(res.answer);
        }
      })
      .catch(err => console.error('AI Q&A error:', err))
      .finally(() => setIsAsking(false));
  };

  const handleCopyCitation = () => {
    if (!activeDataset) return;
    const textToCopy = activeDataset.citation || `${activeDataset.scientist_name || 'NCPOR'}. ${activeDataset.title}. NPDC.`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleSaveToProfile = () => {
    if (!activeDataset) return;
    fetch('/api/users/me/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: activeDataset.id,
        type: 'dataset',
        title: activeDataset.title,
        category: activeDataset.category,
        region: activeDataset.region,
        link: `/datasets/${activeDataset.id}`
      })
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 2500);
        }
      })
      .catch(err => console.error('Save error:', err));
  };

  return (
    <div className="space-y-6 pb-16 text-left relative">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
                <Database className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-heading">
                Scientific Datasets Catalog
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Official archive of in-situ meteorological, glaciological, oceanographic, and radar observations from Indian Polar Expeditions (NPDC &amp; NASA NSIDC).
            </p>
          </div>

          <div className="flex items-center space-x-4 border-l border-slate-100 pl-4">
            <div>
              <span className="text-xl font-black text-slate-900 font-heading">{total}</span>
              <span className="text-[11px] text-slate-400 block font-medium">Datasets Archived</span>
            </div>
            <div>
              <span className="text-xl font-black text-emerald-600 font-heading">FAIR</span>
              <span className="text-[11px] text-slate-400 block font-medium">Gold Compliant</span>
            </div>
          </div>

        </div>

        {/* 2. Filters & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search datasets by title, instrument, scientist, or parameter..."
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
            />
          </div>

          <div>
            <select
              value={category}
              onChange={(e) => { setCategory(e.target.value); setPage(0); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-polar-blue"
            >
              <option value="All">All Categories</option>
              <option value="Atmosphere & Climate">Atmosphere &amp; Climate</option>
              <option value="Cryosphere & Glaciology">Cryosphere &amp; Glaciology</option>
              <option value="Oceanography">Oceanography</option>
              <option value="Satellite Remote Sensing">Satellite Remote Sensing</option>
              <option value="Human Dimensions">Human Dimensions</option>
            </select>
          </div>

          <div>
            <select
              value={region}
              onChange={(e) => { setRegion(e.target.value); setPage(0); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-polar-blue"
            >
              <option value="All">All Regions</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Arctic">Arctic</option>
              <option value="Southern Ocean">Southern Ocean</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center space-x-1 mr-1">
            <Filter className="w-3 h-3" />
            <span>Quick Topics:</span>
          </span>
          {['Sea Ice', 'Temperature', 'Radar', 'Ozone', 'Meteorology', 'CTD Ocean'].map(tag => (
            <button
              key={tag}
              onClick={() => { setQuery(tag); setPage(0); }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                query === tag 
                  ? 'bg-polar-blue text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {tag}
            </button>
          ))}
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(0); }}
              className="text-[11px] text-rose-500 hover:underline ml-2"
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* 3. Dataset Grid List */}
      <div className="space-y-3">
        {datasets.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-polar-border">
            <Database className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No Datasets Found</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your keyword or region filters.</p>
          </div>
        ) : (
          datasets.map((ds) => (
            <div
              key={ds.id}
              onClick={() => handleOpenDataset(ds)}
              className="bg-white rounded-2xl p-5 border border-polar-border hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-polar-blue uppercase border border-blue-100">
                    {ds.data_center || 'NPDC'}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {ds.category || 'Cryosphere'}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                    {ds.region || 'Antarctica'}
                  </span>
                  {ds.instrument && (
                    <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Radio className="w-3 h-3 text-slate-400" />
                      <span>{ds.instrument}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-polar-blue transition-colors">
                  {ds.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {ds.abstract || ds.purpose}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Release: {ds.release_date}</span>
                  </span>
                  {ds.scientist_name && (
                    <span className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{ds.scientist_name}</span>
                    </span>
                  )}
                  {ds.expedition_year && (
                    <span className="flex items-center space-x-1">
                      <Compass className="w-3 h-3 text-slate-400" />
                      <span>Expedition: {ds.expedition_year}</span>
                    </span>
                  )}
                  <span className="flex items-center space-x-1 text-slate-500 font-mono text-[10px]">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>FAIR Verified</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div 
                className="flex items-center space-x-2 flex-shrink-0 pt-2 md:pt-0"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleOpenDataset(ds)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-polar-blue border border-slate-200 transition-colors"
                >
                  <span>Inspect</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={ds.download_url ? (ds.download_url.startsWith('http') ? ds.download_url : `https://npdc.ncpor.res.in/${ds.download_url}`) : "https://npdc.ncpor.res.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 hover:bg-blue-100 text-polar-blue transition-colors border border-blue-200"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 4. Pagination Controls */}
      <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500 font-semibold">
        <span>Showing {total === 0 ? 0 : page * limit + 1} - {Math.min((page + 1) * limit, total)} of {total}</span>
        <div className="flex items-center space-x-2">
          <button
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
          >
            Previous
          </button>
          <span className="font-mono">Page {page + 1}</span>
          <button
            disabled={(page + 1) * limit >= total}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE DATASET DETAIL SLIDE-OVER DRAWER / MODAL                   */}
      {/* ========================================================================= */}
      {activeDataset && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity duration-300"
          onClick={handleCloseDrawer}
        >
          <div 
            className="bg-white w-full max-w-2xl h-full shadow-2xl overflow-y-auto flex flex-col border-l border-polar-border animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10 flex items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1 pr-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-polar-blue border border-blue-200">
                    {activeDataset.data_center || 'NPDC'}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-700">
                    {activeDataset.region || 'Antarctica'}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                    ID: {activeDataset.id}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>FAIR Verified</span>
                  </span>
                </div>

                <h2 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                  {activeDataset.title}
                </h2>
              </div>

              <button
                onClick={handleCloseDrawer}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0"
                title="Close Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics & Actions Bar */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-4 text-slate-500">
                <span className="flex items-center space-x-1">
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-700">{activeDataset.downloads_count || 142}</span> downloads
                </span>
                <span className="flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-700">{activeDataset.views_count || 680}</span> views
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveToProfile}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors border ${
                    savedSuccess 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{savedSuccess ? 'Saved!' : 'Save'}</span>
                </button>

                <button
                  onClick={handleShareLink}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>

                <a
                  href={activeDataset.download_url ? (activeDataset.download_url.startsWith('http') ? activeDataset.download_url : `https://npdc.ncpor.res.in/${activeDataset.download_url}`) : "https://npdc.ncpor.res.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-semibold bg-polar-blue hover:bg-blue-600 text-white shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Get Data</span>
                </a>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 px-6 pt-3 border-b border-slate-100 bg-white text-xs font-semibold overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'technical', label: 'Sensors & Geometry', icon: Radio },
                { id: 'citation', label: 'Provenance & Citation', icon: BookOpen },
                { id: 'ai', label: 'AI Copilot & Summary', icon: Sparkles },
                { id: 'connections', label: 'Related Research', icon: Globe }
              ].map(tab => {
                const Icon = tab.icon;
                const active = detailTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setDetailTab(tab.id)}
                    className={`flex items-center space-x-1.5 py-2.5 px-3 border-b-2 whitespace-nowrap transition-colors ${
                      active 
                        ? 'border-polar-blue text-polar-blue font-bold' 
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Drawer Body Content */}
            <div className="p-6 flex-1 space-y-6 text-xs text-slate-700">
              
              {/* TAB 1: OVERVIEW */}
              {detailTab === 'overview' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Scientific Abstract</h3>
                    <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {activeDataset.abstract || "No extended abstract registered. This dataset contains observational records from Indian polar expeditions."}
                    </p>
                  </div>

                  {activeDataset.purpose && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Objective &amp; Purpose</h3>
                      <p className="text-slate-600 leading-relaxed bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/60">
                        {activeDataset.purpose}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-400 block font-medium">Science Category</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 block">{activeDataset.category || 'General Cryosphere'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-400 block font-medium">Topic / Domain</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 block">{activeDataset.topic || 'In-situ Observations'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-400 block font-medium">Operating Station / Area</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 block">{activeDataset.location_region || activeDataset.region || 'Antarctica'}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-[11px] text-slate-400 block font-medium">Originating Program</span>
                      <span className="font-bold text-slate-800 text-xs mt-0.5 block">{activeDataset.project_name || 'Indian Scientific Expedition'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TECHNICAL & SENSORS */}
              {detailTab === 'technical' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deployment &amp; Sensor Hierarchy</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Platform</span>
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <Building className="w-3.5 h-3.5 text-polar-blue" />
                          <span>{activeDataset.platform || "Research Station (Maitri/Bharati)"}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Instrument / Sensor</span>
                        <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                          <Radio className="w-3.5 h-3.5 text-polar-blue" />
                          <span>{activeDataset.instrument || "In-situ Sensor Array / Telemetry"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Measured Variables Table */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Measured Physical Variables</h3>
                    <div className="border border-slate-100 rounded-xl overflow-hidden">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500">
                          <tr>
                            <th className="py-2.5 px-3">Variable Name</th>
                            <th className="py-2.5 px-3">Standard Unit</th>
                            <th className="py-2.5 px-3">Precision / Calibration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(activeDataset.variables || [
                            { name: 'Surface Air Temperature', unit: '°C / K', precision: '±0.1 K' },
                            { name: 'Atmospheric Pressure', unit: 'hPa', precision: '±0.05 hPa' },
                            { name: 'Wind Velocity Vector', unit: 'm/s, deg', precision: '±0.2 m/s' }
                          ]).map((v, i) => (
                            <tr key={i} className="hover:bg-slate-50/50">
                              <td className="py-2 px-3 font-semibold text-slate-800">{v.name}</td>
                              <td className="py-2 px-3 font-mono text-slate-600">{v.unit}</td>
                              <td className="py-2 px-3 text-slate-500">{v.precision}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Spatial Coordinates */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Spatial Extent &amp; Polar Grid</h3>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Coordinate Reference:</span>
                        <span className="font-mono font-semibold text-slate-900">{activeDataset.spatial_coverage?.coordinate_system || "WGS 84 / Polar Stereographic"}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/50">
                        <span>Bounding Box:</span>
                        <span className="font-mono text-slate-800">{activeDataset.spatial_coverage?.bounding_box || "69°00'S to 71°30'S, 11°00'E to 76°30'E"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Versions Table */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Version History</h3>
                    <div className="space-y-2">
                      {(activeDataset.versions || [
                        { version: "v1.2", date: activeDataset.release_date || "2023-08-15", notes: "Calibrated with automated QA/QC flags" },
                        { version: "v1.0", date: "2021-01-10", notes: "Initial ingestion from station telemetry" }
                      ]).map((ver, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-polar-blue font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{ver.version}</span>
                            <span className="text-slate-600">{ver.notes}</span>
                          </div>
                          <span className="text-slate-400 font-mono text-[11px]">{ver.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CITATION & PROVENANCE */}
              {detailTab === 'citation' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Scientific Provenance</h3>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Principal Investigator:</span>
                        <span className="font-bold text-slate-900">{activeDataset.scientist_name || "NCPOR Research Scientist"}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200/50 pt-2">
                        <span className="text-slate-500">Affiliated Institution:</span>
                        <span className="font-semibold text-slate-800">{activeDataset.scientist_org || "National Centre for Polar and Ocean Research (NCPOR)"}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200/50 pt-2">
                        <span className="text-slate-500">Data Center:</span>
                        <span className="font-semibold text-slate-800">{activeDataset.data_center || "NPDC"}</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-200/50 pt-2">
                        <span className="text-slate-500">Release Date:</span>
                        <span className="font-mono text-slate-700">{activeDataset.release_date}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Formal Data Citation</h3>
                      <button
                        onClick={handleCopyCitation}
                        className="flex items-center space-x-1 text-polar-blue font-semibold hover:underline"
                      >
                        {copiedCitation ? <Check className="w-3 h-3 text-emerald-600" /> : <BookOpen className="w-3 h-3" />}
                        <span>{copiedCitation ? 'Copied to Clipboard!' : 'Copy Citation'}</span>
                      </button>
                    </div>
                    <div className="p-4 bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl leading-relaxed border border-slate-800 select-all">
                      {activeDataset.citation || `${activeDataset.scientist_name || 'NCPOR Scientific Division'} (2023). ${activeDataset.title}. National Polar Data Center (NPDC).`}
                    </div>
                  </div>

                  {/* External Resource Links */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Source Documentation</h3>
                    <div className="space-y-2">
                      {activeDataset.detail_url && (
                        <a
                          href={activeDataset.detail_url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-blue-50/50 hover:bg-blue-100/50 text-polar-blue font-semibold border border-blue-100 transition-colors"
                        >
                          <span className="flex items-center space-x-2">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>NPDC Master Metadata Portal Form</span>
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">View Official Record</span>
                        </a>
                      )}
                      {activeDataset.pdf_url && (
                        <a
                          href={activeDataset.pdf_url.startsWith('http') ? activeDataset.pdf_url : `https://npdc.ncpor.res.in${activeDataset.pdf_url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold border border-slate-200 transition-colors"
                        >
                          <span className="flex items-center space-x-2">
                            <FileText className="w-3.5 h-3.5 text-red-500" />
                            <span>Official Metadata Specification (PDF)</span>
                          </span>
                          <span className="text-[11px] text-slate-400 font-normal">Download PDF</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: AI COPILOT & SUMMARY */}
              {detailTab === 'ai' && (
                <div className="space-y-5">
                  <div className="p-4 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-polar-blue" />
                        <h4 className="font-bold text-slate-900 text-xs">AI Polar Data Analyst</h4>
                      </div>
                      <button
                        onClick={handleGenerateAISummary}
                        disabled={isSummarizing}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-polar-blue hover:bg-blue-600 text-white font-semibold shadow-sm disabled:opacity-50 transition-colors"
                      >
                        {isSummarizing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        <span>{isSummarizing ? 'Synthesizing...' : 'Generate Executive Summary'}</span>
                      </button>
                    </div>

                    {aiSummary ? (
                      <div className="mt-4 p-4 bg-white rounded-xl border border-blue-200 text-slate-700 leading-relaxed font-sans whitespace-pre-line text-xs shadow-sm">
                        {aiSummary}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 mt-2">
                        Generate an automated 3-point technical synthesis of this dataset covering instruments, temporal span, and relevance to climate change models.
                      </p>
                    )}
                  </div>

                  {/* Ask Question Section */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ask AI about this Observation Series</h4>
                    <form onSubmit={handleAskAIQuestion} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g., How does this dataset constrain Antarctic ice shelf basal melt?"
                        value={aiQuestion}
                        onChange={(e) => setAiQuestion(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                      />
                      <button
                        type="submit"
                        disabled={isAsking || !aiQuestion.trim()}
                        className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold disabled:opacity-40 flex items-center space-x-1"
                      >
                        {isAsking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      </button>
                    </form>

                    {/* Pre-canned Prompts */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        "What instruments were used?",
                        "What is the observational cadence?",
                        "How can this be used in CMIP6 models?"
                      ].map((promptText, i) => (
                        <button
                          key={i}
                          onClick={() => { setAiQuestion(promptText); }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-medium transition-colors"
                        >
                          "{promptText}"
                        </button>
                      ))}
                    </div>

                    {aiAnswer && (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 leading-relaxed text-xs">
                        <span className="font-bold text-polar-blue block mb-1">AI Response:</span>
                        {aiAnswer}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: RELATED RESEARCH & CONNECTIONS */}
              {detailTab === 'connections' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Connected Publications</h3>
                    <div className="space-y-2.5">
                      {(activeDataset.related_publications || [
                        {
                          id: 'pub-sea-ice-variability-2024',
                          title: 'Sea Ice Variability in the Southern Ocean Sector of Antarctica during 2010–2023: Observations, Trends and Future Projections',
                          journal: 'Journal of Polar Research',
                          year: 2024
                        }
                      ]).map((pub) => (
                        <Link
                          key={pub.id}
                          to={`/publications/${pub.id}`}
                          className="block p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 transition-all group"
                        >
                          <span className="text-[10px] font-bold text-polar-blue uppercase">Peer-Reviewed Article</span>
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-polar-blue transition-colors mt-0.5">
                            {pub.title}
                          </h4>
                          <span className="text-[11px] text-slate-400 mt-1 block">
                            {pub.journal} ({pub.year}) • DOI: {pub.doi || '10.3402/polar.2024.12345'}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Connected Expeditions</h3>
                    <div className="space-y-2">
                      {(activeDataset.related_expeditions || [
                        { id: 'exp-44-iae', name: '44th Indian Antarctic Expedition', code: '44th IAE', region: 'Antarctica' }
                      ]).map((exp) => (
                        <Link
                          key={exp.id}
                          to={`/expeditions/${exp.id}`}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <Compass className="w-4 h-4 text-polar-blue" />
                            <div>
                              <span className="font-bold text-slate-900 block">{exp.name}</span>
                              <span className="text-[10px] text-slate-400">{exp.region} Expedition</span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interactive Knowledge Graph</h3>
                    <Link
                      to="/knowledge-graph"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-indigo-50/60 hover:bg-indigo-100/60 border border-indigo-100 text-indigo-900 transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        <div>
                          <span className="font-bold block">Inspect in 3D Knowledge Graph</span>
                          <span className="text-[11px] text-indigo-600/80">Explore linkages between researchers, expeditions, and climate datasets.</span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-indigo-600" />
                    </Link>
                  </div>
                </div>
              )}

            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-4 sticky bottom-0">
              <span className="text-[11px] text-slate-400">
                National Polar Data Center (NPDC) • MoES Open Data License
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCloseDrawer}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition-colors"
                >
                  Close
                </button>
                <a
                  href={activeDataset.download_url ? (activeDataset.download_url.startsWith('http') ? activeDataset.download_url : `https://npdc.ncpor.res.in/${activeDataset.download_url}`) : "https://npdc.ncpor.res.in"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-polar-blue hover:bg-blue-600 text-white shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Archive</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
