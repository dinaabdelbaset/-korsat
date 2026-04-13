import React, { useState, useRef } from 'react';

export default function CodeEditor() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// اكتب كودك هنا...\nconsole.log("مرحباً بك في رحلة مبرمج!");');
  const [output, setOutput] = useState('');
  const [htmlOutput, setHtmlOutput] = useState('');
  const textRef = useRef(null);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setOutput('');
    setHtmlOutput('');
    
    if (lang === 'javascript') {
      setCode('// اكتب كودك هنا...\nconsole.log("مرحباً بك في رحلة مبرمج!");');
    } else if (lang === 'html') {
      setCode('<!-- اكتب كودك هنا -->\n<h1 style="color: #0284c7; text-align: center;">مرحباً بك في عالم HTML!</h1>');
    } else if (lang === 'css') {
      setCode('/* اكتب كودك هنا */\nbody {\n  background-color: #f3f4f6;\n  font-family: Arial;\n}');
    } else if (lang === 'python') {
      setCode('# اكتب كودك هنا...\nprint("مرحباً بك في Python!")');
    }
  };

  const handleEditorChange = (e) => {
    setCode(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Handle tab key
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.selectionStart = textRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const runCode = () => {
    setHtmlOutput('');
    setOutput('');
    
    try {
      if (language === 'javascript') {
        let logs = [];
        const originalConsoleLog = console.log;
        console.log = (...args) => {
          logs.push(args.join(' '));
        };
        
        // eslint-disable-next-line no-new-func
        new Function(code)();
        
        console.log = originalConsoleLog;
        setOutput(logs.join('\n'));
        
      } else if (language === 'html' || language === 'css') {
        // Render in an iframe
        const content = language === 'html' ? code : `<style>${code}</style><h2 style="padding: 20px;">تم تطبيق الـ CSS ✔️</h2>`;
        setHtmlOutput(content);
        
      } else if (language === 'python') {
        // Simulate basic python execution for print functions
        const matches = code.match(/print\(['"](.*?)['"]\)/g);
        if (matches) {
           const logLines = matches.map(m => m.replace(/print\(['"](.*?)['"]\)/, '$1'));
           setOutput(logLines.join('\n'));
        } else {
           setOutput("لا يوجد دالة print للطباعة.\nملاحظة: اللغات المعقدة زي بايثون بتحتاج سيرفر خارجي (Backend) لتشغيل المنطق المعقد، لكننا فعلنا دالة الـ print كتدريب مبدئي لك.");
        }
      }
    } catch (err) {
      setOutput(err.toString());
    }
  };

  return (
    <div className="page-container" style={{ padding: '60px 20px 20px 20px', minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#7dd3fc', fontSize: '35px' }}>محرر الأكواد المدمج 💻</h1>
        <p style={{ color: '#94a3b8' }}>تدرب واكتب، شغل الكود وشوف النتيجة فوراً</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#1e293b', padding: '15px 20px', borderRadius: '10px' }}>
        <div>
          <label style={{ color: 'white', marginRight: '10px', fontWeight: 'bold' }}>اختر اللغة: </label>
          <select 
            value={language} 
            onChange={handleLanguageChange}
            style={{ padding: '10px', borderRadius: '5px', background: '#0f172a', color: 'white', border: '1px solid #334155', fontSize: '16px' }}
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="python">Python</option>
          </select>
        </div>
        
        <button 
            onClick={runCode} 
            style={{ background: '#10b981', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          <i className="fas fa-play" style={{ marginLeft: '5px' }}></i> تشغيل الكود
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', height: '500px', flexDirection: 'row' }}>
        {/* Editor Part */}
        <div style={{ flex: 2, border: '1px solid #334155', borderRadius: '10px', overflow: 'hidden', background: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#252526', padding: '10px', borderBottom: '1px solid #334155', color: '#94a3b8', fontSize: '14px' }}>
            main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language}
          </div>
          <textarea
            ref={textRef}
            value={code}
            onChange={handleEditorChange}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            style={{
              flex: 1,
              width: '100%',
              background: 'transparent',
              color: '#d4d4d4',
              border: 'none',
              padding: '15px',
              fontSize: '18px',
              fontFamily: 'monospace',
              outline: 'none',
              resize: 'none',
              direction: 'ltr',
              lineHeight: '1.5'
            }}
          />
        </div>

        {/* Output Part */}
        <div style={{ flex: 1, background: '#020617', border: '1px solid #334155', borderRadius: '10px', padding: '20px', color: '#10b981', fontFamily: 'monospace', fontSize: '18px', overflowY: 'auto' }}>
          <h3 style={{ color: '#94a3b8', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '15px' }}>النتيجة (Output)</h3>
          {htmlOutput ? (
            <iframe 
               srcDoc={htmlOutput}
               title="code-output"
               style={{ width: '100%', height: 'calc(100% - 45px)', background: 'white', borderRadius: '5px', border: 'none' }}
            />
          ) : (
            <pre style={{ whiteSpace: 'pre-wrap', direction: 'ltr', textAlign: 'left', margin: 0 }}>
              {output || '// النتيجة هتظهر هنا...'}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
