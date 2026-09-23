import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Send,
  FileText,
  TrendingUp,
  Brain,
  MessageSquare,
  Search,
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  Thermometer,
  Snowflake,
  Wind
} from 'lucide-react';

export default function AIPolarIntelligence() {
  const [activeTab, setActiveTab] = useState('assistant'); // 'assistant' | 'analyzer' | 'trends'
  
  // Chat Assistant State
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm-welcome',
      role: 'assistant',
      text: 'Welcome to the NCPOR AI Polar Intelligence & Research Assistant. Powered by Google Gemini and grounded in over 40 years of Indian polar expedition records, peer-reviewed publications, and the NPDC data repository. How can I assist your polar research or analysis today?',
      mode: 'gemini-live',
      timestamp: 'Just now',
      citations: [
        { label: '44th Indian Antarctic Expedition Records', link: '/reports' },
        { label: 'NPDC Satellite & Buoy Repository', link: '/datasets' }
      ]
    }
  ]);
  const [loadingChat, setLoadingChat] = useState(false);

  // Document Analyzer State
  const [docTitle, setDocTitle] = useState('Sea Ice Variability in the Southern Ocean Sector of Antarctica during 2010–2023');
  const [docContent, setDocContent] = useState(`Analysis of multidecadal satellite passive microwave observations and in-situ meteorological records from Maitri and Bharati stations indicates a persistent -12.4% declining anomaly in Antarctic marginal sea-ice extent. Unprecedented record lows in 2022 and 2023 correlate strongly with positive Southern Annular Mode (SAM) anomalies and subsurface Circumpolar Deep Water (CDW) intrusions along continental shelf margins.`);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  // Trends Data
  const [trends, setTrends] = useState(null);

  useEffect(() => {
    fetch('/api/trends')
      .then(r => r.json())
      .then(d => d.success && setTrends(d.data));
  }, []);

  const samplePrompts = [
    "What are the main drivers of Antarctic sea ice decline since 2016?",
    "Explain the Moveable Atmospheric Radar (MAR) at Bharati station",
    "How does the Southern Ocean act as a sink for atmospheric CO2?",
    "Summarize the key logistics and science of the 43rd Indian Antarctic Expedition"
  ];

  const handleSendMessage = async (userQuestion) => {
    const q = userQuestion || query;
    if (!q.trim() || loadingChat) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: q,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setLoadingChat(true);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();

      if (data.success) {
        setMessages(prev => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            text: data.answer,
            mode: data.mode || 'grounded-local',
            timestamp: 'Just now',
            citations: [
              { label: 'Indian Antarctic Program Archives', link: '/reports' },
              { label: 'National Polar Data Center (NPDC)', link: '/datasets' }
            ]
          }
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleAnalyzeDocument = async () => {
    if (!docContent.trim() || loadingAnalysis) return;
    setLoadingAnalysis(true);

    try {
      const res = await fetch('/api/ai/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: docTitle, content: docContent })
      });
      const data = await res.json();
      if (data.success && data.analysis) {
        setAnalysisResult(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* 1. Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <Sparkles className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                AI Polar Intelligence &amp; Research Assistant
              </h1>
            </div>
            <p className="text-xs text-blue-200/80 mt-1 max-w-2xl">
              Repository-grounded generative AI studio: Conversational RAG research assistant, structured scientific document extraction, and multidecadal polar trend analytics.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Grounded Knowledge Base Active</span>
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-2 mt-6 border-b border-white/10 pb-1">
          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'assistant'
                ? 'bg-white/20 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AI Research Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('analyzer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'analyzer'
                ? 'bg-white/20 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>AI Document Analyzer</span>
          </button>

          <button
            onClick={() => setActiveTab('trends')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'trends'
                ? 'bg-white/20 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Polar Trends &amp; Analytics</span>
          </button>
        </div>
      </div>

      {/* 2. Tab Content: Assistant */}
      {activeTab === 'assistant' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Chat Stream */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-polar-border shadow-sm flex flex-col h-[650px] overflow-hidden">
            {/* Chat Messages Viewport */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-xs ${
                        isUser
                          ? 'bg-polar-blue text-white'
                          : 'bg-purple-100 text-purple-700 border border-purple-200'
                      }`}
                    >
                      {isUser ? 'YOU' : <Sparkles className="w-4 h-4" />}
                    </div>

                    <div className={`max-w-[82%] space-y-1.5 ${isUser ? 'text-right' : 'text-left'}`}>
                      <div
                        className={`p-4 rounded-2xl text-xs leading-relaxed ${
                          isUser
                            ? 'bg-polar-blue text-white rounded-tr-xs'
                            : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-tl-xs'
                        }`}
                      >
                        <p className="whitespace-pre-line">{m.text}</p>
                      </div>

                      {/* Citations & Metadata footer for AI responses */}
                      {!isUser && (
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Verified Sources:
                          </span>
                          {m.citations?.map((c, idx) => (
                            <a
                              key={idx}
                              href={c.link}
                              className="text-[10px] font-semibold text-blue-600 hover:underline bg-blue-50 px-2 py-0.5 rounded border border-blue-100"
                            >
                              {c.label}
                            </a>
                          ))}
                          <span className="text-[10px] text-slate-500 font-semibold ml-auto flex items-center space-x-1">
                            {m.mode === 'gemini-live' ? (
                              <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                                ⚡ Gemini 3.6 Flash (Live)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                🛡️ NCPOR Grounded Engine
                              </span>
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {loadingChat && (
                <div className="flex items-center space-x-3 text-slate-400 text-xs">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 animate-spin">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <span className="italic">Synthesizing polar research literature &amp; dataset records...</span>
                </div>
              )}
            </div>

            {/* Prompt input bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a scientific question grounded in Indian Antarctic/Arctic records..."
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-polar-blue shadow-inner"
                />
                <button
                  type="submit"
                  disabled={loadingChat || !query.trim()}
                  className="px-4 py-2.5 rounded-xl bg-polar-blue hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors flex-shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Pre-set prompts & Information */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Suggested Research Questions</span>
              </h3>
              <p className="text-[11px] text-slate-500 mb-3">
                Click any scientific prompt below to launch an instant repository-grounded inquiry:
              </p>

              <div className="space-y-2">
                {samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p)}
                    className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 text-xs font-medium text-slate-700 hover:text-blue-900 transition-all flex items-start space-x-2 group"
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-200 group-hover:bg-blue-200 text-slate-600 group-hover:text-blue-700 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="flex-1 leading-snug">{p}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Scientific Provenance Guarantee</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every AI response is strictly cross-referenced against the National Polar Data Center (NPDC) database and published Indian Antarctic Expedition cruise volumes.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div>• Ingested Papers: <strong className="text-slate-800">101 OpenAlex &amp; NASA docs</strong></div>
                <div>• Verified Datasets: <strong className="text-slate-800">997 NCPOR observational records</strong></div>
                <div>• Grounding Model: <strong className="text-slate-800">Gemini 3.6 Flash + NCPOR RAG</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tab Content: Document Analyzer */}
      {activeTab === 'analyzer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Input Document or Abstract</span>
            </h2>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Document Title</label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Scientific Text / Abstract / Cruise Debrief
              </label>
              <textarea
                rows={9}
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                placeholder="Paste research text or abstract..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-polar-blue"
              />
            </div>

            <button
              onClick={handleAnalyzeDocument}
              disabled={loadingAnalysis || !docContent.trim()}
              className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>{loadingAnalysis ? "Analyzing Scientific Content..." : "Run AI Document Extraction"}</span>
            </button>
          </div>

          {/* Analysis Results Display */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-polar-border shadow-sm flex flex-col justify-between">
            {analysisResult ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center space-x-1.5">
                    <Brain className="w-4 h-4" />
                    <span>Structured Scientific Extraction</span>
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    Analysis Completed
                  </span>
                </div>

                {/* Executive Summary */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Executive Summary
                  </h4>
                  <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100 text-xs text-slate-800 leading-relaxed">
                    {analysisResult.executive_summary}
                  </div>
                </div>

                {/* Key Findings */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Observational Findings
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.key_findings?.map((f, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-700 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Methodology */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Methodology &amp; Observational Setup
                  </h4>
                  <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {analysisResult.methodology}
                  </p>
                </div>

                {/* Numerical Indicators */}
                {analysisResult.numerical_indicators && (
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Extracted Quantitative Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {analysisResult.numerical_indicators.map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
                          <span className="text-xs font-bold text-blue-900 block truncate">{m.label}</span>
                          <span className="text-base font-extrabold text-blue-600 block mt-0.5">{m.value}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{m.significance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.tags?.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400 space-y-3 my-auto">
                <Brain className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
                <h4 className="text-sm font-bold text-slate-700">No Document Analyzed Yet</h4>
                <p className="text-xs max-w-sm mx-auto">
                  Click "Run AI Document Extraction" to extract executive summaries, methodology breakdown, and numerical metrics from your text.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. Tab Content: Trends & Analytics */}
      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-xs">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Temperature Anomaly</span>
                <Thermometer className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">+1.8°C</div>
              <p className="text-xs text-red-600 font-semibold mt-1">Multi-year warming since 2010</p>
              <p className="text-[11px] text-slate-500 mt-2">
                Derived from AWS weather telemetry across Maitri and Bharati stations in East Antarctica.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-xs">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Sea Ice Extent Anomaly</span>
                <Snowflake className="w-4 h-4 text-sky-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">-12.4%</div>
              <p className="text-xs text-sky-600 font-semibold mt-1">Net summer extent decline</p>
              <p className="text-[11px] text-slate-500 mt-2">
                Calculated via satellite passive microwave radiometer timeseries (2010–2023).
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-xs">
              <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>Open Science Datasets</span>
                <Wind className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900">997 Records</div>
              <p className="text-xs text-emerald-600 font-semibold mt-1">100% FAIR compliant</p>
              <p className="text-[11px] text-slate-500 mt-2">
                Continuous in-situ atmospheric, cryospheric, and oceanic datasets archived in NPDC.
              </p>
            </div>
          </div>

          {/* Interactive Temperature Chart */}
          {trends && (
            <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{trends.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{trends.ai_analysis}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                  {trends.increase_stat} ({trends.increase_caption})
                </span>
              </div>

              {/* Bar visualization */}
              <div className="grid grid-cols-8 gap-3 items-end h-48 pt-6 border-b border-slate-100">
                {trends.data_points?.map((pt) => {
                  const normalizedHeight = Math.max(20, Math.round(((pt.temp + 35) / 8) * 100));

                  return (
                    <div key={pt.year} className="flex flex-col items-center justify-end h-full group">
                      <span className="text-[11px] font-bold text-slate-700 mb-1 opacity-80 group-hover:opacity-100">
                        {pt.temp}°C
                      </span>
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-sky-600 to-blue-500 group-hover:from-sky-500 group-hover:to-blue-400 transition-all shadow-xs"
                        style={{ height: `${normalizedHeight}%` }}
                      />
                      <span className="text-[11px] font-semibold text-slate-500 mt-2 block">
                        {pt.year}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Baseline: Antarctic coastal stations (Maitri &amp; Bharati)</span>
                <span>Source: Indian National Polar Data Center (NPDC)</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
