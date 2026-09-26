import React from 'react';
import { Link } from 'react-router-dom';

export default function PolarConnectLogo({ size = 'md', isDark = false, linkTo = '/' }) {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-lg', sub: 'text-[10px]' },
    lg: { icon: 'w-10 h-10', text: 'text-xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className="flex items-center space-x-2.5 group select-none">
      {/* High-Definition Solid Minimalist Polar Peak Crest */}
      <div className={`${currentSize.icon} rounded-lg bg-slate-900 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm border border-slate-800`}>
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main Solid Mountain Peak */}
          <path d="M16 4L28 26H4L16 4Z" fill="#0284c7" />
          {/* Shaded Facet for Depth */}
          <path d="M16 4L28 26H16V4Z" fill="#0369a1" />
          {/* Glacier Snowcap Peak */}
          <path d="M16 4L20 12L16 14L12 12L16 4Z" fill="#ffffff" />
          {/* Polar Star Accent */}
          <circle cx="23" cy="7" r="1.2" fill="#38bdf8" />
        </svg>
      </div>

      {/* Clean Typography Wordmark without CPR/NCPOR Badge */}
      <div className="text-left leading-tight">
        <div className="flex items-center">
          <span className={`font-extrabold tracking-tight ${currentSize.text} ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Polar<span className="text-sky-600">Connect</span>
          </span>
        </div>
        <p className={`font-medium tracking-tight truncate hidden sm:block ${currentSize.sub} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Indian Polar Research &amp; Expedition Portal
        </p>
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} className="inline-flex items-center">{content}</Link>;
  }
  return content;
}
