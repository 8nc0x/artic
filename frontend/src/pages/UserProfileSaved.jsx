import React, { useState, useEffect } from 'react';
import {
  User,
  Bookmark,
  Clock,
  Trash2,
  ExternalLink,
  BookOpen,
  Database,
  Compass,
  Image as ImageIcon,
  Share2,
  ShieldCheck,
  Award,
  Tag,
  Download,
  Mail,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserProfileSaved({ currentUser }) {
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'history' | 'profile'
  const [savedItems, setSavedItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/api/users/me')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data) {
          setProfile(d.data);
          setSavedItems(d.data.saved_items || []);
          setHistory(d.data.history || []);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleRemoveSaved = async (id) => {
    try {
      await fetch(`/api/users/me/saved/${id}`, { method: 'DELETE' });
      setSavedItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearHistory = async () => {
    try {
      await fetch('/api/users/me/history', { method: 'DELETE' });
      setHistory([]);
    } catch (err) {
      console.error(err);
    }
  };

  const currentDisplayUser = currentUser || profile || {
    name: "Dr. Viraj Jadhav",
    role: "Polar Scientist",
    institution: "National Centre for Polar and Ocean Research (NCPOR)",
    department: "Cryosphere & Glaciology Division",
    email: "viraj.jadhav@ncpor.res.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    expeditions_participated: ["41st IAE", "43rd IAE"],
    research_interests: ["Sea Ice Dynamics", "Ice Shelf Cavity Circulation", "Remote Sensing", "Southern Annular Mode"]
  };

  const getItemIcon = (type) => {
    switch (type) {
      case 'dataset': return <Database className="w-4 h-4 text-emerald-600" />;
      case 'publication': return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'report': return <Compass className="w-4 h-4 text-blue-600" />;
      case 'media': return <ImageIcon className="w-4 h-4 text-purple-600" />;
      default: return <Bookmark className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-16 text-left max-w-5xl mx-auto">
      {/* 1. Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-polar-border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <img
            src={currentDisplayUser.avatar}
            alt={currentDisplayUser.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-50 shadow-md flex-shrink-0"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {currentDisplayUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {currentDisplayUser.role}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium mt-1">
              {currentDisplayUser.institution} • {currentDisplayUser.department}
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
              <span className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentDisplayUser.email}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Verified Polar Researcher ID: #NCPOR-8941</span>
              </span>
            </div>
          </div>
        </div>

        {/* Expeditions count & quick stat */}
        <div className="flex items-center space-x-6 md:border-l md:border-slate-100 md:pl-6">
          <div className="text-center">
            <span className="text-2xl font-extrabold text-slate-900 block">{savedItems.length}</span>
            <span className="text-[11px] text-slate-400 font-medium">Saved Items</span>
          </div>
          <div className="text-center">
            <span className="text-2xl font-extrabold text-polar-blue block">2</span>
            <span className="text-[11px] text-slate-400 font-medium">Expeditions</span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'saved'
              ? 'bg-polar-blue text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved Research ({savedItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'history'
              ? 'bg-polar-blue text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Browsing &amp; Query History</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
            activeTab === 'profile'
              ? 'bg-polar-blue text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Research Interests &amp; Credentials</span>
        </button>
      </div>

      {/* 3. Tab Content: Saved Items */}
      {activeTab === 'saved' && (
        <div className="space-y-3">
          {savedItems.length > 0 ? (
            savedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-polar-border shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0">
                    {getItemIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-400">Saved {item.saved_at || 'Recently'}</span>
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Link
                    to={item.type === 'dataset' ? `/datasets/${item.id}` : item.type === 'report' ? '/reports' : `/publications/${item.id}`}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                    title="Open Resource"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleRemoveSaved(item.id)}
                    title="Remove from bookmarks"
                    className="p-2 rounded-xl border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
              <Bookmark className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5] mb-2" />
              <h4 className="text-xs font-bold text-slate-700">No Saved Items</h4>
              <p className="text-xs mt-0.5">Click the bookmark icon on any publication or dataset to save it here.</p>
            </div>
          )}
        </div>
      )}

      {/* 4. Tab Content: History */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-polar-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Explorations &amp; Queries</h3>
              <p className="text-xs text-slate-500 mt-0.5">Quickly resume your past polar research queries</p>
            </div>

            {history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-bold transition-colors"
              >
                Clear History
              </button>
            )}
          </div>

          <div className="space-y-2">
            {history.map((h) => (
              <Link
                key={h.id}
                to={h.path}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-slate-400 group-hover:text-polar-blue" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 group-hover:text-polar-blue block">
                      {h.query}
                    </span>
                    <span className="text-[10px] text-slate-400">{h.path}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">{h.timestamp}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. Tab Content: Profile & Interests */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Tag className="w-4 h-4 text-polar-blue" />
              <span>Specialized Research Domains</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {(currentDisplayUser.research_interests || []).map((domain) => (
                <span key={domain} className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-polar-blue font-bold text-xs">
                  {domain}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Expedition Deployment Records</span>
            </h3>

            <div className="space-y-2">
              {(currentDisplayUser.expeditions_participated || ['41st Indian Antarctic Expedition', '43rd Indian Antarctic Expedition']).map((exp, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{exp}</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[10px]">
                    Successfully Completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
