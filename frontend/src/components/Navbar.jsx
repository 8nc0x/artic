import React, { useState } from 'react';
import { Search, Sparkles, Bell, ChevronDown, CheckCircle, ExternalLink } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ notifications = [], currentUser, onOpenAuthModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('Semantic Search');
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}&type=${searchType}`);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-polar-border shadow-sm">
      <div className="flex items-center justify-between px-6 py-2.5">
        {/* Left: NCPOR Logo & Branding */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-600 to-blue-800 p-0.5 shadow-sm flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
              <span className="font-extrabold text-blue-900 text-xs tracking-tighter">NCPOR</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-polar-blue transition-colors">
                NCPOR
              </span>
              <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wide bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                MoES Portal
              </span>
            </div>
            <p className="text-[11px] leading-tight text-slate-500 font-medium hidden md:block">
              National Centre for Polar and Ocean Research • Ministry of Earth Sciences
            </p>
          </div>
        </Link>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-2xl mx-6">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <div className="relative w-full flex items-center bg-slate-50 hover:bg-slate-100/80 focus-within:bg-white rounded-full border border-slate-200 focus-within:border-polar-blue focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-inner">
              <Search className="w-4 h-4 text-slate-400 ml-3.5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search across reports, datasets, publications, expeditions, people and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />

              {/* Search Type Dropdown Toggle */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTypeMenu(!showTypeMenu)}
                  className="flex items-center space-x-1 px-3 py-1 mr-1.5 my-1 rounded-full bg-white hover:bg-slate-50 text-purple-700 border border-purple-200/80 text-xs font-semibold shadow-sm transition-all whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>{searchType}</span>
                  <ChevronDown className="w-3 h-3 text-purple-400" />
                </button>

                {showTypeMenu && (
                  <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 text-xs font-medium animate-fadeIn">
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
                      onClick={() => { setSearchType('AI Search'); setShowTypeMenu(false); }}
                      className={`w-full text-left px-3 py-2 flex items-center space-x-2 hover:bg-blue-50 ${searchType === 'AI Search' ? 'text-blue-700 font-bold bg-blue-50/50' : 'text-slate-700'}`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>AI Search</span>
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

        {/* Right: Notifications, Admin Quick Link & User Profile */}
        <div className="flex items-center space-x-3">
          {/* Admin badge if admin */}
          {currentUser?.role_type === 'admin' && (
            <Link
              to="/admin"
              className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Admin Hub</span>
            </Link>
          )}

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full animate-pulse">
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

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <Link
                      key={n.id}
                      to="/notifications"
                      onClick={() => setShowNotifMenu(false)}
                      className="block p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors text-xs flex items-start space-x-2 text-left"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-slate-800 leading-tight">{n.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{n.description}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{n.timestamp}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip (Click to open Auth / Persona Switcher) */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <button
              onClick={onOpenAuthModal}
              title="Click to Switch Persona or Log In"
              className="flex items-center space-x-2.5 p-1 rounded-xl hover:bg-slate-50 transition-colors text-left group"
            >
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"}
                alt={currentUser?.name || "User"}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-100 group-hover:ring-polar-blue transition-all"
              />
              <div className="hidden lg:block text-left leading-tight">
                <span className="block text-xs font-bold text-slate-800 group-hover:text-polar-blue transition-colors">
                  {currentUser?.name || "Dr. Viraj Jadhav"}
                </span>
                <span className="block text-[10px] text-slate-500 font-medium truncate max-w-[130px]">
                  {currentUser?.role || "Polar Scientist"}
                </span>
              </div>
            </button>

            <Link
              to="/profile"
              title="Open My Saved Research & Profile"
              className="hidden md:flex p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-xs transition-colors"
            >
              Saved
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

