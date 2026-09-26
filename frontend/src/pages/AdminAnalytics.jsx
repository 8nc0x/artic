import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Eye,
  Database,
  GraduationCap,
  Bot,
  Upload,
  Share2,
  Users,
  AlertCircle,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');

  // Realistically grounded metrics
  const analyticsSummary = {
    pageViews: 148520,
    pageViewsTrend: '+14.2%',
    researchViews: 42190,
    datasetDownloads: 18740,
    quizAttempts: 3410,
    aiInferences: 8940,
    documentUploads: 38,
    socialEngagement: 24900,
    activeScientists: 84,
    apiErrorRate: '0.03%'
  };

  const domainBreakdown = [
    { name: 'Antarctica (Maitri & Bharati)', percent: 52, color: 'bg-blue-500' },
    { name: 'Arctic (Himadri & IndARC)', percent: 26, color: 'bg-sky-400' },
    { name: 'Southern Ocean Expeditions', percent: 14, color: 'bg-teal-400' },
    { name: 'Himalayan Cryosphere (Himansh)', percent: 8, color: 'bg-indigo-400' }
  ];

  const recentApiTraffic = [
    { route: 'GET /api/datasets/catalog', requests: 42300, latency: '42ms', errors: 2, status: '200 OK' },
    { route: 'GET /api/publications', requests: 31200, latency: '38ms', errors: 1, status: '200 OK' },
    { route: 'POST /api/ai/chat', requests: 8940, latency: '480ms', errors: 4, status: '200 OK' },
    { route: 'GET /api/social/:platform/posts', requests: 12400, latency: '24ms', errors: 0, status: '200 OK' },
    { route: 'POST /api/sync/trigger', requests: 30, latency: '1240ms', errors: 0, status: '200 OK' },
  ];

  return (
    <div className="space-y-8 text-left font-sans text-slate-100">
      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-2 border border-slate-700">
            <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Platform Telemetry & Audit Logs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Platform Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Aggregated metrics for research paper citations, dataset downloads, AI grounding inferences, and system throughput.
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          {['7d', '30d', '90d', '1y'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Page Views', value: analyticsSummary.pageViews.toLocaleString(), trend: analyticsSummary.pageViewsTrend, icon: Eye, color: 'text-blue-400' },
          { label: 'Research Paper Views', value: analyticsSummary.researchViews.toLocaleString(), trend: '+8.4%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Dataset Downloads', value: analyticsSummary.datasetDownloads.toLocaleString(), trend: '+19.1%', icon: Database, color: 'text-sky-400' },
          { label: 'Quiz Completions', value: analyticsSummary.quizAttempts.toLocaleString(), trend: '+32.0%', icon: GraduationCap, color: 'text-purple-400' },
          { label: 'Grounded AI Queries', value: analyticsSummary.aiInferences.toLocaleString(), trend: '+15.5%', icon: Bot, color: 'text-amber-400' },
          { label: 'Expedition Ingests', value: analyticsSummary.documentUploads, trend: 'Verified', icon: Upload, color: 'text-teal-400' },
          { label: 'Social Reach', value: analyticsSummary.socialEngagement.toLocaleString(), trend: '+11.8%', icon: Share2, color: 'text-rose-400' },
          { label: 'API Error Rate', value: analyticsSummary.apiErrorRate, trend: 'Healthy', icon: AlertCircle, color: 'text-emerald-400' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{kpi.label}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-black text-white font-mono">{kpi.value}</div>
              <div className="text-[10px] font-bold text-emerald-400 flex items-center space-x-1">
                <span>{kpi.trend}</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Domain Distribution & Telemetry Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Domain Distribution */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-heading">
            Research Interest by Polar Domain
          </h3>
          <p className="text-xs text-slate-400">
            Relative distribution of search queries, downloads, and paper reads across India’s expedition sectors.
          </p>

          <div className="space-y-3 pt-2">
            {domainBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">{item.name}</span>
                  <span className="text-white font-bold font-mono">{item.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Latency and Route Throughput */}
        <div className="md:col-span-2 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-heading">
              Real-time API Ingestion & Gateway Telemetry
            </h3>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Gateways Nominal</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] text-slate-500 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="pb-2">API Endpoint</th>
                  <th className="pb-2">Requests ({timeRange})</th>
                  <th className="pb-2">Avg Latency</th>
                  <th className="pb-2">Error Count</th>
                  <th className="pb-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                {recentApiTraffic.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30">
                    <td className="py-2.5 font-bold text-slate-200">{row.route}</td>
                    <td className="py-2.5 text-slate-400">{row.requests.toLocaleString()}</td>
                    <td className="py-2.5 text-slate-400">{row.latency}</td>
                    <td className="py-2.5 text-slate-400">{row.errors}</td>
                    <td className="py-2.5 text-right text-emerald-400 font-bold">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
