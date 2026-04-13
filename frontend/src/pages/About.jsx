import React, { useEffect, useState } from 'react';

export default function About() {
  const [stats, setStats] = useState({ users: 0, courses: 0, certificates: 0 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    // جلب احصائيات المنصة من الباك إند
    fetch('http://localhost:8000/api/system/stats')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setStats(data.stats);
        }
        setLoadingStats(false);
      })
      .catch(err => {
        console.error("Error fetching stats", err);
        setLoadingStats(false);
      });
  }, []);

  return (
    <div className="page-container" style={{ padding: "40px 5%", minHeight: "80vh", direction: "rtl", color: "#f8fafc", backgroundColor: "#020617" }}>
      
      {/* مقدمة الصفحة */}
      <section style={{ textAlign: "center", marginBottom: "60px", paddingTop: "20px" }}>
        <h1 style={{ fontSize: "48px", color: "#38bdf8", marginBottom: "20px", fontWeight: "bold" }}>قصة "رحلة مبرمج"</h1>
        <p style={{ fontSize: "20px", color: "#94a3b8", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8" }}>
          لم يكن الهدف مجرد بناء موقع إلكتروني، بل كان الطموح هو خلق رفيق رقمي لكل شاب عربي يطمح لدخول عالم التكنولوجيا. 
          بدأنا من فكرة بسيطة: كيف نجعل التعلم ممتعاً ومجزياً في نفس الوقت؟
        </p>
      </section>

      {/* إحصائيات حية من الـ Backend */}
      <section style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px", marginBottom: "80px" }}>
        <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", padding: "30px", borderRadius: "15px", border: "1px solid #334155", width: "250px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>👥</div>
          <h3 style={{ color: "#38bdf8", fontSize: "35px", margin: "0 0 10px 0" }}>
            {loadingStats ? "..." : `+${stats.users}`}
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0, fontSize: "18px" }}>مبرمج مسجل</p>
        </div>
        
        <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", padding: "30px", borderRadius: "15px", border: "1px solid #334155", width: "250px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>📚</div>
          <h3 style={{ color: "#10b981", fontSize: "35px", margin: "0 0 10px 0" }}>
            {loadingStats ? "..." : stats.courses}
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0, fontSize: "18px" }}>كورس تعليمي</p>
        </div>

        <div style={{ background: "linear-gradient(135deg, #0f172a, #1e293b)", padding: "30px", borderRadius: "15px", border: "1px solid #334155", width: "250px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
          <div style={{ fontSize: "40px", marginBottom: "15px" }}>📜</div>
          <h3 style={{ color: "#fbbf24", fontSize: "35px", margin: "0 0 10px 0" }}>
            {loadingStats ? "..." : stats.certificates}
          </h3>
          <p style={{ color: "#cbd5e1", margin: 0, fontSize: "18px" }}>شهادة معتمدة</p>
        </div>
      </section>

      {/* المهمة والرؤية */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", marginBottom: "80px", justifyContent: "center" }}>
        <div style={{ flex: "1 1 400px", background: "#1e293b", padding: "40px", borderRadius: "20px", border: "1px solid #334155", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
          <h2 style={{ color: "#fbbf24", marginBottom: "20px", fontSize: "28px" }}>🎯 مهمتنا</h2>
          <p style={{ color: "#cbd5e1", fontSize: "18px", lineHeight: "1.8", margin: 0 }}>
            توفير بيئة تعليمية متكاملة تكسر حاجز الملل، وتجمع بين الدروس عالية الجودة والتطبيق العملي الفوري، 
            مع نظام تحفيزي يضمن استمرارية الطالب في رحلته حتى الوصول للاحتراف.
          </p>
        </div>
        <div style={{ flex: "1 1 400px", background: "#1e293b", padding: "40px", borderRadius: "20px", border: "1px solid #334155", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
          <h2 style={{ color: "#10b981", marginBottom: "20px", fontSize: "28px" }}>🔭 رؤيتنا</h2>
          <p style={{ color: "#cbd5e1", fontSize: "18px", lineHeight: "1.8", margin: 0 }}>
            أن نصبح المنصة الأولى في الوطن العربي لتأهيل المبرمجين لسوق العمل العالمي، 
            من خلال تقديم مسارات تعليمية ذكية تواكب أحدث تقنيات العصر وتكنولوجيا الذكاء الاصطناعي.
          </p>
        </div>
      </div>

      {/* التقنيات المستخدمة */}
      <section style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ fontSize: "35px", color: "#38bdf8", marginBottom: "15px" }}>الأدوات والتقنيات (Tech Stack)</h2>
        <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "40px" }}>تم بناء هذه المنصة باستخدام أحدث تقنيات الويب لضمان السرعة الأمان القوي</p>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center", maxWidth: "900px", margin: "0 auto" }}>
          {[
            { name: "React.js", desc: "واجهة المستخدم التفاعلية", color: "#61dafb" },
            { name: "FastAPI", desc: "برمجة السيرفر فائقة السرعة", color: "#009688" },
            { name: "Python", desc: "لغة الباك إند الأساسية", color: "#ffde57" },
            { name: "MySQL", desc: "تخزين البيانات وحمايتها", color: "#4479a1" },
            { name: "Monaco Editor", desc: "محرر الأكواد المدمج", color: "#007acc" },
            { name: "SHA-256", desc: "تشفير وحماية البيانات", color: "#ff4d4f" },
          ].map((tech, i) => (
            <div key={i} style={{ background: "#0f172a", border: `1px solid ${tech.color}40`, padding: "15px 25px", borderRadius: "10px", minWidth: "200px" }}>
              <h3 style={{ color: tech.color, margin: "0 0 5px 0" }}>{tech.name}</h3>
              <p style={{ color: "#94a3b8", margin: 0, fontSize: "14px" }}>{tech.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* لماذا نحن؟ */}
      <section style={{ background: "linear-gradient(180deg, #1e293b, #020617)", borderRadius: "30px", padding: "60px 40px", textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ fontSize: "35px", color: "#f8fafc", marginBottom: "50px" }}>لماذا "رحلة مبرمج"؟</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "30px", justifyContent: "center" }}>
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>🛡️</div>
            <h3 style={{ color: "#38bdf8", marginBottom: "15px", fontSize: "22px" }}>أمان تام</h3>
            <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>تشفير عالي المستوى لبيانات المستخدمين وكلمات المرور لضمان الخصوصية التامة.</p>
          </div>
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>⚡</div>
            <h3 style={{ color: "#10b981", marginBottom: "15px", fontSize: "22px" }}>أداء فائق</h3>
            <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>تصفح سريع واستجابة فورية بفضل بنية السيرفر المتطورة المبنية على FastAPI.</p>
          </div>
          <div style={{ flex: "1 1 280px" }}>
            <div style={{ fontSize: "50px", marginBottom: "20px" }}>📈</div>
            <h3 style={{ color: "#fbbf24", marginBottom: "15px", fontSize: "22px" }}>تطور مستمر</h3>
            <p style={{ color: "#cbd5e1", lineHeight: "1.6" }}>نقوم بتحديث المحتوى والأنظمة دورياً لمواكبة أحدث متطلبات سوق العمل العالمي.</p>
          </div>
        </div>
      </section>

      {/* فريق العمل */}
      <section style={{ textAlign: "center", paddingBottom: "40px" }}>
        <h2 style={{ fontSize: "35px", color: "#38bdf8", marginBottom: "15px" }}>مؤسس المنصة</h2>
        <p style={{ color: "#94a3b8", fontSize: "18px", marginBottom: "40px" }}>خلف هذا العمل مجهود برمجي وفني متواصل لدعم الطلاب</p>
        
        <div style={{ background: "#1e293b", width: "300px", margin: "0 auto", padding: "30px", borderRadius: "15px", border: "1px solid #334155" }}>
          <div style={{ width: "120px", height: "120px", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", borderRadius: "50%", margin: "0 auto 20px auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", color: "white" }}>
            👨‍💻
          </div>
          <h3 style={{ color: "#f8fafc", margin: "0 0 10px 0", fontSize: "24px" }}>م. إبراهيم</h3>
          <p style={{ fontSize: "15px", color: "#38bdf8", margin: 0, fontWeight: "bold" }}>Full-Stack Developer & Architect</p>
        </div>
      </section>

    </div>
  );
}
