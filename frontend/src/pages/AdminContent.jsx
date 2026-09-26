import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Archive,
  Edit,
  Eye,
  Plus,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  GraduationCap,
  Share2,
  MoreVertical
} from 'lucide-react';

export default function AdminContent() {
  const [selectedType, setSelectedType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogAction, setDialogAction] = useState(null); // { type: 'publish'|'unpublish'|'archive', item: {...} }
  const [toastMessage, setToastMessage] = useState(null);

  const [contentList, setContentList] = useState([
    {
      id: 'c-1',
      title: 'Decadal Variations in Southern Ocean Sea-Ice Extent',
      type: 'RESEARCH',
      author: 'Dr. Ramesh Sengupta',
      date: '24 Sep 2026',
      status: 'PUBLISHED',
      views: 1420
    },
    {
      id: 'c-2',
      title: 'New High-Resolution Weather Radar Installed at Bharati',
      type: 'NEWS',
      author: 'Atmospheric Physics Wing',
      date: '24 Sep 2026',
      status: 'PUBLISHED',
      views: 890
    },
    {
      id: 'c-3',
      title: 'Preliminary Report: 44th IAE Basal Ice Melt Observations',
      type: 'RESEARCH',
      author: 'Dr. Ramesh Sengupta',
      date: '26 Sep 2026',
      status: 'PENDING_REVIEW',
      views: 12
    },
    {
      id: 'c-4',
      title: 'Indian Polar Science Congress (IPSC 2026)',
      type: 'EVENT',
      author: 'NCPOR Secretariat',
      date: '15 Oct 2026',
      status: 'PUBLISHED',
      views: 2150
    },
    {
      id: 'c-5',
      title: 'Deep Glacial Lake Outburst Flood (GLOF) Vulnerability Modeling',
      type: 'LEARNING',
      author: 'Himansh Research Cell',
      date: '18 Sep 2026',
      status: 'PUBLISHED',
      views: 640
    },
    {
      id: 'c-6',
      title: 'Maitri Station Winter Blizzard Time-Lapse',
      type: 'MEDIA',
      author: 'Media Dissemination Team',
      date: '12 Sep 2026',
      status: 'PUBLISHED',
      views: 4300
    },
    {
      id: 'c-7',
      title: 'Draft Post: Swachh Sagar 5.0 Beach Clean-up Campaign',
      type: 'SOCIAL',
      author: 'AI Social Studio',
      date: '26 Sep 2026',
      status: 'DRAFT',
      views: 0
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const executeAction = () => {
    if (!dialogAction) return;
    const { type, item } = dialogAction;

    let newStatus = item.status;
    if (type === 'publish') newStatus = 'PUBLISHED';
    else if (type === 'unpublish') newStatus = 'DRAFT';
    else if (type === 'archive') newStatus = 'ARCHIVED';

    setContentList(prev =>
      prev.map(c => (c.id === item.id ? { ...c, status: newStatus } : c))
    );

    showToast(`Content item "${item.title.substring(0, 30)}..." updated to ${newStatus}.`);
    setDialogAction(null);
  };

  const filteredContent = contentList.filter(item => {
    const matchesType = selectedType === 'ALL' || item.type === selectedType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PUBLISHED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">Published</span>;
      case 'PENDING_REVIEW':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">Pending Review</span>;
      case 'DRAFT':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">Draft</span>;
      case 'ARCHIVED':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">Archived</span>;
      default:
        return null;
    }
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

      {/* Page Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-2 border border-slate-700">
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Content Repository Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Content Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Author, review, publish, and archive research papers, news dispatches, events, media, and learning content.
          </p>
        </div>

        <button
          onClick={() => showToast('New content draft creation initialized.')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Content</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Content' },
            { id: 'RESEARCH', label: 'Research' },
            { id: 'NEWS', label: 'News' },
            { id: 'EVENT', label: 'Events' },
            { id: 'MEDIA', label: 'Media' },
            { id: 'LEARNING', label: 'Learning' },
            { id: 'SOCIAL', label: 'Social' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedType === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search content..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Title & Type</th>
                <th className="px-6 py-3.5">Author / Wing</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredContent.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-sm line-clamp-1">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Type: {item.type} • ID: {item.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-300">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {item.status !== 'PUBLISHED' && (
                        <button
                          onClick={() => setDialogAction({ type: 'publish', item })}
                          className="p-1.5 rounded-lg bg-emerald-950/80 text-emerald-400 hover:bg-emerald-900 border border-emerald-800 text-[11px] font-bold"
                          title="Publish"
                        >
                          Publish
                        </button>
                      )}
                      {item.status === 'PUBLISHED' && (
                        <button
                          onClick={() => setDialogAction({ type: 'unpublish', item })}
                          className="p-1.5 rounded-lg bg-amber-950/80 text-amber-400 hover:bg-amber-900 border border-amber-800 text-[11px] font-bold"
                          title="Unpublish to Draft"
                        >
                          Unpublish
                        </button>
                      )}
                      <button
                        onClick={() => setDialogAction({ type: 'archive', item })}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700 text-[11px]"
                        title="Archive"
                      >
                        <Archive className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {dialogAction && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 shadow-2xl space-y-4 text-left">
            <div className="flex items-center space-x-3 text-amber-400">
              <div className="p-2.5 rounded-2xl bg-amber-950 border border-amber-800">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Confirm Content Action
                </h3>
                <p className="text-xs text-slate-400 capitalize">Action: {dialogAction.type}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to <strong>{dialogAction.type}</strong> "
              <span className="text-white font-bold">{dialogAction.item.title}</span>"?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDialogAction(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
