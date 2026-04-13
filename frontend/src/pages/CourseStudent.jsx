import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseStudent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const courses = [
    { id: 1, title: 'HTML Basics', desc: 'تعلم HTML من الصفر', thumb: 'https://img.youtube.com/vi/UB1O30fR-EE/0.jpg', cat: 'frontend' },
    { id: 2, title: 'CSS Design', desc: 'تصميم مواقع احترافية', thumb: 'https://img.youtube.com/vi/yfoY53QXEnI/0.jpg', cat: 'frontend' },
    { id: 3, title: 'JavaScript', desc: 'تعلم جافاسكريبت', thumb: 'https://img.youtube.com/vi/W6NZfCO5SIk/0.jpg', cat: 'frontend' },
    { id: 4, title: 'React', desc: 'بناء تطبيقات حديثة', thumb: 'https://img.youtube.com/vi/Ke90Tje7VS0/0.jpg', cat: 'frontend' },
    { id: 5, title: 'Node.js', desc: 'تعلم Backend', thumb: 'https://img.youtube.com/vi/Oe421EPjeBE/0.jpg', cat: 'backend' },
    { id: 6, title: 'Python', desc: 'برمجة بايثون من الصفر', thumb: 'https://img.youtube.com/vi/rfscVS0vtbw/0.jpg', cat: 'backend' }
  ];

  const filteredCourses = courses.filter(c => {
      const matchCat = category === 'all' || c.cat === category;
      const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.desc.includes(searchTerm);
      return matchCat && matchSearch;
  });

  return (
    <div className="page-container" style={{padding: "40px 20px", maxWidth: "1200px", margin: "0 auto"}}>
      <h2 style={{ textAlign: 'center', color: '#7dd3fc', fontSize: '40px', marginBottom: '30px' }}>📚 استكشاف الدروس</h2>

      {/* Search & Categories */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <input 
             type="text" 
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             placeholder="ابحث عن كورس..." 
             style={{ width: '100%', maxWidth: '400px', padding: '12px 20px', borderRadius: '50px', border: '1px solid #334155', background: '#1e293b', color: 'white', outline: 'none', marginBottom: '20px' }} 
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
             <button onClick={() => setCategory('all')} className="btn" style={{ background: category === 'all' ? '#0284c7' : '#334155' }}>الكل</button>
             <button onClick={() => setCategory('frontend')} className="btn" style={{ background: category === 'frontend' ? '#0284c7' : '#334155' }}>Frontend</button>
             <button onClick={() => setCategory('backend')} className="btn" style={{ background: category === 'backend' ? '#0284c7' : '#334155' }}>Backend</button>
          </div>
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
         {filteredCourses.map(c => (
            <div key={c.id} style={{ background: '#1e293b', borderRadius: '15px', overflow: 'hidden', border: '1px solid #334155', transition: '0.3s' }}>
                <img src={c.thumb} alt={c.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                    <h3 style={{ margin: '0 0 10px 0', color: 'white', fontSize: '20px' }}>{c.title}</h3>
                    <p style={{ margin: '0 0 20px 0', color: '#94a3b8' }}>{c.desc}</p>
                    <Link to="/coursedetails" className="btn btn-main" style={{ display: 'block', textAlign: 'center', width: '100%' }}>▶ عرض التفاصيل</Link>
                </div>
            </div>
         ))}
         
         {filteredCourses.length === 0 && (
             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#94a3b8' }}>
                 لا يوجد مسارات تطابق بحثك.
             </div>
         )}
      </div>
    </div>
  );
}
