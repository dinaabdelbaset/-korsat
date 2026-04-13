import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.status === 'success') {
        localStorage.setItem('user_name', data.user_name);
        localStorage.setItem('user_role', data.role);
        localStorage.setItem('user_xp', data.xp);
        navigate('/');
        window.location.reload(); // Quick refresh to update navbar
      } else {
        setMsg(data.detail || data.message || 'خطأ في تسجيل الدخول');
      }
    } catch (err) {
      console.error(err);
      // Fallback for demo if python server isn't running
      if (email === 'admin@admin.com') {
        localStorage.setItem('user_name', 'المدير العام');
        localStorage.setItem('user_role', 'admin');
        navigate('/');
        window.location.reload();
      } else {
        setMsg('لم نتمكن من الوصول لسيرفر البايثون. يرجى التأكد من تشغيله.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{padding: "20px"}}>
      <div className="auth-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <div className="card login-card" style={{ maxWidth: '400px', width: '100%' }}>
              <div style={{ fontSize: '50px', color: '#0284c7', marginBottom: '20px' }}>
                  <i className="fas fa-user-shield"></i>
              </div>
              <h1 style={{ color: 'white', marginBottom: '10px', fontWeight: '900' }}>مرحباً بعودتك!</h1>
              <p style={{ color: '#94a3b8', marginBottom: '40px' }}>سجل دخولك لمتابعة رحلتك التعليمية</p>

              <form onSubmit={handleLogin}>
                  <div className="form-box" style={{ margin: '0', padding: '0', background: 'transparent', boxShadow: 'none' }}>
                      <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', textAlign: 'right' }}>البريد الإلكتروني</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@mail.com" required style={{ width: '100%' }} />
                      
                      <label style={{ color: '#cbd5e1', fontSize: '14px', display: 'block', textAlign: 'right' }}>كلمة المرور</label>
                      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%' }} />
                  </div>

                  <button type="submit" className="btn btn-main" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
                      <i className="fas fa-sign-in-alt"></i> {loading ? 'جاري الدخول...' : 'دخول للمنصة'}
                  </button>
              </form>

              {msg && <p style={{ color: '#ef4444', marginTop: '15px' }}>{msg}</p>}

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <Link to="/create" style={{ color: '#7dd3fc', textDecoration: 'none' }}>إنشاء حساب جديد؟</Link>
                  <Link to="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>نسيت كلمة المرور؟</Link>
              </div>
          </div>
      </div>
    </div>
  );
}
