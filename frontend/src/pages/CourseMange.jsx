import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CourseMange() {
  return (
    <div className="page-container" style={{padding: "20px"}}>
      

{/*  Navbar  */}


<div className="container">

  <h2 className="teacher-title">📚 إدارة الكورسات</h2>

  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
    <button className="btn" onclick="addCourse()">➕ إضافة كورس جديد</button>
  </div>

  <div id="coursesList" className="courses-list"></div>

</div>

<div id="modal" className="modal" style={{ display: 'none' }}>
  <div className="modal-content">
    <span className="close" onclick="closeModal()">&times;</span>
    <h3 id="modalTitle">إضافة كورس جديد</h3>
    <label>اسم الكورس:</label>
    <input type="text" id="courseNameInput" placeholder="مثال: HTML Basics" />
    <label>عدد الجلسات:</label>
    <input type="number" id="courseSessionsInput" min="1" value="1" />
    <button className="btn" onclick="saveCourse()">حفظ</button>
  </div>
</div>




    </div>
  );
}
