import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CourseSubscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('visa');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
        navigate('/studentdashboard');
    }, 2000);
  };

  return (
    <div className="page-container" style={{padding: "20px"}}>
      <h2 className="student-title" style={{ textAlign: 'center', color: '#10b981', marginBottom: '30px' }}>
         📝 نموذج الاشتراك في الكورس
      </h2>

      <div className="course-details-container card" style={{ maxWidth: '600px', margin: 'auto', textAlign: 'right', padding: '30px' }}>
        
        {success ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '60px', color: '#10b981', marginBottom: '15px' }}></i>
                <h3 style={{ color: 'white' }}>تم الاشتراك بنجاح!</h3>
                <p style={{ color: '#94a3b8' }}>جاري تحويلك لمساراتك...</p>
            </div>
        ) : (
            <form onSubmit={handleSubscribe} style={{ textAlign: 'right' }}>
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '5px' }}>اسم الطالب/الطالبة:</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="اكتب اسمك هنا" required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
            
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '5px' }}>البريد الإلكتروني:</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="example@email.com" required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
            
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '5px' }}>رقم الهاتف:</label>
            <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="010XXXXXXXX" required style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }} />
            
            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '5px' }}>وسيلة الدفع:</label>
            <select value={payment} onChange={e=>setPayment(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white' }}>
                <option value="visa">فيزا (تجريبي)</option>
                <option value="mastercard">ماستر كارد (تجريبي)</option>
                <option value="fawry">فوري (تجريبي)</option>
            </select>
            
            <button type="submit" className="btn btn-main" style={{ width: '100%', padding: '12px' }}>اشترك الآن 💳</button>
            </form>
        )}

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
            <Link to="/courses" style={{ color: '#7dd3fc', textDecoration: 'none' }}>
                <i className="fas fa-arrow-right"></i> العودة للكورسات
            </Link>
        </div>

      </div>
    </div>
  );
}
