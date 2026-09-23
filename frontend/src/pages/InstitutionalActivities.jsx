import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Building2,
  Download,
  Share2,
  CheckCircle2,
  ExternalLink,
  Tag,
  X,
  ChevronRight,
  Ticket
} from 'lucide-react';

export default function InstitutionalActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', institution: '', role: 'Researcher' });

  useEffect(() => {
    const params = new URLSearchParams({
      type: activeType,
      status: activeStatus
    });

    setLoading(true);
    fetch(`/api/activities?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setActivities(d.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [activeType, activeStatus]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedActivity) return;

    try {
      const res = await fetch(`/api/activities/${selectedActivity.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setRegistrationSuccess(data);
        // Update local activity count
        setActivities(prev =>
          prev.map(a => (a.id === selectedActivity.id ? { ...a, registered_count: data.registered_count } : a))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const types = ['All', 'Conference', 'Workshop', 'Seminar', 'Training'];

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-blue-50 text-polar-blue">
                <Building2 className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                Institutional Activities &amp; Events
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              National and international polar conferences, training workshops, pre-expedition survival briefings, and public outreach webinars organized by NCPOR &amp; MoES.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveStatus('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatus === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setActiveStatus('Upcoming')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatus === 'Upcoming' ? 'bg-polar-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveStatus('Completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeStatus === 'Completed' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Completed Archives
            </button>
          </div>
        </div>

        {/* 2. Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase tracking-wider">Format:</span>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                activeType === type
                  ? 'bg-polar-blue text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {type}s
            </button>
          ))}
        </div>
      </div>

      {/* 3. Event Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {activities.map((act) => {
          const percentFull = Math.min(100, Math.round(((act.registered_count || 0) / (act.capacity || 100)) * 100));

          return (
            <div
              key={act.id}
              className="bg-white rounded-2xl border border-polar-border p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Event header pill */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {act.type}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      {act.category}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      act.status === 'Upcoming'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {act.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {act.title}
                </h3>

                {/* Time & Venue */}
                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-polar-blue flex-shrink-0" />
                    <span className="font-semibold text-slate-800">{act.date}</span>
                    <span className="text-slate-400">•</span>
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{act.time}</span>
                  </div>

                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span>{act.venue}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>Organized by {act.organizer}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-3.5 leading-relaxed line-clamp-3">
                  {act.description}
                </p>

                {/* Key Speakers preview */}
                {act.speakers && act.speakers.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Distinguished Speakers:
                    </span>
                    <div className="space-y-1">
                      {act.speakers.slice(0, 2).map((sp, i) => (
                        <div key={i} className="text-xs text-slate-700 flex items-center space-x-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="font-semibold">{sp.name}</span>
                          <span className="text-slate-400">({sp.designation})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Registration capacity progress bar */}
                <div className="mt-4 pt-2">
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-500">Registration Status</span>
                    <span className="text-slate-800">{act.registered_count} / {act.capacity} registered</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-polar-blue h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={act.brochure_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading Brochure: ${act.title}`);
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Brochure</span>
                </a>

                {act.status === 'Upcoming' ? (
                  <button
                    onClick={() => {
                      setSelectedActivity(act);
                      setRegistrationSuccess(null);
                      setShowRegisterModal(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-polar-blue hover:bg-sky-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register / RSVP Now</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-semibold italic">
                    Concluded
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Registration Modal */}
      {showRegisterModal && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden text-left animate-scaleUp">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 relative">
              <button
                onClick={() => setShowRegisterModal(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 text-sky-300 text-xs font-bold uppercase tracking-wider">
                <Ticket className="w-4 h-4 text-sky-400" />
                <span>NCPOR Delegate Registration</span>
              </div>
              <h2 className="text-base font-bold text-white mt-1 leading-snug">
                {selectedActivity.title}
              </h2>
              <p className="text-xs text-blue-200/80 mt-1">
                {selectedActivity.date} • {selectedActivity.venue}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {registrationSuccess ? (
                <div className="text-center py-4 space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Registration Confirmed!</h3>
                    <p className="text-xs text-slate-500 mt-1">{registrationSuccess.message}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 inline-block">
                    Pass ID: <span className="font-bold text-blue-600">{registrationSuccess.registration_id}</span>
                  </div>

                  <p className="text-[11px] text-slate-400">
                    A formal e-invitation and venue pass has been recorded in the portal directory.
                  </p>

                  <button
                    onClick={() => setShowRegisterModal(false)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="scientist@ncpor.res.in"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Institution</label>
                      <input
                        type="text"
                        required
                        value={formData.institution}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        placeholder="e.g. IIT Roorkee / NCPOR"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-polar-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Role</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-polar-blue"
                      >
                        <option value="Researcher">Researcher / Scientist</option>
                        <option value="Faculty">University Faculty</option>
                        <option value="Student">Graduate Student</option>
                        <option value="Media">Outreach / Media</option>
                        <option value="Industry">Industry Partner</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-polar-blue hover:bg-sky-600 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Ticket className="w-4 h-4" />
                      <span>Confirm Free Event Registration</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
