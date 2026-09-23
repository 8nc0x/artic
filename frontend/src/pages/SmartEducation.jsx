import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, CheckCircle, HelpCircle, Award, Sparkles } from 'lucide-react';

export default function SmartEducation() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  useEffect(() => {
    fetch('/api/education/topics')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data) {
          setTopics(d.data);
          setSelectedTopic(d.data[0]);
        }
      });
  }, []);

  const handleOptionSelect = (qIdx, optIdx) => {
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    if (!selectedTopic?.quiz) return;
    let score = 0;
    selectedTopic.quiz.questions.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) score++;
    });
    setQuizScore({ score, total: selectedTopic.quiz.questions.length });
  };

  return (
    <div className="space-y-6 pb-12 text-left">
      <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2">
          <GraduationCap className="w-6 h-6 text-polar-blue" />
          <span>Polar Smart Education &amp; Learning Hub</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Smart Education theme (MoES): Transforming cutting-edge polar research and satellite datasets into student-friendly explanations, visual modules, and interactive self-assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider px-1">
            Learning Modules
          </h3>
          {topics.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setSelectedTopic(t);
                setQuizAnswers({});
                setQuizScore(null);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedTopic?.id === t.id
                  ? 'bg-blue-50/80 border-polar-blue shadow-xs'
                  : 'bg-white border-polar-border hover:bg-slate-50'
              }`}
            >
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-polar-blue">
                {t.level} • {t.duration}
              </span>
              <h4 className="font-bold text-xs text-slate-900 mt-2 leading-tight">{t.title}</h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{t.summary}</p>
            </div>
          ))}
        </div>

        {/* Selected Topic Content & Interactive Quiz */}
        {selectedTopic && (
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
              <div className="h-44 rounded-xl overflow-hidden border border-slate-200">
                <img
                  src={selectedTopic.thumbnail}
                  alt={selectedTopic.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">{selectedTopic.title}</h2>
                <p className="text-xs text-slate-700 leading-relaxed mt-2">{selectedTopic.summary}</p>
              </div>

              {/* Key Concepts */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Key Scientific Concepts</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTopic.key_concepts?.map((c, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200">
                      💡 {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz Section */}
            {selectedTopic.quiz && (
              <div className="bg-white rounded-2xl p-6 border border-polar-border shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Module Quick Quiz
                    </h3>
                  </div>
                  {quizScore && (
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      Score: {quizScore.score} / {quizScore.total} Correct
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {selectedTopic.quiz.questions.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{qIdx + 1}. {q.q}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          const isCorrect = quizScore && q.answer === optIdx;
                          const isWrong = quizScore && isSelected && q.answer !== optIdx;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleOptionSelect(qIdx, optIdx)}
                              className={`p-2 rounded-xl text-left text-xs font-medium border transition-all ${
                                isCorrect
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                                  : isWrong
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : isSelected
                                  ? 'bg-blue-50 text-polar-blue border-polar-blue font-semibold'
                                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={calculateScore}
                  className="px-5 py-2.5 rounded-xl bg-polar-blue hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition-all active:scale-95"
                >
                  Submit &amp; Check Answers
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
