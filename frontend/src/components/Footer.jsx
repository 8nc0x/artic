import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, MapPin, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Organization */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <span className="text-sm">❄️</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black tracking-tight text-white font-heading">NCPOR</h3>
                <p className="text-[10px] text-sky-400 font-medium tracking-tight">Ministry of Earth Sciences</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              National Centre for Polar and Ocean Research is India's premier R&amp;D institution responsible for country's research activities in the Polar and Southern Ocean realms.
            </p>
            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" />
                <span>Headland Sada, Vasco da Gama, Goa - 403804, India</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-3">
              Polar Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Discovery Hub</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">Explore Polar Regions</Link>
              </li>
              <li>
                <Link to="/publications" className="hover:text-white transition-colors">Research Papers &amp; Reports</Link>
              </li>
              <li>
                <Link to="/datasets" className="hover:text-white transition-colors">Scientific Datasets Catalog</Link>
              </li>
              <li>
                <Link to="/expeditions" className="hover:text-white transition-colors">Virtual Expedition &amp; 3D Stations</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Outreach & Media */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-3">
              Media &amp; Education
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link to="/media" className="hover:text-white transition-colors">Photographs &amp; Videos</Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-white transition-colors">Smart Education for Students</Link>
              </li>
              <li>
                <Link to="/education" className="hover:text-white transition-colors">Interactive Polar Quizzes</Link>
              </li>
              <li>
                <Link to="/social-studio" className="hover:text-white transition-colors">Social Media Outreach Studio</Link>
              </li>
              <li>
                <Link to="/knowledge-graph" className="hover:text-white transition-colors">Research Connections Graph</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Observatories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-heading mb-3">
              India's Polar Outposts
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">Himadri Station</span>
                <span className="text-[10px] text-slate-400">Ny-Ålesund, Svalbard, Arctic (78°N)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">Bharati &amp; Maitri</span>
                <span className="text-[10px] text-slate-400">Larsemann Hills &amp; Schirmacher, Antarctica (69°S, 70°S)</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <span className="font-bold text-white block">IndARC Mooring</span>
                <span className="text-[10px] text-slate-400">Kongsfjorden Subsurface Underwater Observatory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 National Centre for Polar and Ocean Research (NCPOR), Ministry of Earth Sciences, Govt. of India. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="text-emerald-400 font-semibold flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MoES Problem Statement ID 26063</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
