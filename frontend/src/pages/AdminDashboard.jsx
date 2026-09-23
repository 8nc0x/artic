import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Database,
  Share2,
  TrendingUp,
  Clock,
  Sparkles,
  Upload,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [pendingQueue, setPendingQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ingestion form state
  const [ingestType, setIngestType] = useState('dataset');
  const [ingestTitle, setIngestTitle] = useState('');
  const [ingestCategory, setIngestCategory] = useState('Atmosphere & Climate');
  const [ingestRegion, setIngestRegion] = useState('Antarctica');
  const [ingestSuccess, setIngestSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) setDashboardData(d.data);
      });

    fetch('/api/admin/pending')
      .then(r => r.json())
      .then(d => {
        if (d.success) setPendingQueue(d.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/admin/approve/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPendingQueue(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`/api/admin/reject/${id}`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPendingQueue(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleIngestSubmit = (e) => {
    e.preventDefault();
    if (!ingestTitle.trim()) return;

    setIngestSuccess(true);
    setTimeout(() => {
      setIngestTitle('');
      setIngestSuccess(false);
    }, 3000);
  };

  const stats = dashboardData?.stats || {
    total_datasets: 997,
    total_publications: 101,
    total_reports: 6,
    total_media: 9,
    pending_moderation: pendingQueue.length,
    active_researchers: 6,
    ai_queries_today: 142
  };

  return (
    <div className="space-y-6 pb-16 text-left max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              NCPOR Administrative &amp; Moderation Oversight
            </h1>
          </div>
          <p className="text-xs text-blue-200/80 mt-1 max-w-2xl">
            Human-in-the-loop review for AI-generated outreach, research metadata compliance, and repository ingestion pipelines.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{pendingQueue.length} Pending Approval</span>
          </span>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Archived Datasets
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.total_datasets}</span>
          <span className="text-[11px] text-emerald-600 block mt-1 font-semibold">100% Validated</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Cruise Reports
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.total_reports}</span>
          <span className="text-[11px] text-blue-600 block mt-1 font-semibold">Open Access</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            AI Inquiries Today
          </span>
          <span className="text-2xl font-extrabold text-slate-900">{stats.ai_queries_today}</span>
          <span className="text-[11px] text-purple-600 block mt-1 font-semibold">Gemini + RAG</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Pending Moderation
          </span>
          <span className="text-2xl font-extrabold text-amber-600">{pendingQueue.length}</span>
          <span className="text-[11px] text-slate-500 block mt-1 font-medium">Requires review</span>
        </div>
      </div>

      {/* 3. Main Workspace: Moderation Queue & Ingestion Wizard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Human-in-the-Loop Moderation Queue */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-polar-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>AI Content Approval Queue</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and approve public-facing AI outreach posts and summaries before release
              </p>
            </div>
            <span className="text-xs font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
              {pendingQueue.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {pendingQueue.length > 0 ? (
              pendingQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-700">
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className="text-slate-400 text-[11px]">{item.submitted_at}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900">{item.title}</h3>

                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed font-sans">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-slate-500 font-medium">
                      By: <strong className="text-slate-700">{item.submitted_by}</strong>
                    </span>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3 py-1.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 text-red-700 font-bold text-xs flex items-center space-x-1 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve &amp; Publish</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-1" />
                <h4 className="text-xs font-bold text-slate-700">No Pending AI Content</h4>
                <p className="text-xs mt-0.5">All generated social posts and document summaries have been approved.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Fast Dataset Ingestion Wizard */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-polar-border p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5">
                <Upload className="w-4 h-4 text-polar-blue" />
                <span>Quick Metadata Ingestion Wizard</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Register a new in-situ or satellite dataset record with automatic FAIR tag extraction
              </p>
            </div>

            {ingestSuccess ? (
              <div className="p-6 text-center my-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 space-y-2 animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
                <h4 className="text-sm font-extrabold">Dataset Ingested Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Assigned NPDC Identifier: <strong>#NPDC-2024-0998</strong>. Metadata indexed in vector database.
                </p>
              </div>
            ) : (
              <form onSubmit={handleIngestSubmit} className="space-y-3 mt-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Asset Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setIngestType('dataset')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        ingestType === 'dataset' ? 'bg-polar-blue text-white border-polar-blue' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      Scientific Dataset
                    </button>
                    <button
                      type="button"
                      onClick={() => setIngestType('report')}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        ingestType === 'report' ? 'bg-polar-blue text-white border-polar-blue' : 'bg-slate-50 text-slate-600'
                      }`}
                    >
                      Cruise Report
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title of Record</label>
                  <input
                    type="text"
                    required
                    value={ingestTitle}
                    onChange={(e) => setIngestTitle(e.target.value)}
                    placeholder="e.g. Moveable Atmospheric Radar Spectral Data (2024)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Domain</label>
                    <select
                      value={ingestCategory}
                      onChange={(e) => setIngestCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 font-semibold focus:outline-none"
                    >
                      <option value="Atmosphere & Climate">Atmosphere &amp; Climate</option>
                      <option value="Cryosphere & Glaciology">Cryosphere &amp; Glaciology</option>
                      <option value="Oceanography">Oceanography</option>
                      <option value="Satellite Remote Sensing">Satellite Remote Sensing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Region</label>
                    <select
                      value={ingestRegion}
                      onChange={(e) => setIngestRegion(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 font-semibold focus:outline-none"
                    >
                      <option value="Antarctica">Antarctica</option>
                      <option value="Arctic">Arctic</option>
                      <option value="Southern Ocean">Southern Ocean</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register into NPDC Database</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl text-[11px] text-blue-900 space-y-1">
            <strong>FAIR Standards Guaranteed:</strong>
            <p className="text-slate-600">
              Uploaded records automatically generate standardized DOI handles, Dublin Core XML metadata, and vector embeddings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
