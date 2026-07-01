import { useNavigate, Navigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { dpoContent } from '../data/dpoContent';
import { getTestReliability } from '../lib/testReliability';
import { getEncouragement } from '../data/encouragements';
import { Heart, Calendar, MessageCircle, ArrowRight } from 'lucide-react';

export default function Home() {
  const { currentDPO, ovulationDate } = useTWW();
  const navigate = useNavigate();

  if (!ovulationDate) {
    return <Navigate to="/" replace />;
  }

  const clampedDPO = Math.min(Math.max(currentDPO, 1), 14);
  const content = dpoContent[clampedDPO];
  const testInfo = getTestReliability(clampedDPO);
  const encouragement = getEncouragement(clampedDPO);
  const daysRemaining = Math.max(0, 14 - currentDPO);
  const progress = Math.min((currentDPO / 14) * 100, 100);

  return (
    <div className="min-h-screen px-5 py-6 pb-24 md:pb-8 md:px-8 lg:px-12 max-w-md md:max-w-2xl mx-auto relative">
      {/* Decorative elements */}
      <div className="absolute top-10 right-6 w-10 h-10 bg-accent rounded-full opacity-40" />
      <div className="absolute top-32 left-4 w-6 h-6 bg-secondary rounded-full opacity-30" />
      <svg className="absolute top-16 right-20 w-4 h-4 text-primary opacity-50" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      {/* Hero */}
      <div className="text-center mb-8 relative z-10">
        <p className="text-sm text-text-muted font-medium mb-1">Good {getTimeOfDay()}</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
          DPO {clampedDPO}
        </h1>
        <p className="text-text-muted">
          {daysRemaining > 0
            ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} until test day`
            : "It's time — you can test now 🎉"}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8 relative z-10">
        <div className="flex justify-between text-xs text-text-muted mb-2">
          <span>Ovulation</span>
          <span>Test Day</span>
        </div>
        <div className="h-2.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Test Indicator */}
      <div className={`rounded-2xl p-4 mb-4 ${testInfo.bgColor} relative z-10`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{testInfo.icon}</span>
          <div>
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-0.5">Should I Test?</p>
            <p className={`text-sm font-medium ${testInfo.color}`}>
              {testInfo.message}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Body Guide */}
      <button
        onClick={() => navigate('/today')}
        className="w-full text-left bg-white border border-gray-100 rounded-2xl p-5 mb-4 active:scale-[0.98] transition-all relative z-10 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">Today's Guide</p>
            <p className="font-semibold text-base mb-1">{content?.title}</p>
            <p className="text-sm text-text-muted line-clamp-2">{content?.body}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-text-muted shrink-0 mt-1" />
        </div>
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6 relative z-10">
        <button
          onClick={() => navigate('/today')}
          className="bg-primary/10 rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
        >
          <Heart className="w-5 h-5 text-primary-dark mb-2" />
          <p className="font-semibold text-sm">Log Symptoms</p>
          <p className="text-xs text-text-muted mt-0.5">How are you feeling?</p>
        </button>
        <button
          onClick={() => navigate('/chat')}
          className="bg-secondary/20 rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-5 h-5 text-pink-500 mb-2" />
          <p className="font-semibold text-sm">Community</p>
          <p className="text-xs text-text-muted mt-0.5">You're not alone</p>
        </button>
      </div>

      {/* Encouragement */}
      <div className="bg-surface rounded-2xl p-4 text-center relative z-10">
        <p className="text-sm text-text-muted italic">{encouragement}</p>
      </div>
    </div>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}
