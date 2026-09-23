import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Video,
  Search,
  Filter,
  Download,
  Share2,
  Maximize2,
  MapPin,
  Calendar,
  User,
  X,
  Play,
  Check,
  Tag,
  Eye,
  Camera
} from 'lucide-react';

export default function MediaGallery() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'photo' | 'video'
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      type: selectedType,
      region: selectedRegion,
      category: selectedCategory
    });

    setLoading(true);
    fetch(`/api/media?${params.toString()}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setMediaList(d.items);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedType, selectedRegion, selectedCategory]);

  const categories = [
    'All',
    'Stations & Facilities',
    'Wildlife & Ecology',
    'Science in Action',
    'Aurora & Sky',
    'Expeditions & Vessels'
  ];

  const handleCopyLink = (item) => {
    navigator.clipboard.writeText(window.location.origin + item.url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16 text-left">
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-sky-50 text-sky-700">
                <ImageIcon className="w-5 h-5" />
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                Polar Photographs &amp; Video Repository
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              High-resolution photographic imagery and expedition footage captured across Maitri, Bharati, Himadri, and Southern Ocean cruises.
            </p>
          </div>

          {/* Type Toggle Pills */}
          <div className="flex items-center space-x-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setSelectedType('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedType === 'All' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Assets
            </button>
            <button
              onClick={() => setSelectedType('photo')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                selectedType === 'photo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                selectedType === 'video' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {/* 2. Category Chips Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase tracking-wider">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-polar-blue text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Region filter dropdown */}
          <div className="ml-auto">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-800 font-semibold focus:outline-none"
            >
              <option value="All">All Polar Regions</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Arctic">Arctic</option>
              <option value="Southern Ocean">Southern Ocean</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mediaList.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxItem(item)}
            className="group relative bg-white rounded-2xl border border-polar-border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            {/* Thumbnail Container */}
            <div className="relative aspect-video overflow-hidden bg-slate-900">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Type Badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center space-x-1.5">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center space-x-1">
                  {item.type === 'video' ? <Video className="w-3 h-3 text-red-400" /> : <ImageIcon className="w-3 h-3 text-sky-400" />}
                  <span className="uppercase">{item.type}</span>
                </span>
                {item.type === 'video' && (
                  <span className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-mono">
                    {item.duration}
                  </span>
                )}
              </div>

              {/* Resolution badge */}
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                {item.resolution}
              </span>

              {/* Play icon overlay for videos */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md group-hover:bg-polar-blue flex items-center justify-center transition-colors shadow-lg">
                    <Play className="w-5 h-5 text-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>

            {/* Info Container */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  <span>{item.region}</span>
                  <span>•</span>
                  <span>{item.station}</span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 group-hover:text-polar-blue transition-colors leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {item.caption}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
                <span className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span className="truncate max-w-[140px]">{item.photographer}</span>
                </span>
                <span className="text-polar-blue font-bold flex items-center space-x-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>View Details</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row text-left max-h-[92vh]">
            {/* Left: Media Viewport */}
            <div className="md:w-3/5 bg-slate-950 flex flex-col items-center justify-center relative min-h-[300px]">
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 left-4 md:hidden p-1.5 rounded-full bg-black/60 text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={lightboxItem.url}
                alt={lightboxItem.title}
                className="max-h-[550px] w-full object-contain"
              />

              {lightboxItem.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="p-4 rounded-full bg-polar-blue text-white shadow-xl cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Detailed Metadata Column */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[550px]">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {lightboxItem.category}
                  </span>
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="hidden md:block p-1 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-sm md:text-base font-extrabold text-slate-900 mt-3 leading-snug">
                  {lightboxItem.title}
                </h2>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {lightboxItem.caption}
                </p>

                {/* Metadata Table */}
                <div className="mt-4 space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Expedition</span>
                    <span className="text-slate-800 font-semibold">{lightboxItem.expedition}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Station / Site</span>
                    <span className="text-slate-800 font-semibold">{lightboxItem.station}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Coordinates</span>
                    <span className="text-slate-800 font-mono text-[11px]">{lightboxItem.coordinates}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Photographer</span>
                    <span className="text-slate-800 font-semibold">{lightboxItem.photographer}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400 font-medium">Capture Date</span>
                    <span className="text-slate-800 font-semibold">{lightboxItem.date}</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400 font-medium">Resolution</span>
                    <span className="text-slate-800 font-bold">{lightboxItem.resolution}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Scientific &amp; Geographic Tags
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {lightboxItem.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-2">
                <button
                  onClick={() => handleCopyLink(lightboxItem)}
                  className="flex-1 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? "Link Copied!" : "Share Asset"}</span>
                </button>

                <a
                  href={lightboxItem.url}
                  target="_blank"
                  rel="noreferrer"
                  download
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Downloading media: ${lightboxItem.title} (${lightboxItem.resolution})`);
                  }}
                  className="flex-1 py-2 rounded-xl bg-polar-blue hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download High-Res</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
