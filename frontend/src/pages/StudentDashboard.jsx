import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const userName = localStorage.getItem('user_name') || 'الطالب';
  const userXp = localStorage.getItem('user_xp') || 0;
  const userId = localStorage.getItem('user_id') || 1; // Fallback to 1 for demo
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user_name')) {
      navigate('/login');
    }

    fetch(`http://localhost:8000/api/student/${userId}/courses`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') {
          setEnrollments(data.student_courses);
        }
      })
      .catch((err) => {
        console.log("Using demo dashboard data", err);
        setEnrollments([
          { progress: 60, course: { title: 'أساسيات الويب (HTML/CSS)', description: 'الكورس المبدئي', id: 1 } },
          { progress: 10, course: { title: 'برمجة تفاعلية (JS)', description: 'الخطوة القادمة', id: 2 } }
        ]);
      });
  }, [navigate, userId]);

  return (
    <div className="page-container" style={{padding: "40px 20px", maxWidth: "1000px", margin: "0 auto"}}>
      <div style={{ display: 'flex', alignItems: 'center', background: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid #334155', marginBottom: '40px' }}>
        <img src="/IMG-20251201-WA0041.jpg" alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #0284c7', objectFit: 'cover', background: 'white' }} />
        <div style={{ marginLeft: '20px', marginRight: '30px' }}>
          <h1 style={{ margin: 0, color: 'white' }}>مرحباً يا {userName}!</h1>
          <p style={{ color: '#94a3b8', margin: '5px 0' }}>طالب مجتهد | المستوى 5</p>
          <span className="xp-badge">⭐ {userXp} XP المجموع الكلي</span>
        </div>
      </div>

      <h2 style={{ color: '#7dd3fc', marginBottom: '20px' }}><i className="fas fa-book-reader"></i> دوراتي التعليمية</h2>
      
      {enrollments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '20px' }}>
          <i className="fas fa-box-open" style={{ fontSize: '50px', color: '#64748b' }}></i>
          <h3 style={{ color: 'white', marginTop: '20px' }}>لم تشترك في أي دورة بعد</h3>
          <Link to="/courses" className="btn btn-main" style={{ marginTop: '15px' }}>تصفح الكورسات المتاحة</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {enrollments.map((en, idx) => (
            <div key={idx} style={{ background: '#1e293b', padding: '25px', borderRadius: '20px', border: '1px solid #334155' }}>
              <h3 style={{ color: 'white', marginBottom: '10px' }}>{en.course.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '20px' }}>{en.course.description}</p>
              
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '5px' }}>
                  <span style={{ color: '#cbd5e1' }}>نسبة الإنجاز</span>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>{en.progress}%</span>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${en.progress}%` }}></div>
                </div>
              </div>

              <Link to={`/lessons`} className="btn" style={{ width: '100%', background: '#334155' }}>متابعة التعلم</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
