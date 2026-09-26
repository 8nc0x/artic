import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Core 6 Public Pages (Master Prompt Section 45)
import HomeDashboard from './pages/HomeDashboard';
import ExploreSearch from './pages/ExploreSearch';
import InstitutionalActivities from './pages/InstitutionalActivities';
import AIPolarIntelligence from './pages/AIPolarIntelligence';
import SmartEducation from './pages/SmartEducation';
import SocialMediaStudio from './pages/SocialMediaStudio';

// User & Researcher Pages
import UserProfile from './pages/UserProfile';
import UserProfileSaved from './pages/UserProfileSaved';
import UserHistory from './pages/UserHistory';
import NotificationsCenter from './pages/NotificationsCenter';
import Settings from './pages/Settings';
import ResearcherUpload from './pages/ResearcherUpload';

// Admin Suite Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminContent from './pages/AdminContent';
import AdminDatasets from './pages/AdminDatasets';
import AdminUsers from './pages/AdminUsers';
import AdminAIApproval from './pages/AdminAIApproval';
import AdminAnalytics from './pages/AdminAnalytics';

// Supporting Deep-Dive & Detail Pages
import PaperDetailView from './pages/PaperDetailView';
import ReportsLibrary from './pages/ReportsLibrary';
import DatasetsCatalog from './pages/DatasetsCatalog';
import MediaGallery from './pages/MediaGallery';
import ExpeditionExplorer from './pages/ExpeditionExplorer';
import AboutNCPOR from './pages/AboutNCPOR';
import KnowledgeGraphExplorer from './pages/KnowledgeGraphExplorer';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ─────────────────────────────────────────────────────────── */}
        {/* 1. PUBLIC PORTAL & USER AREA (Wrapped in MainLayout)        */}
        {/* ─────────────────────────────────────────────────────────── */}
        <Route element={<MainLayout />}>
          {/* Page 1: Home Dashboard */}
          <Route path="/" element={<HomeDashboard />} />

          {/* Page 2: Explore (Papers Carousel, Datasets, News) */}
          <Route path="/explore" element={<ExploreSearch />} />

          {/* Page 3: Outreach (Conferences, Seminars, Workshops, Events) */}
          <Route path="/outreach" element={<InstitutionalActivities />} />

          {/* Page 4: AI & Polar Intelligence */}
          <Route path="/ai" element={<AIPolarIntelligence />} />

          {/* Page 5: Polar Smart Education */}
          <Route path="/learn" element={<SmartEducation />} />

          {/* Page 6: Social Media Studio */}
          <Route path="/social-media" element={<SocialMediaStudio />} />

          {/* User Profile & Activity */}
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/saved" element={<UserProfileSaved />} />
          <Route path="/profile/history" element={<UserHistory />} />
          <Route path="/notifications" element={<NotificationsCenter />} />
          <Route path="/settings" element={<Settings />} />

          {/* Researcher Upload */}
          <Route path="/upload" element={<ResearcherUpload />} />

          {/* Deep-dive Publications & Datasets */}
          <Route path="/publications" element={<ExploreSearch />} />
          <Route path="/publications/:id" element={<PaperDetailView />} />
          <Route path="/reports" element={<ReportsLibrary />} />
          <Route path="/reports/:id" element={<ReportsLibrary />} />
          <Route path="/datasets" element={<DatasetsCatalog />} />
          <Route path="/datasets/:id" element={<DatasetsCatalog />} />
          <Route path="/media" element={<MediaGallery />} />
          <Route path="/media/:id" element={<MediaGallery />} />
          <Route path="/expeditions" element={<ExpeditionExplorer />} />
          <Route path="/expeditions/:id" element={<ExpeditionExplorer />} />
          <Route path="/about" element={<AboutNCPOR />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraphExplorer />} />

          {/* Route Aliases for seamless navigation */}
          <Route path="/education" element={<Navigate to="/learn" replace />} />
          <Route path="/social-studio" element={<Navigate to="/social-media" replace />} />
          <Route path="/ai-assistant" element={<Navigate to="/ai" replace />} />
          <Route path="/activities" element={<Navigate to="/outreach" replace />} />
        </Route>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* 2. ADMIN PORTAL (Wrapped in AdminLayout)                   */}
        {/* ─────────────────────────────────────────────────────────── */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="datasets" element={<AdminDatasets />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="ai-approval" element={<AdminAIApproval />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
