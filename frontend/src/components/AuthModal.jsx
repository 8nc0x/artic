import React, { useState } from 'react';
import { X, ShieldCheck, User, GraduationCap, Share2, Award, CheckCircle2, LogIn, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, currentUser, onSelectUser }) {
  const [tab, setTab] = useState('demo'); // 'demo' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const demoUsers = [
    {
      id: "usr-viraj-jadhav",
      name: "Dr. Viraj Jadhav",
      role: "Polar Scientist",
      role_type: "scientist",
      institution: "National Centre for Polar and Ocean Research (NCPOR)",
      department: "Cryosphere & Glaciology Division",
      email: "viraj.jadhav@ncpor.res.in",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      description: "Access full raw NPDC datasets, cruise reports, and scientific collaboration graph.",
      icon: User,
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200"
    },
    {
      id: "usr-ananya-sharma",
      name: "Ananya Sharma",
      role: "University Student",
      role_type: "student",
      institution: "Goa University • Earth Sciences Dept.",
      department: "School of Marine Sciences",
      email: "ananya.sharma@unigoa.ac.in",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      description: "Explore interactive learning modules, student quizzes, and simplified educational trends.",
      icon: GraduationCap,
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200"
    },
    {
      id: "usr-rajesh-menon",
      name: "Rajesh Menon",
      role: "Outreach & Media Officer",
      role_type: "outreach",
      institution: "Ministry of Earth Sciences (MoES)",
      department: "Media & Public Dissemination Cell",
      email: "outreach@moes.gov.in",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      description: "Draft, AI-generate, approve, and schedule social media outreach campaigns.",
      icon: Share2,
      badgeColor: "bg-purple-100 text-purple-700 border-purple-200"
    },
    {
      id: "usr-admin-anil",
      name: "Dr. Anil Kumar",
      role: "NCPOR Chief Administrator",
      role_type: "admin",
      institution: "National Centre for Polar and Ocean Research (NCPOR)",
      department: "Directorate & Research Oversight",
      email: "directorate@ncpor.res.in",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
      description: "Full moderation powers, dataset ingestion approval, and AI quality checks.",
      icon: ShieldCheck,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200"
    }
  ];

  const handleSelect = (user) => {
    onSelectUser(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-100 shadow-2xl overflow-hidden text-left animate-scaleUp">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 p-0.5 shadow-md flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">NCPOR Identity &amp; Role Access</h2>
              <p className="text-xs text-blue-200/80">Select a verified polar portal persona or sign in to your institutional account</p>
            </div>
          </div>

          {/* Persona selector tabs */}
          <div className="flex space-x-2 mt-5 border-b border-white/10 pb-1">
            <button
              onClick={() => setTab('demo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'demo' ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Demo Personas (Instant Switch)
            </button>
            <button
              onClick={() => setTab('login')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                tab === 'login' ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Institutional Login (SSO / MoES)
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {tab === 'demo' ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 font-medium">
                Click any persona below to experience role-tailored dashboard views, administrative moderation queues, or student learning modules:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {demoUsers.map((user) => {
                  const isSelected = currentUser?.id === user.id;
                  const Icon = user.icon;

                  return (
                    <div
                      key={user.id}
                      onClick={() => handleSelect(user)}
                      className={`group p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                        isSelected
                          ? 'border-polar-blue bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-polar-blue transition-colors truncate">
                              {user.name}
                            </h4>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-polar-blue flex-shrink-0" />}
                          </div>
                          <span className={`inline-block mt-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${user.badgeColor}`}>
                            {user.role}
                          </span>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {user.description}
                      </p>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400 group-hover:text-polar-blue">
                        <span>{user.department}</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSelect(demoUsers[0]);
              }}
              className="space-y-4 max-w-sm mx-auto py-2"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Institutional Email / MoES ID
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="scientist@ncpor.res.in"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-polar-blue text-white font-bold text-xs hover:bg-sky-600 transition-colors shadow-sm flex items-center justify-center space-x-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In via MoES e-Governance</span>
              </button>

              <p className="text-[11px] text-center text-slate-400">
                Single Sign-On (SSO) enabled for MoES, NCPOR, SAC-ISRO, and affiliated institutions.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
