import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';
import { symptoms as symptomOptions } from '../data/symptoms';

export default function SymptomLog() {
  const { currentDPO } = useTWW();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dayParam = searchParams.get('day');
  const logDay = dayParam ? parseInt(dayParam, 10) : currentDPO;

  const [selected, setSelected] = useState([]);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  // Load existing entry
  useEffect(() => {
    const existing = localStorage.getItem(`tww-symptoms-dpo-${logDay}`);
    if (existing) {
      const data = JSON.parse(existing);
      setSelected(data.selected || []);
      setNote(data.note || '');
    }
  }, [logDay]);

  const toggleSymptom = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      `tww-symptoms-dpo-${logDay}`,
      JSON.stringify({ selected, note, date: new Date().toISOString() })
    );
    setSaved(true);
    setTimeout(() => navigate('/timeline'), 800);
  };

  return (
    <div className="min-h-screen px-5 py-6 max-w-md mx-auto pb-24">
      {/* Back button */}
      <button
        onClick={() => navigate('/timeline')}
        className="flex items-center gap-2 text-text-muted text-sm mb-6 active:opacity-70"
      >
        ← Back to timeline
      </button>

      <div className="text-center mb-6">
        <h1 className="font-serif text-2xl font-bold">How Are You Feeling?</h1>
        <p className="text-text-muted text-sm mt-1">DPO {logDay}</p>
      </div>

      {/* Symptom Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
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
      <div className="mb-6">
        <label htmlFor="note" className="block text-sm font-semibold mb-2">
          Anything else on your mind? (optional)
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

      {/* Save Button */}
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
  );
}
