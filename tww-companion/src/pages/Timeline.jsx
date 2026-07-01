import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { getTestReliability } from '../lib/testReliability';
import { getEncouragement } from '../data/encouragements';
import { dpoContent } from '../data/dpoContent';

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
    <div className="min-h-screen px-5 py-6 pb-24 md:pb-8 md:px-8 lg:px-12 max-w-md md:max-w-none mx-auto relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-16 right-4 w-8 h-8 bg-accent rounded-full opacity-40" />
      <div className="absolute top-24 left-2 w-5 h-5 bg-secondary rounded-full opacity-30" />
      <svg className="absolute top-20 right-16 w-4 h-4 text-primary opacity-40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      {/* Settings button */}
      <div className="flex justify-end mb-2 relative z-10">
        <button
          onClick={() => setShowReset(!showReset)}
          className="text-text-muted text-sm px-3 py-1.5 rounded-full hover:bg-surface active:scale-95 transition-all"
        >
          ⚙️
        </button>
      </div>

      {/* Reset confirmation */}
      {showReset && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-sm relative z-10">
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
              className="flex-1 py-2.5 bg-surface text-text-muted font-medium rounded-full text-sm active:scale-95 min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <p className="text-sm text-text-muted font-medium">You're on</p>
        <h1 className="font-serif text-3xl font-bold">
          DPO {Math.min(currentDPO, 14)}
        </h1>
        <p className="text-text-muted mt-1">
          {daysRemaining > 0
            ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} until test day`
            : "It's time — you can test now 🎉"}
        </p>
      </div>

      {/* Test Indicator Banner */}
      <div className={`rounded-2xl p-4 mb-6 ${testInfo.bgColor} relative z-10`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{testInfo.icon}</span>
          <p className={`text-sm font-medium ${testInfo.color}`}>
            {testInfo.message}
          </p>
        </div>
      </div>

      {/* Encouragement */}
      <p className="text-center text-sm text-text-muted italic mb-6 relative z-10">
        {encouragement}
      </p>

      {/* Timeline Cards */}
      <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3 relative z-10">
        {days.map((day) => {
          const isToday = day === currentDPO;
          const isPast = day < currentDPO;
          const hasSymptoms = localStorage.getItem(`tww-symptoms-dpo-${day}`);
          const content = dpoContent[day];

          return (
            <button
              key={day}
              onClick={() => navigate(`/day/${day}`)}
              className={`w-full text-left p-4 rounded-2xl border transition-all active:scale-[0.98] ${
                isToday
                  ? 'border-primary bg-white shadow-md ring-2 ring-primary/30'
                  : isPast
                  ? 'border-gray-100 bg-surface opacity-75'
                  : 'border-gray-100 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    isToday ? 'bg-primary text-white' : isPast ? 'bg-gray-200 text-text-muted' : 'bg-surface text-text'
                  }`}>
                    {day}
                  </div>
                  <div className="min-w-0">
                    <div className={`flex items-center gap-2 flex-wrap font-semibold text-sm ${isPast ? 'text-text-muted' : ''}`}>
                      <span>{content?.title || `DPO ${day}`}</span>
                      {isToday && <span className="text-xs bg-primary/20 text-primary-dark px-2 py-0.5 rounded-full">Today</span>}
                    </div>
                    <p className="text-xs text-text-muted truncate">{content?.keyEvent}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {hasSymptoms && <span className="w-2 h-2 bg-secondary rounded-full" />}
                  <span className="text-text-muted text-sm">→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom nav */}
    </div>
  );
}
