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
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />
      {/* Decorative elements */}
      <div className="absolute top-8 left-6 w-12 h-12 bg-accent rounded-full opacity-60" />
      <div className="absolute top-20 right-8 w-6 h-6 bg-primary rounded-full opacity-50" />
      <div className="absolute bottom-32 left-10 w-8 h-8 bg-secondary rounded-full opacity-50" />
      <div className="absolute top-1/3 left-4 w-16 h-16 bg-primary/10 rounded-full hidden md:block" />
      <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-accent/20 rounded-full hidden md:block" />
      <div className="absolute top-1/4 right-1/4 w-10 h-10 bg-secondary/30 rounded-full hidden md:block" />
      <svg className="absolute top-14 right-20 w-5 h-5 text-primary-dark opacity-60" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      <svg className="absolute bottom-48 right-12 w-4 h-4 text-accent opacity-70" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>
      <svg className="absolute top-32 left-1/3 w-6 h-6 text-secondary opacity-50 hidden md:block" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z" />
      </svg>

      {/* Main content */}
      <div className="text-center max-w-sm md:max-w-md w-full relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
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
              className="w-full px-4 py-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
