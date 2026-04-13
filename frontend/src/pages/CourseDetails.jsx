import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CourseDetails() {
  const navigate = useNavigate();
  // Dummy data
  const course = {
    title: 'أساسيات الويب (HTML/CSS)',
    students: '12,500',
    rating: '4.9/5',
    hours: '15 ساعة',
    goals: 'بناء وهيكلة مواقع الويب',
    requirements: 'لا يشترط وجود خبرة سابقة',
    price: 'مجاني'
  };

  return (
    <div className="page-container" style={{padding: "40px 20px"}}>
      <h2 id="courseTitle" className="student-title" style={{ textAlign: 'center', color: '#7dd3fc', marginBottom: '30px' }}>
         📚 تفاصيل كورس {course.title}
      </h2>

      <div className="card" style={{ maxWidth: '800px', margin: 'auto', padding: '30px', textAlign: 'right' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <i className="fab fa-html5" style={{ fontSize: '80px', color: '#e34f26' }}></i>
          </div>

          {/*  معلومات الكورس  */}
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '15px', border: '1px solid #334155' }}>
              <p style={{ margin: '15px 0', color: 'white' }}><i className="fas fa-users" style={{color: '#94a3b8', width: '25px'}}></i> <b>عدد الطلاب:</b> <span style={{color: '#7dd3fc'}}>{course.students}</span></p>
              <p style={{ margin: '15px 0', color: 'white' }}><i className="fas fa-star" style={{color: '#fbbf24', width: '25px'}}></i> <b>التقييم:</b> <span style={{color: '#fbbf24'}}>{course.rating}</span></p>
              <p style={{ margin: '15px 0', color: 'white' }}><i className="fas fa-clock" style={{color: '#94a3b8', width: '25px'}}></i> <b>ساعات الفيديو:</b> <span style={{color: '#7dd3fc'}}>{course.hours}</span></p>
              <p style={{ margin: '15px 0', color: 'white' }}><i className="fas fa-bullseye" style={{color: '#ef4444', width: '25px'}}></i> <b>أهداف الكورس:</b> <span>{course.goals}</span></p>
              <p style={{ margin: '15px 0', color: 'white' }}><i className="fas fa-exclamation-circle" style={{color: '#f59e0b', width: '25px'}}></i> <b>المتطلبات:</b> <span>{course.requirements}</span></p>
              <p style={{ margin: '15px 0', color: 'white', fontSize: '20px' }}><i className="fas fa-tag" style={{color: '#10b981', width: '25px'}}></i> <b>السعر:</b> <span style={{color: '#10b981', fontWeight: 'bold'}}>{course.price}</span></p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button onClick={() => navigate('/lessons')} className="btn btn-main" style={{ fontSize: '18px', padding: '12px 30px', background: '#10b981' }}>
                  <i className="fas fa-play"></i> مشاهدة الدروس والفيديوهات
              </button>
              
              <Link to="/courses" className="btn" style={{ fontSize: '18px', padding: '12px 30px', background: '#334155' }}>العودة للكورسات</Link>
          </div>

      </div>
    </div>
  );
}
