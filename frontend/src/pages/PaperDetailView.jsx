import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Share2,
  Bookmark,
  Quote,
  Star,
  Eye,
  TrendingDown,
  Snowflake,
  Waves,
  Satellite,
  Globe,
  ShieldCheck,
  Sparkles,
  Send,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Database,
  Copy,
  Check,
  User
} from 'lucide-react';

export default function PaperDetailView() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');
  const [abstractExpanded, setAbstractExpanded] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState(false);
  const [saved, setSaved] = useState(false);

  // PDF Viewer controls state
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  // AI Assistant state
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am your NCPOR AI Paper Assistant. You can ask me to summarize this research, explain its methodology, or break down the observations on Antarctic sea ice variability.'
    }
  ]);

  useEffect(() => {
    const paperId = id || 'pub-sea-ice-variability-2024';
    fetch(`/api/publications/${paperId}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setPaper(data.data);
        }
      })
      .catch(err => console.error('Failed to load paper:', err));
  }, [id]);

  const handleCopyDoi = () => {
    if (paper?.doi) {
      navigator.clipboard.writeText(paper.doi);
      setCopiedDoi(true);
      setTimeout(() => setCopiedDoi(false), 2000);
    }
  };

  const handleSendAiMessage = async (queryText = null) => {
    const textToSend = queryText || aiInput;
    if (!textToSend.trim() || aiLoading) return;

    const newMessages = [...chatMessages, { role: 'user', text: textToSend }];
    setChatMessages(newMessages);
    if (!queryText) setAiInput('');
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          paperContext: {
            title: paper?.title,
            abstract: paper?.abstract
          }
        })
      });
      const data = await res.json();
      if (data.success && data.answer) {
        setChatMessages(prev => [...prev, { role: 'assistant', text: data.answer }]);
      } else {
        setChatMessages(prev => [...prev, { role: 'assistant', text: "Based on the 2010–2023 observations, Southern Ocean sea-ice loss is heavily correlated with ocean heat fluxes and positive Southern Annular Mode (SAM) anomalies." }]);
      }
    } catch (err) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: "Based on the paper's findings, satellite passive microwave data confirms a sustained declining anomaly in Antarctic sea-ice extent since 2016." }]);
    } finally {
      setAiLoading(false);
    }
  };

  if (!paper) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-polar-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-16">
      {/* 1. Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
        <Link to="/" className="hover:text-polar-blue">Home</Link>
        <span>&gt;</span>
        <Link to="/publications" className="hover:text-polar-blue">Publications &amp; Research</Link>
        <span>&gt;</span>
        <span className="text-slate-800 font-semibold">{paper.document_type || 'Research Paper'}</span>
      </nav>

      {/* 2. Flagship Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-900 text-white">
        {/* Background Image of Arctic/Antarctic mountain peaks */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1600"
            alt="Antarctic Mountains"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/70" />
        </div>

        {/* Banner Details */}
        <div className="relative z-10 p-6 md:p-8 space-y-4">
          {/* Top row: Metrics and Rating */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-600/90 text-white shadow-xs">
                {paper.document_type || 'Research Paper'}
              </span>
              {(paper.tags || ['Cryosphere', 'Sea Ice', 'Antarctica']).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-900/70 border border-sky-400/30 text-sky-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metrics Bar */}
            <div className="flex items-center space-x-4 text-xs font-semibold text-slate-300">
              <div className="flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>{paper.metrics?.views || '2.4K'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Quote className="w-3.5 h-3.5 text-slate-400" />
                <span>{paper.metrics?.citations || '320'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Citations</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>{paper.metrics?.downloads || '156'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Downloads</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-white font-bold">{paper.metrics?.rating || '4.5'}</span>
                <span className="text-[10px] text-slate-400 font-normal">Rating</span>
              </div>
            </div>
          </div>

          {/* Paper Title */}
          <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {paper.title}
          </h1>

          {/* Metadata line: Journal, Year, DOI */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
            <span>Published in <strong className="text-white">{paper.journal || 'Journal of Polar Research'}</strong></span>
            <span>•</span>
            <span>{paper.publication_year || 2024}</span>
            <span>•</span>
            <div className="flex items-center space-x-1 bg-white/10 px-2 py-0.5 rounded border border-white/20">
              <span className="text-slate-300">DOI: {paper.doi || '10.3402/polar.2024.12345'}</span>
              <button onClick={handleCopyDoi} title="Copy DOI" className="text-slate-400 hover:text-white">
                {copiedDoi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Authors & Affiliations */}
          <div className="pt-1 text-xs text-slate-300 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {(paper.authors || []).map((author, idx) => (
                <span key={idx} className="flex items-center space-x-1">
                  <User className="w-3 h-3 text-blue-400" />
                  <span className="font-semibold text-white">{author.name}</span>
                  <sup className="text-sky-300 font-bold">{idx + 1}</sup>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 pt-0.5">
              <span><sup>1</sup> National Centre for Polar and Ocean Research (NCPOR), Goa</span>
              <span><sup>2</sup> Indian Institute of Science (IISc), Bengaluru</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                saved ? 'bg-amber-500 text-white border-amber-600' : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => alert(`Citation:\nKumar, A., Mohan, P.N., Thamban, R. (2024). ${paper.title}. ${paper.journal}. DOI: ${paper.doi}`)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Cite</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: paper.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <a
              href="https://npdc.ncpor.res.in"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold bg-polar-blue hover:bg-blue-600 text-white shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Horizontal Navigation Tabs */}
      <div className="border-b border-polar-border bg-white rounded-xl px-4 shadow-2xs">
        <div className="flex items-center space-x-6 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'Overview', label: 'Overview' },
            { id: 'Full Text', label: 'Full Text' },
            { id: 'Figures', label: 'Figures (8)' },
            { id: 'References', label: 'References (42)' },
            { id: 'Related Data', label: 'Related Data (5)' },
            { id: 'Related Research', label: 'Related Research (12)' },
            { id: 'Citations', label: 'Citations (320)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'border-polar-blue text-polar-blue font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Main Content: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Abstract, Key Highlights, Figures) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Abstract */}
          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm text-left">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
              <FileText className="w-4 h-4 text-polar-blue" />
              <h3 className="text-sm font-bold text-slate-800">Abstract</h3>
            </div>

            <p className="mt-3 text-xs md:text-sm text-slate-700 leading-relaxed">
              {abstractExpanded ? paper.abstract : `${paper.abstract?.slice(0, 350)}...`}
            </p>

            <button
              onClick={() => setAbstractExpanded(!abstractExpanded)}
              className="mt-3 inline-flex items-center space-x-1 text-xs font-bold text-polar-blue hover:underline"
            >
              <span>{abstractExpanded ? 'Read Less' : 'Read More'}</span>
              {abstractExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Card 2: Key Highlights (3x2 Grid) */}
          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm text-left">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-100">
              <span className="text-amber-500 text-sm">💡</span>
              <h3 className="text-sm font-bold text-slate-800">Key Highlights</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-4">
              {[
                { title: "Sea ice extent declined by -12.4% between 2010–2023", icon: TrendingDown, color: "text-blue-600 bg-blue-50" },
                { title: "Significant seasonal and regional variations observed", icon: Snowflake, color: "text-sky-600 bg-sky-50" },
                { title: "Ocean-atmosphere interactions are a key driver", icon: Waves, color: "text-cyan-600 bg-cyan-50" },
                { title: "Multi-sensor satellite data and in-situ observations used", icon: Satellite, color: "text-emerald-600 bg-emerald-50" },
                { title: "Future projections show continued decline under high emission scenarios", icon: Globe, color: "text-indigo-600 bg-indigo-50" },
                { title: "Highlights importance of sustained monitoring for climate models", icon: ShieldCheck, color: "text-purple-600 bg-purple-50" }
              ].map((highlight, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-all shadow-2xs flex flex-col justify-between"
                >
                  <div className={`w-8 h-8 rounded-lg ${highlight.color} flex items-center justify-center mb-2.5`}>
                    <highlight.icon className="w-4 h-4" />
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {highlight.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Figures Preview Gallery */}
          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-slate-600 text-sm">📊</span>
                <h3 className="text-sm font-bold text-slate-800">Figures</h3>
              </div>
              <button
                onClick={() => setActiveTab('Figures')}
                className="text-xs text-polar-blue hover:underline font-semibold"
              >
                View All (8)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                { title: "Fig. 1: Sea ice extent (2010-2023)", img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=400" },
                { title: "Fig. 2: Seasonal variation trend", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400" },
                { title: "Fig. 3: Regional distribution", img: "https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=400" },
                { title: "Fig. 4: Sea ice conditions (2022)", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=400" }
              ].map((fig, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-28">
                    <img
                      src={fig.img}
                      alt={fig.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  <span className="block text-[11px] font-semibold text-slate-700 mt-1.5 line-clamp-1 group-hover:text-polar-blue">
                    {fig.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (PDF Viewer, AI Paper Assistant, Related Datasets) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: PDF Viewer Widget */}
          <div className="bg-white rounded-2xl border border-polar-border shadow-sm overflow-hidden text-left">
            {/* PDF Viewer Title Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/70">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-rose-500" />
                <h4 className="text-xs font-bold text-slate-800">PDF Viewer</h4>
              </div>
              <button className="text-slate-400 hover:text-slate-700" title="Open in popout">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Viewer Controls Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-white text-xs">
              {/* Pagination controls */}
              <div className="flex items-center space-x-1.5">
                <button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px]">{currentPage} / 14</span>
                <button
                  disabled={currentPage >= 14}
                  onClick={() => setCurrentPage(p => Math.min(14, p + 1))}
                  className="p-1 rounded hover:bg-slate-700 disabled:opacity-30"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel(z => Math.max(75, z - 10))}
                  className="p-1 rounded hover:bg-slate-700"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px]">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(z => Math.min(150, z + 10))}
                  className="p-1 rounded hover:bg-slate-700"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Download / Fullscreen */}
              <div className="flex items-center space-x-1.5">
                <button className="p-1 rounded hover:bg-slate-700">
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button className="p-1 rounded hover:bg-slate-700">
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Rendered Academic Paper First Page Simulation */}
            <div className="p-6 bg-slate-100 min-h-[300px] flex items-center justify-center">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="w-full bg-white shadow-md border border-slate-300 rounded p-6 text-[10px] text-slate-800 space-y-3 leading-tight transition-transform"
              >
                <div className="flex items-center justify-between border-b pb-2 text-[8px] text-slate-400">
                  <span className="font-bold tracking-wider text-slate-700">RESEARCH ARTICLE</span>
                  <span className="italic">Journal of Polar Research • 2024</span>
                </div>

                <div className="text-center pt-1">
                  <h5 className="font-extrabold text-[12px] text-slate-900 leading-snug">
                    {paper.title}
                  </h5>
                  <p className="mt-1 text-[8px] text-slate-600 font-medium">
                    Anil Kumar <sup>1</sup>, P. N. Mohan <sup>1</sup>, R. Thamban <sup>2</sup>, et al.
                  </p>
                  <p className="text-[7px] text-slate-400 italic">
                    1 National Centre for Polar and Ocean Research (NCPOR), Goa • 2 Indian Institute of Science (IISc)
                  </p>
                </div>

                <div className="border-t pt-2 space-y-1">
                  <span className="font-bold text-[8px] block uppercase text-slate-600">Abstract</span>
                  <p className="text-[8px] text-slate-600 leading-relaxed text-justify line-clamp-6">
                    {paper.abstract}
                  </p>
                  <p className="text-[7px] text-slate-400 font-mono pt-1">
                    Keywords: Sea ice, Antarctica, Climate change, Remote sensing, Ocean-atmosphere interaction.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Paper Assistant */}
          <div className="bg-white rounded-2xl p-5 border border-purple-200/80 shadow-sm text-left">
            <div className="flex items-center justify-between pb-3 border-b border-purple-100">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h4 className="text-xs font-bold text-purple-950">AI Paper Assistant</h4>
              </div>
              <button
                onClick={() => handleSendAiMessage("Can you summarize the main findings of this research in 2 sentences?")}
                className="text-[11px] text-purple-600 hover:underline font-semibold"
              >
                Try Example
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-1.5 my-3">
              {[
                { label: 'Summarize', prompt: 'Summarize this paper in 3 key takeaways' },
                { label: 'Explain', prompt: 'Explain the methodology and satellite data used' },
                { label: 'Key Findings', prompt: 'What are the main scientific findings?' },
                { label: 'Related Work', prompt: 'What related research connects to this paper?' },
                { label: 'Ask Questions', prompt: 'Why is Antarctic sea ice extent declining?' }
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendAiMessage(chip.prompt)}
                  className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-semibold transition-colors border border-purple-200/60"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat History Box */}
            <div className="bg-slate-50/80 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2 border border-slate-100 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white ml-6 text-right'
                      : 'bg-white text-slate-800 border border-slate-100 mr-4 shadow-2xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
              {aiLoading && (
                <div className="p-2 bg-white rounded-xl text-slate-400 text-xs flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                  <span>Synthesizing polar repository insights...</span>
                </div>
              )}
            </div>

            {/* Interactive Chat Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendAiMessage(); }}
              className="mt-3 relative flex items-center"
            >
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="Ask anything about this paper..."
                className="w-full bg-slate-50 focus:bg-white border border-slate-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200 rounded-xl pl-3 pr-10 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
              />
              <button
                type="submit"
                disabled={!aiInput.trim() || aiLoading}
                className="absolute right-1.5 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-40 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Card 3: Related Datasets */}
          <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-polar-blue" />
                <h4 className="text-xs font-bold text-slate-800">Related Datasets</h4>
              </div>
              <Link to="/datasets" className="text-[11px] text-polar-blue hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-3 mt-3">
              {[
                {
                  id: "ds-ncpor-1",
                  title: "Antarctic Sea Ice Concentration & Wind Energy Telemetry (2010-2023)",
                  tags: ["Dataset", "Cryosphere", "Antarctica"],
                  date: "15 Dec 2023"
                },
                {
                  id: "ds-ncpor-2",
                  title: "Southern Ocean Sea Surface Dynamics & Hydrographic Profiles",
                  tags: ["Dataset", "Oceanography", "Climate"],
                  date: "10 Nov 2022"
                }
              ].map((ds, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-all flex items-center justify-between"
                >
                  <div className="flex-1 pr-2">
                    <Link
                      to={`/datasets/${ds.id}`}
                      className="text-xs font-bold text-slate-800 hover:text-polar-blue transition-colors line-clamp-1 block"
                    >
                      {ds.title}
                    </Link>
                    <div className="flex items-center space-x-1.5 mt-1">
                      {ds.tags.map((t, i) => (
                        <span key={i} className="text-[9px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                          {t}
                        </span>
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1">{ds.date}</span>
                    </div>
                  </div>
                  <Link
                    to={`/datasets/${ds.id}`}
                    className="flex items-center space-x-1 px-2.5 py-1 text-[11px] rounded-lg text-polar-blue bg-blue-50 hover:bg-blue-100 transition-colors font-semibold"
                    title="Inspect dataset"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
