import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Thermometer, Wind, Compass, ExternalLink, RefreshCw } from 'lucide-react';

export default function OpenPolarMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeStation, setActiveStation] = useState(null);

  const stations = [
    {
      id: 'maitri',
      name: 'Maitri Station',
      region: 'Schirmacher Oasis, Antarctica',
      lat: -70.766,
      lng: 11.736,
      temp: '-12.5°C',
      wind: '22 km/h (SE)',
      condition: 'Clear Antarctic Sky',
      elevation: '117 m',
      status: 'Active (37th Wintering Crew)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/An_aerial_view_of_the_Indian_Station_Maitri%2C_Antarctica_on_February_2%2C_2005.jpg',
      description: 'India’s second permanent Antarctic research base, operating since 1989 in Schirmacher Oasis. Coordinates atmospheric, geomagnetic, and meteorology telemetry.'
    },
    {
      id: 'bharati',
      name: 'Bharati Station',
      region: 'Larsemann Hills, Antarctica',
      lat: -69.408,
      lng: 76.187,
      temp: '-10.4°C',
      wind: '18 km/h (E)',
      condition: 'Scattered Cirrus',
      elevation: '35 m',
      status: 'Active (Commissioned 2012)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Bharati_permanent_Antarctic_research_station.jpg',
      description: 'Ultra-modern Antarctic research facility constructed on the promontory between Thala Fjord and Quilty Bay. Focuses on oceanography and continental breakup.'
    },
    {
      id: 'himadri',
      name: 'Himadri Station',
      region: 'Ny-Ålesund, Svalbard, Arctic (79°N)',
      lat: 78.917,
      lng: 11.933,
      temp: '-0.6°C',
      wind: '12 km/h (NW)',
      condition: 'Fjord Mist',
      elevation: '15 m',
      status: 'Active (Operational since 2008)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Indian_station_1.JPG',
      description: 'India’s permanent Arctic research base in Spitsbergen. Houses aerosol spectrometers, fjord telemetry, and atmospheric profiling lasers.'
    },
    {
      id: 'himansh',
      name: 'Himansh High-Altitude Station',
      region: 'Spiti Valley, Himachal Pradesh (Himalaya)',
      lat: 32.400,
      lng: 77.617,
      temp: '5.5°C',
      wind: '9 km/h (S)',
      condition: 'Alpine Sunshine',
      elevation: '4,050 m',
      status: 'Active (Third Pole Cryosphere)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Bara_Shigri_Glacier.jpg/800px-Bara_Shigri_Glacier.jpg',
      description: 'High-altitude Himalayan cryospheric station established to monitor benchmark glaciers (Chhota Shigri, Batal, Samudra Tapu) and GLOF dynamics.'
    }
  ];

  useEffect(() => {
    let isMounted = true;

    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Function to initialize map once Leaflet JS is available
    const initMap = () => {
      if (!isMounted || !mapContainerRef.current || mapInstanceRef.current) return;
      const L = window.L;
      if (!L) return;

      // Create Leaflet Map
      const map = L.map(mapContainerRef.current, {
        center: [10, 45],
        zoom: 2,
        minZoom: 1,
        maxZoom: 12,
        scrollWheelZoom: false,
        attributionControl: true
      });

      // CartoDB Positron Clean Light Terrain Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add Custom Station Markers
      stations.forEach((st) => {
        const customIcon = L.divIcon({
          className: 'custom-station-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px;">
              <div style="position: absolute; width: 32px; height: 32px; border-radius: 50%; background: rgba(2, 132, 199, 0.25); animation: pulse 2s infinite;"></div>
              <div style="width: 16px; height: 16px; border-radius: 50%; background: #0284c7; border: 2.5px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([st.lat, st.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; padding: 2px; max-width: 220px;">
            <div style="font-weight: 800; font-size: 13px; color: #0369a1; margin-bottom: 2px;">${st.name}</div>
            <div style="font-size: 10px; color: #64748b; margin-bottom: 6px;">${st.region}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 6px 8px; margin-bottom: 6px;">
              <span style="font-weight: 800; font-size: 14px; color: #e11d48;">${st.temp}</span>
              <span style="font-size: 10px; color: #0284c7; font-weight: 600;">${st.wind}</span>
            </div>
            <div style="font-size: 11px; color: #334155; line-height: 1.4;">${st.description}</div>
            <div style="font-size: 9px; color: #64748b; margin-top: 6px; font-family: monospace;">Elevation: ${st.elevation}</div>
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.on('click', () => {
          setActiveStation(st);
        });
      });

      mapInstanceRef.current = map;
      setMapLoaded(true);
    };

    // Load Leaflet Script if not present
    if (!window.L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const flyToStation = (station) => {
    setActiveStation(station);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([station.lat, station.lng], 6, {
        duration: 1.8
      });
    }
  };

  const resetView = () => {
    setActiveStation(null);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([10, 45], 2, { duration: 1.5 });
    }
  };

  return (
    <div className="space-y-4">
      {/* Control Navigation Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-white font-bold">
          <Navigation className="w-4 h-4 text-sky-400" />
          <span>Interactive OpenStreetMap:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={resetView}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              !activeStation
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            Global View
          </button>

          {stations.map((st) => (
            <button
              key={st.id}
              onClick={() => flyToStation(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center space-x-1.5 ${
                activeStation?.id === st.id
                  ? 'bg-sky-500 text-white shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{st.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[460px] rounded-3xl overflow-hidden border border-slate-700 shadow-xl bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Active Station Telemetry Card */}
        {activeStation && (
          <div className="absolute bottom-4 left-4 z-20 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-2xl text-left animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  {activeStation.status}
                </span>
                <h4 className="text-sm font-black text-slate-900 font-heading mt-1">
                  {activeStation.name}
                </h4>
                <p className="text-[11px] text-slate-500">{activeStation.region}</p>
              </div>
              <button
                onClick={() => setActiveStation(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-2 text-center">
                <div className="text-[10px] text-rose-600 font-bold">AWS Temperature</div>
                <div className="text-base font-black text-rose-700">{activeStation.temp}</div>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-xl p-2 text-center">
                <div className="text-[10px] text-sky-600 font-bold">Wind Telemetry</div>
                <div className="text-base font-black text-sky-700">{activeStation.wind.split(' ')[0]}</div>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed mt-2.5">
              {activeStation.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
