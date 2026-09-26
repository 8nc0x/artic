import React from 'react';
import { Image as ImageIcon, Video, Play, MapPin, ExternalLink, Youtube } from 'lucide-react';

export default function MediaCard({ item, onClick, isVideo = false }) {
  if (!item) return null;

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between text-left group"
    >
      {/* Visual Header */}
      <div className={`relative ${isVideo ? 'aspect-video' : 'aspect-square'} bg-slate-950 overflow-hidden`}>
        {isVideo && item.youtubeEmbedUrl ? (
          /* Live Playing Video Embed (Muted Autoplay) with YouTube Source */
          <div className="w-full h-full relative">
            <iframe
              src={`${item.youtubeEmbedUrl}?autoplay=1&mute=1&loop=1&playlist=${item.youtubeId || ''}&controls=1&modestbranding=1&rel=0`}
              title={item.title}
              className="w-full h-full border-0 pointer-events-auto"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* YouTube Overlay Pill */}
            <a
              href={item.youtubeUrl || `https://www.youtube.com/watch?v=${item.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2.5 right-2.5 z-20 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] flex items-center space-x-1 shadow-md transition-colors"
            >
              <Youtube className="w-3.5 h-3.5 fill-white" />
              <span>YouTube</span>
            </a>
          </div>
        ) : (
          /* Standard Photo / Poster (No Subtitles, Consistent Clean Square Aspect) */
          <div
            onClick={() => onClick && onClick(item)}
            className="w-full h-full cursor-pointer relative"
          >
            <img
              src={item.url || item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
              loading="lazy"
            />
            {/* Media Type Badge */}
            <span className="absolute top-2.5 left-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-950/85 text-white backdrop-blur-md flex items-center space-x-1 border border-white/10 shadow-xs">
              <ImageIcon className="w-3 h-3 text-sky-400" />
              <span>PHOTO</span>
            </span>

            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950/85 text-slate-200 backdrop-blur-md border border-white/10 shadow-xs">
              {item.resolution || '4K UHD'}
            </span>
          </div>
        )}
      </div>

      {/* Content Details (Strictly NO Subtitle/Description for Photos) */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          {/* Location & Expedition Meta */}
          <div className="flex items-center space-x-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <MapPin className="w-3 h-3 text-sky-600 flex-shrink-0" />
            <span className="truncate">{item.location || item.region || 'Antarctica'}</span>
            {item.expedition && (
              <>
                <span className="text-slate-300">•</span>
                <span className="text-blue-700 truncate">{item.expedition}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors font-heading">
            {item.title}
          </h3>

          {/* Only videos show description if desired; photos have NO subtitle per instruction */}
          {isVideo && item.description && (
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1">
              {item.description}
            </p>
          )}
        </div>

        {/* Footer Meta */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 mt-2">
          <span className="text-slate-400 text-[10px] truncate max-w-[140px]">
            {item.author || item.source || 'NCPOR Dissemination Wing'}
          </span>

          {isVideo ? (
            <a
              href={item.youtubeUrl || `https://www.youtube.com/watch?v=${item.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className="text-red-600 hover:text-red-700 font-bold text-[11px] flex items-center space-x-1"
            >
              <span>Watch Video</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <button
              onClick={() => onClick && onClick(item)}
              className="text-blue-600 font-bold text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5"
            >
              <span>View Photo</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
