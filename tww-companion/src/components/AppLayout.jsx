import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Home, CalendarHeart, Calendar, MessageCircle, Bell, X, User, LogOut } from 'lucide-react';
import { useTWW } from '../context/TWWContext';
import emilyPic from '../assets/emily.jpg';

export default function AppLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentDPO, ovulationDate, resetData } = useTWW();
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const isLanding = location.pathname === '/';

  // Don't show nav on landing page
  if (isLanding) {
    return <>{children}</>;
  }

  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/today', label: 'Today', icon: CalendarHeart },
    { path: '/timeline', label: 'Timeline', icon: Calendar },
    { path: '/chat', label: 'Community', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen md:flex">
      {/* Navigation Rail (md) / Expanded Rail (lg+) */}
      <aside className="hidden md:flex md:flex-col md:items-center md:w-20 lg:w-64 md:fixed md:inset-y-0 md:left-0 bg-white/30 backdrop-blur-xl border-r border-white/40 md:py-6 lg:px-4 lg:py-8 z-40">
        {/* Logo */}
        <button onClick={() => navigate('/home')} className="mb-8 flex flex-col items-center lg:items-start lg:px-4">
          <div className="hidden lg:block">
            <h2 className="font-serif text-xl font-bold">
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">TWW</span>
              <span className="text-gray-800"> Companion</span>
            </h2>
          </div>
          {/* Collapsed: just a small icon mark */}
          <div className="lg:hidden w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-violet-400 flex items-center justify-center shadow-sm">
            <span className="text-white text-xs font-bold">✦</span>
          </div>
        </button>

        {/* Nav Items */}
        <nav className="flex flex-col items-center lg:items-stretch lg:w-full gap-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path === '/timeline' && location.pathname.startsWith('/day/'));
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group flex flex-col items-center lg:flex-row lg:gap-3 lg:px-4 lg:py-3 lg:rounded-2xl lg:w-full transition-all relative ${
                  isActive ? 'lg:bg-indigo-50' : 'lg:hover:bg-white/40'
                }`}
              >
                {/* Pill indicator (collapsed rail) */}
                <div className={`md:flex lg:hidden items-center justify-center w-12 h-8 rounded-full transition-all ${
                  isActive ? 'bg-indigo-100' : 'group-hover:bg-white/50'
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-600'}`} />
                </div>
                {/* Label below icon (collapsed rail) */}
                <span className={`md:block lg:hidden text-[11px] mt-0.5 font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                  {item.label}
                </span>
                {/* Expanded rail: icon + label inline */}
                <div className={`hidden lg:flex items-center gap-3 w-full`}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isActive ? 'bg-indigo-100' : ''
                  }`}>
                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-indigo-600' : 'text-gray-600'}`} />
                  </div>
                  <span className={`text-sm ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-600 font-medium'}`}>
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Quick Jump — only on expanded rail */}
        {ovulationDate && (
          <div className="hidden lg:block w-full px-4 mt-auto pt-6 border-t border-white/40">
            <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-wider mb-3">Quick Jump</p>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 14 }, (_, i) => i + 1).map((day) => {
                const isToday = day === currentDPO;
                const isActive = location.pathname === `/day/${day}`;
                return (
                  <button
                    key={day}
                    onClick={() => navigate(`/day/${day}`)}
                    className={`w-7 h-7 rounded-full text-[11px] font-medium flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-indigo-500 text-white shadow-sm'
                        : isToday
                        ? 'bg-indigo-100 text-indigo-600 ring-1 ring-indigo-300'
                        : 'text-gray-700 hover:bg-indigo-50'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Encouragement — expanded only */}
        <div className="hidden lg:block w-full px-4 pt-4">
          <p className="text-xs text-gray-600 italic">
            You're doing amazing. 💛
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-20 lg:ml-64 relative">
        {/* Top bar: profile + bell */}
        <div className="sticky top-0 z-30 px-5 pt-[32px] pb-4 md:px-8 lg:px-12 flex items-center justify-between">
          <button onClick={() => setShowProfile(!showProfile)} className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-lg rounded-full pl-1 pr-4 py-1 border border-white/40 shadow-sm active:scale-95 transition-transform">
            <img src={emilyPic} alt="Emily Boggs" className="w-8 h-8 rounded-full object-cover ring-2 ring-white/60" />
            <span className="text-xs font-semibold">Emily Boggs</span>
          </button>
          <button onClick={() => setShowNotifications(!showNotifications)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-sm active:scale-95 transition-transform">
            <Bell className="w-4 h-4 text-indigo-500" />
          </button>
        </div>

        {/* Profile dropdown */}
        {showProfile && (
          <div className="fixed top-20 left-5 md:left-[calc(5rem+1.25rem)] lg:left-[calc(16rem+1.25rem)] bg-white rounded-xl shadow-lg border border-gray-100 py-2 px-1 w-48 z-50">
            <button onClick={() => { setShowProfile(false); navigate('/'); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Edit Profile</span>
            </button>
            <button onClick={() => { resetData(); navigate('/'); setShowProfile(false); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors">
              <LogOut className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        )}

        {children}
      </main>

      {/* Notifications drawer */}
      {showNotifications && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" onClick={() => setShowNotifications(false)} />
          <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:rounded-2xl bg-white rounded-t-3xl shadow-2xl z-[70] px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-8 animate-slide-up md:animate-none">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50">
                <span className="text-xl mt-0.5">📅</span>
                <div>
                  <p className="text-sm font-medium">Test day in {Math.max(0, 14 - currentDPO)} days</p>
                  <p className="text-xs text-gray-500 mt-0.5">Stay patient — you're getting closer!</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50">
                <span className="text-xl mt-0.5">💡</span>
                <div>
                  <p className="text-sm font-medium">New guide available</p>
                  <p className="text-xs text-gray-500 mt-0.5">Check today's DPO {currentDPO} insights</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom Nav — floating pill */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md rounded-full px-3 py-2 flex items-center gap-9 z-50 shadow-lg border border-white/30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path === '/timeline' && location.pathname.startsWith('/day/'));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-full transition-all ${
                isActive ? 'bg-white text-indigo-600 shadow-md' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
              {isActive && <span className="text-xs font-semibold">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
