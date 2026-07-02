import { useNavigate, Navigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { dpoContent } from '../data/dpoContent';
import { getTestReliability } from '../lib/testReliability';
import { getEncouragement } from '../data/encouragements';
import { Heart, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import starPurple from '../assets/star-purple.svg';
import starPink from '../assets/star-pink.svg';

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
    <div className="min-h-screen pb-24 md:pb-8 relative">
      {/* Soft gradient background */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />

      <div className="relative z-10 px-5 pt-2 md:px-8 md:pt-2 lg:px-12 lg:pt-2 max-w-md md:max-w-none mx-auto">
        {/* Big headline */}
        <div className="text-center md:text-left mb-3">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-text leading-tight">
            Hi Emily ☺️
          </h1>
          <p className="font-serif text-2xl md:text-3xl font-semibold text-text mt-1">
            Let's See Where You Are
          </p>
        </div>
        <div className="flex justify-center md:justify-start mb-5">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5">
            <span className="text-xs font-bold text-text">DPO {clampedDPO}</span>
            <span className="w-1 h-1 rounded-full bg-text" />
            <span className="text-xs font-medium text-text">{daysRemaining > 0 ? `${daysRemaining} days to go` : "Test day! 🎉"}</span>
          </div>
        </div>

        {/* Progress bar — full width on desktop */}
        <div className="mb-8 bg-white/30 backdrop-blur-lg rounded-2xl px-4 py-3 border border-white/40 shadow-sm">
          <div className="h-2.5 rounded-full overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-50"
              style={{
                backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, #9ca3af 3px, #9ca3af 5px)',
              }}
            />
            <div
              className="h-full bg-gradient-to-r from-pink-400 via-violet-400 to-purple-400 rounded-full transition-all duration-500 relative z-10"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-text mt-2">
            <span>Ovulation</span>
            <span>Test Day</span>
          </div>
        </div>

        {/* Two-column grid on desktop */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {/* Quick categories row */}
          <div className="grid grid-cols-3 gap-3 mb-6 md:col-span-2 lg:col-span-3">
          <button
            onClick={() => navigate('/today')}
            className="bg-white/40 backdrop-blur-md rounded-2xl py-3 md:py-4 md:px-5 flex flex-col md:flex-row items-center md:justify-start gap-1.5 md:gap-3 shadow-sm border border-white/50 active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs md:text-base md:font-semibold font-medium">Symptoms</span>
          </button>
          <button
            onClick={() => navigate('/timeline')}
            className="bg-white/40 backdrop-blur-md rounded-2xl py-3 md:py-4 md:px-5 flex flex-col md:flex-row items-center md:justify-start gap-1.5 md:gap-3 shadow-sm border border-white/50 active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-200 to-indigo-400 flex items-center justify-center shadow-sm">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs md:text-base md:font-semibold font-medium">Timeline</span>
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="bg-white/40 backdrop-blur-md rounded-2xl py-3 md:py-4 md:px-5 flex flex-col md:flex-row items-center md:justify-start gap-1.5 md:gap-3 shadow-sm border border-white/50 active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-200 to-purple-400 flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs md:text-base md:font-semibold font-medium">Community</span>
          </button>
          </div>

          {/* Today's Guide + Test Indicator combined */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-lg font-bold">Today's Guide</h2>
            </div>
            <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 mb-6 shadow-sm border border-white/40">
              <button
                onClick={() => navigate('/today')}
                className="w-full text-left mb-3 active:scale-[0.98] transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    <p className="font-semibold text-base mb-1">{content?.title}</p>
                    <p className="text-sm text-gray-700 md:line-clamp-none line-clamp-2">{content?.body}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted shrink-0 mt-1" />
                </div>
              </button>

              {/* Should I Test - solid white nested card */}
              <div className="bg-white rounded-xl p-3.5">
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
            </div>
          </div>

          {/* Encouragement */}
          <p className="text-sm text-text italic text-center md:text-left mt-4 md:col-span-2 lg:col-span-3">{encouragement}</p>
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
