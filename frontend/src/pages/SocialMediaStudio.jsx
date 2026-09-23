import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Layers,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  Image as ImageIcon
} from 'lucide-react';

export default function SocialMediaStudio() {
  const [mode, setMode] = useState('standard'); // 'standard' | 'carousel'
  const [platform, setPlatform] = useState('LinkedIn');
  const [tone, setTone] = useState('Public Outreach');
  const [sourceTitle, setSourceTitle] = useState('Sea Ice Variability in the Southern Ocean Sector of Antarctica during 2010–2023');
  
  // Standard Post States
  const [draftPost, setDraftPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  // Carousel Post States
  const [carouselData, setCarouselData] = useState(null);
  const [loadingCarousel, setLoadingCarousel] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [copiedCarousel, setCopiedCarousel] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);

  // Generate standard post
  const generatePost = async () => {
    setLoading(true);
    setPublished(false);
    try {
      const res = await fetch('/api/social/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: sourceTitle,
          platform,
          tone,
          category: 'Cryosphere'
        })
      });
      const data = await res.json();
      if (data.success && data.data?.post) {
        setDraftPost(data.data.post);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate 5-slide carousel post
  const generateCarousel = async () => {
    setLoadingCarousel(true);
    setActiveSlide(0);
    try {
      const res = await fetch('/api/social/posts/generate-carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: sourceTitle,
          platform: 'LinkedIn'
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCarouselData(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCarousel(false);
    }
  };

  useEffect(() => {
    generatePost();
  }, [platform]);

  const handleCopyStandard = () => {
    navigator.clipboard.writeText(draftPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAllSlides = () => {
    if (!carouselData || !carouselData.slides) return;
    const slidesText = carouselData.slides
      .map(
        (s) =>
          `[SLIDE ${s.slide_number}: ${s.badge}]\n${s.headline}\n${s.body}\nVisual Suggestion: ${s.visual_prompt}\n`
      )
      .join('\n---\n\n');
    navigator.clipboard.writeText(slidesText);
    setCopiedCarousel(true);
    setTimeout(() => setCopiedCarousel(false), 2000);
  };

  const handleCopyCarouselCaption = () => {
    if (!carouselData) return;
    navigator.clipboard.writeText(carouselData.caption || '');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-heading">
                Social Media Dissemination Studio
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              Transform technical polar research into high-impact social media posts and multi-slide carousels for public outreach.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center space-x-1 p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setMode('standard')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mode === 'standard' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Standard Post
            </button>
            <button
              onClick={() => {
                setMode('carousel');
                if (!carouselData) generateCarousel();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                mode === 'carousel' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Multi-Slide Carousel</span>
            </button>
          </div>
        </div>

        {/* Source Scientific Topic Input */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Select or Enter Polar Topic / Paper Title:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sourceTitle}
                onChange={(e) => setSourceTitle(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={mode === 'standard' ? generatePost : generateCarousel}
                disabled={loading || loadingCarousel}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Regenerate with AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: STANDARD POST GENERATOR                          */}
      {/* ======================================================== */}
      {mode === 'standard' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-700">Platform:</span>
                {['LinkedIn', 'Instagram', 'X / Twitter'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      platform === p ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={handleCopyStandard}
                className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Post'}</span>
              </button>
            </div>

            <textarea
              rows={8}
              value={draftPost}
              onChange={(e) => setDraftPost(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:bg-white leading-relaxed resize-none font-sans"
              placeholder="Generating post with Gemini..."
            />
          </div>

          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
              Outreach Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-slate-500 leading-relaxed">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Accredits Ministry of Earth Sciences and NCPOR.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Includes direct URL to open datasets on the NPDC portal.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>Uses approved public outreach scientific tags.</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: MULTI-SLIDE CAROUSEL GENERATOR                   */}
      {/* ======================================================== */}
      {mode === 'carousel' && (
        <div className="space-y-6">
          {loadingCarousel ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-bold text-slate-800">Generating 5-Slide Carousel with Gemini...</p>
              <p className="text-xs text-slate-400 mt-1">Structuring Hook, Scientific Challenge, Expedition Findings &amp; Climate Connection</p>
            </div>
          ) : carouselData && carouselData.slides ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Interactive Slide Card Viewport */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative min-h-[380px] flex flex-col justify-between overflow-hidden">
                  {/* Subtle Aurora Ambient Glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  {/* Slide Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-400 bg-sky-500/20 px-2.5 py-1 rounded-full border border-sky-400/30">
                      {carouselData.slides[activeSlide]?.badge || 'POLAR DISCOVERY'}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      Slide {activeSlide + 1} of {carouselData.slides.length}
                    </span>
                  </div>

                  {/* Slide Content */}
                  <div className="my-6 space-y-3">
                    <h2 className="text-xl sm:text-2xl font-black text-white font-heading leading-tight">
                      {carouselData.slides[activeSlide]?.headline}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {carouselData.slides[activeSlide]?.body}
                    </p>
                  </div>

                  {/* Slide Graphic Prompt & Branding */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <div className="flex items-center space-x-1.5 text-slate-400">
                      <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                      <span className="truncate max-w-[280px]">
                        Graphic: {carouselData.slides[activeSlide]?.visual_prompt}
                      </span>
                    </div>
                    <span className="font-extrabold text-white text-[10px] tracking-wider">
                      NCPOR • MoES
                    </span>
                  </div>
                </div>

                {/* Slider Navigation Controls */}
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                      disabled={activeSlide === 0}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 transition-colors shadow-2xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveSlide((prev) => Math.min(carouselData.slides.length - 1, prev + 1))}
                      disabled={activeSlide === carouselData.slides.length - 1}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 transition-colors shadow-2xs"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-slate-600 pl-2">
                      Slide {activeSlide + 1} of {carouselData.slides.length}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopyAllSlides}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
                    >
                      {copiedCarousel ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCarousel ? 'Slides Copied!' : 'Copy All 5 Slides'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Slide List & Caption */}
              <div className="lg:col-span-5 space-y-4">
                {/* Slide Quick Jump List */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading mb-2">
                    Carousel Structure
                  </h4>
                  {carouselData.slides.map((slide, idx) => (
                    <div
                      key={slide.slide_number}
                      onClick={() => setActiveSlide(idx)}
                      className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                        activeSlide === idx
                          ? 'border-blue-500 bg-blue-50/70 font-bold text-blue-900 shadow-2xs'
                          : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Slide {slide.slide_number}</span>
                        <span className="text-[10px] text-blue-600 font-bold">{slide.badge}</span>
                      </div>
                      <p className="truncate font-semibold text-slate-800">{slide.headline}</p>
                    </div>
                  ))}
                </div>

                {/* Social Caption */}
                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-heading">
                      Accompanying Post Caption
                    </h4>
                    <button
                      onClick={handleCopyCarouselCaption}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center space-x-1"
                    >
                      {copiedCaption ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCaption ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                    {carouselData.caption}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
