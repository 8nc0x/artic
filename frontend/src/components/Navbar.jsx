import React, { useState, useEffect } from 'react';
import { Search, Sparkles, Bell, ChevronDown, CheckCircle, ExternalLink, Command, ShieldCheck, Radio } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ notifications = [], currentUser, onOpenAuthModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('Semantic Search');
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const navigate = useNavigate();

  // Listen for Ctrl+K / Cmd+K shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/datasets?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Govt Accent Line (Subtle Indian Tricolor + Arctic Cyan Micro Bar) */}
      <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-sky-400 to-emerald-600" />

      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 max-w-7xl mx-auto w-full">
        {/* Left: Brand Identity */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-indigo-800 p-0.5 shadow-md shadow-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
              <span className="font-extrabold text-white text-xs tracking-wider">
                ❄️
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                NCPOR
              </span>
              <span className="text-[10px] font-bold tracking-wide bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/60 shadow-2xs">
                MoES Portal
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden md:block tracking-tight">
              National Centre for Polar and Ocean Research • Government of India
            </p>
          </div>
        </Link>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-xl mx-4 sm:mx-8">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="relative w-full flex items-center bg-slate-50 hover:bg-slate-100/70 focus-within:bg-white rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-3 focus-within:ring-blue-100 transition-all shadow-2xs">
              <Search className="w-4 h-4 text-slate-400 ml-3.5 flex-shrink-0" />
              <input
                id="global-search-input"
                type="text"
                placeholder="Search datasets, publications, expeditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />

              {/* Shortcut Badge */}
              <div className="hidden sm:flex items-center space-x-1 mr-2 px-1.5 py-0.5 rounded-md bg-slate-200/70 text-slate-500 text-[10px] font-mono font-medium">
                <span>Ctrl</span>
                <span>K</span>
              </div>

              {/* Search Type Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTypeMenu(!showTypeMenu)}
                  className="flex items-center space-x-1 px-2.5 py-1 mr-1.5 rounded-lg bg-white hover:bg-slate-50 text-purple-700 border border-purple-200 text-[11px] font-bold shadow-2xs transition-all whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="hidden md:inline">{searchType}</span>
                  <ChevronDown className="w-3 h-3 text-purple-400" />
                </button>

                {showTypeMenu && (
                  <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-xs font-medium animate-fadeIn">
                    <button
                      type="button"
                      onClick={() => { setSearchType('Semantic Search'); setShowTypeMenu(false); }}
                      className={`w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-purple-50 ${searchType === 'Semantic Search' ? 'text-purple-700 font-bold bg-purple-50/50' : 'text-slate-700'}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Semantic Search</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSearchType('Keyword Search'); setShowTypeMenu(false); }}
                      className={`w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-slate-50 ${searchType === 'Keyword Search' ? 'text-slate-900 font-bold' : 'text-slate-700'}`}
                    >
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                      <span>Keyword Search</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Right: Actions, Notifications & Profile */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-blue-600 rounded-full animate-pulse shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-xs text-slate-800">Notifications</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-bold">
                      {unreadCount} new
                    </span>
                  </div>
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-[11px] text-blue-600 hover:underline font-semibold"
                  >
                    View All
                  </Link>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.slice(0, 4).map((n) => (
                    <Link
                      key={n.id}
                      to="/notifications"
                      onClick={() => setShowNotifMenu(false)}
                      className="block p-2.5 rounded-xl bg-slate-50/70 hover:bg-slate-100 transition-colors text-xs text-left"
                    >
                      <p className="font-semibold text-slate-800 leading-tight">{n.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{n.description}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <button
              onClick={onOpenAuthModal}
              title="Click to Switch Persona or Log In"
              className="flex items-center space-x-2.5 p-1 rounded-xl hover:bg-slate-100/80 transition-colors text-left group"
            >
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
                alt={currentUser?.name || "User"}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-blue-500 transition-all shadow-xs"
              />
              <div className="hidden lg:block text-left leading-tight">
                <span className="block text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {currentUser?.name || "Dr. Viraj Jadhav"}
                </span>
                <span className="block text-[10px] text-slate-500 font-medium truncate max-w-[120px]">
                  {currentUser?.role || "Polar Scientist"}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
