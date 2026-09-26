import React from 'react';
import { Link } from 'react-router-dom';

export default function PolarConnectLogo({ size = 'md', isDark = false, showTag = true, linkTo = '/' }) {
  // Size variants
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-base', tag: 'text-[9px]', sub: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-lg', tag: 'text-[10px]', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', tag: 'text-xs', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className="flex items-center space-x-2.5 group select-none">
      {/* Minimalist Geometric Mountain / Polar Peaks Icon */}
      <div className={`relative ${currentSize.icon} rounded-xl bg-gradient-to-tr from-blue-700 via-sky-600 to-indigo-800 p-0.5 shadow-md shadow-blue-500/15 flex items-center justify-center group-hover:scale-105 transition-transform flex-shrink-0`}>
        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden p-1">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background Mountain Peak */}
            <path
              d="M20 6L33 30H7L20 6Z"
              fill="url(#peakGradDark)"
              opacity="0.85"
            />
            {/* Foreground Mountain Peak (Snowy faceted) */}
            <path
              d="M13 16L24 33H2L13 16Z"
              fill="url(#peakGradLight)"
            />
            {/* Glacial Ice Ridge Line */}
            <path
              d="M20 6L23 18L13 33"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* North Polar Star / Spark */}
            <circle cx="28" cy="10" r="1.5" fill="#facc15" />
            <path
              d="M28 6V14M24 10H32"
              stroke="#facc15"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="peakGradDark" x1="20" y1="6" x2="20" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#1e3a8a" />
              </linearGradient>
              <linearGradient id="peakGradLight" x1="13" y1="16" x2="13" y2="33" gradientUnits="userSpaceOnUse">
                <stop stopColor="#e0f2fe" />
                <stop offset="1" stopColor="#0284c7" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography Wordmark */}
      <div className="text-left">
        <div className="flex items-center space-x-2">
          <span className={`font-black tracking-tight font-heading ${currentSize.text} ${isDark ? 'text-white' : 'text-slate-900 group-hover:text-blue-600 transition-colors'}`}>
            Polar<span className="text-sky-500">Connect</span>
          </span>
          {showTag && (
            <span className={`font-bold tracking-wide px-2 py-0.5 rounded-full border ${currentSize.tag} ${
              isDark
                ? 'bg-blue-950/80 text-sky-300 border-sky-800'
                : 'bg-blue-50 text-blue-700 border-blue-200/80'
            }`}>
              NCPOR
            </span>
          )}
        </div>
        <p className={`font-medium tracking-tight truncate hidden sm:block ${currentSize.sub} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          National Centre for Polar and Ocean Research • MoES
        </p>
      </div>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }
  return content;
}
