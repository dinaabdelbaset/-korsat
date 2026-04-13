import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Lessons() {
  const navigate = useNavigate();
  
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);

  // الدروس المجهزة (تم دمج فيديو الـ CSS اللي بعته)
  const courseLessons = [
    { 
        id: 1, 
        title: 'مقدمة وهيكلة HTML', 
        url: 'https://www.youtube.com/embed/Dv39fDYei9A', 
        content: 'في هذا الدرس سنتعلم الهيكل الأساسي لصفحة الويب باستخدام HTML وبناء العناصر.', 
        xp: 15 
    },
    { 
        id: 2, 
        title: 'تلوين وتنسيق الموقع (CSS)', 
        // هذا رابط الفيديو الذي أرسلته أنت
        url: 'https://www.youtube.com/embed/h1mNPEjva8U', 
        content: 'سنتعلم كيفية إضافة الألوان والتنسيقات الجذابة للموقع باستخدام CSS، تماماً كما رأينا في الفيديو التدريبي.', 
        xp: 20 
    },
    { 
        id: 3, 
        title: 'بناء واجهة تفاعلية (JS)', 
        url: 'https://www.youtube.com/embed/rF4xDDRd9Ks', 
        content: 'كيف تضيف الحياة للموقع واستقبال تفاعل المستخدمين عن طريق أوامر الجافا سكريبت.', 
        xp: 30 
    },
    { 
        id: 4, 
        title: 'برمجة السيرفرات (Backend)', 
        url: 'https://www.youtube.com/embed/ItvE1zqIINQ', 
        content: 'مقدمة في برمجة السيرفرات وفهم كيفية عمل قواعد البيانات والباك إند خطوة بخطوة.', 
        xp: 35 
    },
    { 
        id: 5, 
        title: 'أساسيات بايثون (Python)', 
        url: 'https://www.youtube.com/embed/9OgOay9bRU8', 
        content: 'تعلم لغة بايثون من الصفر واكتشف لماذا تعتبر من أقوى وأسهل لغات البرمجة في العالم.', 
        xp: 40 
    },
    { 
        id: 6, 
        title: 'تطوير واجهات المستخدم (React)', 
        url: 'https://www.youtube.com/embed/6rYX_yZu0jA', 
        content: 'مقدمة في مكتبة رياكت القوية وبناء واجهات تفاعلية حديثة وسريعة.', 
        xp: 45 
    }
  ];

  const markComplete = () => {
    if (activeLesson && !completedLessons.includes(activeLesson.id)) {
      setCompletedLessons([...completedLessons, activeLesson.id]);
      alert(`🎉 عظيم! لقد أتممت الدرس وكسبت ${activeLesson.xp} نقطة XP!`);
    } else {
      alert("لقد أكملت هذا الدرس مسبقاً! استمر في الإبداع.");
    }
  };

  const progressPercentage = Math.round((completedLessons.length / courseLessons.length) * 100) || 0;

  return (
    <div className="page-container" style={{ padding: "0", minHeight: "100vh", background: "#020617", display: "flex", flexDirection: "column" }}>
      
      {/* النافبار العلوي الخاص بصفحة الشرح */}
      <div style={{ background: "#0f172a", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 10 }}>
          <h2 style={{ color: "#f8fafc", margin: 0, fontSize: "20px" }}>محتوى كورس الويب</h2>
          <Link to="/student-dashboard" className="btn" style={{ background: "#334155", color: "white", padding: "8px 20px", borderRadius: "8px", textDecoration: "none" }}>
              العودة للوحة تحكم الطالب
          </Link>
      </div>

      <div style={{ display: "flex", flex: 1, direction: "rtl", overflow: "hidden" }}>
        
        {/* القائمة الجانبية (Sidebar) */}
        <aside style={{ width: "350px", background: "#0f172a", borderLeft: "1px solid #1e293b", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #1e293b" }}>
                <h3 style={{ color: "white", margin: "0 0 10px 0" }}>📚 الدروس ({courseLessons.length})</h3>
                
                {/* شريط التقدم */}
                <div style={{ background: "#1e293b", borderRadius: "10px", height: "8px", width: "100%", overflow: "hidden", marginTop: "15px" }}>
                   <div style={{ background: "#10b981", height: "100%", width: `${progressPercentage}%`, transition: "0.4s" }}></div>
                </div>
                <p style={{ color: "#10b981", fontSize: "14px", marginTop: "8px", textAlign: "left", fontWeight: "bold" }}>{progressPercentage}% نسبة الإنجاز</p>
            </div>
            
            <div style={{ padding: "10px" }}>
                {courseLessons.map((lesson, idx) => {
                    const isActive = activeLesson && activeLesson.id === lesson.id;
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                       <div 
                         key={lesson.id} 
                         onClick={() => setActiveLesson(lesson)}
                         style={{ 
                             padding: "15px", 
                             marginBottom: "10px", 
                             borderRadius: "8px", 
                             background: isActive ? "#1e293b" : "transparent",
                             border: isActive ? "1px solid #38bdf8" : "1px solid transparent",
                             cursor: "pointer",
                             transition: "0.3s",
                             display: "flex",
                             alignItems: "center",
                             gap: "10px"
                         }}
                       >
                           <div style={{ 
                               width: "30px", 
                               height: "30px", 
                               borderRadius: "50%", 
                               background: isCompleted ? "#10b981" : "#334155", 
                               color: "white", 
                               display: "flex", 
                               alignItems: "center", 
                               justifyContent: "center",
                               fontSize: "14px",
                               flexShrink: 0
                           }}>
                               {isCompleted ? "✓" : (idx + 1)}
                           </div>
                           <span style={{ color: isActive ? "#38bdf8" : "#cbd5e1", fontWeight: isActive ? "bold" : "normal", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                               {lesson.title}
                           </span>
                       </div>
                    );
                })}
            </div>
        </aside>

        {/* المحتوى الرئيسي والفيديو (Main Area) */}
        <main style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
            {activeLesson ? (
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <h1 style={{ color: "white", marginBottom: "25px", fontSize: "32px", fontWeight: "bold" }}>{activeLesson.title}</h1>
                    
                    {/* مشغل الفيديو يوتيوب مدمج */}
                    <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", background: "black", borderRadius: "15px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", marginBottom: "20px" }}>
                        <iframe 
                            src={activeLesson.url} 
                            title="YouTube video player" 
                            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e293b", padding: "15px 25px", borderRadius: "10px", marginBottom: "30px" }}>
                        <div style={{ color: "#fbbf24", fontWeight: "bold", fontSize: "18px" }}>🚀 مكافأة الدرس: {activeLesson.xp} XP</div>
                        <button onClick={markComplete} style={{ background: completedLessons.includes(activeLesson.id) ? "#475569" : "#10b981", color: "white", padding: "10px 25px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "0.3s" }}>
                           {completedLessons.includes(activeLesson.id) ? "تم إنجاز الدرس ✓" : "اعتماد الدرس وحفظ التقدم ✨"}
                        </button>
                    </div>

                    <div style={{ background: "#0f172a", padding: "30px", borderRadius: "15px", border: "1px solid #1e293b" }}>
                        <h2 style={{ color: "#7dd3fc", marginBottom: "15px", fontSize: "22px" }}>📝 وصف الدرس</h2>
                        <p style={{ color: "#cbd5e1", fontSize: "18px", lineHeight: "1.8", margin: 0 }}>
                            {activeLesson.content}
                        </p>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center", marginTop: "15%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontSize: "80px", marginBottom: "20px" }}>📺</div>
                    <h2 style={{ color: "white", fontSize: "28px", marginBottom: "10px" }}>استعد للتعلم!</h2>
                    <p style={{ color: "#94a3b8", fontSize: "18px" }}>يرجى اختيار درس من القائمة الجانبية لتشغيل الفيديو.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
