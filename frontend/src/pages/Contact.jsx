import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleContactForm = (e) => {
    e.preventDefault();
    alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
  };

  return (
    <div className="page-container" style={{ padding: "40px 5%", minHeight: "80vh", direction: "rtl", color: "#f8fafc" }}>
      
      {/* Header */}
      <section style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ fontSize: "40px", color: "#38bdf8", marginBottom: "15px" }}>تواصل معنا</h1>
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
          هل لديك استفسار برمجي؟ أو ترغب في التعاون معنا؟ فريقنا جاهز للرد عليك في أي وقت.
        </p>
      </section>

      {/* Main Contact Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", marginBottom: "60px" }}>
        
        {/* Contact Information */}
        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155", display: "flex", alignItems: "flex-start", gap: "15px" }}>
            <div style={{ fontSize: "24px" }}>📍</div>
            <div>
              <h4 style={{ color: "#7dd3fc", margin: "0 0 5px 0", fontSize: "18px" }}>موقعنا</h4>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: "1.5" }}>القاهرة، جمهورية مصر العربية<br />شارع التكنولوجيا - الطابق الثالث</p>
            </div>
          </div>

          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155", display: "flex", alignItems: "flex-start", gap: "15px" }}>
            <div style={{ fontSize: "24px" }}>📞</div>
            <div>
              <h4 style={{ color: "#7dd3fc", margin: "0 0 5px 0", fontSize: "18px" }}>اتصل بنا</h4>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: "1.5" }}>دعم الطلاب: 0123456789<br />قسم الشركات: 0123456780</p>
            </div>
          </div>

          <div style={{ background: "#1e293b", padding: "20px", borderRadius: "12px", border: "1px solid #334155", display: "flex", alignItems: "flex-start", gap: "15px" }}>
            <div style={{ fontSize: "24px" }}>✉️</div>
            <div>
              <h4 style={{ color: "#7dd3fc", margin: "0 0 5px 0", fontSize: "18px" }}>البريد الإلكتروني</h4>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: "1.5" }}>support@prog-journey.com<br />info@prog-journey.com</p>
            </div>
          </div>

          <div style={{ marginTop: "10px", padding: "10px", textAlign: "center" }}>
            <h4 style={{ color: "#94a3b8", marginBottom: "15px" }}>تابعنا على الشبكات الاجتماعية</h4>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              {["Facebook", "Twitter", "LinkedIn", "Instagram"].map((social, i) => (
                <Link key={i} to="#" style={{ background: "#38bdf8", color: "#020617", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", textDecoration: "none", fontWeight: "bold" }}>
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Messaging Form */}
        <div style={{ flex: "2 1 500px", background: "#1e293b", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
          <h2 style={{ color: "#f8fafc", marginBottom: "25px", borderBottom: "2px solid #334155", paddingBottom: "10px" }}>أرسل لنا رسالة</h2>
          <form style={{ display: "flex", flexDirection: "column", gap: "15px" }} onSubmit={handleContactForm}>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", flexDirection: 'row' }}>
              <input type="text" placeholder="الاسم الكامل" required style={{ flex: "1 1 200px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "white", outline: "none" }} />
              <input type="email" placeholder="البريد الإلكتروني" required style={{ flex: "1 1 200px", padding: "12px 15px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "white", outline: "none" }} />
            </div>
            <input type="text" placeholder="موضوع الرسالة" style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "white", outline: "none", boxSizing: "border-box" }} />
            <textarea placeholder="كيف يمكننا مساعدتك؟" required style={{ width: "100%", padding: "12px 15px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "white", outline: "none", height: "150px", resize: "vertical", boxSizing: "border-box" }}></textarea>
            <button type="submit" style={{ background: "#0284c7", color: "white", padding: "15px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "0.3s", marginTop: "10px" }}>
              إرسال الرسالة الآن 🚀
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <section style={{ maxWidth: "800px", margin: "0 auto", background: "#0f172a", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
        <h2 style={{ textAlign: "center", color: "#38bdf8", marginBottom: "30px" }}>الأسئلة الشائعة 🤔</h2>
        
        {[
          { q: "هل الكورسات مجانية تماماً؟", a: "نعم، نوفر مسارات تعليمية مجانية مدعومة بنظام نقاط XP لتشجيع الطلاب." },
          { q: "كيف يمكنني الحصول على الشهادة؟", a: "بمجرد إكمال جميع دروس الكورس بنسبة 100%، سيظهر لك زر تحميل الشهادة في بروفايلك وفي صفحة الشهادات." },
          { q: "هل الشهادة معتمدة؟", a: "الشهادة تعتبر إثباتاً على إتمامك للمتطلبات البرمجية للكورس وهي مدعومة بمشاريع حقيقية قمت بتنفيذها على منصتنا." },
          { q: "كيف أستعيد كلمة المرور الخاصة بي؟", a: "يمكنك التواصل مع الدعم الفني عبر هذا النموذج أعلاه وسنقوم بمساعدتك في استعادة حسابك بسرعة." }
        ].map((faq, idx) => (
          <div key={idx} style={{ marginBottom: "15px", border: "1px solid #334155", borderRadius: "8px", overflow: "hidden" }}>
            <div 
              onClick={() => toggleFAQ(idx)}
              style={{ padding: "15px", background: openFAQ === idx ? "#1e293b" : "#1e293b", color: "#f8fafc", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold" }}
            >
              {faq.q}
              <span style={{ color: "#38bdf8", transform: openFAQ === idx ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s", display: "inline-block" }}>▼</span>
            </div>
            {openFAQ === idx && (
              <div style={{ padding: "15px", background: "#0f172a", color: "#cbd5e1", lineHeight: "1.6", borderTop: "1px solid #334155" }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </section>

    </div>
  );
}
