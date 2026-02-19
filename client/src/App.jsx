import { Routes, Route } from 'react-router-dom';
import ThreeBackground from './components/ThreeBackground';
import LandingPage from './components/LandingPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import AdminDashboard from './components/AdminDashboard';



function App() {
  return (
    <>
      <ThreeBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
