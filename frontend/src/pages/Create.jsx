import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        navigate('/login');
      } else {
        setMsg(data.detail || data.message || 'خطأ في الإنشاء');
      }
    } catch (err) {
      console.error(err);
      setMsg('تعذر الوصول إلى سيرفر البايثون.');
      // Fallback for demo
      setTimeout(() => navigate('/login'), 1500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{padding: "20px", display: "flex", justifyContent: "center"}}>
      <div className="auth-wrapper" style={{ marginTop: '50px', width: '100%', maxWidth: '450px' }}>
        <div className="card login-card" style={{ width: '100%' }}>
            <div style={{ fontSize: '50px', color: '#10b981', marginBottom: '20px' }}>
                <i className="fas fa-user-plus"></i>
            </div>
            <h1 style={{ color: 'white', marginBottom: '10px', fontWeight: '900' }}>عضوية جديدة</h1>
            <p style={{ color: '#94a3b8', marginBottom: '30px' }}>انضم لأكثر من 10 آلاف طالب في رحلة احتراف البرمجة</p>

            <form onSubmit={handleRegister}>
                <div className="form-box" style={{ margin: '0', padding: '0', background: 'transparent', boxShadow: 'none' }}>
                    <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', textAlign: 'right', marginBottom: '5px' }}>الاسم الكامل</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="إبراهيم أحمد" required style={{ width: '100%' }} />

                    <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', textAlign: 'right', marginBottom: '5px' }}>البريد الإلكتروني</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" required style={{ width: '100%' }} />
                    
                    <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', textAlign: 'right', marginBottom: '5px' }}>كلمة المرور</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%' }} />
                </div>

                <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }} disabled={loading}>
                    <i className="fas fa-rocket"></i> {loading ? 'جاري الإنشاء...' : 'ابدأ رحلتك مجاناً'}
                </button>
            </form>

            {msg && <p style={{ color: '#ef4444', marginTop: '15px' }}>{msg}</p>}

            <div style={{ marginTop: '20px' }}>
                <Link to="/login" style={{ color: '#7dd3fc', textDecoration: 'none' }}>لديك حساب بالفعل؟ سجل دخولك</Link>
            </div>
        </div>
      </div>
    </div>
  );
}
