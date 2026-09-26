import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  Check,
  ChevronRight,
  HelpCircle,
  Video,
  FileText
} from 'lucide-react';

export default function SmartEducation() {
  // Step in learning funnel: 1 = Choose Topic, 2 = Study Module & Video, 3 = Take Quiz
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTopicId, setSelectedTopicId] = useState('antarctica');
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Curated Topics with complete modules, videos, and preparation quiz banks
  const topicsData = {
    antarctica: {
      id: 'antarctica',
      title: 'Antarctic Cryosphere & Continental Ice Sheets',
      badge: 'Antarctic Sciences',
      color: 'from-blue-600 to-indigo-700',
      difficulty: 'Intermediate',
      estimatedTime: '20 mins',
      icon: '🇦🇳',
      description: 'Explore the 14 million sq km ice sheet holding 70% of Earth’s freshwater, grounding lines, and India’s Maitri and Bharati bases.',
      videos: [
        {
          title: 'Indian Antarctic Research: Maitri & Bharati Scientific Operations',
          videoId: 'v3x8Y3U_a9A',
          duration: '12:40',
          instructor: 'MoES & NCPOR Expedition Directorate'
        },
        {
          title: 'Antarctic Ice Sheet Mass Balance & Subglacial Lakes',
          videoId: 'nCqw3j6xWec',
          duration: '15:20',
          instructor: 'Polar Climate Consortium'
        }
      ],
      curriculum: {
        unitTitle: 'Module 1: Ice Sheet Mass Balance & Grounding Line Dynamics',
        summary: 'The Antarctic ice sheet is the largest single mass of ice on Earth. It averages 2 km in thickness and reaches bedrock well below sea level in West Antarctica.',
        keyPoints: [
          'Ice Mass Balance: Determined by the ratio of surface snowfall accumulation vs. peripheral ice shelf calving and basal melting.',
          'Grounding Line Retreat: The boundary where grounded glacial ice detaches from the bedrock and becomes a floating ice shelf; retreat accelerates upstream ice velocity.',
          'Maitri Base Telemetry: Situated in the Schirmacher Oasis, collecting continuous meteorological, geomagnetism, and aerosol optical depth records since 1989.',
          'Katabatic Winds: Gravity-driven winds descending from the high Antarctic Plateau reaching speeds exceeding 150 km/h.'
        ],
        literature: 'NCPOR Indian Antarctic Expedition Monograph (MoES Technical Report #43).'
      },
      quiz: [
        {
          id: 'q1',
          question: 'What percentage of the world’s freshwater is sequestered within the Antarctic ice sheet?',
          options: ['About 25%', 'About 50%', 'About 70%', 'About 95%'],
          correctIndex: 2,
          explanation: 'Approximately 70% of Earth’s freshwater and 90% of all planetary ice is stored in the Antarctic continental ice sheet.'
        },
        {
          id: 'q2',
          question: 'In which geographical setting is India’s second permanent station, Maitri, established?',
          options: ['Larsemann Hills', 'Schirmacher Oasis', 'Ny-Ålesund', 'Ross Island'],
          correctIndex: 1,
          explanation: 'Maitri station was established in 1989 on the ice-free rocky terrain of the Schirmacher Oasis in Dronning Maud Land.'
        },
        {
          id: 'q3',
          question: 'What is the "grounding line" of a marine-terminating ice sheet?',
          options: [
            'The highest point of the glacier accumulation zone',
            'The boundary where grounded ice begins to float on seawater',
            'The crevassed shear margin between two ice streams',
            'The terminal moraine formed during the last glacial maximum'
          ],
          correctIndex: 1,
          explanation: 'The grounding line marks the transition where glacial ice rests on the bedrock before lifting off to form a floating ice shelf.'
        },
        {
          id: 'q4',
          question: 'Which meteorological phenomenon causes the extreme downslope winds across the coastal ice margins?',
          options: ['Monsoon depressions', 'Katabatic winds', 'Polar easterlies', 'Jet stream meandering'],
          correctIndex: 1,
          explanation: 'Katabatic winds occur when high-density cold air over the Antarctic Plateau descends under the influence of gravity down the steep coastal slopes.'
        }
      ]
    },

    arctic: {
      id: 'arctic',
      title: 'Arctic Kongsfjorden & Marine Hydrography',
      badge: 'Arctic Sciences',
      color: 'from-teal-600 to-cyan-800',
      difficulty: 'Advanced',
      estimatedTime: '25 mins',
      icon: '❄️',
      description: 'Study Arctic amplification, IndARC underwater observatory in Kongsfjorden fjord, and Himadri research station in Svalbard.',
      videos: [
        {
          title: 'IndARC Mooring Deployment in Kongsfjorden, Svalbard',
          videoId: 'NnL7PZzJ6XU',
          duration: '10:15',
          instructor: 'NCPOR Arctic Research Wing'
        },
        {
          title: 'Arctic Amplification & Polar Jet Stream Coupling',
          videoId: '2_XvGfC5k88',
          duration: '14:50',
          instructor: 'International Arctic Science Committee'
        }
      ],
      curriculum: {
        unitTitle: 'Module 1: Fjord Hydrography and IndARC Telemetry',
        summary: 'Kongsfjorden is an open glacial fjord on the northwest coast of Spitsbergen, Svalbard. It serves as a natural laboratory for studying Atlantic water intrusions into the Arctic.',
        keyPoints: [
          'IndARC Mooring: India’s first multi-sensor underwater moored observatory, deployed in 2014 at a depth of ~192 meters in Kongsfjorden.',
          'Atlantic Water Inflow: Warm, saline water from the West Spitsbergen Current entering the fjord and driving accelerated glacier tongue ablation.',
          'Himadri Station: India’s permanent Arctic research facility in Ny-Ålesund, Norway (78°55′ N), operational since 2008.',
          'Arctic Amplification: The phenomenon where the Arctic warms at more than double the global average rate due to sea-ice albedo feedback.'
        ],
        literature: 'Krishnan et al., High-Resolution Temperature Profiling of Kongsfjorden (Polar Science 2024).'
      },
      quiz: [
        {
          id: 'q1',
          question: 'What is IndARC in the context of Indian polar research?',
          options: [
            'A polar icebreaker ship',
            'India’s multi-sensor moored underwater observatory in Svalbard',
            'An airborne LiDAR mapping aircraft',
            'A deep ice core drilling apparatus'
          ],
          correctIndex: 1,
          explanation: 'IndARC is India’s subsurface moored observatory deployed in Kongsfjorden fjord, Svalbard, monitoring temperature, salinity, and currents year-round.'
        },
        {
          id: 'q2',
          question: 'Where is India’s Himadri Arctic station located?',
          options: ['Longyearbyen, Svalbard', 'Ny-Ålesund, Svalbard', 'Tromsø, Norway', 'Nuuk, Greenland'],
          correctIndex: 1,
          explanation: 'Himadri is situated at the international research base in Ny-Ålesund, Spitsbergen, Svalbard (78°55′ N).'
        },
        {
          id: 'q3',
          question: 'Why is Arctic amplification occurring faster than warming in lower latitudes?',
          options: [
            'Enhanced solar radiation at midnight sun',
            'Ice-albedo feedback replacing reflective ice with absorbing open water',
            'Higher volcanic emissions in northern polar regions',
            'Atmospheric ozone depletion'
          ],
          correctIndex: 1,
          explanation: 'As white sea ice melts, darker ocean surface absorbs significantly more incoming solar radiation, triggering positive feedback warming.'
        }
      ]
    },

    himalaya: {
      id: 'himalaya',
      title: 'Himalayan Cryosphere & Benchmark Glaciers',
      badge: 'Third Pole / Cryosphere',
      color: 'from-amber-600 to-orange-700',
      difficulty: 'Intermediate',
      estimatedTime: '18 mins',
      icon: '🏔️',
      description: 'Understand the "Third Pole", Gepang Gath and Chhota Shigri benchmark glacier mass balance, and GLOF early warning systems.',
      videos: [
        {
          title: 'Himansh Station: High Altitude Glacier Monitoring in Chandra Basin',
          videoId: 'K8q2qA2mUqg',
          duration: '11:30',
          instructor: 'NCPOR Cryospheric Division'
        }
      ],
      curriculum: {
        unitTitle: 'Module 1: DGPS Mass Balance and Glacial Lake Hazards',
        summary: 'The Himalayas contain the largest concentration of ice outside the polar regions. Termed the "Water Tower of Asia", they feed perennial rivers sustaining over 1.4 billion people.',
        keyPoints: [
          'Himansh Research Station: Established by NCPOR in 2016 at 4,080m altitude in Sutri Dhaka, Himachal Pradesh.',
          'Benchmark Glaciers: Long-term in-situ ablation monitoring at Gepang Gath, Batal, and Samudra Tapu glaciers.',
          'GLOF Vulnerability: Proglacial lakes forming as glaciers retreat; potential breach creates devastating Glacial Lake Outburst Floods.',
          'Debris Cover Insulation: Supraglacial debris exceeding 5 cm thickness insulates underlying ice, moderating ablation rates.'
        ],
        literature: 'Meloth et al., Glacier Mass Loss in the Western Himalaya: 2000–2025 Assessment.'
      },
      quiz: [
        {
          id: 'q1',
          question: 'Where is India’s high-altitude research station "Himansh" situated?',
          options: [
            'Ladakh Range, Leh',
            'Chandra Basin, Spiti Valley, Himachal Pradesh',
            'Garhwal Himalaya, Uttarakhand',
            'Sikkim Himalaya'
          ],
          correctIndex: 1,
          explanation: 'Himansh was established by NCPOR in the Chandra Basin of the Western Himalayas (Himachal Pradesh) at ~4,080 meters elevation.'
        },
        {
          id: 'q2',
          question: 'What is a GLOF?',
          options: [
            'Geothermal Lake Oxidation Factor',
            'Glacial Lake Outburst Flood',
            'Global Low-Oxygen Formulation',
            'Glaciological Open Field'
          ],
          correctIndex: 1,
          explanation: 'A Glacial Lake Outburst Flood (GLOF) occurs when a moraine-dammed or ice-dammed proglacial lake suddenly breaches its containment.'
        },
        {
          id: 'q3',
          question: 'What effect does a thick (>10 cm) layer of supraglacial debris have on glacier melt?',
          options: [
            'Accelerates melt due to increased albedo',
            'Insulates the ice and reduces the melt rate',
            'Has zero effect on ablation',
            'Causes immediate subglacial collapse'
          ],
          correctIndex: 1,
          explanation: 'While thin dust (<1 cm) accelerates melt by lowering albedo, thick debris acts as a thermal blanket, insulating the ice from incoming solar radiation.'
        }
      ]
    },

    ocean: {
      id: 'ocean',
      title: 'Southern Ocean Dynamics & Carbon Flux',
      badge: 'Oceanography',
      color: 'from-sky-600 to-blue-800',
      difficulty: 'Advanced',
      estimatedTime: '22 mins',
      icon: '🌊',
      description: 'Discover the Antarctic Circumpolar Current (ACC), phytoplankton productivity, and deep oceanic carbon sequestration.',
      videos: [
        {
          title: 'Southern Ocean Expedition: CTD Profiling & Microstructure Analysis',
          videoId: 'fGf7_iP0V8U',
          duration: '16:00',
          instructor: 'National Polar Data Center (NPDC)'
        }
      ],
      curriculum: {
        unitTitle: 'Module 1: Phytoplankton Biogeochemistry & Carbon Export',
        summary: 'The Southern Ocean accounts for up to 40% of the total oceanic uptake of anthropogenic carbon dioxide, operating as a vital planetary climate buffer.',
        keyPoints: [
          'Antarctic Circumpolar Current (ACC): The world’s strongest ocean current, connecting the Atlantic, Pacific, and Indian Ocean basins without continental barrier.',
          'High Nutrient Low Chlorophyll (HNLC): High dissolved nitrate and phosphate but primary production limited by sub-nanomolar iron concentrations.',
          'Biological Carbon Pump: Phytoplankton fixing atmospheric CO2 in the photic zone and exporting organic carbon into the deep bathypelagic layer.',
          'Microstructure Profiling: Measuring turbulent kinetic energy dissipation to understand vertical heat and nutrient transport.'
        ],
        literature: 'Anilkumar et al., SOE Cruise Scientific Report on Phytoplankton Photophysiology.'
      },
      quiz: [
        {
          id: 'q1',
          question: 'What is the primary micronutrient limiting phytoplankton growth in the HNLC waters of the Southern Ocean?',
          options: ['Nitrogen', 'Phosphorus', 'Iron', 'Potassium'],
          correctIndex: 2,
          explanation: 'The Southern Ocean is a classic High Nutrient, Low Chlorophyll (HNLC) region where biological production is strictly iron-limited.'
        },
        {
          id: 'q2',
          question: 'The Antarctic Circumpolar Current (ACC) flows in which direction around Antarctica?',
          options: ['East to West', 'West to East (Clockwise around South Pole)', 'North to South', 'Static without net flow'],
          correctIndex: 1,
          explanation: 'Driven by persistent westerly winds, the ACC flows from west to east in a continuous clockwise circle around the Antarctic continent.'
        }
      ]
    }
  };

  const activeTopic = topicsData[selectedTopicId] || topicsData.antarctica;

  const handleSelectOption = (questionId, optionIndex) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let correct = 0;
    activeTopic.quiz.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleNextVideo = () => {
    if (activeTopic.videos.length > 1) {
      setActiveVideoIndex(prev => (prev + 1) % activeTopic.videos.length);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20 text-left font-sans">
      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. HEADER & PROGRESSIVE 3-STEP PROGRESS BAR                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-200">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Progressive Learning Curriculum</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-heading">
              Polar Smart Education & Test Preparation
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Choose your topic, study the multimedia lesson with live video lectures, and take the examination quiz to prepare for polar science assessments.
            </p>
          </div>
        </div>

        {/* 3-Step Breadcrumb Funnel Indicator */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => {
              setCurrentStep(1);
              setQuizSubmitted(false);
            }}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              currentStep === 1
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">1</span>
            <span className="truncate">1. Choose Topic</span>
          </button>

          <button
            onClick={() => {
              setCurrentStep(2);
              setQuizSubmitted(false);
            }}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              currentStep === 2
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">2</span>
            <span className="truncate">2. Study Module & Video</span>
          </button>

          <button
            onClick={() => setCurrentStep(3)}
            className={`py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              currentStep === 3
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">3</span>
            <span className="truncate">3. Preparation Quiz</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* STEP 1: CHOOSE THE TOPIC (STAGE 1)                          */}
      {/* ─────────────────────────────────────────────────────────── */}
      {currentStep === 1 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Stage 1 of 3</span>
              <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
                Select Your Polar Study Discipline
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select an official curriculum stream to load its interactive lecture video, research study notes, and test bank.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {Object.values(topicsData).map((topic) => {
                const isSelected = selectedTopicId === topic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopicId(topic.id)}
                    className={`rounded-2xl p-6 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-200'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{topic.icon}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {topic.difficulty}
                          </span>
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                            {topic.estimatedTime}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 font-heading">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {topic.videos.length} Video Lectures • {topic.quiz.length} Quiz Questions
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTopicId(topic.id);
                          setCurrentStep(2);
                        }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                      >
                        <span>Start Study Module</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Proceed to Study Module & Video →</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* STEP 2: STUDY MODULE & VIDEO LECTURE (STAGE 2)             */}
      {/* ─────────────────────────────────────────────────────────── */}
      {currentStep === 2 && (
        <section className="space-y-6 animate-fadeIn">
          {/* Active Topic Banner with Switcher */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Stage 2 of 3 • Interactive Curriculum</span>
                <h2 className="text-2xl font-black text-slate-900 font-heading flex items-center gap-2 mt-1">
                  <span>{activeTopic.icon}</span>
                  <span>{activeTopic.title}</span>
                </h2>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all self-start sm:self-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Topic</span>
              </button>
            </div>

            {/* Embedded Live Educational Video Player */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-blue-600" />
                  <h3 className="font-extrabold text-sm text-slate-900 font-heading">
                    Lecture {activeVideoIndex + 1} of {activeTopic.videos.length}: {activeTopic.videos[activeVideoIndex].title}
                  </h3>
                </div>
                {activeTopic.videos.length > 1 && (
                  <button
                    onClick={handleNextVideo}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs border border-blue-200 transition-colors"
                  >
                    <span>Next Video Lecture →</span>
                  </button>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-lg border border-slate-200">
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube-nocookie.com/embed/${activeTopic.videos[activeVideoIndex].videoId}?autoplay=1&mute=1&loop=1&playlist=${activeTopic.videos[activeVideoIndex].videoId}`}
                  title={activeTopic.videos[activeVideoIndex].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Presenter: {activeTopic.videos[activeVideoIndex].instructor}</span>
                <span>Duration: {activeTopic.videos[activeVideoIndex].duration}</span>
              </div>
            </div>

            {/* In-Depth Scientific Reading Module */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="font-black text-base text-slate-900 font-heading">
                  {activeTopic.curriculum.unitTitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {activeTopic.curriculum.summary}
              </p>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Essential Scientific Principles:
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeTopic.curriculum.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-start space-x-3 text-xs text-slate-800 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-slate-600">
                <span className="font-bold text-blue-900">Standard Literature: </span>
                <span>{activeTopic.curriculum.literature}</span>
              </div>
            </div>

            {/* Bottom Action: Take Quiz Button */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Ready to evaluate what you learned? The quiz contains {activeTopic.quiz.length} peer-reviewed test questions.
              </span>
              <button
                onClick={() => {
                  setUserAnswers({});
                  setQuizSubmitted(false);
                  setCurrentStep(3);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Take Preparation Quiz Now →</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────── */}
      {/* STEP 3: PREPARATION QUIZ & INSTANT ASSESSMENT (STAGE 3)     */}
      {/* ─────────────────────────────────────────────────────────── */}
      {currentStep === 3 && (
        <section className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Stage 3 of 3 • Knowledge Assessment</span>
                <h2 className="text-2xl font-black text-slate-900 font-heading mt-1">
                  Preparation Quiz: {activeTopic.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Answer all questions and submit to generate your instant score report and scientific breakdown.
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all self-start sm:self-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Study Notes</span>
              </button>
            </div>

            {/* Questions Stream */}
            <div className="space-y-8">
              {activeTopic.quiz.map((q, qIndex) => {
                const selectedOption = userAnswers[q.id];
                const isAnswered = selectedOption !== undefined;

                return (
                  <div key={q.id} className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-bold text-slate-900">
                        {qIndex + 1}. {q.question}
                      </p>
                      {quizSubmitted && (
                        <div>
                          {selectedOption === q.correctIndex ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                              <Check className="w-3 h-3" /> Correct
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
                              <XCircle className="w-3 h-3" /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = selectedOption === optIdx;
                        const isCorrect = q.correctIndex === optIdx;

                        let buttonStyles = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';

                        if (isSelected && !quizSubmitted) {
                          buttonStyles = 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs';
                        } else if (quizSubmitted) {
                          if (isCorrect) {
                            buttonStyles = 'bg-emerald-600 text-white border-emerald-600 font-bold';
                          } else if (isSelected && !isCorrect) {
                            buttonStyles = 'bg-rose-600 text-white border-rose-600 font-bold';
                          } else {
                            buttonStyles = 'bg-white opacity-50 border-slate-200 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            disabled={quizSubmitted}
                            className={`p-3 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${buttonStyles}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && isCorrect && <Check className="w-4 h-4 shrink-0 text-white" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Scientific Explanation after submission */}
                    {quizSubmitted && (
                      <div className="mt-3 p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                        <span className="font-bold text-slate-900">Explanation: </span>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Score & Actions */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              {quizSubmitted ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg">
                    {calculateScore()}/{activeTopic.quiz.length}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900">
                      Assessment Completed! Score: {Math.round((calculateScore() / activeTopic.quiz.length) * 100)}%
                    </div>
                    <div className="text-xs text-slate-500">
                      {calculateScore() === activeTopic.quiz.length
                        ? 'Outstanding performance! You have mastered this module.'
                        : 'Review the explanations above and retake to improve your score.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500">
                  {Object.keys(userAnswers).length} of {activeTopic.quiz.length} questions answered.
                </div>
              )}

              <div className="flex gap-2.5 w-full sm:w-auto">
                {quizSubmitted ? (
                  <>
                    <button
                      onClick={() => {
                        setUserAnswers({});
                        setQuizSubmitted(false);
                      }}
                      className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Quiz</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setQuizSubmitted(false);
                      }}
                      className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                    >
                      <span>Choose Next Topic →</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      if (Object.keys(userAnswers).length < activeTopic.quiz.length) {
                        if (!confirm('You have unanswered questions. Are you sure you want to submit?')) return;
                      }
                      setQuizSubmitted(true);
                    }}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Submit Examination Answers</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
