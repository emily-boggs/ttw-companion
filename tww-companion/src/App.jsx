import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TWWProvider } from './context/TWWContext';
import AppLayout from './components/AppLayout';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Today from './pages/Today';
import Timeline from './pages/Timeline';
import DayDetail from './pages/DayDetail';
import Chat from './pages/Chat';

function App() {
  return (
    <TWWProvider>
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/today" element={<Today />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/day/:dpo" element={<DayDetail />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TWWProvider>
  );
}

export default App;
