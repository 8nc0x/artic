import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Database,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Calendar,
  Building2,
  Sparkles,
  Share2,
  MessageSquare,
  Bell,
  GraduationCap,
  Info,
  ChevronDown,
  ChevronRight,
  Compass,
  ShieldCheck
} from 'lucide-react';

export default function Sidebar({ currentUser }) {
  const [repoOpen, setRepoOpen] = useState(true);
  const [pubSubOpen, setPubSubOpen] = useState(true);
  const location = useLocation();

  const isPubActive = location.pathname.startsWith('/publications');

  return (
    <aside className="w-64 bg-white border-r border-polar-border flex flex-col flex-shrink-0 min-h-[calc(100vh-57px)] select-none">
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-blue-50/80 text-polar-blue font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Home</span>
        </NavLink>

        {/* Polar Knowledge Repository Group */}
        <div>
          <button
            type="button"
            onClick={() => setRepoOpen(!repoOpen)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <Database className="w-4 h-4 text-slate-500" />
              <span>Polar Knowledge Repository</span>
            </div>
            {repoOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          </button>

          {repoOpen && (
            <div className="pl-6 pr-1 py-1 space-y-1">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive ? 'bg-blue-50 text-polar-blue font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Compass className="w-3.5 h-3.5 text-slate-400" />
                <span>Expedition Reports</span>
              </NavLink>

              <NavLink
                to="/datasets"
                className={({ isActive }) =>
                  `flex items-center space-x-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive ? 'bg-blue-50 text-polar-blue font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Database className="w-3.5 h-3.5 text-slate-400" />
                <span>Scientific Datasets</span>
              </NavLink>

              {/* Publications & Research Subtree */}
              <div>
                <NavLink
                  to="/publications"
                  className={({ isActive }) =>
                    `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive || isPubActive
                        ? 'bg-blue-50 text-polar-blue font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>Publications & Research</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </NavLink>

                {pubSubOpen && (
                  <div className="pl-6 py-1 space-y-0.5 border-l border-slate-100 ml-3">
                    <NavLink
                      to="/publications"
                      end
                      className={({ isActive }) =>
                        `block px-2 py-1 text-[11px] rounded transition-colors ${
                          isActive ? 'text-polar-blue font-semibold' : 'text-slate-500 hover:text-slate-800'
                        }`
                      }
                    >
                      All Publications
                    </NavLink>
                    <NavLink
                      to="/publications/sea-ice-variability-2024"
                      className={({ isActive }) =>
                        `block px-2 py-1 text-[11px] rounded transition-colors ${
                          isActive ? 'text-polar-blue font-semibold' : 'text-slate-500 hover:text-slate-800'
                        }`
                      }
                    >
                      Research Papers
                    </NavLink>
                    <NavLink
                      to="/publications?filter=technical"
                      className="block px-2 py-1 text-[11px] rounded text-slate-500 hover:text-slate-800"
                    >
                      Technical Reports
                    </NavLink>
                    <NavLink
                      to="/publications?filter=theses"
                      className="block px-2 py-1 text-[11px] rounded text-slate-500 hover:text-slate-800"
                    >
                      Theses & Dissertations
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Photographs & Videos */}
        <NavLink
          to="/media"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <ImageIcon className="w-4 h-4 text-slate-500" />
          <span>Photographs & Videos</span>
        </NavLink>

        {/* Conferences & Events */}
        <NavLink
          to="/events"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>Conferences & Events</span>
        </NavLink>

        {/* Institutional Activities */}
        <NavLink
          to="/activities"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Building2 className="w-4 h-4 text-slate-500" />
          <span>Institutional Activities</span>
        </NavLink>

        {/* AI Tools & Assistant */}
        <NavLink
          to="/ai-assistant"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-purple-50 text-purple-700 font-bold' : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
            }`
          }
        >
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span>AI Tools & Assistant</span>
        </NavLink>

        {/* Research Connections */}
        <NavLink
          to="/connections"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Share2 className="w-4 h-4 text-slate-500" />
          <span>Research Connections</span>
        </NavLink>

        {/* Social Media Posts */}
        <NavLink
          to="/social-studio"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <MessageSquare className="w-4 h-4 text-slate-500" />
          <span>Social Media Posts</span>
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Bell className="w-4 h-4 text-slate-500" />
          <span>Notifications</span>
        </NavLink>

        {/* Education & Outreach */}
        <NavLink
          to="/education"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <GraduationCap className="w-4 h-4 text-slate-500" />
          <span>Education & Outreach</span>
        </NavLink>

        {/* Admin Oversight */}
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-amber-50 text-amber-800 font-bold border border-amber-200'
                : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50/50'
            }`
          }
        >
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Admin &amp; AI Oversight</span>
        </NavLink>

        {/* About NCPOR */}
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              isActive ? 'bg-blue-50 text-polar-blue font-bold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`
          }
        >
          <Info className="w-4 h-4 text-slate-500" />
          <span>About NCPOR</span>
        </NavLink>
      </div>


      {/* Bottom Iceberg Brand Banner */}
      <div className="p-3 mt-auto">
        <div className="relative rounded-2xl overflow-hidden border border-sky-100 shadow-sm bg-gradient-to-b from-sky-400/10 via-sky-600/20 to-blue-900/60 p-4 text-left">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=400"
            alt="Antarctic Mountains"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="relative z-10">
            <h4 className="font-extrabold text-xs text-blue-950 leading-tight">
              Knowledge<br />from the Poles
            </h4>
            <p className="text-[10px] text-blue-900/80 font-medium mt-1">
              for a Sustainable Planet
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
