import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  const demoLeaders = [
    { name: 'إبراهيم أحمد', xp: 5800, badge: '🏆 المبرمج الأسطورة', icon: 'fa-crown', color: '#fbbf24' },
    { name: 'أحمد محمود', xp: 4500, badge: '🥈 مطور محترف', icon: 'fa-medal', color: '#cbd5e1' },
    { name: 'سارة خالد', xp: 4100, badge: '🥉 مطور نشط', icon: 'fa-award', color: '#b45309' },
    { name: 'مصطفى كريم', xp: 3200, badge: 'مبرمج صاعد', icon: 'fa-star', color: '#0284c7' },
    { name: 'مريم علي', xp: 2800, badge: 'مبرمج مبتدئ', icon: 'fa-star', color: '#0284c7' },
  ];

  useEffect(() => {
    fetch('http://localhost:8000/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success' && data.leaderboard.length > 0) {
          // Map backend data to UI format
          const formatted = data.leaderboard.map((u, idx) => ({
            name: u.name,
            xp: u.xp,
            badge: idx === 0 ? '🏆 المبرمج الأسطورة' : idx === 1 ? '🥈 مطور محترف' : idx === 2 ? '🥉 مطور نشط' : 'مبرمج صاعد',
            icon: idx === 0 ? 'fa-crown' : idx === 1 || idx === 2 ? 'fa-medal' : 'fa-star',
            color: idx === 0 ? '#fbbf24' : idx === 1 ? '#cbd5e1' : idx === 2 ? '#b45309' : '#0284c7'
          }));
          setLeaders(formatted);
        } else {
          setLeaders(demoLeaders);
        }
      })
      .catch(() => setLeaders(demoLeaders));
  }, []);

  return (
    <div className="page-container" style={{padding: "40px 20px", maxWidth: "800px", margin: "0 auto"}}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <i className="fas fa-trophy" style={{ fontSize: '60px', color: '#fbbf24', marginBottom: '20px' }}></i>
        <h1 style={{ fontSize: '40px', color: '#f8fafc', fontWeight: '900' }}>لوحة الشرف والصدارة</h1>
        <p style={{ color: '#94a3b8', fontSize: '18px' }}>أفضل المبرمجين على المنصة لهذا الأسبوع</p>
      </div>

      <div style={{ background: '#1e293b', borderRadius: '20px', padding: '15px', border: '1px solid #334155' }}>
        {leaders.map((leader, index) => (
          <div key={index} style={{ 
            display: 'flex', alignItems: 'center', padding: '20px', 
            borderBottom: index !== leaders.length - 1 ? '1px solid #334155' : 'none',
            background: index === 0 ? 'rgba(251, 191, 36, 0.1)' : 'transparent',
            borderRadius: index === 0 ? '15px' : '0'
          }}>
            <div style={{ width: '40px', fontSize: '24px', fontWeight: 'bold', color: leader.color }}>
              #{index + 1}
            </div>
            <div style={{ fontSize: '30px', color: leader.color, marginLeft: '20px', marginRight: '10px' }}>
              <i className={`fas ${leader.icon}`}></i>
            </div>
            <div style={{ flexGrow: 1 }}>
              <h3 style={{ margin: 0, fontSize: '20px', color: 'white' }}>{leader.name}</h3>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>{leader.badge}</p>
            </div>
            <div className="xp-badge" style={{ fontSize: '18px' }}>
              {leader.xp} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
