import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Edit3,
  Eye,
  AlertTriangle,
  Clock,
  BookOpen,
  Share2,
  Newspaper,
  Bot,
  Check,
  X,
  ShieldCheck
} from 'lucide-react';

export default function AdminAIApproval() {
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Item being reviewed / edited
  const [editDraftContent, setEditDraftContent] = useState('');
  const [confirmationAction, setConfirmationAction] = useState(null); // { type: 'approve'|'reject', item: {...} }

  const [aiQueue, setAiQueue] = useState([
    {
      id: 'ai-rev-1',
      title: 'Scientific Summary: 44th IAE Terminus Ablation Survey',
      type: 'RESEARCH_SUMMARY',
      model: 'Groq / llama-3.3-70b-versatile',
      source: '44th_IAE_Field_Report_Bharati.pdf',
      generatedAt: 'Today, 10:15 AM',
      status: 'PENDING_REVIEW',
      content: 'This report details the glacio-meteorological regime surveyed during the 44th Indian Antarctic Expedition at Bharati Station. Terminus ablation rates and ice-shelf cavity melt dynamics were monitored using dual-frequency radar and acoustic Doppler profilers. Key findings indicate a 3.4% reduction in seasonal sea-ice buttressing along the Prydz Bay sector.'
    },
    {
      id: 'ai-rev-2',
      title: 'Dissemination Dispatch: New Weather Radar Commissioned at Bharati',
      type: 'NEWS_ARTICLE',
      model: 'Groq / llama-3.3-70b-versatile',
      source: 'MoES Press Release & NCPOR Atmospheric Bulletin',
      generatedAt: 'Yesterday, 03:40 PM',
      status: 'PENDING_REVIEW',
      content: 'GOA / LARSEMANN HILLS — NCPOR atmospheric physicists have completed commissioning of the high-resolution micro-rain radar at Bharati Station. The system operates continuously to log blizzard nucleation, snowfall precipitation rates, and boundary-layer turbulence over East Antarctica.'
    },
    {
      id: 'ai-rev-3',
      title: 'Multi-Channel Social Post: IndARC Arctic Mooring Telemetry',
      type: 'SOCIAL_POST',
      model: 'Groq / mixtral-8x7b-32768',
      source: 'IndARC_Kongsfjorden_CTD_2026.csv',
      generatedAt: '2 days ago',
      status: 'PENDING_REVIEW',
      content: 'Exploring Svalbard Arctic fjords with India’s IndARC observatory! 🌊❄️ Year-round sensor depth telemetry at 192m depth reveals changing Atlantic Water intrusions. Open access data available on the National Polar Data Center portal. #NCPOR #IndARC #ArcticResearch #Oceanography'
    },
    {
      id: 'ai-rev-4',
      title: 'Smart Education Concept: Polar Jet Stream and Sea Ice Teleconnections',
      type: 'LEARNING_NOTE',
      model: 'Groq / llama-3.3-70b-versatile',
      source: 'IPSC 2026 Colloquium Notes',
      generatedAt: '3 days ago',
      status: 'APPROVED',
      content: 'The Southern Annular Mode (SAM) represents the dominant mode of atmospheric variability in the Southern Hemisphere extratropics. A positive SAM phase intensifies circumpolar westerlies, driving anomalous Ekman divergence and ice transport.'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenReview = (item) => {
    setSelectedItem(item);
    setEditDraftContent(item.content);
  };

  const handleSaveEdit = () => {
    if (!selectedItem) return;
    setAiQueue(prev =>
      prev.map(i => (i.id === selectedItem.id ? { ...i, content: editDraftContent } : i))
    );
    setSelectedItem(prev => ({ ...prev, content: editDraftContent }));
    showToast('AI draft text updated successfully.');
  };

  const executeApprovalOrRejection = () => {
    if (!confirmationAction) return;
    const { type, item } = confirmationAction;
    const newStatus = type === 'approve' ? 'APPROVED' : 'REJECTED';

    setAiQueue(prev =>
      prev.map(i => (i.id === item.id ? { ...i, status: newStatus } : i))
    );

    if (selectedItem?.id === item.id) {
      setSelectedItem(prev => ({ ...prev, status: newStatus }));
    }

    showToast(`AI content "${item.title.substring(0, 30)}..." marked as ${newStatus}.`);
    setConfirmationAction(null);
  };

  return (
    <div className="space-y-6 text-left font-sans text-slate-100">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-3 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-2 border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Governance & Human-in-the-Loop</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            AI Content Review & Approval
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Enforce scientific accuracy before AI-generated summaries, social posts, or news articles are published publicly.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-950 border border-amber-800 text-amber-300 text-xs font-bold flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>
            {aiQueue.filter(i => i.status === 'PENDING_REVIEW').length} Pending Human Review
          </span>
        </div>
      </div>

      {/* Main Review Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left List of AI Generated Drafts */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Pending Approval Queue
          </h3>
          <div className="space-y-2.5">
            {aiQueue.map(item => (
              <div
                key={item.id}
                onClick={() => handleOpenReview(item)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedItem?.id === item.id
                    ? 'bg-slate-800/90 border-blue-500 ring-1 ring-blue-500'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                    item.status === 'APPROVED'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : item.status === 'REJECTED'
                      ? 'bg-rose-950 text-rose-300 border-rose-800'
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {item.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {item.generatedAt}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-1 font-heading">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {item.content}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>{item.type}</span>
                  <span className="text-amber-400 truncate max-w-[120px]">{item.model.split('/')[1]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Inspection & Review Console */}
        <div className="lg:col-span-2">
          {selectedItem ? (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-400 font-mono">
                      {selectedItem.model}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs text-slate-400 font-mono">
                      Source: {selectedItem.source}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white font-heading mt-1">
                    {selectedItem.title}
                  </h2>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setConfirmationAction({ type: 'reject', item: selectedItem })}
                    className="px-3 py-1.5 rounded-xl bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800 text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => setConfirmationAction({ type: 'approve', item: selectedItem })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Publish</span>
                  </button>
                </div>
              </div>

              {/* Editable Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-slate-300">Content Body (Editable before release)</span>
                  <span className="font-mono text-[11px]">{editDraftContent.length} chars</span>
                </div>
                <textarea
                  rows={8}
                  value={editDraftContent}
                  onChange={e => setEditDraftContent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-xs text-slate-200 leading-relaxed font-sans focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                  >
                    Save In-Memory Edits
                  </button>
                </div>
              </div>

              {/* Scientific Verification Checklist */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>NCPOR Scientific Integrity Verification</span>
                </div>
                <ul className="text-[11px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>Context is fully grounded in supplied expedition PDF / sensor logs.</li>
                  <li>Coordinates, station names (Maitri, Bharati, Himadri, Himansh) are authentic.</li>
                  <li>No speculative climate extrapolations outside peer-reviewed MoES parameters.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-12 text-center text-slate-400 space-y-3">
              <Bot className="w-10 h-10 mx-auto text-slate-500" />
              <h4 className="text-sm font-bold text-slate-300">Select an AI draft from the queue</h4>
              <p className="text-xs max-w-sm mx-auto">
                Click on any pending research summary or social post to inspect its source, edit content, and approve publication.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {confirmationAction && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 shadow-2xl space-y-4 text-left">
            <div className="flex items-center space-x-3 text-amber-400">
              <div className="p-2.5 rounded-2xl bg-amber-950 border border-amber-800">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Confirm AI Content Action
                </h3>
                <p className="text-xs text-slate-400 capitalize">Action: {confirmationAction.type}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to <strong>{confirmationAction.type}</strong> this AI-generated scientific output for "
              <span className="text-white font-bold">{confirmationAction.item.title}</span>"?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setConfirmationAction(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeApprovalOrRejection}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors ${
                  confirmationAction.type === 'approve'
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white'
                }`}
              >
                Confirm {confirmationAction.type === 'approve' ? 'Approval' : 'Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
