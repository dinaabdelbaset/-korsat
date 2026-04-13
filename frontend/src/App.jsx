import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Admin from './pages/Admin';
import ChatbotStudent from './pages/ChatbotStudent';
import ChatbotTeacher from './pages/ChatbotTeacher';
import Contact from './pages/Contact';
import CourseCertificate from './pages/CourseCertificate';
import CourseDetails from './pages/CourseDetails';
import CourseMange from './pages/CourseMange';
import CourseQuiz from './pages/CourseQuiz';
import CourseStudent from './pages/CourseStudent';
import CourseSubscribe from './pages/CourseSubscribe';
import Courses from './pages/Courses';
import CodeEditor from './pages/CodeEditor';
import Create from './pages/Create';
import Gamification from './pages/Gamification';
import Leaderboard from './pages/Leaderboard';
import Lessons from './pages/Lessons';
import Login from './pages/Login';
import Profile from './pages/Profile';
import StudentDashboard from './pages/StudentDashboard';
import StudentProfile from './pages/StudentProfile';
import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/chatbot-student" element={<ChatbotStudent />} />
        <Route path="/chatbot-teacher" element={<ChatbotTeacher />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/course-certificate" element={<CourseCertificate />} />
        <Route path="/course-details" element={<CourseDetails />} />
        <Route path="/course-mange" element={<CourseMange />} />
        <Route path="/course-quiz" element={<CourseQuiz />} />
        <Route path="/course-student" element={<CourseStudent />} />
        <Route path="/course-subscribe" element={<CourseSubscribe />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/create" element={<Create />} />
        <Route path="/gamification" element={<Gamification />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="*" element={<h2 style={{textAlign: 'center', marginTop: '100px'}}>صفحة قيد التطوير (React)</h2>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
