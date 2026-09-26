import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  Search,
  CheckCircle2,
  XCircle,
  ThumbsUp,
  MessageSquare,
  FileText,
  Upload,
  ArrowRight,
  Sparkles,
  RefreshCw,
  Award,
  Layers
} from 'lucide-react';

export default function SmartEducation() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSuggestedTopic, setActiveSuggestedTopic] = useState('Antarctica');

  // Quiz State (Exact Match to Reference media_1790447428294.png & media_1790447347006.png)
  const [q1Selected, setQ1Selected] = useState(null);
  const [q2Selected, setQ2Selected] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [generatedQuizData, setGeneratedQuizData] = useState(null);

  // Suggested Topics matching Master Prompt Section 12:
  // Antarctica, Arctic Ocean, Sea Ice, Polar Climate, Maitri, Bharati, Himadri, Cryosphere
  const suggestedTopics = [
    'Antarctica',
    'Arctic Ocean',
    'Sea Ice',
    'Polar Climate',
    'Maitri',
    'Bharati',
    'Himadri',
    'Cryosphere'
  ];

  // Topic Educational Content Database
  const topicContent = {
    'Antarctica': {
      title: 'Antarctic Cryosphere & Continental Ice Sheet',
      intro: 'Antarctica holds approximately 70% of Earth’s freshwater and 90% of its terrestrial ice. India has maintained active scientific stations in East Antarctica since 1981.',
      keyConcepts: [
        'Ice Sheet Mass Balance: Net difference between snowfall accumulation and coastal calving/basal melting.',
        'Southern Annular Mode (SAM): Principal atmospheric driver influencing circumpolar westerlies and sea-ice distribution.',
        'Antarctic Bottom Water (AABW): High-density oxygenated water sinking to drive the global thermohaline conveyor belt.'
      ],
      relevantResearch: 'Dr. Thamban Meloth et al., High-Resolution Ice Core Paleoclimatology from Central Dronning Maud Land (NCPOR Monograph 2024).'
    },
    'Cryosphere': {
      title: 'Cryospheric Dynamics and Earth System Resilience',
      intro: 'The cryosphere encompasses all frozen water on Earth, including glaciers, ice sheets, permafrost, snow cover, and seasonal sea ice.',
      keyConcepts: [
        'Albedo Feedback: Highly reflective snow and ice reflect up to 85% of solar radiation, moderating planetary temperature.',
        'Permafrost Thaw: Release of stored soil carbon and methane under sustained polar warming anomalies.',
        'Glacial Lake Outburst Floods (GLOFs): Cryospheric hazard monitored by NCPOR in benchmark Himalayan basins.'
      ],
      relevantResearch: 'NCPOR Himalayan Cryosphere Division, Spiti Valley Benchmark Glacier Ablation Report (2025).'
    },
    'Sea Ice': {
      title: 'Polar Sea-Ice Extent, Thickness, and Albedo',
      intro: 'Polar sea ice forms from seawater in both hemispheres. It acts as an insulating blanket between cold atmospheric air and relatively warm underlying polar ocean currents.',
      keyConcepts: [
        'Marginal Ice Zone (MIZ): Highly dynamic boundary where ocean waves fracture consolidated pack ice.',
        'Polynyas: Open ocean areas amidst pack ice formed by persistent katabatic winds or sensible heat upwelling.',
        'Satellite Microwave Altimetry: Technique used by NCPOR researchers to measure multi-year sea ice thickness variations.'
      ],
      relevantResearch: 'NPDC Satellite Passive Microwave Radiometer Time Series (2010–2026).'
    }
  };

  const activeContent = topicContent[activeSuggestedTopic] || topicContent['Antarctica'];

  // 3 Learning Modules (Exact Match to Blog Widget Reference media_1790447418604.png)
  const learningModules = [
    {
      id: 'mod-1',
      author: 'By Admin',
      date: 'September 24, 2026',
      title: 'Antarctic Ice Dynamics & Global Sea Level Rise',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      description: 'Understanding ice shelf calving, sub-glacial melting, and satellite altimetry observations from Schirmacher Oasis to the Ross Ice Shelf.',
      likes: 21,
      comments: 17
    },
    {
      id: 'mod-2',
      author: 'By Admin',
      date: 'September 24, 2026',
      title: 'Arctic Amplification & the Weakening Polar Vortex',
      image: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=600',
      description: 'How rapid Arctic warming alters upper-tropospheric jet streams and impacts the Indian monsoon meteorological systems.',
      likes: 15,
      comments: 10
    },
    {
      id: 'mod-3',
      author: 'By Admin',
      date: 'September 24, 2026',
      title: 'Deep Ice Core Paleoclimatology: Earth History in Gas Bubbles',
      image: 'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=600',
      description: 'Drilling into polar ice sheets to extract atmospheric carbon dioxide and greenhouse gas records spanning the last 800,000 years.',
      likes: 7,
      comments: 3
    }
  ];

  const handleQuizSubmit = () => {
    if (q1Selected !== null && q2Selected !== null) {
      setQuizSubmitted(true);
    }
  };

  const handleGenerateAIQuiz = () => {
    setGeneratingQuiz(true);
    setTimeout(() => {
      setGeneratedQuizData({
        topic: activeSuggestedTopic,
        question: `Which scientific mechanism primarily drives the formation of polynyas in the vicinity of Indian stations in East Antarctica?`,
        options: ['A) Strong katabatic winds offshore', 'B) Geothermal sea vents', 'C) Surface meltwater pooling', 'D) Heavy polar snowfall'],
        correctIndex: 0,
        explanation: 'Intense offshore katabatic winds blowing from the high Antarctic ice plateau push pack ice away from the coast, creating persistent open-water polynyas.'
      });
      setGeneratingQuiz(false);
    }, 1000);
  };

  return (
    <div className="space-y-12 pb-16 text-left max-w-5xl mx-auto font-sans">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Interactive Student Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
          Polar Smart Education
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Explore curated learning topics, study research notes, and test your comprehension through AI-powered scientific quizzes.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. SEARCH TOPIC & SUGGESTED PILLS (Reference Section 12)    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs text-center space-y-5">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
            <span>Polar Knowledge Exploration</span>
          </div>

          {/* Minimalist Search Input ("Type to search") */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Type to search polar concepts (e.g. Sea Ice, Maitri, Permafrost)"
              className="w-full text-center text-xl sm:text-3xl font-light text-slate-800 placeholder-slate-400 focus:outline-none py-2 border-b border-slate-200 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Suggested Topic Reference Pills */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Suggested Topics:
            </div>
            <div className="flex items-center justify-center flex-wrap gap-2">
              {suggestedTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => {
                    setActiveSuggestedTopic(topic);
                    setSearchTerm(topic);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSuggestedTopic === topic
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {topic.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. TOPIC LEARNING NOTES (When user selects a topic)         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Selected Curriculum Focus
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-1">
              {activeContent.title}
            </h2>
          </div>
          <button
            onClick={handleGenerateAIQuiz}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate AI Quiz</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
          {activeContent.intro}
        </p>

        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Key Scientific Concepts:
          </div>
          <div className="space-y-1.5">
            {activeContent.keyConcepts.map((concept, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{concept}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 text-xs text-slate-500">
          <strong>Referenced Scientific Literature:</strong> {activeContent.relevantResearch}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. LEARNING MODULES REFERENCE (3 Blog Widget Cards)         */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1 border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Learning Curriculum</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">
            Student Education Modules
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Self-paced curriculum designed for schools, universities, and competitive polar research candidates
          </p>
        </div>

        {/* 3 Clean White Cards Matching Blog Widget Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningModules.map(module => (
            <div
              key={module.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Top Metadata Bar */}
              <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{module.author}</span>
                <span>{module.date}</span>
              </div>

              {/* Landscape Thumbnail */}
              <div className="aspect-video w-full bg-slate-900 overflow-hidden">
                <img
                  src={module.image}
                  alt={module.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-blue-700 leading-snug">
                    {module.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {module.description}
                  </p>
                </div>

                {/* Bottom Bar: Read More + Likes / Comments */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button className="px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors">
                    Read More
                  </button>
                  <div className="text-[11px] text-slate-500 flex items-center space-x-2">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3 text-slate-400" />
                      {module.likes} people like
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-slate-400" />
                      {module.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. QUIZ SECTION REFERENCE (Title: Test Your Knowledge)     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-1 border border-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Interactive Assessment</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
            Test Your Knowledge
          </h2>
          <div className="flex items-center space-x-2 text-slate-700 font-extrabold text-xs uppercase tracking-wider pt-1">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
              ?
            </span>
            <span>MODULE QUICK QUIZ</span>
          </div>
        </div>

        {/* Question 1 (Exact Match to Reference Image media_1790447428294.png) */}
        <div className="space-y-3">
          <p className="text-sm font-bold text-slate-900">
            1. What percentage of the world's freshwater is stored in the Antarctic ice sheet?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['About 25%', 'About 50%', 'About 70%', 'About 90%'].map((opt) => {
              const isSelected = q1Selected === opt;
              const isCorrect = opt === 'About 70%';
              let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

              if (quizSubmitted) {
                if (isCorrect) btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs';
              }

              return (
                <button
                  key={opt}
                  disabled={quizSubmitted}
                  onClick={() => setQ1Selected(opt)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question 2 (Exact Match to Reference Image media_1790447428294.png) */}
        <div className="space-y-3 pt-2">
          <p className="text-sm font-bold text-slate-900">
            2. Which of the following is India's first permanent research base in Antarctica?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {['Maitri', 'Dakshin Gangotri', 'Bharati', 'Himadri'].map((opt) => {
              const isSelected = q2Selected === opt;
              const isCorrect = opt === 'Dakshin Gangotri';
              let btnClass = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';

              if (quizSubmitted) {
                if (isCorrect) btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                else if (isSelected && !isCorrect) btnClass = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
              } else if (isSelected) {
                btnClass = 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs';
              }

              return (
                <button
                  key={opt}
                  disabled={quizSubmitted}
                  onClick={() => setQ2Selected(opt)}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm text-left transition-all ${btnClass}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit & Check Answers Button (Reference media_1790447428294.png) */}
        {!quizSubmitted ? (
          <div className="pt-2">
            <button
              onClick={handleQuizSubmit}
              disabled={q1Selected === null || q2Selected === null}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
            >
              Submit &amp; Check Answers
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn text-xs">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Quiz Evaluation Result</span>
              <span className="text-emerald-700">
                Score: { (q1Selected === 'About 70%' ? 1 : 0) + (q2Selected === 'Dakshin Gangotri' ? 1 : 0) } / 2 Correct
              </span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong>Explanation:</strong> Q1: The Antarctic ice sheet stores roughly 70% of the planet's freshwater and 90% of its ice. Q2: Dakshin Gangotri was established during the 3rd Indian Antarctic Expedition (1983-84) as India's first permanent Antarctic base.
            </p>
            <button
              onClick={() => {
                setQ1Selected(null);
                setQ2Selected(null);
                setQuizSubmitted(false);
              }}
              className="text-blue-600 font-bold hover:underline pt-1 block"
            >
              Reset Quiz &amp; Retake
            </button>
          </div>
        )}

        {/* Dynamically Generated AI Quiz Section if active */}
        {generatedQuizData && (
          <div className="mt-6 p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-purple-700 uppercase tracking-wider flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Generated Challenge for {generatedQuizData.topic}</span>
              </span>
              <button
                onClick={() => setGeneratedQuizData(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Dismiss
              </button>
            </div>
            <p className="text-xs font-bold text-slate-900">
              {generatedQuizData.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {generatedQuizData.options.map((opt, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white border border-purple-100 text-slate-800">
                  {opt}
                </div>
              ))}
            </div>
            <div className="text-[11px] text-purple-900 bg-purple-100/70 p-2.5 rounded-xl">
              <strong>Answer &amp; Explanation:</strong> {generatedQuizData.options[generatedQuizData.correctIndex]} — {generatedQuizData.explanation}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
