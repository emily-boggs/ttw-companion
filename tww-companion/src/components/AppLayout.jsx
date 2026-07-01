import { useNavigate, useLocation } from 'react-router-dom';
import { Home, CalendarHeart, Calendar, MessageCircle } from 'lucide-react';
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
    { path: '/home', label: 'Home', icon: Home },
    { path: '/today', label: 'Today', icon: CalendarHeart },
    { path: '/timeline', label: 'Timeline', icon: Calendar },
    { path: '/chat', label: 'Chat', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen md:flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 md:fixed md:inset-y-0 md:left-0 bg-white border-r border-gray-100 px-5 py-8">
        {/* Logo / Title */}
        <button onClick={() => navigate('/home')} className="mb-8 text-left">
          <h2 className="font-serif text-xl font-bold">TWW Companion</h2>
          {currentDPO != null && (
            <p className="text-sm text-text-muted mt-1">DPO {Math.min(Math.max(currentDPO, 1), 14)}</p>
          )}
        </button>

        {/* Nav Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/timeline' && location.pathname.startsWith('/day/'));
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
                <Icon className="w-5 h-5" />
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

      {/* Mobile Bottom Nav — floating pill */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-4 z-50 shadow-lg border border-white/30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path === '/timeline' && location.pathname.startsWith('/day/'));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-full transition-all ${
                isActive ? 'bg-gray-800 text-white shadow-md' : 'text-text-muted'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
              {isActive && <span className="text-xs font-medium">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
