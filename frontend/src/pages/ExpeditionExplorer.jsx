import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Calendar, Users, Ship, Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ExpeditionExplorer() {
  const [expeditions, setExpeditions] = useState([]);
  const [activeStation, setActiveStation] = useState('maitri');

  const stations = [
    {
      id: 'maitri',
      name: 'Maitri Station',
      region: 'Antarctica',
      coords: '70°45′58″ S, 11°43′56″ E',
      established: 1989,
      location: 'Schirmacher Oasis, Central Dronning Maud Land',
      type: 'Year-Round Active Station',
      capacity: '25 winter / 65 summer',
      description: 'India’s second permanent research station, carrying out continuous research in atmospheric science, meteorology, earth science, glaciology, and human physiology.',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'bharati',
      name: 'Bharati Station',
      region: 'Antarctica',
      coords: '69°24′28″ S, 76°11′14″ E',
      established: 2012,
      location: 'Larsemann Hills, East Antarctica',
      type: 'Year-Round Active Station',
      capacity: '47 personnel',
      description: 'State-of-the-art third Antarctic base made of prefabricated shipping containers, focusing on oceanographic and continental break-up research.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'dakshin-gangotri',
      name: 'Dakshin Gangotri',
      region: 'Antarctica',
      coords: '70°05′37″ S, 12°00′00″ E',
      established: 1983,
      location: 'Ice Shelf, Dronning Maud Land',
      type: 'Historical Base (Submerged in Ice)',
      capacity: 'Historical milestone',
      description: 'India’s first permanent station in Antarctica, operating through 1989 before being decommissioned and preserved as an ice core calibration and historic site.',
      image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'himadri',
      name: 'Himadri Station',
      region: 'Arctic',
      coords: '78°55′00″ N, 11°56′00″ E',
      established: 2008,
      location: 'Ny-Ålesund, Spitsbergen, Svalbard (Norway)',
      type: 'Year-Round Active Station',
      capacity: '8 scientists',
      description: 'India’s permanent Arctic research base, monitoring Arctic climate change, atmospheric aerosols, Kongsfjorden fjord dynamics, and teleconnections with the Indian Monsoon.',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=800'
    }
  ];

  useEffect(() => {
    fetch('/api/expeditions')
      .then(r => r.json())
      .then(d => d.success && setExpeditions(d.data));
  }, []);

  const currentStation = stations.find(s => s.id === activeStation) || stations[0];

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <Compass className="w-6 h-6 text-polar-blue" />
          <span>Indian Polar Expedition &amp; Station Explorer</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore over 40+ Indian Scientific Expeditions to Antarctica and the Arctic, operating world-class permanent research bases.
        </p>

        {/* Station Selector Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          {stations.map(st => (
            <button
              key={st.id}
              onClick={() => setActiveStation(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeStation === st.id
                  ? 'bg-polar-blue text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{st.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Station Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-polar-border shadow-sm overflow-hidden flex flex-col justify-between">
          <div className="h-64 relative">
            <img
              src={currentStation.image}
              alt={currentStation.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-600/90 text-white">
                {currentStation.region}
              </span>
              <h2 className="text-2xl font-extrabold mt-1">{currentStation.name}</h2>
              <span className="text-xs text-slate-200">{currentStation.coords}</span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-700 leading-relaxed">
              {currentStation.description}
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Established</span>
                <span className="font-extrabold text-slate-800 text-sm">{currentStation.established}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">Personnel Capacity</span>
                <span className="font-extrabold text-slate-800 text-sm">{currentStation.capacity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expeditions Timeline */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-polar-border shadow-sm p-6 space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-slate-100">
            <Ship className="w-5 h-5 text-polar-blue" />
            <h3 className="text-sm font-bold text-slate-800">Recent Indian Expeditions</h3>
          </div>

          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {expeditions.map((exp) => (
              <div key={exp.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-blue-200 transition-all text-left space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{exp.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {exp.status}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[10px] text-slate-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{exp.start_date}</span>
                  </span>
                  <span>•</span>
                  <span>{exp.region}</span>
                </div>
                {exp.objectives && (
                  <ul className="text-[11px] text-slate-600 list-disc list-inside space-y-0.5 pt-1">
                    {exp.objectives.slice(0, 2).map((obj, i) => (
                      <li key={i} className="line-clamp-1">{obj}</li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-200/60">
                  <Link
                    to={`/datasets?region=${encodeURIComponent(exp.region)}`}
                    className="text-[10px] font-semibold text-polar-blue hover:underline bg-blue-50/80 px-2 py-0.5 rounded border border-blue-100 flex items-center space-x-1"
                  >
                    <span>View Datasets</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </Link>
                  <Link
                    to="/reports"
                    className="text-[10px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 px-2 py-0.5 rounded flex items-center space-x-1"
                  >
                    <span>Cruise Reports</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
