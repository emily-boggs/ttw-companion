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
  const [saved, setSaved] = useState(false);

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
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      `tww-symptoms-dpo-${clampedDPO}`,
      JSON.stringify({ selected, note, date: new Date().toISOString() })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen px-5 py-6 pb-24 md:pb-8 md:px-8 lg:px-12 max-w-md md:max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white mb-3">
          <span className="text-xl font-bold">{clampedDPO}</span>
        </div>
        <h1 className="font-serif text-2xl font-bold">{content?.title}</h1>
        <p className="text-sm text-text-muted mt-1">DPO {clampedDPO} • {content?.keyEvent}</p>
      </div>

      {/* Body Guide */}
      <div className="bg-surface rounded-2xl p-5 mb-4">
        <h2 className="font-semibold text-xs text-text-muted mb-2 uppercase tracking-wide">What's Happening Today</h2>
        <p className="text-base leading-relaxed">{content?.body}</p>
      </div>

      {/* Test Indicator */}
      <div className={`rounded-2xl p-4 mb-6 ${testInfo.bgColor}`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{testInfo.icon}</span>
          <p className={`text-sm font-medium ${testInfo.color}`}>{testInfo.message}</p>
        </div>
      </div>

      {/* Symptom Log Section */}
      <div className="border-t border-gray-100 pt-6">
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
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface border border-gray-200 text-text'
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
            onChange={(e) => { setNote(e.target.value); setSaved(false); }}
            placeholder="How are you really feeling today..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-surface text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className={`w-full py-4 font-semibold rounded-full text-base transition-all min-h-[48px] active:scale-[0.98] ${
            saved
              ? 'bg-green-100 text-green-700'
              : 'bg-cta text-white hover:opacity-90'
          }`}
        >
          {saved ? '✓ Saved!' : 'Save Entry'}
        </button>
      </div>
    </div>
  );
}
