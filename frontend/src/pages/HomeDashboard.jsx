import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Database,
  BookOpen,
  Compass,
  Image as ImageIcon,
  Calendar,
  Share2,
  Heart,
  Repeat2,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
  CheckCircle2,
  Layers,
  MapPin,
  Cpu
} from 'lucide-react';

export default function HomeDashboard() {
  const [trendsData, setTrendsData] = useState(null);
  const [datasets, setDatasets] = useState([]);
  const [publications, setPublications] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [events, setEvents] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({});
  const [activeTab, setActiveTab] = useState('Researchers');
  const [graphHoverNode, setGraphHoverNode] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/trends').then(r => r.json()).then(d => d.success && setTrendsData(d.data));
    fetch('/api/datasets?limit=4').then(r => r.json()).then(d => d.success && setDatasets(d.items));
    fetch('/api/publications?limit=4').then(r => r.json()).then(d => d.success && setPublications(d.items));
    fetch('/api/researchers').then(r => r.json()).then(d => d.success && setResearchers(d.data));
    fetch('/api/events').then(r => r.json()).then(d => d.success && setEvents(d.data));
    fetch('/api/social/posts').then(r => r.json()).then(d => d.success && setSocialPosts(d.data));
    fetch('/api/notifications').then(r => r.json()).then(d => d.success && setNotifications(d.data));
    fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.data));
  }, []);

  // Knowledge Graph preview nodes
  const radialNodes = [
    { id: 'climate', label: 'Climate Change', angle: 45, dist: 90, color: '#38bdf8', bg: 'bg-sky-500' },
    { id: 'atmosphere', label: 'Atmospheric Studies', angle: 90, dist: 95, color: '#06b6d4', bg: 'bg-teal-500' },
    { id: 'maitri', label: 'Maitri Station', angle: 135, dist: 85, color: '#f97316', bg: 'bg-orange-500' },
    { id: 'sea-ice', label: 'Sea Ice', angle: 180, dist: 90, color: '#8b5cf6', bg: 'bg-purple-500' },
    { id: 'expeditions', label: 'Expeditions', angle: 225, dist: 85, color: '#ec4899', bg: 'bg-pink-500' },
    { id: 'publications', label: 'Publications', angle: 270, dist: 95, color: '#6366f1', bg: 'bg-indigo-500' },
    { id: 'researchers', label: 'Researchers', angle: 315, dist: 85, color: '#10b981', bg: 'bg-emerald-500' },
    { id: 'datasets', label: 'Datasets', angle: 0, dist: 90, color: '#eab308', bg: 'bg-amber-500' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 text-white">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1600"
            alt="Antarctica Polar Frontier"
            className="w-full h-full object-cover object-center opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 md:p-10 max-w-3xl">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Exploring Polar Frontiers<br />for a Sustainable Planet
          </h1>
          <p className="mt-3 text-xs md:text-sm text-slate-200 leading-relaxed max-w-xl">
            Access expedition reports, scientific datasets, publications, multimedia and institutional activities from India’s polar research journeys, powered by AI and knowledge networks.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/datasets"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-polar-blue hover:bg-blue-600 text-white font-semibold text-xs md:text-sm shadow-md transition-all transform active:scale-95"
            >
              <span>Explore Repository</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/explore"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-semibold text-xs md:text-sm transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Try AI Search</span>
            </Link>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md px-6 py-3.5">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
            <div>
              <span className="block text-base md:text-xl font-extrabold text-white tracking-tight">2,500+</span>
              <span className="block text-[11px] font-medium text-slate-300">Datasets</span>
            </div>
            <div>
              <span className="block text-base md:text-xl font-extrabold text-white tracking-tight">1,000+</span>
              <span className="block text-[11px] font-medium text-slate-300">Publications</span>
            </div>
            <div>
              <span className="block text-base md:text-xl font-extrabold text-white tracking-tight">40+</span>
              <span className="block text-[11px] font-medium text-slate-300">Expeditions</span>
            </div>
            <div>
              <span className="block text-base md:text-xl font-extrabold text-white tracking-tight">50,000+</span>
              <span className="block text-[11px] font-medium text-slate-300">Photos & Videos</span>
            </div>
            <div>
              <span className="block text-base md:text-xl font-extrabold text-white tracking-tight">200+</span>
              <span className="block text-[11px] font-medium text-slate-300">Researchers</span>
            </div>
            <div>
              <span className="block text-base md:text-xl font-extrabold text-white tracking-tight">300+</span>
              <span className="block text-[11px] font-medium text-slate-300">Events & Activities</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Row: AI Trends, Knowledge Graph, Research Connections, and Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 9 Columns (Trends, Graph, Connections) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Widget 1: AI Data Trends */}
            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-polar-blue" />
                    <h3 className="text-xs font-bold text-slate-800">AI Data Trends</h3>
                    <Info className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
                  </div>
                  <Link to="/explore" className="text-[11px] text-polar-blue hover:underline font-semibold">
                    View All
                  </Link>
                </div>

                <div className="mt-3">
                  <h4 className="text-[11px] font-semibold text-slate-600">
                    Antarctic Temperature Trend (2010 - 2024)
                  </h4>

                  {/* Temperature Trend SVG Chart */}
                  <div className="relative mt-2 h-36 w-full">
                    <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="30" y1="20" x2="310" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="30" y1="50" x2="310" y2="50" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="30" y1="80" x2="310" y2="80" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="30" y1="110" x2="310" y2="110" stroke="#e2e8f0" />

                      {/* Y-Axis labels */}
                      <text x="5" y="24" fontSize="8" fill="#94a3b8">-10</text>
                      <text x="5" y="54" fontSize="8" fill="#94a3b8">-20</text>
                      <text x="5" y="84" fontSize="8" fill="#94a3b8">-30</text>
                      <text x="5" y="114" fontSize="8" fill="#94a3b8">-40</text>

                      {/* Trend Area and Line */}
                      <path
                        d="M 35 90 Q 70 85, 105 82 T 175 75 T 245 60 T 305 45 L 305 110 L 35 110 Z"
                        fill="url(#trendGradient)"
                      />
                      <path
                        d="M 35 90 Q 70 85, 105 82 T 175 75 T 245 60 T 305 45"
                        fill="none"
                        stroke="#0284c7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Data Point Dots */}
                      <circle cx="35" cy="90" r="3" fill="#0284c7" />
                      <circle cx="105" cy="82" r="3" fill="#0284c7" />
                      <circle cx="175" cy="75" r="3" fill="#0284c7" />
                      <circle cx="245" cy="60" r="3" fill="#0284c7" />
                      <circle cx="305" cy="45" r="4" fill="#0369a1" stroke="#fff" strokeWidth="2" />
                    </svg>

                    {/* Stat Overlay Badge */}
                    <div className="absolute top-2 right-4 flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                      <span>▲ +1.8°C</span>
                      <span className="text-slate-500 font-normal">Increase since 2010</span>
                    </div>

                    {/* X-axis years */}
                    <div className="flex justify-between px-6 text-[9px] text-slate-400 mt-1">
                      <span>2010</span>
                      <span>2012</span>
                      <span>2014</span>
                      <span>2016</span>
                      <span>2018</span>
                      <span>2020</span>
                      <span>2022</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Analysis Caption */}
              <div className="mt-4 p-2.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-700 leading-snug">
                <span className="font-bold text-polar-blue">AI Analysis:</span> Antarctic regional temperature shows an increasing trend of 1.8°C over the last decade, with maximum rise in coastal regions.
              </div>
            </div>

            {/* Widget 2: Knowledge Graph Preview */}
            <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800">Knowledge Graph</h3>
                <Link to="/knowledge-graph" className="text-[11px] text-polar-blue hover:underline font-semibold">
                  View Full Graph
                </Link>
              </div>

              {/* Interactive Radial Knowledge Graph */}
              <div className="relative mt-2 h-48 w-full flex items-center justify-center">
                {/* Center Node: Antarctica */}
                <div
                  onMouseEnter={() => setGraphHoverNode('Antarctica (Hub Node)')}
                  onMouseLeave={() => setGraphHoverNode(null)}
                  className="z-20 w-16 h-16 rounded-full bg-blue-900 text-white flex flex-col items-center justify-center text-[11px] font-bold shadow-md cursor-pointer hover:scale-105 transition-transform ring-4 ring-blue-100"
                >
                  <span>Antarctica</span>
                </div>

                {/* SVG Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {radialNodes.map((n, i) => {
                    const rad = (n.angle * Math.PI) / 180;
                    const cx = 150 + Math.cos(rad) * 65;
                    const cy = 96 + Math.sin(rad) * 65;
                    return (
                      <line
                        key={i}
                        x1="150"
                        y1="96"
                        x2={cx}
                        y2={cy}
                        stroke="#cbd5e1"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    );
                  })}
                </svg>

                {/* Satellite Nodes */}
                {radialNodes.map((node, i) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = 50 + Math.cos(rad) * 36;
                  const y = 50 + Math.sin(rad) * 36;
                  return (
                    <div
                      key={node.id}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onMouseEnter={() => setGraphHoverNode(node.label)}
                      onMouseLeave={() => setGraphHoverNode(null)}
                      onClick={() => navigate(`/knowledge-graph?focus=${node.id}`)}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-full ${node.bg} text-white flex items-center justify-center text-[9px] font-bold shadow-sm transition-all group-hover:scale-125 ring-2 ring-white`}>
                        {node.label.charAt(0)}
                      </div>
                      <span className="absolute top-7 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold text-slate-600 bg-white/95 px-1.5 py-0.5 rounded shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {node.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Node Tooltip or Explore Note */}
              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-500 font-medium">
                  {graphHoverNode ? (
                    <strong className="text-polar-blue font-semibold">{graphHoverNode}</strong>
                  ) : (
                    "Interactive network linking stations, expeditions, publications & researchers"
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Widget 3: Research Connections */}
          <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800">Research Connections</h3>
              <Link to="/connections" className="text-[11px] text-polar-blue hover:underline font-semibold">
                View All
              </Link>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center space-x-2 my-3">
              {['Researchers', 'Institutions', 'Topics', 'Collaborations'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-blue-50 text-polar-blue border border-blue-200 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Researcher Cards List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {researchers.slice(0, 4).map((r) => (
                <div key={r.id} className="p-3 rounded-xl border border-slate-100 hover:border-blue-100 bg-slate-50/60 hover:bg-slate-50 transition-all flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs"
                    />
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-slate-800">{r.name}</h4>
                      <p className="text-[10px] text-slate-500">{r.department}</p>
                      <p className="text-[9px] text-slate-400 font-medium">NCPOR, Goa</p>
                    </div>
                  </div>
                  <Link
                    to={`/connections?researcher=${r.id}`}
                    className="px-2.5 py-1 text-[10px] font-semibold text-polar-blue hover:text-white hover:bg-polar-blue rounded-lg border border-blue-200 transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Notifications & Social Media Posts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Notifications Card */}
          <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800">Notifications</h3>
              <Link to="/notifications" className="text-[11px] text-polar-blue hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {notifications.map((n) => (
                <div key={n.id} className="py-2.5 first:pt-2 last:pb-0 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 hover:text-polar-blue cursor-pointer">
                      {n.title}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{n.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {n.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Posts Card */}
          <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-800">Social Media Posts</h3>
              <Link to="/social-studio" className="text-[11px] text-polar-blue hover:underline font-semibold">
                View All
              </Link>
            </div>

            <div className="space-y-4 mt-3">
              {socialPosts.map((post) => (
                <div key={post.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-left">
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-blue-800 text-white text-[9px] font-bold flex items-center justify-center">
                        NC
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800">NCPOR</span>
                        <span className="text-[10px] text-slate-400 ml-1">@{post.author_handle}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                  </div>

                  {/* Content */}
                  <p className="text-[11px] text-slate-700 mt-2 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Post Images Preview */}
                  {post.images && post.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-1.5 mt-2 rounded-lg overflow-hidden">
                      {post.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Polar Expedition"
                          className="w-full h-24 object-cover hover:scale-105 transition-transform"
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/60 text-slate-500 text-[11px]">
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-red-500">
                      <Heart className="w-3.5 h-3.5" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500">
                      <Repeat2 className="w-3.5 h-3.5" />
                      <span>{post.reposts}</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer hover:text-slate-800">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Access Tiles */}
      <div>
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: "Datasets", desc: "Explore scientific datasets from polar expeditions", icon: Database, bg: "bg-blue-50 hover:bg-blue-100/80 text-blue-700 border-blue-200", link: "/datasets" },
            { title: "Expedition Reports", desc: "Read detailed expedition reports and findings", icon: Compass, bg: "bg-rose-50 hover:bg-rose-100/80 text-rose-700 border-rose-200", link: "/reports" },
            { title: "Publications", desc: "Access research papers and scientific publications", icon: BookOpen, bg: "bg-purple-50 hover:bg-purple-100/80 text-purple-700 border-purple-200", link: "/publications" },
            { title: "Photos & Videos", desc: "Explore polar region multimedia content", icon: ImageIcon, bg: "bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border-emerald-200", link: "/media" },
            { title: "Events & Activities", desc: "Conferences, seminars, workshops & outreach", icon: Calendar, bg: "bg-amber-50 hover:bg-amber-100/80 text-amber-700 border-amber-200", link: "/events" },
            { title: "AI Assistant", desc: "Search, summarize, analyze and generate content using AI", icon: Sparkles, bg: "bg-pink-50 hover:bg-pink-100/80 text-pink-700 border-pink-200", link: "/ai-assistant" }
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className={`p-4 rounded-2xl border ${item.bg} text-left transition-all hover:-translate-y-1 shadow-xs flex flex-col justify-between`}
            >
              <item.icon className="w-6 h-6 mb-2.5" />
              <div>
                <h4 className="font-bold text-xs leading-tight text-slate-900">{item.title}</h4>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Bottom Feeds (Latest Datasets, Recent Publications, Upcoming Events) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Datasets */}
        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800">Latest Datasets</h3>
            <Link to="/datasets" className="text-[11px] text-polar-blue hover:underline font-semibold">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {datasets.map((ds) => (
              <div key={ds.id} className="py-2.5 first:pt-1 last:pb-0 flex items-start justify-between">
                <div className="flex-1 pr-2 text-left">
                  <Link to={`/datasets/${ds.id}`} className="text-xs font-semibold text-slate-800 hover:text-polar-blue line-clamp-1">
                    {ds.title}
                  </Link>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                      {ds.category || 'Atmosphere'}
                    </span>
                    <span className="text-[10px] text-slate-400">{ds.release_date}</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-medium mt-1">NPDC</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Publications */}
        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800">Recent Publications</h3>
            <Link to="/publications" className="text-[11px] text-polar-blue hover:underline font-semibold">
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100 mt-2">
            {publications.map((p) => (
              <div key={p.id} className="py-2.5 first:pt-1 last:pb-0 text-left">
                <Link
                  to={p.id === 'pub-sea-ice-variability-2024' ? '/publications/sea-ice-variability-2024' : `/publications/${p.id}`}
                  className="text-xs font-semibold text-slate-800 hover:text-polar-blue line-clamp-1 block"
                >
                  {p.title}
                </Link>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {p.journal} | {p.publication_year}
                  </span>
                  <span className="text-[10px] text-purple-600 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">
                    {p.category || 'Cryosphere'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-5 border border-polar-border shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800">Upcoming Events</h3>
            <Link to="/events" className="text-[11px] text-polar-blue hover:underline font-semibold">
              View All
            </Link>
          </div>

          <div className="space-y-2.5 mt-3">
            {events.map((ev) => (
              <div key={ev.id} className="flex items-start space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 text-polar-blue flex-shrink-0">
                  <span className="text-[9px] font-bold uppercase">{ev.month}</span>
                  <span className="text-sm font-extrabold leading-none">{ev.day}</span>
                </div>
                <div className="text-left flex-1">
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">{ev.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">{ev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
