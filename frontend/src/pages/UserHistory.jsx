import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  Trash2,
  ExternalLink,
  BookOpen,
  Database,
  Newspaper,
  Calendar,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  AlertTriangle,
  X,
  Search,
  Filter
} from 'lucide-react';

export default function UserHistory() {
  const [filterType, setFilterType] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearDialog, setShowClearDialog] = useState(false);

  // Initial scientific browsing history items
  const [historyItems, setHistoryItems] = useState([
    {
      id: 'hist-1',
      title: 'Decadal Variations in Southern Ocean Sea-Ice Extent',
      type: 'RESEARCH',
      typeLabel: 'Research Paper',
      url: '/explore',
      viewedAt: '10 minutes ago',
      timestamp: 'Today, 11:42 AM',
      snippet: 'Breakthrough multi-sensor satellite microwave analysis (2010–2026) documenting ice shelf buttressing dynamics.',
      category: 'Cryosphere'
    },
    {
      id: 'hist-2',
      title: 'Maitri Meteorological Time-Series (Automatic Weather Station)',
      type: 'DATASET',
      typeLabel: 'Dataset',
      url: '/explore',
      viewedAt: '45 minutes ago',
      timestamp: 'Today, 11:07 AM',
      snippet: 'Continuous 10-minute meteorological logs from Schirmacher Oasis: ambient air temperature, barometric pressure, wind vectors.',
      category: 'Meteorology'
    },
    {
      id: 'hist-3',
      title: 'New High-Resolution Weather Radar Installed at Bharati',
      type: 'NEWS',
      typeLabel: 'News Article',
      url: '/explore',
      viewedAt: '2 hours ago',
      timestamp: 'Today, 09:30 AM',
      snippet: 'NCPOR atmospheric physicists complete commissioning of the micro-rain radar to track Antarctic blizzard nucleation.',
      category: 'Expedition News'
    },
    {
      id: 'hist-4',
      title: 'Indian Polar Science Congress (IPSC 2026)',
      type: 'EVENT',
      typeLabel: 'Conference',
      url: '/outreach',
      viewedAt: 'Yesterday',
      timestamp: 'Yesterday, 04:15 PM',
      snippet: 'National symposium hosted at NCPOR Goa featuring over 180 oral papers on Arctic-Antarctic teleconnections.',
      category: 'Outreach'
    },
    {
      id: 'hist-5',
      title: 'Subglacial Lake Vostok Biogeochemistry & Drill Cores',
      type: 'LEARN',
      typeLabel: 'Learning Module',
      url: '/learn',
      viewedAt: '2 days ago',
      timestamp: '25 Sep 2026, 02:20 PM',
      snippet: 'Deep exploration of subglacial accreted ice cores, extremophile microbial genomics, and planetary analog studies.',
      category: 'Education'
    },
    {
      id: 'hist-6',
      title: 'Kongsfjorden Fjord Hydrographic CTD Depth Profiles',
      type: 'DATASET',
      typeLabel: 'Dataset',
      url: '/explore',
      viewedAt: '3 days ago',
      timestamp: '24 Sep 2026, 06:10 PM',
      snippet: 'Moored instrument sensor time-series recording temperature, salinity, turbidity, and deep currents at 192m depth.',
      category: 'Oceanography'
    },
    {
      id: 'hist-7',
      title: '44th Indian Antarctic Expedition Departs for Southern Ocean',
      type: 'NEWS',
      typeLabel: 'News Article',
      url: '/explore',
      viewedAt: '4 days ago',
      timestamp: '23 Sep 2026, 10:45 AM',
      snippet: 'Chartered ice-class resupply vessel sets sail from Cape Town carrying scientific teams and deep-drilling equipment.',
      category: 'Expedition News'
    }
  ]);

  const handleClearHistory = () => {
    setHistoryItems([]);
    setShowClearDialog(false);
  };

  const handleRemoveSingle = (id) => {
    setHistoryItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredHistory = historyItems.filter(item => {
    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'RESEARCH':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'DATASET':
        return <Database className="w-4 h-4 text-emerald-600" />;
      case 'NEWS':
        return <Newspaper className="w-4 h-4 text-amber-600" />;
      case 'EVENT':
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case 'LEARN':
        return <GraduationCap className="w-4 h-4 text-sky-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'RESEARCH':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'DATASET':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'NEWS':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'EVENT':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'LEARN':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 text-left font-sans">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5 text-blue-600" />
            <span>Activity Trail</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Browsing History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological log of scientific papers, datasets, news, events, and education topics you have inspected.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={() => setShowClearDialog(true)}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All History' },
            { id: 'RESEARCH', label: 'Papers' },
            { id: 'DATASET', label: 'Datasets' },
            { id: 'NEWS', label: 'News' },
            { id: 'EVENT', label: 'Events' },
            { id: 'LEARN', label: 'Learn' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                filterType === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in history..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-2xs space-y-3">
          <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <History className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 font-heading">No history items found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {historyItems.length === 0
              ? 'Your browsing history is empty. Content you inspect across the portal will be logged here.'
              : 'No items match your active filter and search keywords.'}
          </p>
          {historyItems.length === 0 && (
            <Link
              to="/explore"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold mt-2"
            >
              <span>Explore Research & Datasets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex items-start justify-between gap-4 group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex-shrink-0 mt-0.5">
                  {getTypeIcon(item.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getTypeBadgeClass(item.type)}`}>
                      {item.typeLabel}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.viewedAt}</span>
                    </span>
                  </div>

                  <Link
                    to={item.url}
                    className="block text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading"
                  >
                    {item.title}
                  </Link>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.snippet}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    Recorded: {item.timestamp}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 flex-shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                <Link
                  to={item.url}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors"
                  title="Open Resource"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleRemoveSingle(item.id)}
                  className="p-2 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Remove from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Dialog for Clear History */}
      {showClearDialog && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4 animate-scaleUp text-left">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-2.5 rounded-2xl bg-rose-50 border border-rose-200">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Clear All Browsing History?
                </h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently erase your polar science browsing history? Your saved items and account settings will remain unaffected.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowClearDialog(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
