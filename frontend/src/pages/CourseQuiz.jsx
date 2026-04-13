import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CourseQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [rewardMsg, setRewardMsg] = useState('');

  const questions = [
    {
      questionText: 'ما هي وظيفة لغة HTML الأساسية؟',
      answerOptions: [
        { answerText: 'تصميم ألوان الموقع', isCorrect: false },
        { answerText: 'بناء الهيكل الأساسي للموقع', isCorrect: true },
        { answerText: 'برمجة السيرفر', isCorrect: false },
        { answerText: 'إدارة قواعد البيانات', isCorrect: false },
      ],
    },
    {
      questionText: 'أي وسم نستخدمه لإضافة رابط؟',
      answerOptions: [
        { answerText: '<link>', isCorrect: false },
        { answerText: '<a>', isCorrect: true },
        { answerText: '<href>', isCorrect: false },
        { answerText: '<url>', isCorrect: false },
      ],
    },
    {
      questionText: 'أين نضع وسم <title> عادةً؟',
      answerOptions: [
        { answerText: 'داخل <body>', isCorrect: false },
        { answerText: 'في نهاية الملف', isCorrect: false },
        { answerText: 'داخل <header>', isCorrect: false },
        { answerText: 'داخل <head>', isCorrect: true },
      ],
    },
  ];

  const handleAnswerOptionClick = async (isCorrect) => {
    let newScore = score;
    if (isCorrect) {
      newScore = score + 1;
      setScore(newScore);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
      // Give XP based on score
      const earnedXp = newScore * 50;
      
      const userId = localStorage.getItem('user_id');
      if(userId && earnedXp > 0) {
          try {
              await fetch(`http://localhost:8000/api/student/${userId}/add_xp?xp_amount=${earnedXp}`, {
                  method: 'POST'
              });
              
              // Update local state smoothly
              const currentXp = parseInt(localStorage.getItem('user_xp') || '0');
              localStorage.setItem('user_xp', currentXp + earnedXp);
              setRewardMsg(`لقد ربحت ${earnedXp} XP! ⭐`);
          } catch(err) {
              setRewardMsg(`لقد ربحت ${earnedXp} XP! (تجريبي) ⭐`);
          }
      } else {
          setRewardMsg(`لقد ربحت ${earnedXp} XP! (سجل دخولك لحفظها) ⭐`);
      }
    }
  };

  return (
    <div className="page-container" style={{padding: "40px 20px"}}>
      <h2 style={{ textAlign: 'center', color: '#10b981', fontSize: '38px', marginBottom: '30px' }}>
         🧠 اختبار معلوماتك
      </h2>

      <div style={{ background: '#1e293b', maxWidth: '600px', margin: '0 auto', padding: '30px', borderRadius: '20px', border: '1px solid #334155', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        {showResult ? (
          <div style={{ textAlign: 'center' }}>
            <i className={score === questions.length ? "fas fa-trophy" : "fas fa-star-half-alt"} style={{ fontSize: '70px', color: '#fbbf24', marginBottom: '20px' }}></i>
            <h2 style={{ color: 'white', marginBottom: '15px' }}>
              النتيجة: {score} من {questions.length}
            </h2>
            <p style={{ color: '#10b981', fontSize: '22px', fontWeight: 'bold', marginBottom: '25px' }}>{rewardMsg}</p>
            
            <button onClick={() => navigate('/lessons')} className="btn btn-main" style={{ fontSize: '18px', padding: '10px 30px' }}>
                مواصلة التعلم
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '10px' }}>
                <span>السؤال {currentQuestion + 1}</span>
                <span>/ {questions.length}</span>
              </div>
              <div className="progress-bar-bg" style={{ background: '#0f172a', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                  <div className="progress-bar-fill" style={{ background: '#10b981', height: '100%', width: `${((currentQuestion) / questions.length) * 100}%`, transition: 'all 0.3s' }}></div>
              </div>
            </div>
            
            <h3 style={{ color: 'white', fontSize: '24px', marginBottom: '30px', lineHeight: '1.5' }}>
               {questions[currentQuestion].questionText}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button 
                  key={index} 
                  onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} 
                  style={{ background: '#334155', color: 'white', border: 'none', padding: '15px', borderRadius: '12px', fontSize: '18px', cursor: 'pointer', transition: '0.2s', textAlign: 'right' }}
                  onMouseOver={(e) => e.target.style.background = '#475569'}
                  onMouseOut={(e) => e.target.style.background = '#334155'}
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/studentdashboard" style={{ color: '#7dd3fc', textDecoration: 'none', fontSize: '16px' }}>العودة إلى لوحة التحكم</Link>
      </div>
    </div>
  );
}
