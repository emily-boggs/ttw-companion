import { useNavigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { getTestReliability } from '../lib/testReliability';
import { getEncouragement } from '../data/encouragements';

export default function Timeline() {
  const { currentDPO, ovulationDate } = useTWW();
  const navigate = useNavigate();
  const testInfo = getTestReliability(currentDPO);
  const encouragement = getEncouragement(currentDPO);

  if (!ovulationDate) {
    navigate('/');
    return null;
  }

  const days = Array.from({ length: 14 }, (_, i) => i + 1);
  const daysRemaining = Math.max(0, 14 - currentDPO);

  return (
    <div className="min-h-screen px-5 py-6 pb-24 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
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
      <div className={`rounded-2xl p-4 mb-6 ${testInfo.bgColor}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{testInfo.icon}</span>
          <p className={`text-sm font-medium ${testInfo.color}`}>
            {testInfo.message}
          </p>
        </div>
      </div>

      {/* Encouragement */}
      <p className="text-center text-sm text-text-muted italic mb-6">
        {encouragement}
      </p>

      {/* Timeline Cards */}
      <div className="space-y-3">
        {days.map((day) => {
          const isToday = day === currentDPO;
          const isPast = day < currentDPO;
          const hasSymptoms = localStorage.getItem(`tww-symptoms-dpo-${day}`);

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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    isToday ? 'bg-primary text-white' : isPast ? 'bg-gray-200 text-text-muted' : 'bg-surface text-text'
                  }`}>
                    {day}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${isPast ? 'text-text-muted' : ''}`}>
                      DPO {day}
                      {isToday && <span className="ml-2 text-xs bg-primary/20 text-primary-dark px-2 py-0.5 rounded-full">Today</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasSymptoms && <span className="w-2 h-2 bg-secondary rounded-full" />}
                  <span className="text-text-muted text-sm">→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-5 py-3 flex justify-around max-w-md mx-auto">
        <button onClick={() => navigate('/timeline')} className="flex flex-col items-center gap-1 text-primary-dark">
          <span className="text-lg">📅</span>
          <span className="text-xs font-medium">Timeline</span>
        </button>
        <button onClick={() => navigate('/log')} className="flex flex-col items-center gap-1 text-text-muted">
          <span className="text-lg">📝</span>
          <span className="text-xs font-medium">Log</span>
        </button>
      </div>
    </div>
  );
}
