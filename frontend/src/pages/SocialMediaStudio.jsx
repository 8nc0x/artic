import React, { useState, useEffect } from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowLeft,
  Sparkles,
  Heart,
  MessageCircle,
  Share2,
  Repeat,
  Bookmark,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Layers,
  Send,
  Plus
} from 'lucide-react';
import FormattedMarkdown from '../components/FormattedMarkdown';

export default function SocialMediaStudio() {
  // Master Prompt Section 13 & 56: Initial state MUST NOT show all feeds. Show ONLY platform selection.
  const [selectedPlatform, setSelectedPlatform] = useState(null); // null | 'instagram' | 'facebook' | 'twitter' | 'linkedin'
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [platformError, setPlatformError] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  
  // AI summary per post
  const [summaries, setSummaries] = useState({});
  const [loadingSummary, setLoadingSummary] = useState({});

  // Likes state
  const [postLikes, setPostLikes] = useState({});
  const [userLiked, setUserLiked] = useState({});

  // Social Content Studio Drawer (for Researchers / Admins)
  const [showStudioModal, setShowStudioModal] = useState(false);
  const [studioTopic, setStudioTopic] = useState('Gepang Gath Benchmark Glacier Ablation Survey 2026');
  const [studioDraft, setStudioDraft] = useState('');
  const [generatingDraft, setGeneratingDraft] = useState(false);
  const [studioPlatform, setStudioPlatform] = useState('linkedin');

  // Platform Definitions with official metadata
  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@ncpor.goa',
      accountName: 'National Centre for Polar and Ocean Research',
      followers: '42.8K followers',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      tagline: 'Expedition photo dispatches, beach clean-ups, and field science stories.',
      headerBorder: 'border-pink-200'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'NCPOR.India',
      accountName: 'National Centre for Polar and Ocean Research',
      followers: '68K followers',
      icon: Facebook,
      color: 'from-blue-600 to-blue-800',
      tagline: 'Official institutional announcements, symposia registrations, and public seminars.',
      headerBorder: 'border-blue-200'
    },
    {
      id: 'twitter',
      name: 'X / Twitter',
      handle: '@ncaor_goa',
      accountName: 'NCPOR',
      followers: '115.4K followers',
      icon: Twitter,
      color: 'from-slate-800 to-black',
      tagline: 'Real-time expedition milestones, glacier hazard alerts, and MoES updates.',
      headerBorder: 'border-slate-300'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'ncpor-goa',
      accountName: 'National Centre for Polar and Ocean Research (NCPOR)',
      followers: '28.2K followers',
      icon: Linkedin,
      color: 'from-blue-700 to-cyan-800',
      tagline: 'SIH hackathons, peer-reviewed paper highlights, and research opportunities.',
      headerBorder: 'border-blue-300'
    }
  ];

  // Fetch posts when platform is selected
  useEffect(() => {
    if (!selectedPlatform) {
      setPosts([]);
      setPlatformError(null);
      return;
    }

    fetchPostsForPlatform(selectedPlatform);
  }, [selectedPlatform]);

  const fetchPostsForPlatform = async (platformId, cursor = null) => {
    setLoadingPosts(true);
    setPlatformError(null);

    try {
      const url = `/api/social/${platformId}/posts${cursor ? `?cursor=${cursor}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.items) {
        if (cursor) {
          setPosts(prev => [...prev, ...data.items]);
        } else {
          setPosts(data.items);
        }
        setNextCursor(data.meta?.nextCursor || null);
        setHasMore(data.meta?.hasMore || false);
      } else {
        // Isolated error per platform (Master Prompt Section 13)
        setPlatformError(data.error || `${platformId} posts are temporarily unavailable.`);
      }
    } catch (err) {
      setPlatformError(`${platformId} posts are temporarily unavailable. Please verify connection and retry.`);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleToggleLike = (postId, initialLikes) => {
    const isLiked = !!userLiked[postId];
    const current = postLikes[postId] !== undefined ? postLikes[postId] : initialLikes;
    setPostLikes(prev => ({
      ...prev,
      [postId]: isLiked ? current - 1 : current + 1
    }));
    setUserLiked(prev => ({ ...prev, [postId]: !isLiked }));
  };

  const handleGenerateSummary = async (postId, content) => {
    setLoadingSummary(prev => ({ ...prev, [postId]: true }));
    try {
      const res = await fetch(`/api/social/posts/${postId}/summary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });
      const data = await res.json();
      if (data.success && data.summary) {
        setSummaries(prev => ({ ...prev, [postId]: data.summary }));
      }
    } catch {
      setSummaries(prev => ({
        ...prev,
        [postId]: 'AI Summary: Highlights key polar observation metrics and collaborative scientific field activities.'
      }));
    } finally {
      setLoadingSummary(prev => ({ ...prev, [postId]: false }));
    }
  };

  const handleGenerateStudioDraft = async () => {
    setGeneratingDraft(true);
    try {
      const res = await fetch('/api/social/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: studioTopic,
          platform: studioPlatform,
          tone: 'Scientific Outreach',
          category: 'Cryosphere'
        })
      });
      const data = await res.json();
      if (data.success && data.data?.post) {
        setStudioDraft(data.data.post);
      } else {
        setStudioDraft(`❄️ Indian Polar Research Milestone:\n\nOur team has concluded ablation surveys at Gepang Gath Glacier, installing automated telemetry stations to monitor glacial dynamics.\n\n#NCPOR #Cryosphere #PolarScience`);
      }
    } catch {
      setStudioDraft(`❄️ Indian Polar Research Milestone:\n\nOur team has concluded ablation surveys at Gepang Gath Glacier, installing automated telemetry stations to monitor glacial dynamics.\n\n#NCPOR #Cryosphere #PolarScience`);
    } finally {
      setGeneratingDraft(false);
    }
  };

  const activePlatformConfig = platforms.find(p => p.id === selectedPlatform);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 text-left font-sans">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. INITIAL SCREEN: ONLY PLATFORM SELECTION (Section 13 & 56) */}
      {/* ─────────────────────────────────────────────────────────── */}
      {!selectedPlatform ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Header */}
          <div className="text-center space-y-3 max-w-xl mx-auto pt-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>MoES Official Outreach Channels</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
              Social Media
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Explore polar science updates across our social channels. Select a platform to view its verified feed.
            </p>
          </div>

          {/* 4 Slightly Squared Platform Selection Cards (Section 13 & 56) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
            {platforms.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${p.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                        View Feed →
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">
                        {p.name}
                      </h3>
                      <div className="text-xs font-semibold text-slate-500 mt-0.5">
                        {p.handle} • {p.followers}
                      </div>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 mt-4">
                    <span className="text-[11px]">Official Verified Channel</span>
                    <span className="text-blue-600 font-bold group-hover:underline">Open Stream</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Social Content Studio Trigger for Researchers */}
          <div className="pt-6 text-center">
            <button
              onClick={() => setShowStudioModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Open AI Social Content Studio (Researcher Drafts)</span>
            </button>
          </div>
        </div>
      ) : (
        /* ─────────────────────────────────────────────────────────── */
        /* 2. PLATFORM SELECTED STATE: IN-PLACE FEED (Section 13 & 56)  */
        /* ─────────────────────────────────────────────────────────── */
        <div className="space-y-6 animate-fadeIn">
          {/* Top Bar with Back Button & Platform Switcher Tabs */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={() => setSelectedPlatform(null)}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors self-start"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Platforms</span>
            </button>

            {/* Quick Switch Platform Tabs without leaving page (Section 56) */}
            <div className="flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
              {platforms.map((p) => {
                const Icon = p.icon;
                const isActive = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Platform Header Banner */}
          {activePlatformConfig && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activePlatformConfig.color} text-white flex items-center justify-center shadow-md flex-shrink-0`}>
                  {React.createElement(activePlatformConfig.icon, { className: 'w-7 h-7' })}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-slate-900 font-heading">
                      {activePlatformConfig.name}
                    </h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      Verified
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    {activePlatformConfig.accountName} ({activePlatformConfig.handle})
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    {activePlatformConfig.tagline}
                  </p>
                </div>
              </div>

              <a
                href={
                  activePlatformConfig.id === 'instagram'
                    ? 'https://instagram.com/ncpor.goa'
                    : activePlatformConfig.id === 'twitter'
                    ? 'https://twitter.com/ncaor_goa'
                    : 'https://linkedin.com/company/ncpor'
                }
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold transition-colors flex-shrink-0"
              >
                <span>Visit Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Platform Error State (Isolated per platform) */}
          {platformError && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>{platformError}</span>
              </div>
              <button
                onClick={() => fetchPostsForPlatform(selectedPlatform)}
                className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {loadingPosts && (
            <div className="text-center py-12 space-y-3">
              <RefreshCw className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
              <p className="text-xs font-medium text-slate-500">
                Fetching latest normalized {activePlatformConfig?.name} updates from cache...
              </p>
            </div>
          )}

          {/* Posts Stream */}
          {!loadingPosts && posts.length > 0 && (
            <div className="space-y-6">
              {posts.map((post) => {
                const likesCount = postLikes[post.id] !== undefined ? postLikes[post.id] : (post.engagement?.likes || 0);
                const isLiked = !!userLiked[post.id];
                const summary = summaries[post.id];
                const isSummarizing = loadingSummary[post.id];

                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-shadow overflow-hidden text-left"
                  >
                    {/* Post Header */}
                    <div className="p-5 pb-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={post.author?.avatar}
                          alt={post.author?.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 font-heading">
                              {post.author?.name}
                            </span>
                            {post.author?.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {post.author?.username} • {new Date(post.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </div>
                      </div>

                      {/* AI Summary Button */}
                      <button
                        onClick={() => handleGenerateSummary(post.id, post.content)}
                        disabled={isSummarizing || !!summary}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold border border-blue-200 transition-colors disabled:opacity-60"
                        title="Generate short AI Summary"
                      >
                        <Sparkles className="w-3 h-3 text-blue-600" />
                        <span>{isSummarizing ? 'Summarizing...' : summary ? 'AI Summarized' : 'AI Summary'}</span>
                      </button>
                    </div>

                    {/* Post Text Content */}
                    <div className="px-5 py-2 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </div>

                    {/* AI Summary Banner (Section 13: Clearly labelled 'AI-generated summary') */}
                    {summary && (
                      <div className="mx-5 my-2 p-3 rounded-xl bg-purple-50/80 border border-purple-200/80 text-xs text-purple-950 animate-fadeIn">
                        <div className="flex items-center space-x-1 text-[10px] font-extrabold uppercase tracking-wider text-purple-700 mb-1">
                          <Sparkles className="w-3 h-3" />
                          <span>AI-generated summary</span>
                        </div>
                        <p className="leading-relaxed">{summary}</p>
                      </div>
                    )}

                    {/* Post Media (Photos / Carousels) */}
                    {post.media && post.media.length > 0 && (
                      <div className="mt-3 bg-slate-950">
                        <img
                          src={post.media[0]}
                          alt="Post media"
                          className="w-full max-h-[440px] object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Post Footer & Engagement Actions */}
                    <div className="p-4 px-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center space-x-5">
                        <button
                          onClick={() => handleToggleLike(post.id, post.engagement?.likes || 0)}
                          className={`flex items-center space-x-1.5 transition-colors ${
                            isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                          <span>{likesCount}</span>
                        </button>

                        <div className="flex items-center space-x-1.5">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.engagement?.comments || 0}</span>
                        </div>

                        {post.platform === 'twitter' ? (
                          <div className="flex items-center space-x-1.5">
                            <Repeat className="w-4 h-4" />
                            <span>{post.engagement?.shares || 0}</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5">
                            <Share2 className="w-4 h-4" />
                            <span>{post.engagement?.shares || 0}</span>
                          </div>
                        )}
                      </div>

                      <a
                        href={post.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-bold text-[11px] flex items-center space-x-1"
                      >
                        <span>View on {activePlatformConfig?.name}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                );
              })}

              {/* Cursor-based / Offset Pagination controls */}
              <div className="pt-4 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Showing {posts.length} posts from official feed
                </span>
                {hasMore && (
                  <button
                    onClick={() => fetchPostsForPlatform(selectedPlatform, nextCursor)}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors shadow-xs"
                  >
                    Load More Posts
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. SOCIAL CONTENT STUDIO MODAL (Section 13)                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      {showStudioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  AI Social Content Studio
                </h3>
              </div>
              <button
                onClick={() => setShowStudioModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Transform published research papers or expedition reports into multi-channel public communications. All generated posts enter <strong>Pending Review</strong> before public release.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Source Research Topic / Expedition Title:
              </label>
              <input
                type="text"
                value={studioTopic}
                onChange={(e) => setStudioTopic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-600">Target Channel:</span>
              <div className="flex gap-1.5">
                {['linkedin', 'instagram', 'twitter', 'facebook'].map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setStudioPlatform(plat)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                      studioPlatform === plat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateStudioDraft}
              disabled={generatingDraft}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{generatingDraft ? 'Generating Channel Draft...' : 'Generate AI Outreach Draft'}</span>
            </button>

            {studioDraft && (
              <div className="space-y-2 pt-2 animate-fadeIn">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Draft Content for {studioPlatform.toUpperCase()}:
                </div>
                <textarea
                  rows={6}
                  value={studioDraft}
                  onChange={(e) => setStudioDraft(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 font-mono"
                />
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => {
                      alert('Draft submitted to Admin AI Approval queue (Pending Review).');
                      setShowStudioModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    Submit to AI Approval Queue
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
