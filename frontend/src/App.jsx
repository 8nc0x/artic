import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomeDashboard from './pages/HomeDashboard';
import PaperDetailView from './pages/PaperDetailView';
import DatasetsCatalog from './pages/DatasetsCatalog';
import ReportsLibrary from './pages/ReportsLibrary';
import MediaGallery from './pages/MediaGallery';
import KnowledgeGraphExplorer from './pages/KnowledgeGraphExplorer';
import ExploreSearch from './pages/ExploreSearch';
import ExpeditionExplorer from './pages/ExpeditionExplorer';
import InstitutionalActivities from './pages/InstitutionalActivities';
import SocialMediaStudio from './pages/SocialMediaStudio';
import AIPolarIntelligence from './pages/AIPolarIntelligence';
import SmartEducation from './pages/SmartEducation';
import AboutNCPOR from './pages/AboutNCPOR';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
        {/* Unified Top Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* 1. Home Dashboard */}
            <Route path="/" element={<HomeDashboard />} />

            {/* 2. Explore & Search */}
            <Route path="/explore" element={<ExploreSearch />} />

            {/* 3. Research Publications & Reports */}
            <Route path="/publications" element={<ExploreSearch />} />
            <Route path="/publications/:id" element={<PaperDetailView />} />
            <Route path="/reports" element={<ReportsLibrary />} />
            <Route path="/reports/:id" element={<ReportsLibrary />} />

            {/* 4. Scientific Datasets Catalog */}
            <Route path="/datasets" element={<DatasetsCatalog />} />
            <Route path="/datasets/:id" element={<DatasetsCatalog />} />

            {/* 5. Media Dissemination */}
            <Route path="/media" element={<MediaGallery />} />
            <Route path="/media/:id" element={<MediaGallery />} />

            {/* 6. Virtual Expedition & 3D Stations */}
            <Route path="/expeditions" element={<ExpeditionExplorer />} />
            <Route path="/expeditions/:id" element={<ExpeditionExplorer />} />

            {/* 7. Smart Education & Quizzes */}
            <Route path="/education" element={<SmartEducation />} />

            {/* 8. About NCPOR */}
            <Route path="/about" element={<AboutNCPOR />} />

            {/* Supporting Features: Knowledge Network, Social Studio, AI Assistant */}
            <Route path="/knowledge-graph" element={<KnowledgeGraphExplorer />} />
            <Route path="/social-studio" element={<SocialMediaStudio />} />
            <Route path="/ai-assistant" element={<AIPolarIntelligence />} />
            <Route path="/activities" element={<InstitutionalActivities />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Official MoES / NCPOR Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
