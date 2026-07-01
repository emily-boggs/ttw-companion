import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';

export default function Landing() {
  const { setOvulationDate, ovulationDate } = useTWW();
  const [date, setDate] = useState(ovulationDate || '');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date) {
      setOvulationDate(date);
      navigate('/timeline');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-8 left-6 w-12 h-12 bg-accent rounded-full opacity-60" />
      <div className="absolute top-20 right-8 w-6 h-6 bg-primary rounded-full opacity-50" />
      <div className="absolute bottom-32 left-10 w-8 h-8 bg-secondary rounded-full opacity-50" />
      <svg className="absolute top-14 right-20 w-5 h-5 text-primary-dark opacity-60" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      <svg className="absolute bottom-48 right-12 w-4 h-4 text-accent opacity-70" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      {/* Main content */}
      <div className="text-center max-w-sm w-full">
        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
          Your Two-Week<br />Wait Companion
        </h1>
        <p className="text-text-muted text-lg mb-8">
          A day-by-day guide through the wait — because you deserve support, not just silence.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label htmlFor="ovulation-date" className="block text-sm font-semibold mb-2">
              When did you ovulate?
            </label>
            <input
              id="ovulation-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-surface text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <p className="text-xs text-text-muted mt-2">
              Not sure? It's usually ~14 days before your expected period.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-cta text-white font-semibold rounded-full text-base hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
          >
            Start My TWW →
          </button>
        </form>
      </div>
    </div>
  );
}
