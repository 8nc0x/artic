import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Send, CheckCircle2, Copy, Check, Share2, ThumbsUp, RefreshCw } from 'lucide-react';

export default function SocialMediaStudio() {
  const [platform, setPlatform] = useState('X / Twitter');
  const [tone, setTone] = useState('Public Outreach');
  const [sourceTitle, setSourceTitle] = useState('Sea Ice Variability in the Southern Ocean Sector of Antarctica during 2010–2023');
  const [draftPost, setDraftPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);
  const [published, setPublished] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePost = async () => {
    setLoading(true);
    setApproved(false);
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

  useEffect(() => {
    generatePost();
  }, [platform]);

  const handlePublish = async () => {
    if (!draftPost) return;
    try {
      await fetch('/api/social/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author_handle: 'ncpor_moes',
          author_name: 'NCPOR',
          content: draftPost,
          platform: platform,
          images: ["https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600"]
        })
      });
      setPublished(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-polar-blue" />
          <span>Social Media Dissemination Studio</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Responsible AI-assisted outreach pipeline: Transform complex polar science datasets and papers into platform-specific social posts with mandatory human review.
        </p>

        {/* Source Content Input */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Source Scientific Document or Dataset:</label>
            <input
              type="text"
              value={sourceTitle}
              onChange={(e) => setSourceTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none focus:border-polar-blue"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Platform Selector */}
            <div className="flex items-center space-x-1.5">
              <span className="text-xs font-semibold text-slate-600">Platform:</span>
              {['X / Twitter', 'LinkedIn', 'Instagram'].map(p => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    platform === p ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Tone Selector */}
            <div className="flex items-center space-x-1.5 pl-4 border-l border-slate-200">
              <span className="text-xs font-semibold text-slate-600">Audience Tone:</span>
              {['Public Outreach', 'Academic & Rigorous', 'Student Friendly'].map(t => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    tone === t ? 'bg-purple-100 text-purple-800 font-bold' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={generatePost}
              disabled={loading}
              className="ml-auto inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition-all active:scale-95"
            >
              <Sparkles className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Regenerate Draft</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor (Human in the Loop) */}
        <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Step 1: Edit &amp; Refine Draft
            </h3>
            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
              Human Review Required
            </span>
          </div>

          <textarea
            rows={10}
            value={draftPost}
            onChange={(e) => setDraftPost(e.target.value)}
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs md:text-sm text-slate-800 leading-relaxed font-sans focus:outline-none focus:bg-white focus:border-polar-blue"
            placeholder="AI is generating draft..."
          />

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(draftPost);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={() => setApproved(true)}
              className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                approved
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{approved ? 'Approved by Editor' : 'Approve for Publication'}</span>
            </button>
          </div>
        </div>

        {/* Live Platform Preview */}
        <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Step 2: Live {platform} Preview
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">@ncpor_moes</span>
          </div>

          {/* Social Post Preview Card */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-blue-900 text-white font-extrabold text-xs flex items-center justify-center">
                NC
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">National Centre for Polar and Ocean Research</span>
                <span className="text-[10px] text-slate-500 font-medium">@ncpor_moes • Official MoES Portal</span>
              </div>
            </div>

            <p className="text-xs text-slate-800 whitespace-pre-line leading-relaxed">
              {draftPost || "Your generated social copy will appear here in real time..."}
            </p>

            <div className="rounded-xl overflow-hidden h-36 bg-slate-900 border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=800"
                alt="Antarctica Polar Landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handlePublish}
              disabled={!approved || published}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                published
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                  : approved
                  ? 'bg-polar-blue hover:bg-blue-600 text-white shadow-md active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {published ? '✓ Published to NCPOR Outreach Feed' : approved ? 'Publish to NCPOR Public Feed' : 'Requires Approval to Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
