import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Filter,
  BookOpen,
  Database,
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  ChevronUp,
  Share2,
  Download,
  Eye,
  Tag
} from 'lucide-react';

export default function ExploreSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  // Kaggle-style Pill Tab: Notebooks | Datasets | Topics | Comments | Models
  const [activeCategoryPill, setActiveCategoryPill] = useState('Datasets');

  // Sidebar filters
  const [dateFilter, setDateFilter] = useState('Last 90 days');
  const [viewedFilter, setViewedFilter] = useState('Not Viewed');

  // Carousel State for Research Paper
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselSlides = [
    {
      id: 'paper-1',
      title: 'Decadal Variations in Southern Ocean Sea-Ice Extent',
      subtitle: 'Breakthrough Multi-Sensor Satellite Analysis (2010–2026)',
      speaker: 'Dr. Ramesh Sengupta (Lead Investigator)',
      date: '24 SEPTEMBER',
      venue: 'NCPOR MAIN AUDITORIUM | GOA',
      speakerImg: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      presentedBy: 'MoES India',
      curatedBy: 'NCPOR Cryosphere Cell',
      executedBy: '44th IAE Team'
    },
    {
      id: 'paper-2',
      title: 'IndARC Hydrographic Mooring in Kongsfjorden',
      subtitle: 'Sub-Surface Atlantic Water Intrusion Dynamics',
      speaker: 'Dr. K. P. Krishnan (Marine Sciences Wing)',
      date: '02 AUGUST',
      venue: 'SVALBARD ARCTIC STATION | NY-ÅLESUND',
      speakerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      presentedBy: 'MoES India',
      curatedBy: 'Arctic Program',
      executedBy: 'IndARC Mission'
    }
  ];

  // Kaggle-Style Datasets Data
  const kaggleDatasets = [
    {
      id: 'ds-1',
      title: 'Maitri Meteorological Time-Series (Automatic Weather Station)',
      author: 'IMD Polar Wing & NCPOR',
      timeAgo: '4d ago',
      upvotes: 588,
      comments: 51,
      snippet: 'Continuous 10-minute meteorological logs from Schirmacher Oasis: ambient air temperature, barometric pressure, wind vectors, and solar radiation.',
      tags: ['Antarctica', 'AWS', 'Meteorology']
    },
    {
      id: 'ds-2',
      title: 'Kongsfjorden Fjord Hydrographic CTD Depth Profiles',
      author: 'IndARC Subsurface Mooring Team',
      timeAgo: '14d ago',
      upvotes: 342,
      comments: 28,
      snippet: 'Moored instrument sensor time-series recording temperature, salinity, turbidity, and deep currents at 192m depth in Svalbard Arctic waters.',
      tags: ['Arctic', 'Oceanography', 'Mooring']
    },
    {
      id: 'ds-3',
      title: 'Larsemann Hills Permafrost Borehole Temperature Gradient',
      author: 'Dr. Thamban Meloth & Cryosphere Div.',
      timeAgo: '1mo ago',
      upvotes: 189,
      comments: 14,
      snippet: 'Deep thermistor string measurements from 30m rock-boreholes surrounding Bharati Station assessing polar permafrost active-layer dynamics.',
      tags: ['Bharati', 'Permafrost', 'Geocryology']
    },
    {
      id: 'ds-4',
      title: 'Himalayan Gepang Gath Glacier DGPS Ablation Survey',
      author: 'Himansh Outpost Survey Wing',
      timeAgo: '2mo ago',
      upvotes: 120,
      comments: 9,
      snippet: 'Differential GPS elevation models and terminus ablation stakes tracking glacial lake outburst flood (GLOF) vulnerabilities.',
      tags: ['Himalaya', 'GLOF', 'Glaciology']
    }
  ];

  // News Articles Data (NEWS ARTICAL REFERENCE)
  const newsArticles = [
    {
      id: 'news-1',
      dateDay: '24',
      dateMonth: 'Sep',
      dateYear: '2026',
      title: 'New High-Resolution Weather Radar Installed at Bharati',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600',
      snippet: 'NCPOR atmospheric physicists complete commissioning of the micro-rain radar to track Antarctic blizzard nucleation and cloud microphysics.'
    },
    {
      id: 'news-2',
      dateDay: '19',
      dateMonth: 'Sep',
      dateYear: '2026',
      title: 'Swachh Sagar Surakshit Sagar 5.0 Beach Clean-up Success',
      image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=600',
      snippet: 'NCPOR volunteers and scientists mobilize across Miramar Beach, Goa, uniting for marine conservation and coastal plastic reduction.'
    },
    {
      id: 'news-3',
      dateDay: '04',
      dateMonth: 'Sep',
      dateYear: '2026',
      title: '44th Indian Antarctic Expedition Departs for Southern Ocean',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600',
      snippet: 'Chartered ice-class resupply vessel sets sail from Cape Town carrying scientific teams, deep-drilling equipment, and wintering personnel.'
    }
  ];

  const currentSlide = carouselSlides[activeSlide];

  return (
    <div className="space-y-12 pb-16 text-left">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. RESEARCH PAPER AS CAROUSEL REFERENCE                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
              <span>REACHER PAPER AS CAROUSEL REFERENCE</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-heading">
              Featured Research Papers & Publications
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveSlide(prev => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveSlide(prev => (prev === carouselSlides.length - 1 ? 0 : prev + 1))}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wide Spotlight Carousel Banner (Styling matching reference) */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white border border-amber-900/30 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Background Sparkle / Bokeh */}
          <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />

          {/* Left Speaker Photo with Glow */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-[0_0_40px_rgba(245,158,11,0.25)]">
              <img
                src={currentSlide.speakerImg}
                alt={currentSlide.speaker}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Stylized Typography */}
          <div className="flex-1 text-center md:text-left space-y-2 relative z-10">
            <div className="text-amber-400 font-serif italic text-2xl sm:text-3xl tracking-wide font-normal">
              {currentSlide.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans tracking-wide">
              {currentSlide.subtitle}
            </p>
            <div className="text-xs font-bold text-amber-200 pt-1">
              WITH {currentSlide.speaker.toUpperCase()}
            </div>
          </div>

          {/* Right Badges: Date, Venue, Partner Credits */}
          <div className="flex-shrink-0 text-center md:text-right space-y-3 relative z-10">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {currentSlide.date}
              </div>
              <div className="text-[11px] font-bold text-slate-400 tracking-wider">
                {currentSlide.venue}
              </div>
            </div>

            {/* Partner Pill Boxes */}
            <div className="inline-flex items-center space-x-2 bg-slate-900/90 border border-slate-700/80 rounded-xl p-2 text-[9px] font-bold text-slate-300">
              <div className="px-2 py-1 bg-slate-800 rounded">
                PRESENTED BY<br /><span className="text-amber-300">{currentSlide.presentedBy}</span>
              </div>
              <div className="px-2 py-1 bg-slate-800 rounded">
                CURATED BY<br /><span className="text-sky-300">{currentSlide.curatedBy}</span>
              </div>
              <div className="px-2 py-1 bg-slate-800 rounded">
                EXECUTED BY<br /><span className="text-emerald-300">{currentSlide.executedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. DATASET REFERENCES (Kaggle-Style Repository Search)      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
            <span>DATASET REFERENCES</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Scientific Datasets Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Faceted discovery across cryospheric observations, ice core logs, and sensor time-series
          </p>
        </div>

        {/* Top Kaggle-Style Category Pills */}
        <div className="flex items-center flex-wrap gap-2 pb-2 border-b border-slate-200">
          {[
            { label: 'Notebooks', count: '629' },
            { label: 'Datasets', count: '111' },
            { label: 'Topics', count: '97' },
            { label: 'Comments', count: '23' },
            { label: 'Models', count: '10' }
          ].map(pill => (
            <button
              key={pill.label}
              onClick={() => setActiveCategoryPill(pill.label)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activeCategoryPill === pill.label
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{pill.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategoryPill === pill.label ? 'bg-slate-800 text-slate-200' : 'bg-slate-200 text-slate-600'}`}>
                {pill.count}
              </span>
            </button>
          ))}
        </div>

        {/* 2-Column Layout: Sidebar Filters + Dataset List */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filter (Exact Match to Kaggle Reference) */}
          <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="font-extrabold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Filter by
            </div>

            {/* Date Radio Group */}
            <div className="space-y-2">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Date
              </div>
              {[
                { label: 'Last 90 days', count: 77 },
                { label: 'This week', count: 7 },
                { label: 'Today', count: 3 }
              ].map(opt => (
                <label key={opt.label} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-blue-600">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="dateFilter"
                      checked={dateFilter === opt.label}
                      onChange={() => setDateFilter(opt.label)}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold">{opt.count}</span>
                </label>
              ))}
            </div>

            {/* Viewed By You */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                Viewed By You
              </div>
              {[
                { label: 'Viewed', count: 7 },
                { label: 'Not Viewed', count: 872 }
              ].map(opt => (
                <label key={opt.label} className="flex items-center justify-between text-xs text-slate-700 cursor-pointer hover:text-blue-600">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="viewedFilter"
                      checked={viewedFilter === opt.label}
                      onChange={() => setViewedFilter(opt.label)}
                      className="text-blue-600 focus:ring-0"
                    />
                    <span>{opt.label}</span>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-bold">{opt.count}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Right Column: Results List */}
          <div className="lg:col-span-9 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
              <span className="font-bold text-slate-800">879 Results Found</span>
              <div className="flex items-center space-x-1">
                <span>Sort by:</span>
                <select className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer">
                  <option>Relevance</option>
                  <option>Most Upvotes</option>
                  <option>Latest</option>
                </select>
              </div>
            </div>

            {/* Dataset Cards List */}
            <div className="space-y-3">
              {kaggleDatasets.map(dataset => (
                <div
                  key={dataset.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex items-start justify-between gap-4"
                >
                  <div className="flex items-start space-x-3.5">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      ❄️
                    </div>
                    <div className="space-y-1">
                      <Link to={`/datasets/${dataset.id}`} className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors">
                        {dataset.title}
                      </Link>
                      <div className="text-[11px] text-slate-500">
                        Dataset • {dataset.timeAgo} • by <strong className="text-slate-700">{dataset.author}</strong>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">
                        {dataset.snippet}
                      </p>
                      <div className="flex items-center space-x-2 pt-2">
                        {dataset.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Upvotes Counter Badge */}
                  <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 flex-shrink-0">
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                    <span className="font-extrabold text-xs text-slate-900">{dataset.upvotes}</span>
                    <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {dataset.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Wireframe (2) Specification: see more -> link */}
            <div className="text-right pt-3">
              <Link
                to="/datasets"
                className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-blue-600 hover:text-blue-800"
              >
                <span>see more datasets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. NEWS ARTICLE REFERENCE (Latest News with Date Badges)    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
            <span>NEWS ARTICAL REFERENCE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Latest News
          </h2>
          <p className="text-xs text-slate-500">
            Institutional announcements, field milestones, and outreach press bulletins
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Image with Stacked Date Badge (Day/Month/Year) on Top-Left */}
              <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2 text-center shadow-md border border-slate-200 min-w-12">
                  <div className="text-sm font-black text-slate-900 leading-none">{article.dateDay}</div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">{article.dateMonth}</div>
                  <div className="text-[9px] font-semibold text-slate-400">{article.dateYear}</div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {article.snippet}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <a href="#read" className="text-xs font-bold text-blue-600 hover:text-blue-800">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
