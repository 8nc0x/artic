import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Shield,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  UserX,
  Mail,
  Building,
  Calendar,
  MoreVertical
} from 'lucide-react';

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [toastMessage, setToastMessage] = useState(null);
  const [roleChangeModal, setRoleChangeModal] = useState(null); // { user: {...}, newRole: '' }

  const currentAdminEmail = 'admin@ncpor.gov.in';

  const [usersList, setUsersList] = useState([
    {
      id: 'usr-1',
      name: 'NCPOR System Administrator',
      email: 'admin@ncpor.gov.in',
      role: 'ADMIN',
      status: 'ACTIVE',
      institution: 'NCPOR / Ministry of Earth Sciences',
      joined: '12 Jan 2024',
      isSelf: true
    },
    {
      id: 'usr-2',
      name: 'Dr. Ramesh Sengupta',
      email: 'r.sengupta@ncpor.res.in',
      role: 'RESEARCHER',
      status: 'ACTIVE',
      institution: 'NCPOR Cryosphere Division',
      joined: '04 Mar 2024',
      isSelf: false
    },
    {
      id: 'usr-3',
      name: 'Dr. K. P. Krishnan',
      email: 'kp.krishnan@ncpor.res.in',
      role: 'RESEARCHER',
      status: 'ACTIVE',
      institution: 'Arctic Marine Biology Group',
      joined: '18 Apr 2024',
      isSelf: false
    },
    {
      id: 'usr-4',
      name: 'Pooja Verma',
      email: 'pooja.verma@iisc.ac.in',
      role: 'USER',
      status: 'ACTIVE',
      institution: 'IISc Bangalore (Polar Trainee)',
      joined: '15 Jul 2025',
      isSelf: false
    },
    {
      id: 'usr-5',
      name: 'Dr. Alok Srivastava',
      email: 'alok.s@nplindia.org',
      role: 'RESEARCHER',
      status: 'ACTIVE',
      institution: 'CSIR - NPL Polar Instrumentation',
      joined: '29 Aug 2025',
      isSelf: false
    },
    {
      id: 'usr-6',
      name: 'Karthik Raja',
      email: 'karthik.raja@student.ac.in',
      role: 'USER',
      status: 'SUSPENDED',
      institution: 'Goa University',
      joined: '10 Nov 2025',
      isSelf: false
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRoleChangeInitiate = (user, newRole) => {
    if (user.isSelf && newRole !== 'ADMIN') {
      showToast('Action Denied: You cannot demote your own administrator account.');
      return;
    }
    setRoleChangeModal({ user, newRole });
  };

  const confirmRoleChange = () => {
    if (!roleChangeModal) return;
    const { user, newRole } = roleChangeModal;

    setUsersList(prev =>
      prev.map(u => (u.id === user.id ? { ...u, role: newRole } : u))
    );

    showToast(`User ${user.name} role updated to ${newRole}.`);
    setRoleChangeModal(null);
  };

  const toggleUserStatus = (user) => {
    if (user.isSelf) {
      showToast('Action Denied: You cannot suspend your own administrator account.');
      return;
    }
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setUsersList(prev =>
      prev.map(u => (u.id === user.id ? { ...u, status: newStatus } : u))
    );
    showToast(`User ${user.name} status updated to ${newStatus}.`);
  };

  const filteredUsers = usersList.filter(user => {
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6 text-left font-sans text-slate-100">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-3 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold mb-2 border border-slate-700">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Role-Based Access Control (RBAC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Govern researcher credentials, assign portal access tiers (User, Researcher, Admin), and enforce security policies.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Accounts' },
            { id: 'USER', label: 'Users' },
            { id: 'RESEARCHER', label: 'Researchers' },
            { id: 'ADMIN', label: 'Administrators' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                roleFilter === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-3.5">User Details</th>
                <th className="px-6 py-3.5">Institution</th>
                <th className="px-6 py-3.5">Assigned Role</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Role Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-sm flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.isSelf && (
                        <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-1.5 py-0.2 rounded font-mono">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-1.5 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-500" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    <div className="font-medium">{user.institution}</div>
                    <div className="text-[10px] text-slate-500">Joined: {user.joined}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      user.role === 'ADMIN'
                        ? 'bg-rose-950 text-rose-300 border-rose-800'
                        : user.role === 'RESEARCHER'
                        ? 'bg-blue-950 text-blue-300 border-blue-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleUserStatus(user)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        user.status === 'ACTIVE'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800 hover:bg-emerald-900'
                          : 'bg-rose-950 text-rose-300 border-rose-800 hover:bg-rose-900'
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChangeInitiate(user, e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-slate-200 rounded-lg px-2 py-1 text-xs focus:outline-hidden"
                      >
                        <option value="USER">USER</option>
                        <option value="RESEARCHER">RESEARCHER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Change Confirmation Dialog */}
      {roleChangeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-700 shadow-2xl space-y-4 text-left">
            <div className="flex items-center space-x-3 text-amber-400">
              <div className="p-2.5 rounded-2xl bg-amber-950 border border-amber-800">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Confirm RBAC Role Assignment
                </h3>
                <p className="text-xs text-slate-400">Assigning {roleChangeModal.newRole} permissions</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to change the authorization tier for{' '}
              <strong className="text-white">{roleChangeModal.user.name}</strong> from{' '}
              <strong className="text-amber-400">{roleChangeModal.user.role}</strong> to{' '}
              <strong className="text-blue-400">{roleChangeModal.newRole}</strong>?
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setRoleChangeModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRoleChange}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Confirm Role Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
