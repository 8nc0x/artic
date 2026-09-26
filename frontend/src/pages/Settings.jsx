import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Bell,
  Moon,
  Sun,
  Shield,
  Lock,
  User,
  Compass,
  CheckCircle2,
  RefreshCw,
  LogOut,
  Mail,
  Eye,
  Sliders,
  Sparkles,
  Smartphone
} from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [toastMessage, setToastMessage] = useState(null);

  // Notification state
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [expeditionUpdates, setExpeditionUpdates] = useState(true);
  const [aiJobNotifs, setAiJobNotifs] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Appearance state
  const [theme, setTheme] = useState('light');
  const [compactDensity, setCompactDensity] = useState(false);

  // Security state
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRestartTour = () => {
    localStorage.removeItem('ncpor_tour_completed');
    localStorage.removeItem('ncpor_home_tour_completed');
    localStorage.removeItem('ncpor_explore_tour_completed');
    showToast('Product tour reset! When you navigate to Home or Explore, the interactive tour will launch.');
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    showToast('Preferences saved successfully.');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 text-left font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-3 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-2">
            <SettingsIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Preferences & Controls</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Platform Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure notifications, interface preferences, session security, and guided tours.
          </p>
        </div>

        <button
          onClick={handleRestartTour}
          className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition-colors flex items-center space-x-2 self-start sm:self-center"
        >
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Restart Product Tour</span>
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs self-start">
          {[
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'appearance', label: 'Appearance', icon: Sun },
            { id: 'security', label: 'Security & Auth', icon: Shield },
            { id: 'guided-tour', label: 'Guided Tour', icon: Compass },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="md:col-span-3 space-y-6">
          {/* 1. Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Notification Channels & Alerts
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Control how NCPOR Polar Science Portal communicates real-time alerts.
                </p>
              </div>

              <div className="divide-y divide-slate-100">
                <div className="py-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Email Notifications</div>
                    <div className="text-[11px] text-slate-500">
                      Receive critical updates and researcher review statuses via email.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Expedition & Station Updates</div>
                    <div className="text-[11px] text-slate-500">
                      Advisories for Maitri, Bharati, Himadri, and Himansh meteorological changes.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={expeditionUpdates}
                      onChange={(e) => setExpeditionUpdates(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">AI Background Jobs</div>
                    <div className="text-[11px] text-slate-500">
                      Notify when PDF extraction and multi-channel post generation finishes.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiJobNotifs}
                      onChange={(e) => setAiJobNotifs(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="py-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Weekly Polar Science Digest</div>
                    <div className="text-[11px] text-slate-500">
                      Curated summary of new peer-reviewed papers and ingested datasets.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={weeklyDigest}
                      onChange={(e) => setWeeklyDigest(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* 2. Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Appearance & Display
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Customize theme modes and UI information density.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700">Theme Preference</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'light', label: 'Light', desc: 'Default scientific style', icon: Sun },
                    { id: 'dark', label: 'Dark', desc: 'Low-light observation', icon: Moon },
                    { id: 'system', label: 'System', desc: 'Sync with OS', icon: Smartphone },
                  ].map(item => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setTheme(item.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          theme === item.id
                            ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-500'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <Icon className={`w-5 h-5 mb-2 ${theme === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                        <div className="text-xs font-bold text-slate-900">{item.label}</div>
                        <div className="text-[10px] text-slate-500">{item.desc}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Compact Layout Density</div>
                    <div className="text-[11px] text-slate-500">
                      Show more data points per screen in scientific tables and datasets catalog.
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={compactDensity}
                      onChange={(e) => setCompactDensity(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* 3. Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Security & Active Sessions
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage authentication credentials, token revocation, and multi-factor safety.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</div>
                    <div className="text-[11px] text-slate-500">
                      Mandatory for Researcher and Admin roles publishing expedition data.
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active (Hardware Key)
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-900">Current Login Sessions</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-800">Chrome on Windows (Current Session)</div>
                        <div className="text-[10px] text-slate-500">Goa, India • IP 14.139.118.25 • Active now</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">Current</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => showToast('All secondary sessions have been revoked.')}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-colors"
                    >
                      Logout of All Other Devices
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Guided Tour Tab */}
          {activeTab === 'guided-tour' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  Interactive Product Tours
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Driver.js walkthrough guides designed to orient scientists, students, and reviewers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="flex items-center space-x-2 text-blue-900 font-bold text-sm">
                  <Compass className="w-5 h-5 text-blue-600" />
                  <span>Restart Walkthrough Tour</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  Resetting the product tour clears your localized completion token. Navigating to the Home Dashboard or Explore section will automatically trigger the step-by-step interactive popover tour.
                </p>
                <div>
                  <button
                    onClick={handleRestartTour}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Reset & Launch Tour
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
