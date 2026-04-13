import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to determine icon and color based on course title
  const getCourseStyle = (title) => {
    const t = title.toLowerCase();
    if (t.includes('html') || t.includes('css')) return { icon: 'fa-html5', color: '#e34f26' };
    if (t.includes('js') || t.includes('javascript')) return { icon: 'fa-js', color: '#f7df1e' };
    if (t.includes('react')) return { icon: 'fa-react', color: '#61dbfb' };
    if (t.includes('python')) return { icon: 'fa-python', color: '#3776ab' };
    if (t.includes('node')) return { icon: 'fa-node-js', color: '#68a063' };
    return { icon: 'fa-code', color: '#0284c7' };
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/courses')
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success' && data.courses.length > 0) {
          setCourses(data.courses);
        } else {
          setCourses([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log("Using demo data due to fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-container" style={{padding: "40px 20px"}}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '45px', color: '#7dd3fc', fontWeight: '900' }}>المسارات التعليمية</h1>
        <p style={{ color: '#94a3b8', fontSize: '20px' }}>اختر المسار الذي يناسبك وابدأ رحلتك في عالم البرمجة</p>
      </div>

      {loading ? (
        <h3 style={{ textAlign: 'center', color: 'white' }}>جاري تحميل الكورسات المدعومة بالبيانات الحقيقية...</h3>
      ) : (
        <div className="cards">
          {courses.map((course, idx) => {
            const style = getCourseStyle(course.title);
            return (
              <div key={course.id || idx} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '30px 20px' }}>
                <i className={`fab ${style.icon}`} style={{ fontSize: '60px', color: style.color, marginBottom: '15px' }}></i>
                <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>{course.title}</h3>
                <p style={{ color: '#94a3b8', marginBottom: '20px', flexGrow: 1 }}>{course.description}</p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span className="xp-badge" style={{ fontSize: '14px' }}>+{course.xp || 500} XP</span>
                  <Link to={`/course-details`} className="btn" style={{ padding: '8px 20px', fontSize: '14px' }}>ابدأ التعلم</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
