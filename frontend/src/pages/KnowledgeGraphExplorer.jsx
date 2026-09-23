import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Search,
  ExternalLink,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

export default function KnowledgeGraphExplorer() {
  const [searchParams] = useSearchParams();
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [selectedNode, setSelectedNode] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    fetch('/api/knowledge-graph')
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          setGraphData(d.data);
          const initialFocus = searchParams.get('focus') || 'antarctica';
          const match = d.data.nodes.find(n => n.id.toLowerCase() === initialFocus.toLowerCase());
          if (match) setSelectedNode(match);
        }
      });
  }, [searchParams]);

  const filteredNodes = graphData.nodes.filter(n => {
    const matchesType = filterType === 'All' || n.type.toLowerCase() === filterType.toLowerCase();
    const matchesQuery = !searchQuery || n.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  const nodePositions = React.useMemo(() => {
    const count = filteredNodes.length;
    const center = { x: 380, y: 260 };
    const radius = 180;
    const positions = {};

    filteredNodes.forEach((node, i) => {
      if (node.id === 'antarctica') {
        positions[node.id] = { x: center.x, y: center.y };
      } else {
        const angle = (i / (count || 1)) * 2 * Math.PI;
        positions[node.id] = {
          x: center.x + Math.cos(angle) * (radius + (i % 2 === 0 ? 30 : -20)),
          y: center.y + Math.sin(angle) * (radius + (i % 2 === 0 ? 30 : -20))
        };
      }
    });
    return positions;
  }, [filteredNodes]);

  // Edges that connect visible nodes
  const visibleEdges = graphData.edges.filter(
    e => nodePositions[e.source] && nodePositions[e.target]
  );

  return (
    <div className="space-y-4 pb-12 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
            <Share2 className="w-6 h-6 text-polar-blue" />
            <span>Polar Knowledge Graph Explorer</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Traverse interconnected relationships between polar expeditions, research stations, datasets, publications, and scientists.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Node search input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-polar-blue"
            />
          </div>

          {/* Type filters */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
            {['All', 'Region', 'Topic', 'Station', 'Researcher', 'Institution', 'Publication', 'Dataset'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  filterType === type ? 'bg-polar-blue text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Zoom controls */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200">
            <button onClick={() => setZoom(z => Math.max(0.7, z - 0.1))} className="p-1 hover:bg-slate-100 rounded text-slate-600">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono px-1 font-bold text-slate-500">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} className="p-1 hover:bg-slate-100 rounded text-slate-600">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas & Details Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Graph Canvas */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-polar-border shadow-sm p-4 relative overflow-hidden min-h-[520px]">
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs text-[11px] text-slate-600">
            Click any node to explore scientific connections &amp; primary records
          </div>

          <div
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            className="w-full h-[500px] relative transition-transform duration-150"
          >
            {/* SVG Connecting Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {visibleEdges.map((e, idx) => {
                const s = nodePositions[e.source];
                const t = nodePositions[e.target];
                if (!s || !t) return null;
                const isSelected = selectedNode && (selectedNode.id === e.source || selectedNode.id === e.target);
                return (
                  <g key={idx}>
                    <line
                      x1={s.x}
                      y1={s.y}
                      x2={t.x}
                      y2={t.y}
                      stroke={isSelected ? '#0284c7' : '#cbd5e1'}
                      strokeWidth={isSelected ? '2' : '1.2'}
                      strokeDasharray={isSelected ? 'none' : '3 3'}
                    />
                    <text
                      x={(s.x + t.x) / 2}
                      y={(s.y + t.y) / 2 - 4}
                      fontSize="8"
                      fill={isSelected ? '#0369a1' : '#94a3b8'}
                      textAnchor="middle"
                      className="select-none font-mono"
                    >
                      {e.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Render Nodes */}
            {filteredNodes.map((node) => {
              const pos = nodePositions[node.id] || { x: 380, y: 260 };
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                  onClick={() => setSelectedNode(node)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-all duration-200 group ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                >
                  <div
                    style={{ backgroundColor: node.color || '#0284c7' }}
                    className={`w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-md ring-4 ${
                      isSelected ? 'ring-polar-blue ring-offset-2' : 'ring-white'
                    }`}
                  >
                    {node.label.charAt(0)}
                  </div>
                  <span
                    className={`absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2 py-0.5 rounded shadow-xs border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-950'
                        : 'bg-white/95 text-slate-800 border-slate-200'
                    }`}
                  >
                    {node.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-polar-border shadow-sm p-6 text-left space-y-4">
          {selectedNode ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                  {selectedNode.type} • {selectedNode.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {selectedNode.id}</span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Entity in the National Polar Data Center (NPDC) relational metadata model. Connected to research programs and peer-reviewed outputs.
                </p>
              </div>

              {/* Connected Relationships */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Active Connections ({graphData.edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length})
                </h4>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {graphData.edges
                    .filter(e => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((edge, idx) => {
                      const otherId = edge.source === selectedNode.id ? edge.target : edge.source;
                      const otherNode = graphData.nodes.find(n => n.id === otherId);
                      return (
                        <div
                          key={idx}
                          onClick={() => otherNode && setSelectedNode(otherNode)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="text-[10px] text-slate-400 font-mono block">
                              {edge.label}
                            </span>
                            <span className="font-semibold text-slate-800">
                              {otherNode?.label || otherId}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-slate-100">
                <Link
                  to={
                    selectedNode.type === 'publication'
                      ? '/publications/sea-ice-variability-2024'
                      : selectedNode.type === 'dataset'
                      ? `/datasets/${selectedNode.id.startsWith('ds-') ? selectedNode.id : 'ds-ncpor-1'}`
                      : selectedNode.type === 'station' || selectedNode.type === 'expedition'
                      ? '/expeditions'
                      : `/explore?q=${encodeURIComponent(selectedNode.label)}`
                  }
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-polar-blue hover:bg-blue-600 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>{selectedNode.type === 'dataset' ? 'Open Dataset Inspector' : 'Explore Associated Records'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
              <Share2 className="w-8 h-8 text-slate-300" />
              <p className="text-xs">Select any node on the graph to inspect relationships</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
