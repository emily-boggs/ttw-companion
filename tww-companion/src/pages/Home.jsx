import { useNavigate, Navigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { dpoContent } from '../data/dpoContent';
import { getTestReliability } from '../lib/testReliability';
import { getEncouragement } from '../data/encouragements';
import { Heart, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

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
  const phase = getPhase(clampedDPO);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Full-bleed Hero */}
      <div className="relative bg-pink-400 overflow-hidden px-6 pt-10 pb-24 md:px-12 md:pt-14 md:pb-28">
        {/* Decorative circles */}
        <div className="absolute -top-6 right--4 w-32 h-32 bg-amber-300/60 rounded-full" />
        <div className="absolute top-1/2 -left-10 w-28 h-28 bg-violet-300/50 rounded-full" />
        <div className="absolute bottom-16 left-16 w-4 h-4 bg-cyan-300 rounded-full" />
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-pink-200 rounded-full" />

        {/* Sparkle icons */}
        <svg className="absolute top-8 left-16 w-5 h-5 text-amber-200/80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
        </svg>
        <svg className="absolute bottom-20 right-12 w-6 h-6 text-indigo-500/70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
        </svg>
        <svg className="absolute top-1/3 right-8 w-4 h-4 text-violet-400/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0l1.5 8.5L22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5z" />
        </svg>

        {/* Hero content */}
        <div className="relative z-10 max-w-md">
          <p className="text-white/80 text-sm font-medium mb-2">{phase.greeting}</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {phase.headline}
          </h1>
          <p className="text-white/80 text-base leading-relaxed max-w-sm">
            {phase.subtext}
          </p>
        </div>

        {/* Wavy bottom edge */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>

      {/* Content below hero */}
      <div className="px-5 md:px-8 lg:px-12 max-w-md md:max-w-2xl mx-auto -mt-4">
        {/* DPO badge + progress */}
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-md border border-gray-100">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold">DPO {clampedDPO}</span>
          </div>
          <span className="text-xs text-text-muted">
            {daysRemaining > 0
              ? `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} to go`
              : "Test day is here 🎉"}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-text-muted mb-2">
            <span>Ovulation</span>
            <span>Test Day</span>
          </div>
          <div className="h-2.5 bg-pink-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Test Indicator */}
        <div className={`rounded-2xl p-4 mb-4 ${testInfo.bgColor}`}>
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
          className="w-full text-left bg-white border border-gray-100 rounded-2xl p-5 mb-4 active:scale-[0.98] transition-all shadow-sm"
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
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/today')}
            className="bg-pink-50 rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
          >
            <Heart className="w-5 h-5 text-pink-400 mb-2" />
            <p className="font-semibold text-sm">Log Symptoms</p>
            <p className="text-xs text-text-muted mt-0.5">How are you feeling?</p>
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="bg-violet-50 rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-5 h-5 text-violet-500 mb-2" />
            <p className="font-semibold text-sm">Community</p>
            <p className="text-xs text-text-muted mt-0.5">You're not alone</p>
          </button>
        </div>

        {/* Encouragement */}
        <div className="bg-pink-50 rounded-2xl p-4 text-center mb-6">
          <p className="text-sm text-text-muted italic">{encouragement}</p>
        </div>
      </div>
    </div>
  );
}

function getPhase(dpo) {
  if (dpo <= 3) {
    return {
      greeting: '🌱 The early days',
      headline: "Your journey has just begun",
      subtext: "Things are happening deep within — even if you can't feel them yet. This is the quiet beginning of something potentially wonderful.",
    };
  }
  if (dpo <= 5) {
    return {
      greeting: '🌿 Growing quietly',
      headline: "Patience is your superpower",
      subtext: "Cells are dividing and traveling. Your body knows exactly what to do. Take a breath — you're right on track.",
    };
  }
  if (dpo <= 8) {
    return {
      greeting: '✨ The implantation window',
      headline: "Something magical might be happening",
      subtext: "This is when things could be settling in. Every little twinge has meaning, or none at all — and both are okay.",
    };
  }
  if (dpo <= 11) {
    return {
      greeting: '🌸 The hopeful stretch',
      headline: "You're more than halfway there",
      subtext: "Hormones are building. You might feel things shifting — or nothing at all. Trust your body and be kind to yourself.",
    };
  }
  return {
    greeting: '🎉 Almost there',
    headline: "The finish line is in sight",
    subtext: "You made it through the hardest part. Whether you test today or wait — you've shown incredible strength.",
  };
}
