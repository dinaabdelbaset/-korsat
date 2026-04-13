import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('user_name');
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1 className="home-title" style={{ fontSize: '60px', fontWeight: 900 }}>
            {userName ? `أهلاً بك يا ${userName}، لنستكمل الإبداع!` : 'رحلة مبرمج الذكية'}
          </h1>
          <p className="home-text" style={{ fontSize: '24px', maxWidth: '800px', margin: '20px auto 40px auto' }}>
            المنصة العربية الأولى المتكاملة لتعلم البرمجة، التطبيق العملي، والحصول على شهادات معتمدة عالمياً.
          </p>
          <div>
            {userName ? (
              <Link to="/courses" className="btn-main"><i className="fas fa-play"></i>استكمل دروسك الآن</Link>
            ) : (
              <Link to="/create" className="btn-main"><i className="fas fa-rocket"></i>ابدأ رحلتك المجانية الآن</Link>
            )}
          </div>
        </div>
      </header>

      <section style={{ background: '#020617', padding: '50px 0', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-users" style={{ fontSize: '30px', color: '#0284c7' }}></i>
            <h2 style={{ fontSize: '35px', marginTop: '10px' }}>+10K</h2>
            <p style={{ color: '#94a3b8' }}>طالب مسجل</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-laptop-code" style={{ fontSize: '30px', color: '#10b981' }}></i>
            <h2 style={{ fontSize: '35px', marginTop: '10px' }}>+25</h2>
            <p style={{ color: '#94a3b8' }}>مسار تعليمي</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <i className="fas fa-certificate" style={{ fontSize: '30px', color: '#fbbf24' }}></i>
            <h2 style={{ fontSize: '35px', marginTop: '10px' }}>+5K</h2>
            <p style={{ color: '#94a3b8' }}>شهادة تم إصدارها</p>
          </div>
        </div>
      </section>

      <section className="section-box">
        <h2 className="section-title">🛣️ مسارك نحو الاحتراف 2026</h2>
        <div className="roadmap-line">
          <div className="roadmap-step active">
            <i className="fab fa-html5" style={{ fontSize: '40px', color: '#e34f26' }}></i>
            <h4>أساسيات الويب</h4>
          </div>
          <i className="fas fa-chevron-left" style={{ fontSize: '30px', color: '#334155' }}></i>
          <div className="roadmap-step">
            <i className="fab fa-js" style={{ fontSize: '40px', color: '#f7df1e' }}></i>
            <h4>برمجة تفاعلية</h4>
          </div>
          <i className="fas fa-chevron-left" style={{ fontSize: '30px', color: '#334155' }}></i>
          <div className="roadmap-step">
            <i className="fab fa-react" style={{ fontSize: '40px', color: '#61dbfb' }}></i>
            <h4>بناء واجهات</h4>
          </div>
          <i className="fas fa-chevron-left" style={{ fontSize: '30px', color: '#334155' }}></i>
          <div className="roadmap-step" style={{ background: '#0284c7' }}>
            <i className="fas fa-database" style={{ fontSize: '40px', color: 'white' }}></i>
            <h4>إتقان Backend</h4>
          </div>
        </div>
      </section>

      <section className="section-box" style={{ background: '#020617' }}>
        <h2 className="section-title">لماذا نحن الخيار الأول للمبرمجين؟</h2>
        <div className="cards">
          <Link to="/chatbot-student" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-robot"></i>
            <h3>مساعد ذكي AI</h3>
            <p>مساعد مدمج بذكاء اصطناعي يصحح كودك ويجيب على أسئلتك فوراً.</p>
          </Link>
          <Link to="/leaderboard" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-trophy"></i>
            <h3>لوحة الصدارة</h3>
            <p>نافس زملائك واجمع نقاط XP لتتصدر قائمة المبدعين أسبوعياً.</p>
          </Link>
          <Link to="/course-certificate" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-file-contract"></i>
            <h3>شهادات PDF</h3>
            <p>شهادات معتمدة يتم توليدها برمجياً فور إتمامك للكورس بنجاح.</p>
          </Link>
          <Link to="/verify" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-shield-alt"></i>
            <h3>التحقق من الشهادات</h3>
            <p>نظام ذكي للشركات للتحقق من أصلية الشهادات عبر كود PJ-CERT.</p>
          </Link>
          <Link to="/code-editor" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-terminal"></i>
            <h3>محرر أكواد</h3>
            <p>لا تحتاج لبرامج! تدرب واكتب الكود داخل المتصفح مباشرة.</p>
          </Link>
          <Link to="/gamification" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-gamepad"></i>
            <h3>نظام التلعيب</h3>
            <p>التعلم عندنا لعبة! مستويات، أوسمة، وتحديات برمجية ممتعة.</p>
          </Link>
          <Link to="/contact" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-users-gear"></i>
            <h3>دعم مستمر</h3>
            <p>مجتمع برمجي متكامل ومنتدى لمناقشة المشاكل والحلول مع الخبراء.</p>
          </Link>
          <Link to="/course-quiz" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-bolt"></i>
            <h3>تحديات سريعة</h3>
            <p>تحديات يومية تزيد من رصيد نقاطك وتحافظ على استمراريتك.</p>
          </Link>
          <Link to="/about" className="feature-card" style={{textDecoration: 'none', color: 'inherit', display: 'block'}}>
            <i className="fas fa-briefcase"></i>
            <h3>تأهيل للوظيفة</h3>
            <p>نساعدك في بناء ملفك الشخصي (Portfolio) لتكون جاهزاً لسوق العمل.</p>
          </Link>
        </div>
      </section>

      <section className="section-box">
        <h2 className="section-title">كيف تبدأ رحلة نجاحك؟</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ width: '250px' }}>
            <div style={{ fontSize: '50px', color: '#0284c7', marginBottom: '15px' }}><i className="fas fa-user-plus"></i></div>
            <h4>1. سجل حسابك</h4>
            <p style={{ color: '#94a3b8' }}>ابدأ رحلتك في ثوانٍ مجاناً.</p>
          </div>
          <div style={{ width: '250px' }}>
            <div style={{ fontSize: '50px', color: '#10b981', marginBottom: '15px' }}><i className="fas fa-book-open"></i></div>
            <h4>2. تعلم وطبق</h4>
            <p style={{ color: '#94a3b8' }}>شاهد الدروس وطبق الكود بيدك.</p>
          </div>
          <div style={{ width: '250px' }}>
            <div style={{ fontSize: '50px', color: '#fbbf24', marginBottom: '15px' }}><i className="fas fa-star"></i></div>
            <h4>3. اجمع النقاط</h4>
            <p style={{ color: '#94a3b8' }}>تصدر قائمة الأبطال واجمع الـ XP.</p>
          </div>
        </div>
      </section>
    </>
  );
}
