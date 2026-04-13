import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function StudentProfile() {
  return (
    <div className="page-container" style={{padding: "20px"}}>
      

{/*  Navbar  */}


<div className="container">

<h2 className="student-title">👤 الملف الشخصي</h2>

<div className="profile-card">

{/*  صورة + زر تعديل  */}
<div className="profile-img-box">
<img src="https://i.pravatar.cc/150?img=5" className="profile-img" id="profileImage" />
<span className="edit-icon" onclick="changeImage()">📷</span>
</div>

<h3 id="name">اسم المستخدم</h3>
<p id="email">email@example.com</p>

<div className="info-box">
<p><strong>عدد الكورسات:</strong> <span id="courses">0</span></p>
<p><strong>المستوى:</strong> <span id="level">Level 1</span></p>
</div>

<button className="btn" onclick="editName()">✏️ تعديل الاسم</button>

<input type="file" id="imageUpload" accept="image/*" hidden />

</div>

</div>




    </div>
  );
}
