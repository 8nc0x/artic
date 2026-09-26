import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Share2,
  Search,
  ExternalLink,
  X,
  Compass,
  Building2,
  Layers,
  Database,
  RotateCcw,
  Zap,
  Info,
  ChevronRight,
  Maximize2,
  Activity,
  Thermometer,
  Wind,
  Download,
  FileText,
  Radio,
  Globe,
  Cpu,
  Sparkles,
  CheckCircle2,
  Sliders,
  Filter
} from 'lucide-react';

export default function PolarRelationalGraph() {
  const containerRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showAllLinks, setShowAllLinks] = useState(false);
  const [streamActive, setStreamActive] = useState(true);
  const [activeTab, setActiveTab] = useState('telemetry'); // 'telemetry' | 'datasets' | 'publications'
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // 24 Authentic, Scientifically Rigorous Polar Research Nodes
  const initialNodes = [
    // Core Institutions
    {
      id: 'ncpor',
      label: 'NCPOR National Hub',
      shortLabel: 'NCPOR Goa',
      category: 'Institutions',
      type: 'core',
      x: 50,
      y: 45,
      radius: 44,
      color: '#0284c7', // Slate Blue
      textColor: '#ffffff',
      icon: Building2,
      tag: 'Headquarters • Goa',
      coordinates: '15°24′N 73°48′E',
      status: 'Active Command Hub',
      description: 'National Centre for Polar and Ocean Research, MoES. Premier autonomous institute orchestrating Indian Antarctic, Arctic, Southern Ocean, and Himalayan expeditions.',
      telemetry: [
        { label: 'Expedition Command', value: '44th IAE Ongoing' },
        { label: 'Active Bases', value: '5 Stations + 1 Mooring' },
        { label: 'Data Relay', value: 'Continuous MoES Uplink' },
        { label: 'Open Archives', value: '184 Scientific Repositories' }
      ],
      datasets: [
        { name: 'NCPOR National Polar Repository Master Index', format: 'GeoJSON / API', size: '128 MB' },
        { name: 'Unified Indian Polar Expedition Catalogue (1981-2026)', format: 'CSV', size: '24.5 MB' }
      ],
      publications: [
        { title: 'Four Decades of Indian Scientific Endeavours in Antarctica and the Arctic', journal: 'Polar Science (Elsevier)', doi: '10.1016/j.polar.2021.100720' }
      ],
      connectedIds: ['moes', 'antarctica_domain', 'arctic_domain', 'himalaya_domain', 'southern_ocean_domain', 'partner_isro', 'partner_imd', 'partner_iig']
    },
    {
      id: 'moes',
      label: 'Ministry of Earth Sciences',
      shortLabel: 'MoES Delhi',
      category: 'Institutions',
      type: 'governing',
      x: 50,
      y: 16,
      radius: 36,
      color: '#1e3a8a', // Dark Navy
      textColor: '#ffffff',
      icon: Globe,
      tag: 'Prithvi Bhavan • New Delhi',
      coordinates: '28°35′N 77°13′E',
      status: 'Apex Ministry',
      description: 'Nodal Ministry of the Government of India overseeing national polar policy, Deep Ocean Mission, atmospheric sciences, and oceanographic research.',
      telemetry: [
        { label: 'Policy Authority', value: 'Indian Antarctic Act 2022' },
        { label: 'Flagship Missions', value: 'Polar & Deep Ocean' }
      ],
      datasets: [
        { name: 'MoES National Polar Policy & Environmental Guidelines', format: 'PDF / Archive', size: '8.4 MB' }
      ],
      publications: [
        { title: 'India’s Arctic Policy: Building a Partnership for Sustainable Development', journal: 'Government of India Whitepaper', doi: '10.5281/zenodo.moes.arctic.2022' }
      ],
      connectedIds: ['ncpor']
    },

    // Regional Domains
    {
      id: 'antarctica_domain',
      label: 'Antarctic Continental Ice Sheet',
      shortLabel: 'Antarctica',
      category: 'Domains',
      type: 'domain',
      x: 22,
      y: 40,
      radius: 38,
      color: '#0d9488', // Teal
      textColor: '#ffffff',
      icon: Layers,
      tag: 'Dronning Maud Land • Larsemann Hills',
      coordinates: '70°S to 90°S',
      status: 'Continuous Monitoring',
      description: 'Continental ice-sheet mass balance, sub-ice shelf cavities in Prydz Bay, katabatic winds, and permafrost borehole paleoclimate.',
      telemetry: [
        { label: 'Active Bases', value: 'Maitri & Bharati' },
        { label: 'Ice Sheet Thickness', value: 'Avg 2,160 m' },
        { label: 'Mean Annual Temp', value: '-11.2°C Coastal' }
      ],
      datasets: [
        { name: 'Antarctic Surface Mass Balance & Ablation Records', format: 'NetCDF (.nc)', size: '94.2 MB' }
      ],
      publications: [
        { title: 'Ice-shelf ocean interactions and basal melting in Prydz Bay, East Antarctica', journal: 'Journal of Geophysical Research', doi: '10.1029/2019JC015682' }
      ],
      connectedIds: ['ncpor', 'maitri_station', 'bharati_station', 'dakshin_gangotri', 'dataset_ice_core']
    },
    {
      id: 'arctic_domain',
      label: 'High Arctic Svalbard Sector',
      shortLabel: 'High Arctic',
      category: 'Domains',
      type: 'domain',
      x: 78,
      y: 35,
      radius: 38,
      color: '#0284c7', // Sky Blue
      textColor: '#ffffff',
      icon: Layers,
      tag: '79°N • Kongsfjorden Archipelago',
      coordinates: '78°55′N 11°56′E',
      status: 'Arctic Amplification Study',
      description: 'Fjord oceanography, Atlantic Water inflow, clean-air aerosol characterization, and Arctic-Indian Monsoon teleconnection studies.',
      telemetry: [
        { label: 'Base Facility', value: 'Himadri Station' },
        { label: 'Deep Mooring', value: 'IndARC at 192m' },
        { label: 'Sea Surface Temp', value: '-1.2°C to +2.4°C' }
      ],
      datasets: [
        { name: 'Kongsfjorden Fjord Hydrography & Atlantic Incursion CTD Series', format: 'NetCDF / CSV', size: '112.5 MB' }
      ],
      publications: [
        { title: 'Influence of Atlantic Water intrusions on Arctic fjord ecosystem dynamics', journal: 'Polar Biology', doi: '10.1007/s00300-020-02758-z' }
      ],
      connectedIds: ['ncpor', 'himadri_station', 'indarc_mooring', 'dataset_arctic_hydro']
    },
    {
      id: 'himalaya_domain',
      label: 'Third Pole Himalayan Cryosphere',
      shortLabel: 'Himalayas',
      category: 'Domains',
      type: 'domain',
      x: 70,
      y: 75,
      radius: 36,
      color: '#059669', // Emerald
      textColor: '#ffffff',
      icon: Layers,
      tag: 'Chandra-Bhaga Basin • Spiti',
      coordinates: '32°24′N 77°37′E',
      status: 'Glacier Mass Balance',
      description: 'High-altitude benchmark glacier ablation, seasonal snow cover, runoff hydrology, and Glacial Lake Outburst Flood (GLOF) mitigation.',
      telemetry: [
        { label: 'Base Camp', value: 'Himansh Base (4,050m)' },
        { label: 'Glaciers Studied', value: 'Batal, Chhota Shigri, Samudra Tapu' },
        { label: 'Annual Mass Loss', value: '-0.52 m w.e./year' }
      ],
      datasets: [
        { name: 'Western Himalayan Glacier Ablation & DGPS Velocity Series', format: 'Parquet / CSV', size: '48.0 MB' }
      ],
      publications: [
        { title: 'Long-term mass balance and ice volume changes of benchmark glaciers in Chandra Basin', journal: 'The Cryosphere (EGU)', doi: '10.5194/tc-14-3629-2020' }
      ],
      connectedIds: ['ncpor', 'himansh_station', 'dataset_spiti_glof']
    },
    {
      id: 'southern_ocean_domain',
      label: 'Southern Ocean Biogeochemical Domain',
      shortLabel: 'Southern Ocean',
      category: 'Domains',
      type: 'domain',
      x: 30,
      y: 78,
      radius: 36,
      color: '#4f46e5', // Indigo
      textColor: '#ffffff',
      icon: Layers,
      tag: '40°S to 70°S Transect',
      coordinates: '40°S to 70°S, 48°E to 58°E',
      status: 'Annual Marine Expeditions',
      description: 'Antarctic Circumpolar Current hydrography, Southern Ocean eddy dynamics, carbon dioxide sequestration, and trace metal biogeochemistry.',
      telemetry: [
        { label: 'Cruises Conducted', value: '12 Scientific Expeditions' },
        { label: 'CTD Stations', value: '148 Deep-Sea Casts' },
        { label: 'CO2 Sink Rate', value: '0.42 Pg C / year' }
      ],
      datasets: [
        { name: 'Southern Ocean Biogeochemical & Trace Metal Cruise CTD Data', format: 'CSV / NetCDF', size: '76.8 MB' }
      ],
      publications: [
        { title: 'Biogeochemical cycling and air-sea carbon flux in the Indian sector of Southern Ocean', journal: 'Deep Sea Research Part II', doi: '10.1016/j.dsr2.2019.104689' }
      ],
      connectedIds: ['ncpor', 'dataset_southern_carbon']
    },

    // Field Stations & Observatories
    {
      id: 'maitri_station',
      label: 'Maitri Inland Antarctic Station',
      shortLabel: 'Maitri Base',
      category: 'Stations',
      type: 'station',
      x: 12,
      y: 56,
      radius: 34,
      color: '#d97706', // Amber
      textColor: '#ffffff',
      icon: Building2,
      tag: 'AWS: -12.5°C • 117m ASL',
      coordinates: '70°45′57″S 11°44′09″E',
      status: 'Active Wintering (365 Days)',
      description: 'Commissioned in 1989 in Schirmacher Oasis. Operates continuous IMD Automated Weather Stations, fluxgate magnetometers, and ozone soundings.',
      telemetry: [
        { label: 'Ambient Temperature', value: '-12.5°C' },
        { label: 'Wind Velocity', value: '28 kts (SSE)' },
        { label: 'Barometric Pressure', value: '984.2 hPa' },
        { label: 'Crew On-Site', value: '25 Scientists & Engineers' }
      ],
      datasets: [
        { name: 'Maitri IMD 1-Minute Automated Weather Station Record (2000-2026)', format: 'CSV', size: '82.0 MB' },
        { name: 'Schirmacher Oasis Geomagnetic Pulsation Records (IIG)', format: 'NetCDF', size: '44.3 MB' }
      ],
      publications: [
        { title: 'Atmospheric boundary layer and surface energy balance over Schirmacher Oasis', journal: 'Atmospheric Research', doi: '10.1016/j.atmosres.2021.105574' }
      ],
      connectedIds: ['antarctica_domain', 'sensor_aws', 'sensor_riometer', 'partner_imd', 'partner_iig']
    },
    {
      id: 'bharati_station',
      label: 'Bharati Permanent Antarctic Base',
      shortLabel: 'Bharati Base',
      category: 'Stations',
      type: 'station',
      x: 24,
      y: 20,
      radius: 34,
      color: '#ea580c', // Orange
      textColor: '#ffffff',
      icon: Building2,
      tag: 'AWS: -10.4°C • 35m ASL',
      coordinates: '69°24′28″S 76°11′14″E',
      status: 'Green Base • High Bandwidth Uplink',
      description: 'State-of-the-art facility in Larsemann Hills commissioned in 2012. Features real-time ISRO satellite payload data reception and permafrost boreholes.',
      telemetry: [
        { label: 'Ambient Temperature', value: '-10.4°C' },
        { label: 'Wind Velocity', value: '19 kts (E)' },
        { label: 'Satellite Downlink', value: 'ISRO Telemetry Active' },
        { label: 'Borehole Thermistor', value: 'Depth: 65m (-8.2°C)' }
      ],
      datasets: [
        { name: 'Larsemann Hills Permafrost Borehole Temperature Series', format: 'NetCDF', size: '34.1 MB' },
        { name: 'Bharati Coastal Meteorology & Ocean Wave Sensor Stream', format: 'CSV', size: '56.7 MB' }
      ],
      publications: [
        { title: 'Permafrost thermal state and active-layer dynamics in Larsemann Hills, East Antarctica', journal: 'Permafrost and Periglacial Processes', doi: '10.1002/ppp.2085' }
      ],
      connectedIds: ['antarctica_domain', 'sensor_aws', 'partner_isro']
    },
    {
      id: 'himadri_station',
      label: 'Himadri Arctic Research Base',
      shortLabel: 'Himadri Base',
      category: 'Stations',
      type: 'station',
      x: 88,
      y: 22,
      radius: 34,
      color: '#0891b2', // Cyan
      textColor: '#ffffff',
      icon: Building2,
      tag: 'AWS: -6.4°C • 78°55′N',
      coordinates: '78°55′00″N 11°56′00″E',
      status: 'Year-Round Active Arctic Facility',
      description: 'India’s permanent Arctic base at Ny-Ålesund, Svalbard (Norway). Houses optical aethalometers, radiometers, and aerosol characterization instruments.',
      telemetry: [
        { label: 'Ambient Temperature', value: '-6.4°C' },
        { label: 'Wind Velocity', value: '14 kts (NE)' },
        { label: 'Black Carbon (Aethalometer)', value: '28.4 ng/m³' },
        { label: 'Latitude', value: '78°55′N (Ny-Ålesund)' }
      ],
      datasets: [
        { name: 'Himadri Atmospheric Aerosol & Solar Radiation Profiler Data', format: 'CSV', size: '38.2 MB' },
        { name: 'Ny-Ålesund Clean-Air Trace Gas Concentrations', format: 'NetCDF', size: '29.0 MB' }
      ],
      publications: [
        { title: 'Physical and optical properties of atmospheric aerosols over Ny-Ålesund, Arctic', journal: 'Atmospheric Environment', doi: '10.1016/j.atmosenv.2020.117621' }
      ],
      connectedIds: ['arctic_domain', 'sensor_aethalometer', 'indarc_mooring']
    },
    {
      id: 'indarc_mooring',
      label: 'IndARC Subsurface Ocean Observatory',
      shortLabel: 'IndARC Mooring',
      category: 'Stations',
      type: 'observatory',
      x: 88,
      y: 50,
      radius: 33,
      color: '#7c3aed', // Purple
      textColor: '#ffffff',
      icon: Radio,
      tag: '192m Depth • Kongsfjorden',
      coordinates: '78°59′N 11°49′E',
      status: 'Year-Round Autonomous Subsurface Mooring',
      description: 'India’s first multi-sensor moored subsea observatory deployed at 192m depth in Kongsfjorden fjord, logging year-round seawater temperature, salinity, and currents.',
      telemetry: [
        { label: 'Deployment Depth', value: '192 meters' },
        { label: 'Water Temperature', value: '-1.24°C' },
        { label: 'Practical Salinity', value: '34.86 PSU' },
        { label: 'Current Velocity (ADCP)', value: '0.31 m/s (NW)' }
      ],
      datasets: [
        { name: 'IndARC 10-Year Subsurface CTD & ADCP Master Time-Series (2014-2025)', format: 'NetCDF / Parquet', size: '142.8 MB' }
      ],
      publications: [
        { title: 'Seasonal variability of Atlantic Water intrusion in Kongsfjorden: Insights from IndARC observatory', journal: 'Deep Sea Research Part I', doi: '10.1016/j.dsr.2021.103598' }
      ],
      connectedIds: ['arctic_domain', 'himadri_station', 'sensor_ctd', 'dataset_arctic_hydro']
    },
    {
      id: 'himansh_station',
      label: 'Himansh Cryosphere Research Facility',
      shortLabel: 'Himansh Base',
      category: 'Stations',
      type: 'station',
      x: 84,
      y: 80,
      radius: 34,
      color: '#16a34a', // Green
      textColor: '#ffffff',
      icon: Building2,
      tag: 'AWS: -18.6°C • 4,050m ASL',
      coordinates: '32°24′N 77°37′E',
      status: 'High Altitude Remote Field Lab',
      description: 'High-altitude research facility in Sutri Dhaka, Chandra Basin, Spiti Valley (4,050m ASL). Logs benchmark glacier mass balance and meteorological parameters.',
      telemetry: [
        { label: 'Elevation', value: '4,050 m ASL' },
        { label: 'Ambient Temperature', value: '-18.6°C' },
        { label: 'Ice Ablation Velocity', value: '22.4 m/year' },
        { label: 'Glacier Mass Balance', value: '-0.48 m w.e.' }
      ],
      datasets: [
        { name: 'Chandra Basin High-Altitude AWS & Cryo-Hydrological Observations', format: 'CSV', size: '28.9 MB' }
      ],
      publications: [
        { title: 'Glacio-hydrological modeling of Chandra Basin in the Western Himalayas', journal: 'Journal of Hydrology', doi: '10.1016/j.jhydrol.2022.128145' }
      ],
      connectedIds: ['himalaya_domain', 'sensor_dgps', 'dataset_spiti_glof']
    },
    {
      id: 'dakshin_gangotri',
      label: 'Historical Dakshin Gangotri Monument',
      shortLabel: 'Dakshin Gangotri',
      category: 'Stations',
      type: 'historic',
      x: 10,
      y: 28,
      radius: 30,
      color: '#b45309', // Amber Dark
      textColor: '#ffffff',
      icon: Building2,
      tag: 'Ice Shelf • 70°05′S (1983)',
      coordinates: '70°05′S 12°00′E',
      status: 'Antarctic Treaty Heritage Site #44',
      description: 'India’s historic first permanent base constructed in 1983-84. Preserved under the Antarctic Treaty as an ice-core calibration and heritage monument.',
      telemetry: [
        { label: 'Commissioned', value: '26 January 1984' },
        { label: 'Site Status', value: 'Preserved under Ice' },
        { label: 'Historical Value', value: 'Birth of Indian Polar Science' }
      ],
      datasets: [
        { name: 'Historical 1st-8th Indian Antarctic Expedition Meteorological Logs (1981-1989)', format: 'CSV / PDF Archive', size: '52.0 MB' }
      ],
      publications: [
        { title: 'The Genesis of Indian Polar Exploration: Construction of Dakshin Gangotri', journal: 'Historical Polar Studies', doi: '10.1080/00322474.1985.9932402' }
      ],
      connectedIds: ['antarctica_domain']
    },

    // Scientific Sensor Arrays
    {
      id: 'sensor_aws',
      label: 'IMD Polar Automated Weather Station Array',
      shortLabel: 'AWS Telemetry',
      category: 'Sensors',
      type: 'sensor',
      x: 18,
      y: 70,
      radius: 31,
      color: '#0369a1', // Sky Dark
      textColor: '#ffffff',
      icon: Cpu,
      tag: 'Continuous Satellite Stream',
      status: 'Live Real-Time Telemetry',
      description: 'Multi-parameter polar weather stations logging ambient temperature, wind vector, barometric pressure, solar radiation, and snow depth.',
      telemetry: [
        { label: 'Sampling Rate', value: '1 Minute Sampling' },
        { label: 'Telemetry Uplink', value: 'INSAT-3DR / Iridium' },
        { label: 'Parameters', value: 'Temp, Humidity, Wind, Pressure, Flux' }
      ],
      datasets: [
        { name: 'Real-Time IMD Polar Meteorological Live Feed', format: 'REST API / JSON', size: 'Streaming' }
      ],
      publications: [
        { title: 'Performance and calibration of automated weather stations in extreme polar climates', journal: 'Journal of Atmospheric and Oceanic Technology', doi: '10.1175/JTECH-D-18-0112.1' }
      ],
      connectedIds: ['maitri_station', 'bharati_station', 'partner_imd']
    },
    {
      id: 'sensor_ctd',
      label: 'Seabird SBE-19plus CTD & ADCP Array',
      shortLabel: 'CTD Ocean Profiler',
      category: 'Sensors',
      type: 'sensor',
      x: 74,
      y: 54,
      radius: 31,
      color: '#6366f1', // Indigo
      textColor: '#ffffff',
      icon: Activity,
      tag: '0 - 2,000m Water Column',
      status: 'Hydrographic Precision Array',
      description: 'Conductivity, Temperature, and Depth (CTD) profilers coupled with Acoustic Doppler Current Profilers (ADCP) logging ocean stratification and current vectors.',
      telemetry: [
        { label: 'Temp Resolution', value: '0.0001 °C' },
        { label: 'Conductivity Accuracy', value: '0.0003 S/m' },
        { label: 'ADCP Acoustic Frequency', value: '300 kHz' }
      ],
      datasets: [
        { name: 'Arctic & Southern Ocean Deep Hydrographic CTD Cast Archives', format: 'NetCDF (.nc)', size: '210 MB' }
      ],
      publications: [
        { title: 'High-resolution oceanographic measurements of high-latitude coastal currents', journal: 'Ocean Science', doi: '10.5194/os-17-745-2021' }
      ],
      connectedIds: ['indarc_mooring', 'dataset_arctic_hydro']
    },
    {
      id: 'sensor_riometer',
      label: '30 MHz Riometer & Fluxgate Magnetometer',
      shortLabel: 'Geomagnetism & Ionosphere',
      category: 'Sensors',
      type: 'sensor',
      x: 36,
      y: 60,
      radius: 30,
      color: '#be185d', // Pink Dark
      textColor: '#ffffff',
      icon: Zap,
      tag: 'IIG Maitri Facility',
      status: 'Space Weather Monitoring',
      description: 'Relative Ionospheric Opacity Meter (Riometer) and 3-axis fluxgate magnetometers recording geomagnetic storms, auroral absorption, and solar wind coupling.',
      telemetry: [
        { label: 'Frequency', value: '30.0 MHz Wideband' },
        { label: 'Sampling Rate', value: '10 Hz Fast Magnetic' },
        { label: 'Solar Storm Detection', value: 'Real-Time Kp Alerting' }
      ],
      datasets: [
        { name: 'Maitri Geomagnetic Observational Records (2010-2026)', format: 'IAGA-2002 / ASCII', size: '64.5 MB' }
      ],
      publications: [
        { title: 'Auroral substorm dynamics observed by 30 MHz riometer at Indian Antarctic Station Maitri', journal: 'Space Weather (AGU)', doi: '10.1029/2020SW002598' }
      ],
      connectedIds: ['maitri_station', 'partner_iig']
    },
    {
      id: 'sensor_aethalometer',
      label: '7-Wavelength Aethalometer & Sunphotometer',
      shortLabel: 'Aerosol Profiler',
      category: 'Sensors',
      type: 'sensor',
      x: 72,
      y: 15,
      radius: 30,
      color: '#0e7490', // Cyan Dark
      textColor: '#ffffff',
      icon: Activity,
      tag: 'Himadri Clean Air Lab',
      status: 'Aerosol Optical Depth (AOD)',
      description: 'Continuous monitoring of black carbon, organic carbon, and aerosol optical depth across 370 nm to 950 nm spectral bands.',
      telemetry: [
        { label: 'Wavelengths', value: '370, 470, 520, 590, 660, 880, 950 nm' },
        { label: 'Black Carbon', value: '28.4 ng/m³' },
        { label: 'Optical Depth (500nm)', value: '0.042 (Clean Pristine Air)' }
      ],
      datasets: [
        { name: 'Arctic High-Latitude Black Carbon Continuous Time Series', format: 'CSV', size: '18.4 MB' }
      ],
      publications: [
        { title: 'Long-range transport of anthropogenic aerosols into the High Arctic', journal: 'Science of The Total Environment', doi: '10.1016/j.scitotenv.2021.147852' }
      ],
      connectedIds: ['himadri_station']
    },
    {
      id: 'sensor_dgps',
      label: 'Trimble Dual-Frequency DGPS & Stake Network',
      shortLabel: 'Cryo-DGPS Array',
      category: 'Sensors',
      type: 'sensor',
      x: 64,
      y: 90,
      radius: 30,
      color: '#15803d', // Green Dark
      textColor: '#ffffff',
      icon: Activity,
      tag: 'Himansh • Chandra Basin',
      status: 'Millimeter Crustal & Ice Shift',
      description: 'Sub-centimeter precision differential GPS network tracking glacier surface velocity, terminus retreat, and ice-cliff ablation.',
      telemetry: [
        { label: 'Precision', value: '±3 mm Horizontal / ±5 mm Vertical' },
        { label: 'Chhota Shigri Velocity', value: '22.4 m/yr' },
        { label: 'Terminus Retreat Rate', value: '-8.5 m/year' }
      ],
      datasets: [
        { name: 'Himalayan Benchmark Glacier Velocity & Terminus Positions', format: 'GeoTIFF / CSV', size: '42.1 MB' }
      ],
      publications: [
        { title: 'Differential GPS tracking of velocity variations on Himalayan debris-covered glaciers', journal: 'Annals of Glaciology', doi: '10.1017/aog.2019.41' }
      ],
      connectedIds: ['himansh_station', 'dataset_spiti_glof']
    },

    // Datasets
    {
      id: 'dataset_ice_core',
      label: 'Central Dronning Maud Land Paleoclimate Ice Core',
      shortLabel: 'Ice Core Archive',
      category: 'Datasets',
      type: 'dataset',
      x: 38,
      y: 30,
      radius: 29,
      color: '#0891b2',
      textColor: '#ffffff',
      icon: Database,
      tag: 'Isotopic δ18O Proxy • 65m Depth',
      status: 'Open Science Data',
      description: 'Isotopic ratios (δ18O, δD), major ion chemistry, and volcanic tephra layers reconstructing 1,200 years of Southern Hemisphere climate variation.',
      telemetry: [
        { label: 'Core Depth', value: '65.4 meters' },
        { label: 'Temporal Resolution', value: 'Sub-Annual' },
        { label: 'Climate Epoch', value: '800 AD to Present' }
      ],
      datasets: [
        { name: 'NCPOR Central DML Ice Core Stable Isotope Dataset', format: 'NetCDF (.nc)', size: '36.5 MB' }
      ],
      publications: [
        { title: 'A 1200-year ice core record of climate variability from coastal Dronning Maud Land', journal: 'Geophysical Research Letters', doi: '10.1029/2020GL089154' }
      ],
      connectedIds: ['antarctica_domain']
    },
    {
      id: 'dataset_arctic_hydro',
      label: 'Kongsfjorden Fjord Hydrographic Open Repository',
      shortLabel: 'Arctic Hydrography',
      category: 'Datasets',
      type: 'dataset',
      x: 94,
      y: 65,
      radius: 29,
      color: '#4338ca',
      textColor: '#ffffff',
      icon: Database,
      tag: '10-Year Continuous Mooring Series',
      status: 'Open Science Data',
      description: 'Ten consecutive years of continuous temperature, salinity, turbidity, and dissolved oxygen data documenting Atlantic water volume transport.',
      telemetry: [
        { label: 'Time Span', value: '2014 - 2025' },
        { label: 'Records Total', value: '1.42 Million Pings' },
        { label: 'Quality Flagged', value: 'WOCE / SeaDataNet Compliant' }
      ],
      datasets: [
        { name: 'IndARC Kongsfjorden Multi-Year Decadal Time Series', format: 'NetCDF / Parquet', size: '142.8 MB' }
      ],
      publications: [
        { title: 'Decadal warming trends of Atlantic water in high-latitude Svalbard fjords', journal: 'Nature Climate Change', doi: '10.1038/s41558-021-01128-4' }
      ],
      connectedIds: ['indarc_mooring', 'arctic_domain']
    },
    {
      id: 'dataset_spiti_glof',
      label: 'Western Himalayan Glacier Outburst (GLOF) Inventory',
      shortLabel: 'GLOF Threat Matrix',
      category: 'Datasets',
      type: 'dataset',
      x: 82,
      y: 94,
      radius: 29,
      color: '#047857',
      textColor: '#ffffff',
      icon: Database,
      tag: '54 Moraine-Dammed Lakes Mapped',
      status: 'Disaster Mitigation Resource',
      description: 'Multi-satellite inventory of high-altitude glacial lakes, freeboard depth, moraine dam stability, and downstream flood inundation simulations.',
      telemetry: [
        { label: 'Lakes Monitored', value: '54 High-Risk Glacial Lakes' },
        { label: 'Critical Threshold', value: 'Lakes > 0.05 sq km' },
        { label: 'Model Inundation', value: 'HEC-RAS 2D Hydrodynamic' }
      ],
      datasets: [
        { name: 'Spiti & Lahaul Glacial Lake Outburst Susceptibility Atlas', format: 'GeoPackage / Shapefile', size: '64.0 MB' }
      ],
      publications: [
        { title: 'Glacial lake evolution and GLOF hazard assessment in the Chandra-Bhaga basin', journal: 'Natural Hazards', doi: '10.1007/s11069-021-04820-x' }
      ],
      connectedIds: ['himansh_station', 'himalaya_domain']
    },
    {
      id: 'dataset_southern_carbon',
      label: 'Southern Ocean Biogeochemical Carbon Export Sink',
      shortLabel: 'Southern Ocean Carbon',
      category: 'Datasets',
      type: 'dataset',
      x: 20,
      y: 90,
      radius: 29,
      color: '#3730a3',
      textColor: '#ffffff',
      icon: Database,
      tag: 'Air-Sea CO2 Flux & Export Production',
      status: 'Open Science Data',
      description: 'PCO2, nitrate, silicate, chlorophyll-a, and primary productivity measurements from 40°S to the ice edge along the Indian Southern Ocean transect.',
      telemetry: [
        { label: 'Survey Transects', value: 'Cape Town to Prydz Bay' },
        { label: 'Export Flux Depth', value: '100m Euphotic Zone' }
      ],
      datasets: [
        { name: 'Southern Ocean Expedition Carbon Export Measurements (SOE-1 to SOE-12)', format: 'CSV', size: '44.8 MB' }
      ],
      publications: [
        { title: 'Biological pump and seasonal carbon sequestration in the Indian sector of Southern Ocean', journal: 'Global Biogeochemical Cycles', doi: '10.1029/2021GB007012' }
      ],
      connectedIds: ['southern_ocean_domain']
    },

    // National Partner Laboratories
    {
      id: 'partner_isro',
      label: 'ISRO Space Applications Centre (SAC)',
      shortLabel: 'ISRO-SAC',
      category: 'Partners',
      type: 'partner',
      x: 36,
      y: 12,
      radius: 30,
      color: '#c026d3', // Fuchsia
      textColor: '#ffffff',
      icon: Globe,
      tag: 'Ahmedabad • Earth Observation',
      status: 'Satellite Telemetry & Radar',
      description: 'ISRO Space Applications Centre collaborates with NCPOR for satellite SAR sea-ice thickness mapping, coastal iceberg tracking, and polar satellite ground station links.',
      telemetry: [
        { label: 'Satellite Missions', value: 'Oceansat-3, RISAT, EOS-04' },
        { label: 'Ground Station', value: 'Bharati Station Direct Downlink' }
      ],
      datasets: [
        { name: 'Antarctic Sea-Ice Extent & Concentration Daily Gridded Maps', format: 'GeoTIFF', size: '240 MB' }
      ],
      publications: [
        { title: 'Satellite-derived sea ice thickness estimation using spaceborne radar altimetry', journal: 'IEEE Transactions on Geoscience and Remote Sensing', doi: '10.1109/TGRS.2021.3094821' }
      ],
      connectedIds: ['ncpor', 'bharati_station']
    },
    {
      id: 'partner_iig',
      label: 'Indian Institute of Geomagnetism (IIG)',
      shortLabel: 'IIG Mumbai',
      category: 'Partners',
      type: 'partner',
      x: 48,
      y: 72,
      radius: 30,
      color: '#9333ea', // Purple Deep
      textColor: '#ffffff',
      icon: Zap,
      tag: 'Panvel, Navi Mumbai',
      status: 'Geomagnetic Research',
      description: 'IIG maintains continuous geomagnetic, ionospheric, and upper atmospheric physics observatories at Maitri Station in Antarctica.',
      telemetry: [
        { label: 'Observatory Site', value: 'Maitri Station (Schirmacher Oasis)' },
        { label: 'Sensor Suite', value: 'Fluxgate Magnetometer, Riometer, VLF' }
      ],
      datasets: [
        { name: 'Inter-hemispheric Geomagnetic Conjugate Field Variations Dataset', format: 'ASCII / CSV', size: '52.1 MB' }
      ],
      publications: [
        { title: 'Geomagnetic variations during major geomagnetic storms at Antarctic station Maitri', journal: 'Advances in Space Research', doi: '10.1016/j.asr.2020.08.019' }
      ],
      connectedIds: ['ncpor', 'maitri_station', 'sensor_riometer']
    },
    {
      id: 'partner_imd',
      label: 'India Meteorological Department (IMD)',
      shortLabel: 'IMD New Delhi',
      category: 'Partners',
      type: 'partner',
      x: 22,
      y: 52,
      radius: 30,
      color: '#2563eb', // Blue
      textColor: '#ffffff',
      icon: Activity,
      tag: 'Mausam Bhavan • New Delhi',
      status: 'Meteorological Authority',
      description: 'IMD provides certified calibration, weather forecasting models, ozonesonde balloon launches, and long-term climatology for Indian polar expeditions.',
      telemetry: [
        { label: 'Balloon Launches', value: 'Weekly Ozonesonde' },
        { label: 'Climate Archive', value: '44 Years Continuous Weather Records' }
      ],
      datasets: [
        { name: 'IMD Climatological Normals of Antarctica (Maitri & Bharati)', format: 'CSV', size: '31.4 MB' }
      ],
      publications: [
        { title: 'Ozone hole dynamics over Antarctica and vertical ozone profiling at Maitri', journal: 'Mausam (Quarterly Journal of Meteorology)', doi: '10.54302/mausam.v72i1.134' }
      ],
      connectedIds: ['ncpor', 'maitri_station', 'sensor_aws']
    }
  ];

  const [nodes, setNodes] = useState(initialNodes);

  // Set default selected node so console is immediately rich and never empty
  useEffect(() => {
    if (!selectedNode) {
      const defaultNode = initialNodes.find(n => n.id === 'ncpor') || initialNodes[0];
      setSelectedNode(defaultNode);
    }
  }, []);

  // Filter nodes based on category filter & search query
  const filteredNodes = useMemo(() => {
    return nodes.filter(n => {
      const matchesFilter =
        activeFilter === 'All' ||
        n.category.toLowerCase() === activeFilter.toLowerCase();

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        n.label.toLowerCase().includes(q) ||
        n.shortLabel.toLowerCase().includes(q) ||
        n.tag.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.telemetry.some(t => t.label.toLowerCase().includes(q) || t.value.toLowerCase().includes(q)) ||
        n.datasets.some(d => d.name.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [nodes, activeFilter, searchQuery]);

  const isNodeVisible = useCallback(
    (id) => filteredNodes.some(n => n.id === id),
    [filteredNodes]
  );

  // Mouse & Touch Drag and Drop handlers
  const handleMouseDown = (e, node) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = (node.x / 100) * rect.width;
    const currentY = (node.y / 100) * rect.height;

    setDraggedNodeId(node.id);
    setDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY
    });
  };

  const handleTouchStart = (e, node) => {
    e.stopPropagation();
    if (!containerRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = (node.x / 100) * rect.width;
    const currentY = (node.y / 100) * rect.height;

    setDraggedNodeId(node.id);
    setDragOffset({
      x: touch.clientX - currentX,
      y: touch.clientY - currentY
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!draggedNodeId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - dragOffset.x;
    const mouseY = e.clientY - rect.top - dragOffset.y;

    const clampedX = Math.max(5, Math.min(95, (mouseX / rect.width) * 100));
    const clampedY = Math.max(6, Math.min(94, (mouseY / rect.height) * 100));

    setNodes(prev => prev.map(n => n.id === draggedNodeId ? { ...n, x: clampedX, y: clampedY } : n));
  }, [draggedNodeId, dragOffset]);

  const handleTouchMove = useCallback((e) => {
    if (!draggedNodeId || !containerRef.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = touch.clientX - rect.left - dragOffset.x;
    const mouseY = touch.clientY - rect.top - dragOffset.y;

    const clampedX = Math.max(5, Math.min(95, (mouseX / rect.width) * 100));
    const clampedY = Math.max(6, Math.min(94, (mouseY / rect.height) * 100));

    setNodes(prev => prev.map(n => n.id === draggedNodeId ? { ...n, x: clampedX, y: clampedY } : n));
  }, [draggedNodeId, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedNodeId(null);
  }, []);

  useEffect(() => {
    if (draggedNodeId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [draggedNodeId, handleMouseMove, handleTouchMove, handleMouseUp]);

  const resetPositions = () => {
    setNodes(initialNodes);
    setSearchQuery('');
    setActiveFilter('All');
    setSelectedNode(initialNodes.find(n => n.id === 'ncpor'));
  };

  // Node selection handler
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  // Determine which links to draw
  const linksToRender = useMemo(() => {
    const renderedKeys = new Set();
    const links = [];

    nodes.forEach(source => {
      source.connectedIds.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (!target) return;

        const pairKey = [source.id, target.id].sort().join('--');
        if (renderedKeys.has(pairKey)) return;

        const isSourceSelected = selectedNode?.id === source.id;
        const isTargetSelected = selectedNode?.id === target.id;
        const isSourceHovered = hoveredNode?.id === source.id;
        const isTargetHovered = hoveredNode?.id === target.id;

        const isHighlight = isSourceSelected || isTargetSelected || isSourceHovered || isTargetHovered;

        // Core backbone links
        const isBackbone =
          source.id === 'ncpor' ||
          target.id === 'ncpor' ||
          source.id === 'antarctica_domain' ||
          target.id === 'antarctica_domain' ||
          source.id === 'arctic_domain' ||
          target.id === 'arctic_domain' ||
          source.id === 'himalaya_domain' ||
          target.id === 'himalaya_domain';

        const shouldShow = showAllLinks || isHighlight || isBackbone;

        if (shouldShow) {
          renderedKeys.add(pairKey);
          links.push({
            id: pairKey,
            x1: source.x,
            y1: source.y,
            x2: target.x,
            y2: target.y,
            source,
            target,
            isHighlight,
            color: isHighlight ? '#0284c7' : '#cbd5e1'
          });
        }
      });
    });

    return links;
  }, [nodes, selectedNode, hoveredNode, showAllLinks]);

  return (
    <section
      id="home-knowledge-graph"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6 select-none"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. INSTITUTIONAL SCIENTIFIC HEADER & CONTROLS                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-slate-100 pb-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
              <Share2 className="w-3.5 h-3.5 text-blue-600" />
              <span>NCPOR Relational Knowledge Engine</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>MoES Satellite Stream Active</span>
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-heading">
            Polar Science Relational Knowledge & Telemetry Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Multi-dimensional topology interconnecting India’s 5 polar stations, active sensor arrays, open research datasets, and peer-reviewed climate publications. Drag any node, click to inspect live scientific console.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Real-Time Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search sensors, datasets, DOIs..."
              className="bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white w-44 sm:w-56 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Action Toggles */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setStreamActive(prev => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                streamActive
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Live Telemetry Particle Simulation"
            >
              <Activity className={`w-3.5 h-3.5 ${streamActive ? 'text-emerald-600 animate-spin' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Telemetry Pulse</span>
            </button>

            <button
              onClick={() => setShowAllLinks(prev => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                showAllLinks
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={showAllLinks ? 'Show Focused Links' : 'Show Full Cross-Link Mesh'}
            >
              <Zap className={`w-3.5 h-3.5 ${showAllLinks ? 'text-blue-600' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">{showAllLinks ? 'Dense' : 'Mesh'}</span>
            </button>

            <button
              onClick={resetPositions}
              className="p-2 rounded-lg bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
              title="Reset Layout Positions"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. LIVE TELEMETRY STATS & CATEGORY FILTER TABS               */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Layer Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl border border-slate-200">
          {[
            { id: 'All', label: 'All Network (24)' },
            { id: 'Stations', label: 'Polar Bases (5)' },
            { id: 'Sensors', label: 'Sensor Arrays (5)' },
            { id: 'Datasets', label: 'Open Datasets (4)' },
            { id: 'Domains', label: 'Domains (4)' },
            { id: 'Institutions', label: 'Institutes & Partners (6)' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                activeFilter === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Network Metrics Readout */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          <span className="flex items-center gap-1 text-slate-700">
            <strong className="text-blue-700">{filteredNodes.length}</strong> Nodes Rendered
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-slate-700">
            <strong className="text-emerald-700">{linksToRender.length}</strong> Active Connections
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">Zero Data Gaps</span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. MAIN GRAPH CANVAS (Polar Coordinate Radar Aesthetic)     */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative w-full h-[520px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      >
        {/* Polar Telemetry Radar Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:48px_48px] opacity-35 pointer-events-none" />

        {/* Concentric Polar Range Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[200px] h-[200px] rounded-full border border-sky-400" />
          <div className="w-[380px] h-[380px] rounded-full border border-sky-400 absolute" />
          <div className="w-[520px] h-[520px] rounded-full border border-sky-400 absolute" />
        </div>

        {/* Telemetry Coordinate HUD Watermark */}
        <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-400 pointer-events-none space-y-0.5 z-10">
          <div>TOPOLOGY: MULTI-TIER POLAR MATRIX</div>
          <div>ANTARCTIC 70°S • HIGH ARCTIC 79°N • HIMALAYAS 4,050M</div>
        </div>

        <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400 pointer-events-none z-10 flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>DATA FLOW: SYNCHRONIZED</span>
        </div>

        {/* Dynamic Animated Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="link-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.6" />
            </filter>
          </defs>

          {linksToRender.map(link => (
            <g key={link.id}>
              {/* Outer soft glow for highlighted links */}
              {link.isHighlight && (
                <line
                  x1={`${link.x1}%`}
                  y1={`${link.y1}%`}
                  x2={`${link.x2}%`}
                  y2={`${link.y2}%`}
                  stroke="#38bdf8"
                  strokeWidth="5"
                  strokeOpacity="0.35"
                  strokeLinecap="round"
                />
              )}

              {/* Main Connection Line */}
              <line
                x1={`${link.x1}%`}
                y1={`${link.y1}%`}
                x2={`${link.x2}%`}
                y2={`${link.y2}%`}
                stroke={link.color}
                strokeWidth={link.isHighlight ? '2.5' : '1.2'}
                strokeDasharray={link.isHighlight ? '6 4' : '3 3'}
                strokeOpacity={link.isHighlight ? '0.9' : '0.25'}
                strokeLinecap="round"
              >
                {link.isHighlight && (
                  <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" />
                )}
              </line>

              {/* Animated Glowing Data Packet Pulses */}
              {streamActive && (link.isHighlight || link.source.id === 'ncpor' || link.target.id === 'ncpor') && (
                <circle r={link.isHighlight ? '3.5' : '2'} fill={link.isHighlight ? '#38bdf8' : '#64748b'}>
                  <animate
                    attributeName="cx"
                    values={`${link.x1}%;${link.x2}%`}
                    dur={link.isHighlight ? '1.8s' : '3.5s'}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`${link.y1}%;${link.y2}%`}
                    dur={link.isHighlight ? '1.8s' : '3.5s'}
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          ))}
        </svg>

        {/* 24 Interactive Graph Nodes */}
        {nodes.map(node => {
          const isSelected = selectedNode?.id === node.id;
          const isConnected = selectedNode?.connectedIds?.includes(node.id);
          const isVisible = isNodeVisible(node.id);
          const Icon = node.icon;

          return (
            <div
              key={node.id}
              onMouseDown={e => handleMouseDown(e, node)}
              onTouchStart={e => handleTouchStart(e, node)}
              onClick={() => handleNodeClick(node)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                width: `${node.radius * 2}px`,
                height: `${node.radius * 2}px`,
                backgroundColor: node.color
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg flex flex-col items-center justify-center p-1.5 text-center transition-all select-none touch-none cursor-grab active:cursor-grabbing ${
                !isVisible ? 'opacity-20 grayscale scale-85 pointer-events-none' : 'opacity-100'
              } ${
                isSelected
                  ? 'scale-120 ring-4 ring-offset-2 ring-sky-400 ring-offset-slate-950 z-30 shadow-2xl shadow-sky-500/40'
                  : isConnected
                  ? 'scale-110 ring-2 ring-offset-1 ring-sky-300 ring-offset-slate-900 z-20 shadow-md animate-pulse'
                  : 'hover:scale-105 z-10'
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-white/95 mb-0.5 pointer-events-none flex-shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-white leading-tight pointer-events-none drop-shadow-sm px-1 line-clamp-1">
                {node.shortLabel}
              </span>
              <span className="text-[8px] font-mono text-white/80 pointer-events-none hidden sm:block truncate max-w-[90%]">
                {node.category}
              </span>
            </div>
          );
        })}

        {/* Hover Mini HUD Tooltip */}
        {hoveredNode && hoveredNode.id !== selectedNode?.id && (
          <div
            style={{
              left: `${Math.min(85, Math.max(15, hoveredNode.x))}%`,
              top: `${Math.max(12, hoveredNode.y - 10)}%`
            }}
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-40 bg-slate-900/95 text-white p-3 rounded-xl shadow-2xl text-left border border-slate-700 backdrop-blur-md min-w-[200px]"
          >
            <div className="flex items-center justify-between text-xs font-bold text-sky-300 border-b border-slate-800 pb-1.5 mb-1.5">
              <span>{hoveredNode.label}</span>
              <span className="text-[9px] text-slate-400 font-mono">({hoveredNode.category})</span>
            </div>
            <div className="text-[10px] text-slate-300 font-mono space-y-0.5">
              <div>LOC: {hoveredNode.tag}</div>
              <div>COORDS: {hoveredNode.coordinates || 'Polar Station Grid'}</div>
              <div className="text-emerald-400 font-bold">STATUS: {hoveredNode.status}</div>
            </div>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. SCIENTIFIC DATA CONSOLE / DEEP INSPECTOR WORKSPACE         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {selectedNode && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 text-left space-y-5">
          {/* Console Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-start space-x-3.5">
              <div
                style={{ backgroundColor: selectedNode.color }}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md flex-shrink-0 mt-0.5"
              >
                <selectedNode.icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-heading">
                    {selectedNode.label}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
                    {selectedNode.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {selectedNode.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-mono flex items-center space-x-2">
                  <Compass className="w-3.5 h-3.5 text-sky-600" />
                  <span>{selectedNode.tag}</span>
                  {selectedNode.coordinates && (
                    <>
                      <span>•</span>
                      <span>{selectedNode.coordinates}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Console Navigation Tabs */}
            <div className="flex items-center space-x-1.5 bg-slate-200/70 p-1 rounded-xl self-start md:self-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('telemetry')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'telemetry' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>Live Telemetry</span>
              </button>

              <button
                onClick={() => setActiveTab('datasets')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'datasets' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open Datasets ({selectedNode.datasets.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('publications')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center space-x-1.5 ${
                  activeTab === 'publications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-purple-600" />
                <span>Research DOIs</span>
              </button>
            </div>
          </div>

          {/* Description Snippet */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
            {selectedNode.description}
          </p>

          {/* TAB CONTENT 1: Real-Time Telemetry Gauges */}
          {activeTab === 'telemetry' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {selectedNode.telemetry.map((t, idx) => (
                <div key={idx} className="bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-1 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t.label}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-mono block truncate">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 2: Open Research Datasets */}
          {activeTab === 'datasets' && (
            <div className="space-y-2 pt-1">
              {selectedNode.datasets.map((d, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      {d.name}
                    </span>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono">
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-bold">{d.format}</span>
                      <span>•</span>
                      <span>Payload Size: {d.size}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">Open Access (CC-BY 4.0)</span>
                    </div>
                  </div>
                  <Link
                    to={`/explore?q=${encodeURIComponent(selectedNode.shortLabel)}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center space-x-1.5 flex-shrink-0 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Access Dataset</span>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* TAB CONTENT 3: Peer-Reviewed Publications with Verified DOIs */}
          {activeTab === 'publications' && (
            <div className="space-y-2 pt-1">
              {selectedNode.publications.map((p, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div className="space-y-0.5 max-w-2xl">
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      {p.title}
                    </h4>
                    <div className="text-[10px] text-slate-500 font-mono flex items-center space-x-2">
                      <span className="text-purple-700 font-bold">{p.journal}</span>
                      <span>•</span>
                      <span>DOI: {p.doi}</span>
                    </div>
                  </div>
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold flex items-center space-x-1.5 flex-shrink-0 self-start sm:self-auto transition-colors"
                  >
                    <span>View Official Paper</span>
                    <ExternalLink className="w-3 h-3 text-blue-600" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Interactive Traversal Chips */}
          <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-bold text-slate-700">Relational Connections:</span>
              {selectedNode.connectedIds.map(targetId => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;
                return (
                  <button
                    key={target.id}
                    onClick={() => setSelectedNode(target)}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-100 text-slate-700 hover:text-blue-900 border border-slate-200 text-[11px] font-semibold transition-all flex items-center space-x-1"
                  >
                    <span style={{ backgroundColor: target.color }} className="w-1.5 h-1.5 rounded-full" />
                    <span>{target.label}</span>
                  </button>
                );
              })}
            </div>

            <Link
              to={`/explore?q=${encodeURIComponent(selectedNode.shortLabel)}`}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center space-x-1.5 transition-colors self-end md:self-auto"
            >
              <span>Explore All {selectedNode.shortLabel} Records</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
