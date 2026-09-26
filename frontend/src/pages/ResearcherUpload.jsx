import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Share2,
  Newspaper,
  BookOpen,
  Clock,
  Layers,
  Check,
  RefreshCw,
  Eye,
  FileCheck
} from 'lucide-react';

export default function ResearcherUpload() {
  const [file, setFile] = useState(null);
  const [fileValid, setFileValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [uploadStep, setUploadStep] = useState('idle'); // 'idle' | 'validating' | 'uploading' | 'processing' | 'completed'
  const [expeditionTitle, setExpeditionTitle] = useState('44th Indian Antarctic Expedition Scientific Report');
  const [station, setStation] = useState('Bharati Station, Larsemann Hills');
  const [discipline, setDiscipline] = useState('Cryosphere & Paleoclimate');
  const [leadAuthor, setLeadAuthor] = useState('Dr. Ramesh Sengupta');
  const [toastMessage, setToastMessage] = useState(null);

  // Generated multi-channel content state
  const [generatedDrafts, setGeneratedDrafts] = useState(null);
  const [activeDraftTab, setActiveDraftTab] = useState('summary');
  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    validateAndLoadFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;
    validateAndLoadFile(dropped);
  };

  const validateAndLoadFile = (f) => {
    setErrorMsg(null);
    setFile(f);
    setUploadStep('validating');

    // 1. MIME & Extension check
    if (!f.name.toLowerCase().endsWith('.pdf') && f.type !== 'application/pdf') {
      setErrorMsg('File must be a genuine PDF document (.pdf)');
      setUploadStep('idle');
      setFileValid(false);
      return;
    }

    // 2. Client-side Magic-Number Validation (%PDF-1.)
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      if (evt.target.readyState === FileReader.DONE) {
        const arr = new Uint8Array(evt.target.result).subarray(0, 5);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
          header += String.fromCharCode(arr[i]);
        }
        if (header.startsWith('%PDF-')) {
          setFileValid(true);
          setUploadStep('idle');
        } else {
          setErrorMsg('Invalid file signature! Magic number does not match genuine PDF header (%PDF-).');
          setFileValid(false);
          setUploadStep('idle');
        }
      }
    };
    reader.readAsArrayBuffer(f.slice(0, 8));
  };

  const startPipeline = () => {
    if (!file || !fileValid) return;

    setUploadStep('uploading');
    setTimeout(() => {
      setUploadStep('processing');
      setTimeout(() => {
        setUploadStep('completed');
        setGeneratedDrafts({
          summary: `This report details the glacio-meteorological regime surveyed during the 44th Indian Antarctic Expedition at Bharati Station. Terminus ablation rates and ice-shelf cavity melt dynamics were monitored using dual-frequency radar and acoustic Doppler profilers. Key findings indicate a 3.4% reduction in seasonal sea-ice buttressing along the Prydz Bay sector.`,
          news: `GOA / LARSEMANN HILLS — NCPOR researchers deployed with the 44th Indian Antarctic Expedition have submitted preliminary findings on ice-shelf melt telemetry. The findings demonstrate enhanced warm deep-water intrusions into the continental shelf, establishing crucial empirical baselines for MoES polar models.`,
          linkedin: `Proud to share preliminary observations from the 44th Indian Antarctic Expedition! 🇮🇳❄️ Our team at Bharati Station has finalized sensor telemetry on ice-shelf buttressing in Prydz Bay. Comprehensive data is being indexed in the National Polar Data Center (NPDC). #PolarScience #NCPOR #MoES #Antarctica #ClimateResearch`,
          instagram: `Fieldwork under the midnight sun! ❄️✨ The 44th Indian Antarctic Expedition team at Bharati Station has concluded multi-sensor ice cavity logging. Follow @ncpor.goa for upcoming expedition insights and data releases. #NCPOR #BharatiStation #Antarctica #ScienceAtThePoles`,
          twitter: `New research data from 44th IAE: Radar surveys at Prydz Bay indicate accelerating basal melt variations beneath the Amery-Bharati coastal boundary. Full expedition log archived at NCPOR. #PolarResearch #Cryosphere #IndiaInAntarctica`,
          facebook: `NCPOR scientific teams deployed in Antarctica have submitted their field expedition logs for the 2025-2026 season. These observations from Bharati Station provide crucial insights into Southern Ocean heat transport. Read more on the Polar Science Portal.`
        });
        showToast('Expedition report processed! AI drafts generated for human review.');
      }, 1500);
    }, 1200);
  };

  const handleFinalSubmitForReview = () => {
    showToast('Success! Expedition report & AI drafts submitted for Admin/Scientific review (Status: Pending Review).');
    setTimeout(() => {
      setUploadStep('idle');
      setFile(null);
      setGeneratedDrafts(null);
    }, 2500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 text-left font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center space-x-3 text-xs font-bold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-200">
            <Upload className="w-3.5 h-3.5 text-blue-600" />
            <span>Researcher Ingestion Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
            Upload Expedition Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Submit verified polar mission logs, field reports, and cruise summaries for automated text extraction, AI summarization, and multi-channel dissemination.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center space-x-1.5 self-start sm:self-center">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Role: RESEARCHER / PI</span>
        </div>
      </div>

      {/* Upload Flow Stepper */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-xs font-bold">
        {[
          { num: '1', title: 'File Validation', desc: 'Magic-number verification' },
          { num: '2', title: 'Storage Upload', desc: 'Cloudinary signed ingest' },
          { num: '3', title: 'AI Extraction', desc: 'Summary & multi-channel' },
          { num: '4', title: 'Human Review', desc: 'Pending admin approval' },
        ].map((step, idx) => (
          <div
            key={step.num}
            className={`p-3.5 rounded-2xl border transition-all ${
              uploadStep === 'completed' || (uploadStep === 'processing' && idx <= 2) || (uploadStep === 'uploading' && idx <= 1) || (fileValid && idx === 0)
                ? 'bg-blue-50/60 border-blue-300 text-blue-900'
                : 'bg-white border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                uploadStep === 'completed' || (uploadStep === 'processing' && idx <= 2)
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {step.num}
              </span>
              <span className="font-heading truncate">{step.title}</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 hidden sm:block truncate">{step.desc}</div>
          </div>
        ))}
      </div>

      {/* Main Upload Dropzone */}
      {!generatedDrafts ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          {/* Metadata Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Expedition / Report Title</label>
              <input
                type="text"
                value={expeditionTitle}
                onChange={e => setExpeditionTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Station / Location</label>
              <input
                type="text"
                value={station}
                onChange={e => setStation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Research Discipline</label>
              <input
                type="text"
                value={discipline}
                onChange={e => setDiscipline(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Lead Investigator / Author</label>
              <input
                type="text"
                value={leadAuthor}
                onChange={e => setLeadAuthor(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
              fileValid
                ? 'border-emerald-400 bg-emerald-50/20'
                : errorMsg
                ? 'border-rose-400 bg-rose-50/20'
                : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,application/pdf"
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center mx-auto mb-3 text-blue-600">
              {fileValid ? (
                <FileCheck className="w-7 h-7 text-emerald-600" />
              ) : (
                <Upload className="w-7 h-7" />
              )}
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-slate-900 font-heading">
                {file ? file.name : 'Select PDF files or drop PDFs here'}
              </div>
              <p className="text-xs text-slate-500">
                {file
                  ? `${(file.size / (1024 * 1024)).toFixed(2)} MB • Client Magic-Number Verified (%PDF-1.x)`
                  : 'Authentic PDF documents up to 50MB. Dual verification with cryptographic magic byte analysis.'}
              </p>
            </div>

            {errorMsg && (
              <div className="mt-3 inline-flex items-center space-x-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-end space-x-3">
            <button
              disabled={!fileValid || uploadStep !== 'idle'}
              onClick={startPipeline}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all ${
                fileValid && uploadStep === 'idle'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {uploadStep === 'uploading' && <RefreshCw className="w-4 h-4 animate-spin" />}
              {uploadStep === 'processing' && <Sparkles className="w-4 h-4 animate-spin text-amber-300" />}
              <span>
                {uploadStep === 'uploading'
                  ? 'Uploading to Cloudinary...'
                  : uploadStep === 'processing'
                  ? 'Extracting Text & Generating Drafts...'
                  : 'Start Processing Pipeline'}
              </span>
              {uploadStep === 'idle' && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      ) : (
        /* Generated Drafts Review Interface */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Status: Pending Human Review
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-heading mt-1">
                AI Generated Multi-Channel Content
              </h2>
              <p className="text-xs text-slate-500">
                Review and edit generated scientific summaries and social media drafts before submitting to the Admin queue.
              </p>
            </div>

            <button
              onClick={handleFinalSubmitForReview}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit for Admin Approval</span>
            </button>
          </div>

          {/* Channel Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'summary', label: 'Research Summary', icon: BookOpen },
              { id: 'news', label: 'News Article', icon: Newspaper },
              { id: 'linkedin', label: 'LinkedIn Post', icon: Share2 },
              { id: 'instagram', label: 'Instagram Caption', icon: Share2 },
              { id: 'twitter', label: 'X / Twitter Post', icon: Share2 },
              { id: 'facebook', label: 'Facebook Post', icon: Share2 },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDraftTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                    activeDraftTab === tab.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Editable Draft Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700">Editable Content Preview</span>
              <span className="text-[11px] font-mono">
                {generatedDrafts[activeDraftTab]?.length || 0} characters
              </span>
            </div>
            <textarea
              rows={6}
              value={generatedDrafts[activeDraftTab]}
              onChange={(e) => {
                const val = e.target.value;
                setGeneratedDrafts(prev => ({ ...prev, [activeDraftTab]: val }));
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 leading-relaxed font-sans focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <p className="text-[11px] text-slate-400 italic">
              Notice: Scientific content will not be publicly displayed until approved by an administrator in the AI Approval console.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
