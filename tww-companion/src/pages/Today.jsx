import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { dpoContent } from '../data/dpoContent';
import { getTestReliability } from '../lib/testReliability';
import { symptoms as symptomOptions } from '../data/symptoms';

export default function Today() {
  const { currentDPO, ovulationDate } = useTWW();
  const navigate = useNavigate();

  if (!ovulationDate) {
    return <Navigate to="/" replace />;
  }

  const clampedDPO = Math.min(Math.max(currentDPO, 1), 14);
  const content = dpoContent[clampedDPO];
  const testInfo = getTestReliability(clampedDPO);

  const [selected, setSelected] = useState([]);
  const [note, setNote] = useState('');

  useEffect(() => {
    const existing = localStorage.getItem(`tww-symptoms-dpo-${clampedDPO}`);
    if (existing) {
      const data = JSON.parse(existing);
      setSelected(data.selected || []);
      setNote(data.note || '');
    }
  }, [clampedDPO]);

  const toggleSymptom = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    localStorage.setItem(
      `tww-symptoms-dpo-${clampedDPO}`,
      JSON.stringify({ selected, note, date: new Date().toISOString() })
    );
    navigate(`/day/${clampedDPO}`);
  };

  return (
    <div className="min-h-screen px-5 pt-2 pb-24 md:pt-2 md:pb-8 md:px-8 lg:pt-2 lg:px-12 max-w-md md:max-w-none mx-auto relative">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />
      {/* Header */}
      <div className="text-center md:text-left mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white text-text mb-3 md:hidden">
          <span className="text-xl font-bold">{clampedDPO}</span>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold">{content?.title}</h1>
        <div className="flex justify-center md:justify-start mt-2">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3.5 py-1.5">
            <span className="text-xs font-bold text-text">Day {clampedDPO} of 14</span>
            <span className="w-1 h-1 rounded-full bg-text" />
            <span className="text-xs font-medium text-gray-700">{content?.keyEvent}</span>
          </div>
        </div>
      </div>

      {/* Two-column layout on desktop */}
      <div className="md:grid md:grid-cols-2 md:gap-8 md:items-start">
        {/* Body Guide + Test Indicator combined */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm p-5 mb-6 md:mb-0 md:sticky md:top-8">
          <h2 className="font-semibold text-xs text-text-muted mb-2 uppercase tracking-wide">What's Happening Today</h2>
          <p className="text-base leading-relaxed mb-3">{content?.body}</p>

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

        {/* Symptom Log Section */}
        <div className="border-t border-white/40 pt-6 md:border-t-0 md:bg-white/30 md:backdrop-blur-md md:rounded-2xl md:border md:border-white/40 md:shadow-sm md:p-5">
          <h2 className="font-serif text-xl font-bold mb-4">How are you feeling?</h2>

        {/* Symptom Chips */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-5">
          {symptomOptions.map((symptom) => {
            const isSelected = selected.includes(symptom.id);
            return (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 min-h-[44px] ${
                  isSelected
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'bg-white/40 backdrop-blur-sm border border-white/50 text-text'
                }`}
              >
                {symptom.emoji} {symptom.label}
              </button>
            );
          })}
        </div>

        {/* Note */}
        <div className="mb-5">
          <label htmlFor="note" className="block text-sm font-semibold mb-2">
            Anything else? (optional)
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How are you really feeling today..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="w-full py-4 font-semibold rounded-full text-base transition-all min-h-[48px] active:scale-[0.98] bg-cta text-white hover:opacity-90"
        >
          Save Entry
        </button>
        </div>
      </div>
    </div>
  );
}
