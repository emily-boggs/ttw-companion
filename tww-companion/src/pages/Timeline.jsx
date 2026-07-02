import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { getTestReliability } from '../lib/testReliability';
import { getEncouragement } from '../data/encouragements';
import { dpoContent } from '../data/dpoContent';
import { symptoms as symptomOptions } from '../data/symptoms';

export default function Timeline() {
  const { currentDPO, ovulationDate, resetData } = useTWW();
  const navigate = useNavigate();
  const [showReset, setShowReset] = useState(false);
  const testInfo = getTestReliability(currentDPO);
  const encouragement = getEncouragement(currentDPO);

  if (!ovulationDate) {
    return <Navigate to="/" replace />;
  }

  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const daysRemaining = Math.max(0, 14 - currentDPO);

  const handleReset = () => {
    resetData();
    navigate('/');
  };

  return (
    <div className="min-h-screen px-5 pt-2 pb-24 md:pt-2 md:pb-8 md:px-8 lg:pt-2 lg:px-12 max-w-md md:max-w-none mx-auto relative">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />

      {/* Header */}
      <div className="text-center md:text-left mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-text mb-3 md:hidden">
          <span className="text-xl font-bold">{Math.min(currentDPO, 14)}</span>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold">Your Timeline</h1>
        <div className="flex justify-center md:justify-start mt-2">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5">
            <span className="text-xs font-bold text-text">DPO {Math.min(currentDPO, 14)}</span>
            <span className="w-1 h-1 rounded-full bg-text" />
            <span className="text-xs font-medium text-gray-700">
              {daysRemaining > 0
                ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} until test day`
                : "Test day! 🎉"}
            </span>
          </div>
        </div>
      </div>

      {/* Test Indicator + Settings combined */}
      <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-4 mb-6">
        <div className="bg-white rounded-xl p-3.5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{testInfo.icon}</span>
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-0.5">Should I Test?</p>
              <p className={`text-sm font-medium ${testInfo.color}`}>{testInfo.message}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reset confirmation */}
      {showReset && (
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <p className="text-sm text-text mb-3">Start over with a new ovulation date?</p>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 bg-red-50 text-red-600 font-medium rounded-full text-sm active:scale-95 min-h-[44px]"
            >
              Reset My Data
            </button>
            <button
              onClick={() => setShowReset(false)}
              className="flex-1 py-2.5 bg-white/40 text-text-muted font-medium rounded-full text-sm active:scale-95 min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Timeline Cards */}
      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
        {days.map((day) => {
          const isToday = day === currentDPO;
          const isPast = day < currentDPO;
          const savedData = localStorage.getItem(`tww-symptoms-dpo-${day}`);
          const loggedSymptoms = savedData ? JSON.parse(savedData) : null;
          const content = dpoContent[day];

          return (
            <button
              key={day}
              onClick={() => navigate(`/day/${day}`)}
              className={`w-full text-left p-4 rounded-2xl transition-all active:scale-[0.98] ${
                isToday
                  ? 'bg-white shadow-md ring-2 ring-indigo-200'
                  : isPast
                  ? 'bg-white/40 backdrop-blur-sm border border-white/40 opacity-75'
                  : 'bg-white/60 backdrop-blur-sm border border-white/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    isToday ? 'bg-indigo-500 text-white' : isPast ? 'bg-white/60 text-text-muted' : 'bg-white text-text'
                  }`}>
                    {day}
                  </div>
                  <div className="min-w-0">
                    <div className={`flex items-center gap-2 flex-wrap font-semibold text-sm ${isPast ? 'text-text-muted' : ''}`}>
                      <span>{content?.title || `DPO ${day}`}</span>
                      {isToday && <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">Today</span>}
                    </div>
                    <p className="text-xs text-text-muted truncate">{content?.keyEvent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {loggedSymptoms && <span className="w-2 h-2 bg-indigo-400 rounded-full" />}
                  <span className="text-text-muted text-sm">→</span>
                </div>
              </div>
              {loggedSymptoms && loggedSymptoms.selected?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 ml-13">
                  {loggedSymptoms.selected.slice(0, 4).map((id) => {
                    const symptom = symptomOptions.find(s => s.id === id);
                    return symptom ? (
                      <span key={id} className="px-2 py-0.5 bg-indigo-50 rounded-full text-[11px] font-medium text-indigo-600">
                        {symptom.emoji} {symptom.label}
                      </span>
                    ) : null;
                  })}
                  {loggedSymptoms.selected.length > 4 && (
                    <span className="px-2 py-0.5 bg-gray-100 rounded-full text-[11px] text-gray-500">
                      +{loggedSymptoms.selected.length - 4} more
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom nav */}
    </div>
  );
}
