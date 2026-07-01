import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TWWProvider } from './context/TWWContext';
import Landing from './pages/Landing';
import Timeline from './pages/Timeline';
import DayDetail from './pages/DayDetail';
import SymptomLog from './pages/SymptomLog';

function App() {
  return (
    <TWWProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/day/:dpo" element={<DayDetail />} />
          <Route path="/log" element={<SymptomLog />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TWWProvider>
  );
}

export default App;
