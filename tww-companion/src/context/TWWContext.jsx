import { createContext, useContext, useState, useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';

const TWWContext = createContext(null);

export function TWWProvider({ children }) {
  const [ovulationDate, setOvulationDate] = useState(() => {
    const saved = localStorage.getItem('tww-ovulation-date');
    return saved || null;
  });

  useEffect(() => {
    if (ovulationDate) {
      localStorage.setItem('tww-ovulation-date', ovulationDate);
    } else {
      localStorage.removeItem('tww-ovulation-date');
    }
  }, [ovulationDate]);

  const currentDPO = ovulationDate
    ? differenceInCalendarDays(new Date(), new Date(ovulationDate))
    : null;

  const resetData = () => {
    setOvulationDate(null);
    localStorage.clear();
  };

  return (
    <TWWContext.Provider value={{ ovulationDate, setOvulationDate, currentDPO, resetData }}>
      {children}
    </TWWContext.Provider>
  );
}

export function useTWW() {
  const context = useContext(TWWContext);
  if (!context) throw new Error('useTWW must be used within TWWProvider');
  return context;
}
