import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Database,
  Users,
  CheckCircle2,
  BarChart3,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function AdminLayout() {
  const adminNavLinks = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/content', label: 'Content Management', icon: FileText },
    { to: '/admin/datasets', label: 'Dataset Registry', icon: Database },
    { to: '/admin/users', label: 'User & RBAC', icon: Users },
    { to: '/admin/ai-approval', label: 'AI Review & Approval', icon: CheckCircle2, badge: '3 Pending' },
    { to: '/admin/analytics', label: 'Platform Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="h-0.5 w-full bg-gradient-to-r from-red-500 via-amber-400 to-blue-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/admin" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-base tracking-tight text-white font-heading">
                    NCPOR Admin
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                    Staff Portal
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">Governance &amp; Scientific Review Console</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Portal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Navigation Pills */}
      <div className="bg-slate-900 border-b border-slate-800/80 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-2.5 scrollbar-none">
            {adminNavLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Admin Minimal Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        NCPOR Scientific Knowledge Administration Console • Confidential &amp; Role-Protected Access
      </footer>
    </div>
  );
}
