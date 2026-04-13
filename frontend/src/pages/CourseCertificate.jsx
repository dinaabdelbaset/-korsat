import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function CourseCertificate() {
  const [userName, setUserName] = useState('');
  const [courseName, setCourseName] = useState('أساسيات البرمجة الكاملة');
  const [date, setDate] = useState('');
  const [certCode, setCertCode] = useState('PJ-CERT-0001');

  const location = useLocation();

  useEffect(() => {
    // Get info from localStorage or backend
    const name = localStorage.getItem('user_name') || 'طالب متميز';
    setUserName(name);
    
    // Set current date
    const today = new Date();
    setDate(today.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }));

    if (location.state) {
      if (location.state.courseName) setCourseName(location.state.courseName);
      if (location.state.certCode) setCertCode(location.state.certCode);
    }
  }, [location]);

  return (
    <div className="page-container" style={{padding: "20px"}}>
      <div className="certificate-container">
        <div className="certificate" style={{position: 'relative'}}>
            {/*  لوجو  */}
            <img src="/IMG-20251201-WA0041.jpg" alt="Logo" className="logo" style={{width: '90px', borderRadius: '50%', marginBottom: '15px'}} />

            {/* ختم الاعتماد */}
            <img src="/stamp.png" alt="Seal" style={{position: 'absolute', bottom: '20px', left: '20px', width: '130px', opacity: 0.9}} />

            {/*  عنوان  */}
            <h1 style={{color: '#111', fontSize: '40px', marginBottom: '20px'}}>شهادة إتمام الكورس</h1>

            {/*  النص  */}
            <p className="cert-text" style={{color: '#222'}}>
                تشهد منصة <span className="platform" style={{color: '#0284c7', fontWeight: 'bold'}}>رحلة مبرمج</span> بأن
                العبقري: <span id="studentName" style={{fontWeight: 'bold', fontSize: '26px'}}>{userName}</span>
                <br/>
                قد أتم بنجاح كورس
            </p>

            {/*  اسم الكورس  */}
            <h2 id="courseName" style={{color: '#10b981', margin: '20px 0'}}>{courseName}</h2>

            <p className="cert-text" style={{color: '#222'}}>
                وذلك تقديرًا لالتزامه ومثابرته في التعلم خلال مسيرته البرمجية.
            </p>

            {/*  كود التحقق والفوتر  */}
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#555', textAlign: 'center' }}>
                <p>للتحقق من صحة الشهادة، أدخل الرمز التالي في صفحة التحقق:</p>
                <b style={{ color: '#0284c7', fontSize: '18px', letterSpacing: '2px' }}>{certCode}</b>
            </div>

            <div className="footer" style={{display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #ccc', marginTop: '30px', paddingTop: '20px', position: 'relative', zIndex: 2}}>
                <p>التاريخ: <span id="date">{date}</span></p>
                <p style={{fontWeight: 'bold', marginRight: '50px'}}>مدير المنصة: م. إبراهيم</p>
            </div>
            
            <div style={{marginTop: '30px', position: 'relative', zIndex: 3}} className="no-print">
              <button className="btn" onClick={() => window.print()} style={{background: '#0284c7', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>
                 طباعة الشهادة 🖨️
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
