import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="page-container" style={{padding: "20px"}}>
      

{/*  شريط التنقل الذكي  */}


{/*  رأس الملف الشخصي  */}
<header className="profile-header">
    <h1 style={{ fontSize: '40px', fontWeight: '900', color: 'white' }} id="uName">جارِ التحميل...</h1>
    <p style={{ color: '#e2e8f0', fontSize: '18px' }}>مبرمج شغوف يطمح للعالمية 🚀</p>
    <div className="user-avatar-big">
        <i className="fas fa-user-ninja"></i>
    </div>
</header>

{/*  شبكة الإحصائيات  */}
<section className="stats-grid">
    <div className="stat-card">
        <i className="fas fa-star"></i>
        <h2 id="uXP">0</h2>
        <p style={{ color: '#94a3b8' }}>نقاط XP</p>
    </div>
    <div className="stat-card">
        <i className="fas fa-bolt"></i>
        <h2 id="uLevel">1</h2>
        <p style={{ color: '#94a3b8' }}>المستوى الحالي</p>
    </div>
    <div className="stat-card">
        <i className="fas fa-trophy"></i>
        <h2 id="uRank">#--</h2>
        <p style={{ color: '#94a3b8' }}>ترتيب المتصدرين</p>
    </div>
    <div className="stat-card">
        <i className="fas fa-certificate"></i>
        <h2 id="uCerts">0</h2>
        <p style={{ color: '#94a3b8' }}>الشهادات المكتسبة</p>
    </div>
</section>

{/*  المحتوى الرئيسي (الكورسات والشهادات)  */}
<div className="dashboard-content">
    <h2 style={{ marginBottom: '30px', color: '#7dd3fc' }}><i className="fas fa-laptop-code"></i> تقدمك في الكورسات</h2>
    
    <div id="enrolledCourses">
        {/*  سيتم ملؤها بالجافا سكريبت  */}
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>جاري جلب إنجازاتك من السيرفر...</p>
    </div>

    <h2 style={{ margin: '50px 0 30px 0', color: '#fbbf24' }}><i className="fas fa-award"></i> أوسمة حصلت عليها</h2>
    <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
        <span className="badge-icon" title="أكمل أول درس"><i className="fas fa-seedling"></i></span>
        <span className="badge-icon" title="تفاعل يومي لمدة أسبوع"><i className="fas fa-fire"></i></span>
        <span className="badge-icon" title="حل أول اختبار بنجاح"><i className="fas fa-brain"></i></span>
        <p style={{ marginTop: '15px', color: '#94a3b8', fontSize: '14px' }}>استمر في التعلم لفتح المزيد من الأوسمة!</p>
    </div>
</div>








    </div>
  );
}
