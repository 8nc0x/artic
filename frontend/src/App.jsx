import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';

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
import NotificationsCenter from './pages/NotificationsCenter';
import UserProfileSaved from './pages/UserProfileSaved';
import AdminDashboard from './pages/AdminDashboard';
import AboutNCPOR from './pages/AboutNCPOR';

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Fetch notifications
    fetch('/api/notifications')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data) {
          setNotifications(d.data);
        }
      })
      .catch(err => console.error('Failed to fetch notifications:', err));

    // Fetch default user profile
    fetch('/api/users/me')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data) {
          setCurrentUser(d.data);
        }
      })
      .catch(err => console.error('Failed to fetch user:', err));
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#f4f8fb] text-[#1e293b] flex flex-col font-sans">
        {/* Top Header Navbar */}
        <Navbar
          notifications={notifications}
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
        />

        {/* Main Body Area: Sidebar + Scrollable View */}
        <div className="flex flex-1 overflow-hidden">
          {/* Collapsible Left Sidebar */}
          <Sidebar currentUser={currentUser} />

          {/* Main Content Viewport */}
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">
            <Routes>
              {/* Home Discovery Dashboard */}
              <Route path="/" element={<HomeDashboard />} />

              {/* Research Paper Flagship Detail */}
              <Route path="/publications/sea-ice-variability-2024" element={<PaperDetailView />} />
              <Route path="/publications/:id" element={<PaperDetailView />} />
              <Route path="/publications" element={<ExploreSearch />} />

              {/* Scientific Datasets Catalog (997 Datasets) */}
              <Route path="/datasets" element={<DatasetsCatalog />} />
              <Route path="/datasets/:id" element={<DatasetsCatalog />} />

              {/* Expedition & Cruise Reports Library */}
              <Route path="/reports" element={<ReportsLibrary />} />
              <Route path="/reports/:id" element={<ReportsLibrary />} />

              {/* Expedition Explorer & Interactive Station Map */}
              <Route path="/expeditions" element={<ExpeditionExplorer />} />
              <Route path="/expeditions/:id" element={<ExpeditionExplorer />} />

              {/* Polar Photographs & Videos Media Gallery */}
              <Route path="/media" element={<MediaGallery />} />
              <Route path="/media/:id" element={<MediaGallery />} />

              {/* Full-screen Knowledge Graph Explorer */}
              <Route path="/knowledge-graph" element={<KnowledgeGraphExplorer />} />
              <Route path="/connections" element={<KnowledgeGraphExplorer />} />

              {/* Semantic Discovery & Global Search */}
              <Route path="/explore" element={<ExploreSearch />} />

              {/* Conferences & Institutional Activities */}
              <Route path="/events" element={<InstitutionalActivities />} />
              <Route path="/activities" element={<InstitutionalActivities />} />

              {/* AI Dissemination & Social Media Studio */}
              <Route path="/social-studio" element={<SocialMediaStudio />} />

              {/* Dedicated AI Polar Intelligence & Research Assistant */}
              <Route path="/ai-assistant" element={<AIPolarIntelligence />} />

              {/* Smart Education Hub */}
              <Route path="/education" element={<SmartEducation />} />

              {/* Notifications Center */}
              <Route path="/notifications" element={<NotificationsCenter />} />

              {/* User Profile, Saved Content & History */}
              <Route path="/profile" element={<UserProfileSaved currentUser={currentUser} />} />
              <Route path="/saved" element={<UserProfileSaved currentUser={currentUser} />} />
              <Route path="/history" element={<UserProfileSaved currentUser={currentUser} />} />

              {/* Administrative Oversight & Moderation Dashboard */}
              <Route path="/admin" element={<AdminDashboard />} />

              {/* About NCPOR & MoES */}
              <Route path="/about" element={<AboutNCPOR />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Global Auth & Persona Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          currentUser={currentUser}
          onSelectUser={(u) => setCurrentUser(u)}
        />
      </div>
    </BrowserRouter>
  );
}
