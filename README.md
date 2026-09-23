# NCPOR Polar Science Outreach & Knowledge Repository Portal

> **Ministry of Earth Sciences (MoES), Government of India**  
> Integrated Polar Science Outreach, Knowledge Repository, and Media Dissemination Portal for Arctic, Antarctic, Southern Ocean, and Himalayan expeditions.

---

## 🌟 Overview

The **NCPOR Polar Science Portal** is an enterprise-grade web application integrating authentic research data, expedition logs, scientific datasets, and peer-reviewed publications from India's polar research programs.

### Key Capabilities
- **Explore & Universal Search:** Multi-attribute filtering across expeditions, research publications, and datasets with full-text search.
- **AI Polar Intelligence Assistant:** Live LLM synthesis powered by Google Gemini Flash Lite for summarizing research papers, answering polar science queries, and extracting document insights.
- **Interactive Knowledge Graph:** Visual network exploration of researchers, research stations (Himadri, Bharati, Maitri, IndARC), institutions, and publication topics.
- **Expedition Explorer:** Geo-referenced tracking of Arctic, Antarctic, Southern Ocean, and Cryosphere expeditions.
- **Datasets & Media Dissemination:** Comprehensive catalog with direct metadata inspection, download access, and media gallery.
- **Admin Governance & Management:** Workflow for vetting scientific uploads and monitoring platform metrics.

---

## 🏗️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, Force-Graph
- **Backend:** Node.js, Express (ES Modules)
- **Data Layer:** High-performance persistent JSON store seeded with authentic NCPOR / NPDC MoES scientific records
- **AI Engine:** Google Gemini Flash Lite API (`gemini-3.1-flash-lite` / `gemini-3.5-flash-lite`)

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 2. Installation
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 3. Environment Setup
Create a `.env` file in `backend/`:
```env
PORT=5000
# Optional: Add your Google Gemini API key to enable live AI synthesis
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Locally
```bash
# Starts both Backend (port 5000) and Frontend (port 5173) concurrently
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Production VPS Deployment

### 1. Build Frontend
```bash
npm --prefix frontend run build
```

### 2. Start Backend with PM2
```bash
pm2 start backend/src/server.js --name "polar-portal"
pm2 save
pm2 startup
```

### 3. Nginx Reverse Proxy
Configure Nginx to serve `frontend/dist` and proxy `/api/` to `http://127.0.0.1:5000`.
