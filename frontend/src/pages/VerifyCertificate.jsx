import React, { useState } from 'react';

export default function VerifyCertificate() {
  const [certCode, setCertCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certCode.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    fetch(`http://localhost:8000/api/certificate/verify/${certCode}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setResult(data.certificate);
        } else {
          setError(data.detail || 'تعذر التحقق من الشهادة. يرجى التأكد من الرمز.');
        }
        setIsLoading(false);
      })
      .catch(err => {
        setError('حدث خطأ في الاتصال بالسيرفر.');
        setIsLoading(false);
      });
  };

  return (
    <div className="page-container" style={{ padding: "60px 20px", minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <div style={{ fontSize: "60px", marginBottom: "15px" }}>🛡️</div>
        <h1 style={{ color: "#38bdf8", fontSize: "40px", marginBottom: "10px" }}>نظام التحقق من الشهادات</h1>
        <p style={{ color: "#94a3b8", fontSize: "18px", maxWidth: "600px" }}>
          أدخل رمز الشهادة (Certificate ID) للتحقق من مصداقيتها في قاعدة بيانات "رحلة مبرمج".
        </p>
      </div>

      <div style={{ background: "#1e293b", padding: "40px", borderRadius: "15px", width: "100%", maxWidth: "500px", border: "1px solid #334155", boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
        
        <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ color: "#cbd5e1", marginBottom: "10px", display: "block", fontWeight: "bold" }}>رمز الشهادة (مثال: PJ-CERT-0001)</label>
            <input 
              type="text" 
              value={certCode}
              onChange={(e) => setCertCode(e.target.value)}
              placeholder="PJ-CERT-XXXX" 
              style={{ width: "100%", padding: "15px", borderRadius: "8px", border: "1px solid #475569", background: "#0f172a", color: "white", outline: "none", fontSize: "18px", boxSizing: "border-box", textAlign: "center", letterSpacing: "2px" }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ background: isLoading ? "#475569" : "#10b981", color: "white", padding: "15px", borderRadius: "8px", border: "none", fontSize: "18px", fontWeight: "bold", cursor: isLoading ? "not-allowed" : "pointer", transition: "0.3s" }}
          >
            {isLoading ? "جاري التحقق..." : "التحقق الآن 🔍"}
          </button>
        </form>

        {error && (
          <div style={{ marginTop: "25px", padding: "15px", background: "#7f1d1d", border: "1px solid #ef4444", borderRadius: "8px", color: "white", textAlign: "center" }}>
            ❌ {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: "30px", padding: "20px", background: "#064e3b", border: "1px solid #10b981", borderRadius: "8px", color: "white", animation: "fadeIn 0.5s" }}>
            <h3 style={{ margin: "0 0 15px 0", color: "#6ee7b7", textAlign: "center", fontSize: "24px" }}>✅ شهادة أصلية ومعتمدة</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #047857", paddingBottom: "8px" }}>
                 <span style={{ color: "#a7f3d0" }}>رقم الشهادة:</span>
                 <strong style={{ letterSpacing: "1px" }}>{result.code}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #047857", paddingBottom: "8px" }}>
                 <span style={{ color: "#a7f3d0" }}>اسم الطالب:</span>
                 <strong>{result.student_name}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #047857", paddingBottom: "8px" }}>
                 <span style={{ color: "#a7f3d0" }}>الكورس المنجز:</span>
                 <strong>{result.course_name}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                 <span style={{ color: "#a7f3d0" }}>تاريخ الإصدار:</span>
                 <strong>{result.issued_at}</strong>
              </div>
            </div>
            
            <div style={{ textAlign: "center", marginTop: "20px" }}>
               <span style={{ background: "#10b981", color: "#064e3b", padding: "5px 15px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold" }}>
                 Verified by Programmer's Journey
               </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
