import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TRIVIA_QUESTIONS = [
  {
    question: "أي من اللغات التالية تُستخدم بشكل أساسي لإضافة التفاعلية لصفحات الويب؟",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    correct: "JavaScript",
    xp: 20
  },
  {
    question: "ما هو الوسم الصحيح في HTML لإنشاء رابط تشعبي؟",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correct: "<a>",
    xp: 15
  },
  {
    question: "كيف يمكن كتابة 'Hello World' في لغة Python؟",
    options: ["echo 'Hello World'", "print('Hello World')", "console.log('Hello World')", "printf('Hello World')"],
    correct: "print('Hello World')",
    xp: 10
  },
  {
    question: "أي من الخصائص التالية في CSS تُستخدم لتغيير لون الخلفية؟",
    options: ["color", "bgcolor", "background-color", "background-image"],
    correct: "background-color",
    xp: 15
  },
  {
    question: "في JavaScript، كيف يمكن تعريف متغير لا يمكن تغيير قيمته؟",
    options: ["let", "var", "const", "static"],
    correct: "const",
    xp: 25
  }
];

export default function Gamification() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id') || 1; // Default to demo user

  const handleAnswer = (option) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedAnswer(option);

    const question = TRIVIA_QUESTIONS[currentQuestionIndex];
    let isCorrect = option === question.correct;

    if (isCorrect) {
      setScore(score + 1);
      setTotalXP(totalXP + question.xp);
      
      // Call Backend to add XP
      fetch(`http://localhost:8000/api/student/${userId}/add_xp?xp_amount=${question.xp}`, {
        method: 'POST',
      }).catch(err => console.error("Error adding XP:", err));
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < TRIVIA_QUESTIONS.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswering(false);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <div className="page-container" style={{ padding: '40px 20px', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#fbbf24', fontSize: '45px' }}>🎮 تحديات التلعيب</h1>
        <p style={{ color: '#94a3b8', fontSize: '20px' }}>جاوب على الأسئلة البرمجية واجمع نقاط XP لتتصدر قائمة الأبطال!</p>
      </div>

      <div style={{ background: '#1e293b', padding: '30px', borderRadius: '15px', width: '100%', maxWidth: '600px', border: '1px solid #334155', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        
        {showResult ? (
          <div className="animate__animated animate__fadeInUp">
            <h2 style={{ color: '#10b981', fontSize: '35px', marginBottom: '20px' }}>🏆 اكتمل التحدي!</h2>
            <p style={{ fontSize: '24px', marginBottom: '10px' }}>لقد أجبت بشكل صحيح على {score} من أصل {TRIVIA_QUESTIONS.length} أسئلة.</p>
            <p style={{ fontSize: '28px', color: '#fbbf24', fontWeight: 'bold', marginBottom: '30px' }}>مجموع ما ربحته: +{totalXP} XP ⚡</p>
            
            <button 
              onClick={() => navigate('/leaderboard')}
              style={{ background: '#0284c7', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '10px', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              شاهد لوحة الصدارة الآن <i className="fas fa-trophy" style={{marginRight: '8px'}}></i>
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#94a3b8' }}>
              <span>السؤال {currentQuestionIndex + 1} من {TRIVIA_QUESTIONS.length}</span>
              <span style={{ color: '#fbbf24', fontWeight: 'bold' }}>XP المحصلة: {totalXP}</span>
            </div>
            
            <h3 style={{ fontSize: '22px', marginBottom: '30px', lineHeight: '1.6' }}>
              {TRIVIA_QUESTIONS[currentQuestionIndex].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {TRIVIA_QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                let bgColor = '#334155';
                if (selectedAnswer !== null) {
                  const correctAns = TRIVIA_QUESTIONS[currentQuestionIndex].correct;
                  if (option === correctAns) bgColor = '#10b981'; // Green for correct
                  else if (option === selectedAnswer && option !== correctAns) bgColor = '#ef4444'; // Red for wrong
                }

                return (
                  <button 
                    key={index}
                    disabled={isAnswering}
                    onClick={() => handleAnswer(option)}
                    style={{ 
                      background: bgColor, 
                      color: 'white', 
                      padding: '15px', 
                      border: 'none', 
                      borderRadius: '10px', 
                      fontSize: '18px', 
                      cursor: isAnswering ? 'default' : 'pointer',
                      transition: '0.3s'
                    }}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
