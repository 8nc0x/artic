import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Shield,
  Upload,
  Bell,
  Bookmark,
  History,
  Settings,
  LayoutDashboard,
  Compass,
  Sparkles,
  ChevronDown,
  AlertTriangle
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  
  // Current Role: 'USER' | 'RESEARCHER' | 'ADMIN' | 'GUEST'
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('ncpor_user_role') || 'RESEARCHER';
  });

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Save role changes
  const switchRole = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('ncpor_user_role', newRole);
    localStorage.setItem('ncpor_logged_in', newRole !== 'GUEST' ? 'true' : 'false');
  };

  const handleLogout = () => {
    switchRole('GUEST');
    setShowLogoutDialog(false);
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchFocused(false);
    }
  };

  // Main navigation links per Master Prompt Section 6
  const primaryNavLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/outreach', label: 'Outreach' },
    { to: '/social-media', label: 'Social Media' },
    { to: '/ai', label: 'AI' },
    { to: '/learn', label: 'Learn' },
  ];

  const searchSuggestions = [
    "Antarctic sea ice extent 2026",
    "Maitri Station meteorological trends",
    "Bharati atmospheric observations",
    "Himadri Arctic Svalbard sediment cores",
    "Himalayan glacier mass balance (Himansh)",
    "Southern Ocean carbon uptake"
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        {/* Top MoES Tricolor Accent Line */}
        <div className="h-0.5 w-full bg-gradient-to-r from-orange-500 via-sky-400 to-emerald-600" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2">
            {/* 1. Official NCPOR Brand Identity */}
            <Link to="/" className="flex items-center space-x-2.5 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-indigo-800 p-0.5 shadow-md shadow-blue-500/15 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-base select-none">❄️</span>
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span className="font-black text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                    NCPOR
                  </span>
                  <span className="text-[10px] font-bold tracking-wide bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/80">
                    MoES Portal
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block tracking-tight">
                  National Centre for Polar and Ocean Research • Govt. of India
                </p>
              </div>
            </Link>

            {/* 2. Desktop Primary Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {primaryNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-extrabold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Upload link for Researcher/Admin */}
              {(userRole === 'RESEARCHER' || userRole === 'ADMIN') && (
                <NavLink
                  to="/upload"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5 transition-all ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 font-extrabold shadow-2xs'
                        : 'text-emerald-700 hover:bg-emerald-50/70 border border-emerald-200'
                    }`
                  }
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </NavLink>
              )}
            </nav>

            {/* 3. Global Search, Notifications & Profile Action */}
            <div className="flex items-center space-x-2.5">
              {/* Search input with live suggestion popover */}
              <div className="relative hidden md:block">
                <form onSubmit={handleSearchSubmit}>
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search repository..."
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-36 lg:w-48 xl:w-56 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </form>

                {searchFocused && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setSearchFocused(false)}
                    />
                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-40 text-left">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                        Trending Polar Searches
                      </div>
                      <div className="space-y-0.5">
                        {searchSuggestions.map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              navigate(`/explore?q=${encodeURIComponent(item)}`);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center space-x-2 transition-colors"
                          >
                            <Search className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Notifications Bell */}
              <Link
                to="/notifications"
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow-xs animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown / Auth Menu */}
              {userRole === 'GUEST' ? (
                <button
                  onClick={() => switchRole('RESEARCHER')}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl px-2.5 py-1 transition-all"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-700 to-sky-500 text-white flex items-center justify-center text-[10px] font-black">
                      {userRole === 'ADMIN' ? 'AD' : userRole === 'RESEARCHER' ? 'RS' : 'US'}
                    </div>
                    <div className="text-left hidden sm:block">
                      <div className="text-[11px] font-bold text-slate-800 leading-tight">
                        {userRole === 'ADMIN'
                          ? 'Admin Sharma'
                          : userRole === 'RESEARCHER'
                          ? 'Dr. Sengupta'
                          : 'Research Student'}
                      </div>
                      <div className="text-[9px] font-semibold text-blue-700 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {userRole}
                      </div>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 z-50 text-left animate-fadeIn">
                      {/* User Header */}
                      <div className="px-3 py-2 border-b border-slate-100">
                        <div className="text-xs font-bold text-slate-900">
                          {userRole === 'ADMIN'
                            ? 'Admin System Lead'
                            : userRole === 'RESEARCHER'
                            ? 'Dr. Ramesh Sengupta'
                            : 'Ananya Mukherjee'}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {userRole === 'ADMIN'
                            ? 'admin@ncpor.res.in'
                            : userRole === 'RESEARCHER'
                            ? 'r.sengupta@ncpor.res.in'
                            : 'student@iisc.ac.in'}
                        </div>
                        {/* Quick Role Switcher for Demo testing */}
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-slate-400">Switch Role:</span>
                          <div className="flex gap-1">
                            {['USER', 'RESEARCHER', 'ADMIN'].map((r) => (
                              <button
                                key={r}
                                onClick={() => switchRole(r)}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  userRole === r
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                              >
                                {r[0]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1 space-y-0.5 text-xs text-slate-700">
                        <Link
                          to="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        >
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>User Profile</span>
                        </Link>

                        <Link
                          to="/profile/saved"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                          <span>Saved Content</span>
                        </Link>

                        <Link
                          to="/profile/history"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        >
                          <History className="w-3.5 h-3.5 text-slate-400" />
                          <span>History</span>
                        </Link>

                        <Link
                          to="/settings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition-colors"
                        >
                          <Settings className="w-3.5 h-3.5 text-slate-400" />
                          <span>Settings</span>
                        </Link>

                        {/* Researcher Upload */}
                        {(userRole === 'RESEARCHER' || userRole === 'ADMIN') && (
                          <Link
                            to="/upload"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors font-semibold"
                          >
                            <Upload className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Upload Expedition Report</span>
                          </Link>
                        )}

                        {/* Admin Console */}
                        {userRole === 'ADMIN' && (
                          <Link
                            to="/admin"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center space-x-2.5 px-3 py-2 rounded-xl bg-rose-50 text-rose-800 hover:bg-rose-100 transition-colors font-semibold"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-rose-600" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}
                      </div>

                      {/* Logout Action */}
                      <div className="pt-1 border-t border-slate-100">
                        <button
                          onClick={() => setShowLogoutDialog(true)}
                          className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors text-xs font-semibold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Hamburger Button */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fadeIn text-left">
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search polar repository..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </form>

            <div className="space-y-1">
              {primaryNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {(userRole === 'RESEARCHER' || userRole === 'ADMIN') && (
                <NavLink
                  to="/upload"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-bold text-emerald-700 bg-emerald-50"
                >
                  Upload Report
                </NavLink>
              )}

              {userRole === 'ADMIN' && (
                <NavLink
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-sm font-bold text-rose-700 bg-rose-50"
                >
                  Admin Console
                </NavLink>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100">
              {userRole === 'GUEST' ? (
                <button
                  onClick={() => {
                    switchRole('RESEARCHER');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Researcher Sign In</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowLogoutDialog(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out ({userRole})</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Logout Confirmation Dialog (Master Prompt Section 19) */}
      {showLogoutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-left">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Are you sure you want to log out?
            </h3>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Your active research session tokens will be revoked and sensitive draft state cleared. You can sign back in anytime.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-xs transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
