import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { dpoContent } from '../data/dpoContent';
import { getTestReliability } from '../lib/testReliability';
import { symptoms as symptomOptions } from '../data/symptoms';
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
  const loggedData = savedSymptoms ? JSON.parse(savedSymptoms) : null;

  return (
    <div className="min-h-screen px-5 pt-2 pb-24 md:pt-2 md:pb-8 md:px-8 lg:pt-2 lg:px-12 max-w-md md:max-w-none mx-auto relative">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-sm active:scale-95 transition-transform mb-6"
      >
        <ArrowLeft className="w-4 h-4 text-text" />
        <span className="text-text text-sm font-medium">Back</span>
      </button>

      {/* Day header */}
      <div className="text-center md:text-left mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-text mb-3 md:hidden">
          <span className="text-xl font-bold">{dayNum}</span>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold">{content.title}</h1>
        <div className="flex justify-center md:justify-start mt-2">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5">
            <span className="text-xs font-bold text-text">Day {dayNum} of 14</span>
            <span className="w-1 h-1 rounded-full bg-text" />
            <span className="text-xs font-medium text-gray-700">{content.keyEvent}</span>
          </div>
        </div>
      </div>

      {/* Two-column layout on desktop */}
      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start">
        {/* Body Guide + Test Indicator combined */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-5 mb-4 md:mb-0 md:sticky md:top-8">
          <h2 className="font-semibold text-xs text-text-muted mb-2 uppercase tracking-wide">What's Happening</h2>
          <p className="text-base leading-relaxed mb-3">{content.body}</p>

          {/* Should I Test - solid white nested card */}
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

        {/* Right column: Symptoms + Actions */}
        <div className="md:bg-white/30 md:backdrop-blur-md md:rounded-2xl md:border md:border-white/40 md:shadow-sm md:p-5">
      {/* Symptoms logged */}
      {loggedData && loggedData.selected?.length > 0 && (
        <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-4 mb-4">
          <h2 className="font-semibold text-xs text-text-muted mb-2 uppercase tracking-wide">You Logged</h2>
          <div className="flex flex-wrap gap-2">
            {loggedData.selected.map((id) => {
              const symptom = symptomOptions.find(s => s.id === id);
              return symptom ? (
                <span key={id} className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-indigo-700">
                  {symptom.emoji} {symptom.label}
                </span>
              ) : (
                <span key={id} className="px-3 py-1.5 bg-white rounded-full text-xs font-medium text-indigo-700">
                  {id}
                </span>
              );
            })}
          </div>
          {loggedData.note && (
            <p className="text-sm text-gray-700 mt-3 italic">"{loggedData.note}"</p>
          )}
        </div>
      )}

      {/* Log CTA */}
      <button
        onClick={() => navigate('/today')}
        className="w-full py-4 bg-cta text-white font-semibold rounded-full text-base hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
      >
        {loggedData ? "Edit Today's Log" : "Log How You're Feeling"}
      </button>
      <button
        onClick={() => navigate('/timeline')}
        className="w-full py-3 text-gray-900 font-medium text-sm mt-3 active:scale-[0.98] transition-all"
      >
        View Full Timeline
      </button>
        </div>
      </div>
    </div>
  );
}
