import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Mail,
  Building,
  Calendar,
  Award,
  Bookmark,
  History,
  Settings,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Edit3,
  ExternalLink
} from 'lucide-react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(() => localStorage.getItem('ncpor_user_role') || 'RESEARCHER');
  const [name, setName] = useState('Dr. Ramesh Sengupta');
  const [institution, setInstitution] = useState('National Centre for Polar and Ocean Research (NCPOR)');
  const [email, setEmail] = useState('r.sengupta@ncpor.res.in');
  const [bio, setBio] = useState('Principal Investigator focusing on Antarctic sea ice variability, remote sensing, and cryosphere-ocean feedback loops across the Southern Ocean.');

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 text-left font-sans">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center space-x-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-500 text-white font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-blue-50">
              {name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white text-[10px]" title="Active Researcher">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                {name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {role}
              </span>
            </div>
            <p className="text-xs text-slate-600 flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>{institution}</span>
            </p>
            <p className="text-xs text-slate-500 flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{email}</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1.5 self-start sm:self-center"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* Edit Form Modal/Area */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-blue-200 shadow-md space-y-4 animate-fadeIn">
          <h3 className="text-sm font-bold text-slate-900 font-heading">Edit Profile Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Biography / Research Focus</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      )}

      {/* Bio & Scientific Affiliations */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          About Researcher
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {bio}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Expeditions</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">41st, 43rd &amp; 44th IAE</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Publications</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">38 Peer-Reviewed Papers</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Member Since</span>
            <span className="font-extrabold text-slate-900 mt-0.5 block">October 2018</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/profile/saved"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all group"
        >
          <Bookmark className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
            Saved Content
          </h4>
          <p className="text-xs text-slate-500 mt-1">Bookmarked papers, datasets, and events.</p>
        </Link>

        <Link
          to="/profile/history"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all group"
        >
          <History className="w-5 h-5 text-indigo-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
            Browsing History
          </h4>
          <p className="text-xs text-slate-500 mt-1">Recently viewed polar scientific records.</p>
        </Link>

        <Link
          to="/settings"
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all group"
        >
          <Settings className="w-5 h-5 text-slate-600 mb-2 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-slate-800 transition-colors">
            Portal Settings
          </h4>
          <p className="text-xs text-slate-500 mt-1">Preferences, themes, and tour controls.</p>
        </Link>
      </div>
    </div>
  );
}
