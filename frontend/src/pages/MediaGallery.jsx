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
  Camera,
  Sparkles,
  GraduationCap,
  Megaphone
} from 'lucide-react';
import SocialMediaStudio from './SocialMediaStudio';
import SmartEducation from './SmartEducation';

export default function MediaGallery() {
  const [hubTab, setHubTab] = useState('gallery'); // 'gallery' | 'social' | 'education'
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'photo' | 'video'
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // AI Image Studio States
  const [imagePrompt, setImagePrompt] = useState('Bharati research station in Antarctica under green aurora borealis');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [generatingImage, setGeneratingImage] = useState(false);

  const handleGenerateAiImage = async (customPrompt) => {
    const p = customPrompt || imagePrompt;
    setGeneratingImage(true);
    try {
      const res = await fetch('/api/media/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: p })
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedImage(data);
      }
    } catch (err) {
      console.error('Image generation error:', err);
    } finally {
      setGeneratingImage(false);
    }
  };


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
      {/* 0. Top Hub Mode Switcher */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-1.5 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setHubTab('gallery')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'gallery'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Field Media &amp; Videos</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setHubTab('ai-image');
              if (!generatedImage) handleGenerateAiImage();
            }}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'ai-image'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Visual Studio (Images)</span>
          </button>

          <button
            type="button"
            onClick={() => setHubTab('social')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'social'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>AI Social Outreach Studio</span>
          </button>

          <button
            type="button"
            onClick={() => setHubTab('education')}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              hubTab === 'education'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Smart Education (Students)</span>
          </button>
        </div>
      </div>

      {hubTab === 'social' && <SocialMediaStudio />}
      {hubTab === 'education' && <SmartEducation />}

      {/* ======================================================== */}
      {/* TAB: AI POLAR IMAGE STUDIO                               */}
      {/* ======================================================== */}
      {hubTab === 'ai-image' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                    AI Polar Visual Studio
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                  Generate photorealistic scientific illustrations, expedition concept art, and high-latitude field imagery powered by Gemini prompt engineering and Flux neural rendering.
                </p>
              </div>
            </div>

            {/* Presets */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Curated Polar Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Bharati research station in Antarctica under green aurora borealis',
                  'IndARC underwater moored oceanographic observatory in Kongsfjorden fjord',
                  'Himadri Arctic research station in Ny-Ålesund under midnight sun',
                  'Indian scientific research vessel navigating heavy pack ice in Southern Ocean',
                  'High-altitude Himalayan glacier ice core drilling expedition at Chandra basin'
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setImagePrompt(preset);
                      handleGenerateAiImage(preset);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-700 text-xs font-semibold transition-colors border border-slate-200/60"
                  >
                    {preset.split(' in ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt Input */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Custom Scientific Visual Prompt:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="e.g. Emperor penguin colony near ice shelf in Larsemann Hills..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => handleGenerateAiImage(imagePrompt)}
                  disabled={generatingImage}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition-colors disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{generatingImage ? 'Synthesizing...' : 'Generate 8K Image'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Generated Image Showcase */}
          {generatingImage ? (
            <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-xs">
              <div className="w-10 h-10 border-3 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-sm font-bold text-slate-900 font-heading">
                Synthesizing Polar Image with Flux &amp; Gemini...
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Expanding scientific prompt with atmospheric physics and rendering 1024x768 neural pixels.
              </p>
            </div>
          ) : generatedImage ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl max-h-[550px] flex items-center justify-center">
                <img
                  src={generatedImage.imageUrl}
                  alt={generatedImage.originalPrompt}
                  className="w-full h-full object-contain max-h-[550px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                <div className="md:col-span-8 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      Original Prompt
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      {generatedImage.originalPrompt}
                    </h3>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-800 block mb-0.5">Gemini Scientific Prompt Expansion:</span>
                    <p className="italic">{generatedImage.expandedPrompt}</p>
                  </div>
                </div>

                <div className="md:col-span-4 flex flex-col justify-end space-y-2">
                  <a
                    href={generatedImage.imageUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Full-Res (1024x768)</span>
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedImage.imageUrl);
                      alert('Image link copied to clipboard!');
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center space-x-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Copy Direct Image Link</span>
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}


      {hubTab === 'gallery' && (
        <>
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
        </>
      )}
    </div>
  );
}

