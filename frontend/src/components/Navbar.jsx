import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <nav id="navbar">
      <Link to="/" className="logo-link">
        <img src="/IMG-20251201-WA0041.jpg" alt="Logo" className="logo" style={{ objectFit: 'contain', width: '60px', height: '60px', borderRadius: '10px' }} />
      </Link>
      <div className="nav-links">
        <Link to="/">الرئيسية</Link>
        <Link to="/courses">المسارات التعليمية</Link>
        <Link to="/leaderboard">لوحة الصدارة</Link>
        {userName ? (
          <>
            <Link to="/student-dashboard">لوحة التحكم</Link>
            <span style={{ color: '#0284c7', fontWeight: 'bold' }}>أهلاً، {userName}</span>
            <button className="btn btn-danger" style={{ padding: '5px 15px', marginRight: '10px' }} onClick={() => { localStorage.removeItem('user_name'); window.location.reload(); }}>تسجيل خروج</button>
          </>
        ) : (
          <Link to="/login" className="btn" style={{ padding: '5px 20px', margin: '0 10px' }}>تسجيل الدخول</Link>
        )}
      </div>
    </nav>
  );
}
