import React from 'react';
import { Info, Building2, MapPin, Globe, Shield, Award } from 'lucide-react';

export default function AboutNCPOR() {
  return (
    <div className="space-y-6 pb-12 text-left">
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <Info className="w-6 h-6 text-polar-blue" />
          <span>About National Centre for Polar and Ocean Research (NCPOR)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Autonomous research institution under the Ministry of Earth Sciences (MoES), Government of India.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-slate-900">Institutional Mandate</h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              NCPOR is India's premier scientific agency for coordinating and executing the Indian Antarctic, Arctic, Southern Ocean, and Himalayan glaciology programs. Since its establishment, NCPOR has maintained continuous year-round presence on the white continent, spearheaded multi-sensor satellite data assimilation, and managed the National Polar Data Center (NPDC).
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              Under MoES Problem Statement ID 26063, this Integrated Knowledge Repository and Media Dissemination Portal centralizes decades of expedition reports, scientific datasets, and peer-reviewed literature into an AI-powered semantic exploration network.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Globe className="w-5 h-5 text-polar-blue mb-1" />
                <h4 className="text-xs font-bold text-slate-900">Global Polar Presence</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">3 Antarctic Stations, 1 Arctic Station, and dedicated oceanic research vessels.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <Shield className="w-5 h-5 text-purple-600 mb-1" />
                <h4 className="text-xs font-bold text-slate-900">National Polar Data Center</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">FAIR-compliant repository for all Indian polar research outputs.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Contact &amp; Headquarters</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p className="font-semibold text-slate-900">Headland Sada, Vasco-da-Gama, Goa - 403804, India</p>
              <p>Email: info@ncpor.res.in</p>
              <p>Phone: +91-832-2525600</p>
              <p>Portal: npdc.ncpor.res.in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
