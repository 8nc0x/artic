import React, { useState, useEffect } from 'react';
import { Compass, X, ChevronRight, ChevronLeft, Check, Sparkles } from 'lucide-react';

export default function TourGuide({ tourKey = 'home_tour', steps = [], onComplete }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [targetRect, setTargetRect] = useState(null);

  // Check if tour should run automatically for first time users
  useEffect(() => {
    const isCompleted = localStorage.getItem(`ncpor_tour_${tourKey}`);
    if (!isCompleted && steps.length > 0) {
      // Delay slightly for DOM to settle
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [tourKey, steps]);

  // Update target rect when active or step changes
  useEffect(() => {
    if (!isActive || steps.length === 0) return;

    const step = steps[currentStepIndex];
    if (!step) return;

    const targetEl = document.querySelector(step.target);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const updatePosition = () => {
        const rect = targetEl.getBoundingClientRect();
        setTargetRect({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right
        });
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    } else {
      setTargetRect(null);
    }
  }, [isActive, currentStepIndex, steps]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem(`ncpor_tour_${tourKey}`, 'true');
    setIsActive(false);
    if (onComplete) onComplete();
  };

  const handleFinish = () => {
    localStorage.setItem(`ncpor_tour_${tourKey}`, 'true');
    setIsActive(false);
    if (onComplete) onComplete();
  };

  const startTourManually = () => {
    setCurrentStepIndex(0);
    setIsActive(true);
  };

  if (!isActive || steps.length === 0) {
    return (
      <button
        onClick={startTourManually}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-slate-900/90 hover:bg-blue-600 text-white text-xs font-bold shadow-xl border border-slate-700/80 backdrop-blur-md flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 group"
        title="Start Guided Tour"
      >
        <Sparkles className="w-3.5 h-3.5 text-sky-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Guided Tour</span>
      </button>
    );
  }

  const step = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] transition-opacity"
        onClick={handleSkip}
      />

      {/* Target Highlight Box */}
      {targetRect && (
        <div
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12
          }}
          className="absolute rounded-2xl border-2 border-sky-400 bg-sky-400/10 shadow-[0_0_25px_rgba(56,189,248,0.5)] transition-all duration-300 pointer-events-none animate-pulse"
        />
      )}

      {/* Popover Card */}
      <div
        style={{
          top: targetRect
            ? targetRect.bottom + 16 > window.innerHeight - 200
              ? Math.max(20, targetRect.top - 200)
              : targetRect.bottom + 16
            : '50%',
          left: targetRect
            ? Math.min(Math.max(20, targetRect.left), window.innerWidth - 360)
            : '50%',
          transform: !targetRect ? 'translate(-50%, -50%)' : 'none'
        }}
        className="absolute w-84 sm:w-96 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200/90 z-50 text-left animate-fadeIn"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-wide border border-blue-200">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            title="Skip Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <h4 className="text-sm font-bold text-slate-900 mb-1.5 font-heading">
          {step.title}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {step.content}
        </p>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={handleSkip}
            className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 transition-colors"
          >
            Skip Tour
          </button>

          <div className="flex items-center space-x-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handleBack}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center space-x-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center space-x-1"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Finish' : 'Next'}</span>
              {currentStepIndex === steps.length - 1 ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
