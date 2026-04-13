import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Admin() {
  return (
    <div className="page-container" style={{padding: "20px"}}>
      



<div className="admin-layout">
    <aside className="admin-sidebar">
        <h2><i className="fas fa-user-shield"></i> لوحة الإدارة</h2>
        <i className="fas fa-chart-pie"></i><Link to="#">الإحصائيات</Link>
        <i className="fas fa-users-cog"></i><Link to="#">إدارة المستخدمين</Link>
        <i className="fas fa-folder-plus"></i><Link to="#">إدارة الكورسات</Link>
        <i className="fas fa-sign-out-alt"></i><Link to="#">الخروج للواجهة</Link>
    </aside>

    <main className="admin-main">
        <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontWeight: '900', color: 'white' }}>أهلاً بك أيها المدير! 👑</h1>
            <p style={{ color: '#94a3b8' }}>هنا يمكنك إدارة كل شيء في المنصة بضغطة زر</p>
        </header>

        <div id="stats" className="stats-grid">
            <div className="stat-card"><small>إجمالي الطلاب</small><h3 id="statUsers">0</h3></div>
            <div className="stat-card" style={{ borderRightColor: '#10b981' }}><small>إجمالي الكورسات</small><h3 id="statCourses">0</h3></div>
            <div className="stat-card" style={{ borderRightColor: '#fbbf24' }}><small>إجمالي الـ XP</small><h3 id="statXP">0</h3></div>
            <div className="stat-card" style={{ borderRightColor: '#38bdf8' }}><small>الأرباح (محاكاة)</small><h3 id="statRevenue">$0</h3></div>
        </div>

        <div id="users" className="table-container">
            <h2 style={{ color: 'white' }}><i className="fas fa-users"></i> التحكم في صلاحيات المستخدمين</h2>
            <table>
                <thead>
                    <tr><th>الاسم</th><th>البريد</th><th>الرتبة الحالية</th><th>تغيير الرتبة</th></tr>
                </thead>
                <tbody id="usersList"></tbody>
            </table>
        </div>

        <div id="courses" className="table-container">
            <h2 style={{ color: 'white' }}><i className="fas fa-plus-circle"></i> نشر كورس جديد</h2>
            <input type="text" id="cTitle" placeholder="عنوان الكورس" /><textarea id="cDesc" placeholder="وصف الكورس..."></textarea>
            <select id="cLevel" className="role-select"><option value="Beginner">مبتدئ</option><option value="Intermediate">متوسط</option><option value="Advanced">متقدم</option></select>
            <button className="btn" style={{ width: '100%', marginTop: '15px' }} onclick="addCourse()">نشر الكورس 🚀</button>
        </div>
    </main>
</div>






    </div>
  );
}
