import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  ChevronLeft,
  X,
  ExternalLink,
  Award,
  BookOpen,
  Sparkles,
  Heart,
  Share2,
  CheckCircle2
} from 'lucide-react';

export default function InstitutionalActivities() {
  const [selectedConference, setSelectedConference] = useState('conf-4');
  const [selectedPosterModal, setSelectedPosterModal] = useState(null);
  const [bookmarkedEvents, setBookmarkedEvents] = useState({});

  const toggleBookmark = (id) => {
    setBookmarkedEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 1. Conferences Data (Matching CONFERENCE REFERENCE)
  const conferences = [
    {
      id: 'conf-1',
      title: 'SCAR International Antarctic Symposium',
      city: 'Goa',
      fee: 'Free / Academic',
      rating: '★★★★★',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'conf-2',
      title: 'Asian Forum for Polar Sciences (AFoPS)',
      city: 'New Delhi',
      fee: 'Funded by MoES',
      rating: '★★★★☆',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'conf-3',
      title: 'Ny-Ålesund Arctic Science Summit',
      city: 'Svalbard, Norway',
      fee: 'Institutional',
      rating: '★★★★★',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'conf-4',
      title: 'Indian Polar Science Congress (IPSC 2026)',
      city: 'NCPOR Goa',
      fee: 'Complimentary',
      rating: '★★★★★',
      image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=500'
    },
    {
      id: 'conf-5',
      title: 'Southern Ocean Biogeochemistry Conclave',
      city: 'Kolkata',
      fee: 'Open Registration',
      rating: '★★★★☆',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=500'
    }
  ];

  // 2. Seminars Data (Matching SEMINAR REFERENCE - "The Best of Live Events" style)
  const seminarTiles = [
    {
      id: 'sem-1',
      title: 'CRYOSPHERE COLLOQUIUMS',
      subtitle: '15+ Seminars',
      color: 'from-purple-700 to-indigo-900',
      image: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=400',
      posterTitle: 'Antarctic Marginal Ice Zone Dynamics & Polar Jet Coupling',
      speaker: 'Prof. J. Turner (British Antarctic Survey & MoES Guest)',
      date: 'Thursday, 15 October 2026 • 15:00 IST'
    },
    {
      id: 'sem-2',
      title: 'OCEAN DYNAMICS',
      subtitle: '8 Seminars',
      color: 'from-sky-600 to-blue-800',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400',
      posterTitle: 'Kongsfjorden Fjord Hydrography and IndARC Telemetry',
      speaker: 'Dr. K. P. Krishnan (Scientist F, NCPOR)',
      date: 'Tuesday, 20 October 2026 • 11:00 IST'
    },
    {
      id: 'sem-3',
      title: 'SPACE WEATHER',
      subtitle: '10+ Seminars',
      color: 'from-teal-600 to-emerald-800',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=400',
      posterTitle: 'Ionospheric Scintillation Studies at Maitri Station',
      speaker: 'Indian Institute of Geomagnetism (IIG) Polar Group',
      date: 'Wednesday, 28 October 2026 • 14:30 IST'
    },
    {
      id: 'sem-4',
      title: 'POLAR MICROBES',
      subtitle: '6 Seminars',
      color: 'from-purple-800 to-fuchsia-950',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=400',
      posterTitle: 'Psychrophilic Enzymes from Schirmacher Oasis Lakes',
      speaker: 'Centre for Cellular and Molecular Biology (CCMB)',
      date: 'Friday, 06 November 2026 • 16:00 IST'
    }
  ];

  // 3. Workshops Data (Matching WORKSHOP REFERENCE)
  const workshops = [
    {
      id: 'ws-1',
      title: 'Glaciological DGPS & Terminus Ablation Field Methods',
      category: 'Cryospheric Fieldwork',
      date: '09 October',
      bannerColor: 'bg-amber-500',
      icon: '🏔️'
    },
    {
      id: 'ws-2',
      title: 'Python & QGIS for Antarctic Satellite Microwave Analysis',
      category: 'Geospatial Tools',
      date: '18 October',
      bannerColor: 'bg-teal-600',
      icon: '🛰️'
    },
    {
      id: 'ws-3',
      title: 'Polar Ice Core Drilling & Sub-zero Logistics Training',
      category: 'Field Operations',
      date: '25 October',
      bannerColor: 'bg-slate-700',
      icon: '❄️'
    },
    {
      id: 'ws-4',
      title: 'Marine Sediment Sampling Protocols & Core Preservation',
      category: 'Oceanography Protocols',
      date: '03 November',
      bannerColor: 'bg-indigo-900',
      icon: '🌊'
    }
  ];

  // 4. Awareness Events Data (Matching AWARENESS EVENT REFERENCE - Dwellys Style)
  const awarenessEvents = [
    {
      id: 'aw-1',
      title: 'Swachh Sagar Surakshit Sagar 5.0 Beach Clean-up Campaign',
      location: 'Miramar Beach, Panaji, Goa',
      tagLeft: 'Public Entry',
      tagRight: 'Coastal Drive',
      author: 'NCPOR Media Cell',
      timeAgo: '2 days ago',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=600',
      specs: { attendees: '450+', bags: '120 Bags', km: '3.5 km Cleaned' }
    },
    {
      id: 'aw-2',
      title: 'National Polar Science Day — Open R&D Campus Exhibition',
      location: 'NCPOR Headland Sada, Vasco da Gama',
      tagLeft: 'Students Welcome',
      tagRight: 'Science Expo',
      author: 'NCPOR Outreach Wing',
      timeAgo: '1 week ago',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
      specs: { attendees: '1,200+', bags: '14 Stalls', km: '2 Auditoriums' }
    },
    {
      id: 'aw-3',
      title: 'Antarctic Expedition VR Dome Experience for High Schools',
      location: 'Science City Auditorium, Kolkata',
      tagLeft: 'Free Registration',
      tagRight: 'VR Immersion',
      author: 'MoES Education Team',
      timeAgo: '2 weeks ago',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      specs: { attendees: '800+', bags: '6 VR Pods', km: '3D Maitri Base' }
    }
  ];

  return (
    <div className="space-y-16 pb-16 text-left">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. CONFERENCE SECTION (CONFERENCE REFERENCE)                */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
            <span>CONFERENCE REFERENCE</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            International & National Conferences
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Peer-reviewed scientific assemblies, SCAR symposiums, and Antarctic Treaty consultative gatherings
          </p>
        </div>

        {/* Horizontal Slider with Active Card Highlight */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {conferences.map(conf => {
            const isSelected = selectedConference === conf.id;
            return (
              <div
                key={conf.id}
                onClick={() => setSelectedConference(conf.id)}
                className={`bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-2 border-blue-500 shadow-xl scale-[1.03] ring-4 ring-blue-100'
                    : 'border border-slate-200 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img src={conf.image} alt={conf.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                      {conf.title}
                    </h3>
                    <div className="text-[10px] text-amber-500 pt-0.5">{conf.rating}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 pt-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{conf.city}</span>
                    </div>
                    <div className="text-xs font-extrabold text-blue-700 mt-1">
                      {conf.fee}
                    </div>
                  </div>

                  <button
                    className={`w-full py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    View more
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. SEMINAR SECTION (SEMINAR REFERENCE)                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1 border border-purple-200">
            <span>SEMINAR REFERENCE</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            The Best of Polar Seminars & Colloquiums
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any series to open full announcement poster and live webinar access
          </p>
        </div>

        {/* 4 Square Category Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {seminarTiles.map(sem => (
            <div
              key={sem.id}
              onClick={() => setSelectedPosterModal(sem)}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all group flex flex-col justify-end p-5 text-white"
            >
              <img
                src={sem.image}
                alt={sem.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${sem.color} opacity-85 group-hover:opacity-95 transition-opacity`} />
              
              <div className="relative z-10 space-y-1">
                <div className="text-lg md:text-xl font-black tracking-tight leading-tight uppercase font-heading">
                  {sem.title}
                </div>
                <div className="text-xs font-bold text-white/90">
                  {sem.subtitle}
                </div>
                <div className="text-[10px] text-white/80 flex items-center space-x-1 pt-1 underline group-hover:text-amber-300">
                  <span>→ full poster</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. WORKSHOP SECTION (WORKSHOP REFERENCE)                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-1 border border-emerald-200">
            <span>WORKSHOP REFERENCE</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Technical & Field Training Workshops
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hands-on technical courses on glaciology, ice core physics, and autonomous polar sensor networks
          </p>
        </div>

        {/* 4 Cards with Distinct Colored Banners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshops.map(ws => (
            <div
              key={ws.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className={`h-36 ${ws.bannerColor} p-4 flex flex-col justify-between text-white relative overflow-hidden`}>
                <span className="text-3xl">{ws.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Workshop Series</span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {ws.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-600 mt-2">
                    {ws.category}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
                  {ws.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. AWARENESS EVENTS (AWARENESS EVENT REFERENCE - DWELLYS)   */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
            <span>AWARENESS EVENT REFERENCE</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Community & Public Awareness Drives
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            National public outreach initiatives, coastal preservation drives, and youth engagement programs
          </p>
        </div>

        {/* 3 Dwellys-Style Metadata Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awarenessEvents.map(event => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Photo with Tag Pills and Heart Save Button */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-xs">
                    {event.tagLeft}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900/90 text-white backdrop-blur-md">
                    {event.tagRight}
                  </span>
                </div>
                <button
                  onClick={() => toggleBookmark(event.id)}
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-600 shadow-md"
                >
                  <Heart className={`w-4 h-4 ${bookmarkedEvents[event.id] ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3">
                <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{event.location}</span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 leading-snug">
                  {event.title}
                </h3>

                <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                    NC
                  </div>
                  <span>{event.author}</span>
                  <span>•</span>
                  <span>{event.timeAgo}</span>
                </div>

                {/* Bottom Spec Bar with Icons (Dwellys Style) */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-700">
                  <div className="flex items-center space-x-1">
                    <span>👥</span>
                    <span>{event.specs.attendees}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>🎪</span>
                    <span>{event.specs.bags}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📍</span>
                    <span>{event.specs.km}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* FULL POSTER MODAL (From Wireframe 3 Arrow)                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      {selectedPosterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-6 text-white relative">
              <button
                onClick={() => setSelectedPosterModal(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-300">Official Seminar Poster</div>
              <h3 className="text-xl font-black mt-1">{selectedPosterModal.posterTitle}</h3>
              <p className="text-xs text-slate-300 mt-2">{selectedPosterModal.speaker}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">Schedule & Access:</div>
                <div>{selectedPosterModal.date}</div>
                <div>Mode: Hybrid (In-person at NCPOR Auditorium & WebEx Broadcast)</div>
              </div>
              <button
                onClick={() => {
                  alert('Registered for webinar access link!');
                  setSelectedPosterModal(null);
                }}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Confirm Free Webinar Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
