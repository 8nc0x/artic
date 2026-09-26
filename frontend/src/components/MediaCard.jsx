import React from 'react';
import { Image as ImageIcon, Video, Play, MapPin, Compass, ExternalLink } from 'lucide-react';

export default function MediaCard({ item, onClick, isVideo = false }) {
  if (!item) return null;

  return (
    <div
      onClick={() => onClick && onClick(item)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer group text-left"
    >
      {/* Visual Header */}
      <div className={`relative ${isVideo ? 'aspect-video' : 'aspect-4/3'} bg-slate-950 overflow-hidden`}>
        <img
          src={item.url || item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />

        {/* Media Type Badge */}
        <span className="absolute top-2.5 left-2.5 text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-slate-950/85 text-white backdrop-blur-md flex items-center space-x-1 border border-white/10 shadow-xs">
          {isVideo ? (
            <>
              <Video className="w-3 h-3 text-rose-400" />
              <span>VIDEO</span>
            </>
          ) : (
            <>
              <ImageIcon className="w-3 h-3 text-sky-400" />
              <span>PHOTO</span>
            </>
          )}
        </span>

        {/* Resolution / Duration Badge */}
        <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-950/85 text-slate-200 backdrop-blur-md border border-white/10 shadow-xs">
          {isVideo ? (item.duration || '03:45') : (item.resolution || '4K UHD')}
        </span>

        {/* Play Icon for Videos */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-115 group-hover:bg-blue-600 transition-all">
              <Play className="w-5 h-5 fill-white ml-0.5" />
            </div>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
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

          {/* Description */}
          {item.description && (
            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Footer Author & Action */}
        <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 mt-2">
          <span className="text-slate-400 text-[10px] truncate max-w-[130px]">
            {item.author || item.source || 'NCPOR Polar Cell'}
          </span>
          <span className="text-blue-600 font-bold text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
            <span>View Details</span>
            <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
