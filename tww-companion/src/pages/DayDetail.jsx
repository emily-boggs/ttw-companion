import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { dpoContent } from '../data/dpoContent';
import { getTestReliability } from '../lib/testReliability';
import { useTWW } from '../context/TWWContext';

export default function DayDetail() {
  const { dpo } = useParams();
  const navigate = useNavigate();
  const { currentDPO } = useTWW();
  const dayNum = parseInt(dpo, 10);
  const content = dpoContent[dayNum];
  const testInfo = getTestReliability(dayNum);

  if (!content) {
    return <Navigate to="/timeline" replace />;
  }

  const isToday = dayNum === currentDPO;
  const savedSymptoms = localStorage.getItem(`tww-symptoms-dpo-${dayNum}`);
  const symptoms = savedSymptoms ? JSON.parse(savedSymptoms) : null;

  return (
    <div className="min-h-screen px-5 py-6 pb-24 md:pb-8 md:px-8 lg:px-12 max-w-md md:max-w-2xl mx-auto relative">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />
      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-10 h-10 bg-accent rounded-full opacity-30 hidden md:block" />
      <div className="absolute top-20 right-20 w-5 h-5 bg-secondary rounded-full opacity-40 hidden md:block" />
      {/* Back button */}
      <button
        onClick={() => navigate('/timeline')}
        className="flex items-center gap-2 text-text-muted text-sm mb-6 active:opacity-70"
      >
        ← Back to timeline
      </button>

      {/* Day header */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-3 ${
          isToday ? 'bg-primary text-white' : 'bg-white/40 text-text'
        }`}>
          <span className="text-xl font-bold">{dayNum}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold">
          {content.title}
        </h1>
        <p className="text-sm text-text-muted mt-1">DPO {dayNum} • {content.keyEvent}</p>
      </div>

      {/* Body Guide */}
      <div className="md:grid md:grid-cols-2 md:gap-4">
        <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm p-5 mb-4">
          <h2 className="font-semibold text-sm text-text-muted mb-2 uppercase tracking-wide">What's Happening</h2>
          <p className="text-base leading-relaxed">
            {content.body}
          </p>
        </div>

        {/* Test Indicator */}
        <div className={`rounded-2xl p-4 mb-4 ${testInfo.bgColor} md:h-fit`}>
          <h2 className="font-semibold text-sm text-text-muted mb-2 uppercase tracking-wide">Should I Test?</h2>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{testInfo.icon}</span>
            <p className={`text-sm font-medium ${testInfo.color}`}>
              {testInfo.message}
            </p>
          </div>
        </div>
      </div>

      {/* Symptoms logged */}
      {symptoms && (
        <div className="bg-white border border-white/40 rounded-2xl p-4 mb-4">
          <h2 className="font-semibold text-sm text-text-muted mb-2 uppercase tracking-wide">You Logged</h2>
          <div className="flex flex-wrap gap-2">
            {symptoms.selected && symptoms.selected.map((s) => (
              <span key={s} className="bg-secondary/30 text-sm px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
          {symptoms.note && (
            <p className="text-sm text-text-muted mt-3 italic">"{symptoms.note}"</p>
          )}
        </div>
      )}

      {/* Log CTA */}
      <button
        onClick={() => navigate(`/log?day=${dayNum}`)}
        className="w-full py-4 bg-cta text-white font-semibold rounded-full text-base hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
      >
        {symptoms ? 'Edit Today\'s Log' : 'Log How You\'re Feeling'}
      </button>
    </div>
  );
}
