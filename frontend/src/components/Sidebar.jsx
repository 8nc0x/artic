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
  Info,
  Thermometer,
  ChevronRight
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
      badge: '3.5k+',
      description: 'Datasets, Papers & Expeditions'
    },
    {
      to: '/ai-assistant',
      label: 'AI Polar Assistant',
      icon: Sparkles,
      badge: 'Live AI',
      badgeColor: 'bg-purple-100 text-purple-700 border border-purple-200',
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
    { name: 'Himadri', region: 'Arctic (78°N)', temp: '-8°C', color: 'bg-emerald-500' },
    { name: 'Bharati', region: 'Antarctica (69°S)', temp: '-19°C', color: 'bg-emerald-500' },
    { name: 'Maitri', region: 'Antarctica (70°S)', temp: '-22°C', color: 'bg-emerald-500' },
    { name: 'IndARC', region: 'Kongsfjorden Fjord', temp: '+1.4°C', color: 'bg-sky-500' }
  ];

  return (
    <aside className="w-64 bg-white/95 border-r border-slate-200/80 flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] select-none">
      {/* Primary 5 Pillars */}
      <div className="p-3.5 space-y-1.5">
        <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          Navigation
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative flex items-start space-x-3 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50/90 text-blue-900 font-bold shadow-xs border border-blue-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/90 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left Active Glow Pill */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full shadow-xs" />
                  )}

                  <div
                    className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between">
                      <span className="truncate tracking-tight font-medium text-slate-900">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ml-1.5 ${
                            item.badgeColor || 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] truncate text-slate-400 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Live Observatories Mission Telemetry Box */}
      <div className="mt-4 px-3.5 py-3 border-t border-slate-100 bg-slate-50/40">
        <div className="flex items-center justify-between px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
          <div className="flex items-center space-x-1.5">
            <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
            <span className="text-slate-600">Telemetry</span>
          </div>
          <span className="text-[9px] text-emerald-700 font-bold bg-emerald-100/80 px-1.5 py-0.2 rounded-full">
            All 4 Online
          </span>
        </div>

        <div className="space-y-1.5 mt-2">
          {stations.map((st) => (
            <div
              key={st.name}
              className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs text-[11px] hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${st.color} animate-ping`} />
                <span className="font-semibold text-slate-800">{st.name}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] text-slate-400 font-normal">{st.region}</span>
                <span className="text-[9px] font-mono font-bold text-sky-700 bg-sky-50 px-1 py-0.2 rounded">
                  {st.temp}
                </span>
              </div>
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
                  : 'text-slate-600 hover:text-amber-900 hover:bg-amber-50/60'
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
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/70'
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
