import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ChatbotStudent() {
  return (
    <div className="page-container" style={{padding: "20px"}}>
      



<div className="chat-container">

<h2>ChatBot 🤖</h2>

<div id="chatBox" className="chat-box">

<div className="message bot">
مرحبا 👋 كيف يمكنني مساعدتك؟
</div>

</div>

<div className="input-area">

<input id="userInput" type="text" placeholder="اكتب رسالتك..." />

<button onclick="sendMessage()">إرسال</button>

</div>

</div>




    </div>
  );
}
