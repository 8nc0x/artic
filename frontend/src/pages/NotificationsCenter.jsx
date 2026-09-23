import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Filter,
  Check,
  Compass,
  Database,
  BookOpen,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetch('/api/notifications')
      .then(r => r.json())
      .then(d => {
        if (d.success) setNotifications(d.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/notifications/read-all', { method: 'POST' });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'report':
        return <Compass className="w-4 h-4 text-blue-600" />;
      case 'dataset':
        return <Database className="w-4 h-4 text-emerald-600" />;
      case 'publication':
        return <BookOpen className="w-4 h-4 text-indigo-600" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (categoryFilter === 'All') return true;
    if (categoryFilter === 'Unread') return !n.read;
    return n.type?.toLowerCase() === categoryFilter.toLowerCase();
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 pb-16 text-left max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-blue-50 text-polar-blue">
                <Bell className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                Notifications &amp; Activity Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Stay informed about newly ingested cruise reports, calibrated datasets, published research, and institutional events.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              {unreadCount} Unread
            </span>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark All as Read</span>
              </button>
            )}
          </div>
        </div>

        {/* 2. Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase tracking-wider">Filter:</span>
          {['All', 'Unread', 'dataset', 'report', 'publication', 'update'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                categoryFilter === cat
                  ? 'bg-polar-blue text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Alerts' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                notif.read
                  ? 'bg-white border-slate-200/80 shadow-2xs opacity-85'
                  : 'bg-blue-50/40 border-blue-200 shadow-xs'
              }`}
            >
              <div className="flex items-start space-x-3.5">
                <div className={`p-2 rounded-xl flex-shrink-0 mt-0.5 ${notif.read ? 'bg-slate-100' : 'bg-white shadow-xs ring-1 ring-blue-100'}`}>
                  {getNotificationIcon(notif.type)}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xs md:text-sm font-bold text-slate-900 leading-snug">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {notif.description}
                  </p>

                  <div className="flex items-center space-x-3 mt-2 text-[10px] text-slate-400 font-medium">
                    <span>{notif.timestamp}</span>
                    <span>•</span>
                    <span className="uppercase font-bold tracking-wider">{notif.type}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                {!notif.read && (
                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    title="Mark as read"
                    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  onClick={() => handleDelete(notif.id)}
                  title="Delete notification"
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
            <CheckCircle2 className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5] mb-2" />
            <h4 className="text-xs font-bold text-slate-700">All Caught Up!</h4>
            <p className="text-xs mt-0.5">No notifications match your current filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
