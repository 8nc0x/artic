import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Database,
  Sparkles,
  Share2,
  Megaphone,
  Radio,
  ShieldCheck,
  Info
} from 'lucide-react';

export default function Sidebar({ currentUser }) {
  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: Home,
      description: 'Discovery & Overview'
    },
    {
      to: '/datasets',
      label: 'Knowledge Repository',
      icon: Database,
      badge: '3.5k+ items',
      description: 'Datasets, Papers & Expeditions'
    },
    {
      to: '/ai-assistant',
      label: 'AI Polar Assistant',
      icon: Sparkles,
      badge: 'Live',
      badgeColor: 'bg-purple-100 text-purple-700',
      description: 'LLM Q&A & Summarizer'
    },
    {
      to: '/knowledge-graph',
      label: 'Knowledge Network',
      icon: Share2,
      description: 'Interactive Polar Connections'
    },
    {
      to: '/media',
      label: 'Media & Outreach',
      icon: Megaphone,
      description: 'Gallery, Social Studio & Edu'
    }
  ];

  const stations = [
    { name: 'Himadri', region: 'Arctic (78°N)', status: 'Active', color: 'bg-emerald-500' },
    { name: 'Bharati', region: 'Antarctica (69°S)', status: 'Active', color: 'bg-emerald-500' },
    { name: 'Maitri', region: 'Antarctica (70°S)', status: 'Active', color: 'bg-emerald-500' },
    { name: 'IndARC', region: 'Kongsfjorden Mooring', status: 'Active', color: 'bg-sky-500' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] select-none">
      {/* Primary 5 Pillars */}
      <div className="p-3 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Core Pillars
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group flex items-start space-x-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600 transition-colors'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-1.5 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor || 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[10px] truncate mt-0.5 ${
                        isActive ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Active Polar Observatories Monitor */}
      <div className="mt-4 px-3 py-2 border-t border-slate-100">
        <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span>Live Stations</span>
          </div>
          <span className="text-[9px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
            4 Online
          </span>
        </div>

        <div className="space-y-1 mt-1">
          {stations.map((st) => (
            <div
              key={st.name}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50/70 border border-slate-100 text-[11px]"
            >
              <div className="flex items-center space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${st.color}`} />
                <span className="font-semibold text-slate-700">{st.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-normal">{st.region}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary Bottom Links */}
      <div className="mt-auto p-3 space-y-1 border-t border-slate-100">
        {currentUser?.role_type === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-amber-50 text-amber-900 border border-amber-200'
                  : 'text-slate-500 hover:text-amber-900 hover:bg-amber-50/60'
              }`
            }
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Admin Oversight</span>
          </NavLink>
        )}

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Info className="w-4 h-4 text-slate-400" />
          <span>About NCPOR &amp; MoES</span>
        </NavLink>
      </div>
    </aside>
  );
}
