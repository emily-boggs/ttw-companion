import { useNavigate, useLocation } from 'react-router-dom';
import { useTWW } from '../context/TWWContext';

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentDPO, ovulationDate } = useTWW();

  const isLanding = location.pathname === '/';

  // Don't show nav on landing page
  if (isLanding) {
    return <>{children}</>;
  }

  const navItems = [
    { path: '/timeline', label: 'Timeline', emoji: '📅' },
    { path: '/log', label: 'Log', emoji: '📝' },
  ];

  return (
    <div className="min-h-screen md:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 md:fixed md:inset-y-0 md:left-0 bg-white border-r border-gray-100 px-5 py-8">
        {/* Logo / Title */}
        <div className="mb-8">
          <h2 className="font-serif text-xl font-bold">TWW Companion</h2>
          {currentDPO && (
            <p className="text-sm text-text-muted mt-1">DPO {Math.min(currentDPO, 14)}</p>
          )}
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-primary/10 text-primary-dark font-semibold'
                    : 'text-text-muted hover:bg-surface'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}

          {/* Day shortcuts */}
          {ovulationDate && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wide px-4 mb-2">Quick Jump</p>
              <div className="flex flex-wrap gap-1.5 px-4">
                {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => {
                  const isToday = day === currentDPO;
                  const isActive = location.pathname === `/day/${day}`;
                  return (
                    <button
                      key={day}
                      onClick={() => navigate(`/day/${day}`)}
                      className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-primary text-white'
                          : isToday
                          ? 'bg-primary/20 text-primary-dark ring-1 ring-primary'
                          : 'bg-surface text-text-muted hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Decorative bottom */}
        <div className="mt-auto pt-6 relative">
          <div className="absolute -top-2 left-4 w-6 h-6 bg-accent rounded-full opacity-40" />
          <div className="absolute top-4 right-8 w-4 h-4 bg-secondary rounded-full opacity-30" />
          <p className="text-xs text-text-muted italic px-4">
            You're doing amazing. 💛
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 lg:ml-72">
        <div className="max-w-2xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 px-5 py-3 flex justify-around z-50">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 min-h-[44px] min-w-[44px] justify-center ${
                isActive ? 'text-primary-dark' : 'text-text-muted'
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
