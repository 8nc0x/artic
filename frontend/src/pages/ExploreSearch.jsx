import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  Filter,
  BookOpen,
  Database,
  ArrowRight,
  ExternalLink,
  Calendar,
  MapPin,
  Tag
} from 'lucide-react';

export default function ExploreSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType = searchParams.get('type') || 'Semantic Search';

  const [query, setQuery] = useState(initialQuery);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const executeSearch = (qText) => {
    setLoading(true);
    fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: qText,
        region: selectedRegion,
        type: selectedType
      })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success) setResults(d.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    executeSearch(initialQuery);
  }, [initialQuery, selectedRegion, selectedType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
    executeSearch(query);
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      {/* Search Header */}
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <span>Polar Semantic Discovery &amp; Search</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Explore over 1,000+ polar scientific documents, expedition datasets, and peer-reviewed research using natural-language understanding.
        </p>

        {/* Search input form */}
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Antarctic sea ice decline observations, Maitri weather, benthic ecosystems..."
              className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-polar-blue rounded-xl pl-10 pr-4 py-2.5 text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-polar-blue hover:bg-blue-600 text-white font-bold text-xs md:text-sm shadow-sm transition-all"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs font-semibold">
          <div className="flex items-center space-x-2 text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Region:</span>
            {['All', 'Antarctica', 'Arctic', 'Southern Ocean'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedRegion === reg ? 'bg-blue-100 text-blue-800' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {reg}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 text-slate-500 border-l border-slate-200 pl-4">
            <span>Resource Type:</span>
            {['All', 'Publication', 'Dataset'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedType === t ? 'bg-purple-100 text-purple-800' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Found {results.length} scientific results</span>
          <span>Ranked by Relevance Score</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            <Sparkles className="w-6 h-6 animate-spin mx-auto text-polar-blue mb-2" />
            Running semantic analysis across polar repository...
          </div>
        ) : results.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-polar-border text-center text-slate-500 text-xs">
            No matches found for "{query}". Try a different keyword like "sea ice", "Maitri", or "radar".
          </div>
        ) : (
          results.map((res) => (
            <div
              key={`${res.type}-${res.id}`}
              className="bg-white rounded-2xl p-5 border border-polar-border hover:border-blue-200 shadow-sm transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        res.type === 'publication' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
                      }`}
                    >
                      {res.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Score: {res.score}
                    </span>
                    {res.category && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {res.category}
                      </span>
                    )}
                  </div>

                  <Link
                    to={res.link}
                    className="text-sm font-bold text-slate-900 hover:text-polar-blue leading-snug block"
                  >
                    {res.title}
                  </Link>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-1">
                    {res.date && (
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{res.date}</span>
                      </span>
                    )}
                    {res.authors && <span>Authors: {res.authors}</span>}
                    {res.scientist && <span>Investigator: {res.scientist}</span>}
                    {res.source && (
                      <span className="inline-flex items-center space-x-1 text-slate-700 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{res.source}</span>
                      </span>
                    )}
                    {res.source_url && (
                      <a
                        href={res.source_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 text-polar-blue hover:text-blue-700 font-semibold hover:underline"
                        title="Open record on official government portal"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Official MoES Link (npdc.ncpor.res.in)</span>
                      </a>
                    )}
                  </div>
                </div>

                <Link
                  to={res.link}
                  className="p-2 rounded-xl text-slate-400 hover:text-polar-blue hover:bg-blue-50 transition-colors flex-shrink-0"
                  title="View Record"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
