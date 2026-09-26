import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, Layers, Compass, ExternalLink, RefreshCw } from 'lucide-react';

export default function OpenPolarMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeStation, setActiveStation] = useState(null);
  const [activeLayer, setActiveLayer] = useState('osm'); // 'osm' | 'satellite' | 'topo'

  const tileLayers = {
    osm: {
      name: 'OpenStreetMap',
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }
    },
    satellite: {
      name: 'Satellite View',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      }
    },
    topo: {
      name: 'Topographic',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      options: {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
      }
    }
  };

  const stations = [
    {
      id: 'maitri',
      name: 'Maitri Station',
      region: 'Schirmacher Oasis, Antarctica',
      lat: -70.766,
      lng: 11.736,
      temp: '-14.2°C',
      wind: '32 kts (ESE)',
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
      temp: '-11.8°C',
      wind: '24 kts (E)',
      condition: 'Polar Cirrus',
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
      temp: '-6.4°C',
      wind: '14 kts (NNE)',
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
      temp: '-18.6°C',
      wind: '18 kts (W)',
      condition: 'Alpine High-Pressure',
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
        maxZoom: 18,
        scrollWheelZoom: false,
        attributionControl: true
      });

      // Default to official Standard OpenStreetMap Layer (Zero watermark, No key required)
      const initialLayerConfig = tileLayers.osm;
      const tileLayer = L.tileLayer(initialLayerConfig.url, initialLayerConfig.options).addTo(map);
      tileLayerRef.current = tileLayer;

      // Add Custom Station Markers
      stations.forEach((st) => {
        const customIcon = L.divIcon({
          className: 'custom-station-pin',
          html: `
            <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 34px; height: 34px;">
              <div style="position: absolute; width: 34px; height: 34px; border-radius: 50%; background: rgba(2, 132, 199, 0.25);"></div>
              <div style="width: 18px; height: 18px; border-radius: 50%; background: #0284c7; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.35);"></div>
            </div>
          `,
          iconSize: [34, 34],
          iconAnchor: [17, 17]
        });

        const marker = L.marker([st.lat, st.lng], { icon: customIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: inherit; font-size: 12px; color: #0f172a; padding: 2px; max-width: 240px;">
            <div style="font-weight: 800; font-size: 13px; color: #0284c7; margin-bottom: 2px;">${st.name}</div>
            <div style="font-size: 10px; color: #64748b; margin-bottom: 6px;">${st.region}</div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 6px 8px; margin-bottom: 6px;">
              <span style="font-weight: 800; font-size: 13px; color: #0284c7;">${st.temp}</span>
              <span style="font-size: 10px; color: #0369a1; font-weight: 600;">${st.wind}</span>
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

  // Handle switching map tile layers
  const switchLayer = (layerKey) => {
    setActiveLayer(layerKey);
    const L = window.L;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const config = tileLayers[layerKey] || tileLayers.osm;
    const newLayer = L.tileLayer(config.url, config.options).addTo(map);
    tileLayerRef.current = newLayer;
  };

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
    <div className="space-y-3 font-sans">
      {/* Light-Themed Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
        <div className="flex items-center space-x-2 text-slate-900 font-bold">
          <Navigation className="w-4 h-4 text-blue-600" />
          <span>Interactive Polar Observatories Map</span>
        </div>

        {/* Station Navigation Buttons & Layer Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Layer Selector */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
            <button
              onClick={() => switchLayer('osm')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeLayer === 'osm'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              OpenStreetMap
            </button>
            <button
              onClick={() => switchLayer('satellite')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeLayer === 'satellite'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => switchLayer('topo')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                activeLayer === 'topo'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Topographic
            </button>
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block" />

          {/* Station Pills */}
          <button
            onClick={resetView}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
              !activeStation
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
          >
            Global View
          </button>

          {stations.map((st) => (
            <button
              key={st.id}
              onClick={() => flyToStation(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                activeStation?.id === st.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${activeStation?.id === st.id ? 'text-white' : 'text-blue-600'}`} />
              <span>{st.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[480px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Active Station Telemetry Card */}
        {activeStation && (
          <div className="absolute bottom-4 left-4 z-20 max-w-sm bg-white rounded-xl p-4 border border-slate-200 shadow-xl text-left animate-fadeIn">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {activeStation.status}
                </span>
                <h4 className="text-sm font-bold text-slate-900 font-heading mt-1">
                  {activeStation.name}
                </h4>
                <p className="text-xs text-slate-500">{activeStation.region}</p>
              </div>
              <button
                onClick={() => setActiveStation(null)}
                className="text-slate-400 hover:text-slate-700 p-1 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                <div className="text-[10px] text-slate-500 font-medium">AWS Temperature</div>
                <div className="text-sm font-bold text-blue-700 font-mono">{activeStation.temp}</div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center">
                <div className="text-[10px] text-slate-500 font-medium">Wind Telemetry</div>
                <div className="text-sm font-bold text-slate-800 font-mono">{activeStation.wind}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
              {activeStation.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
