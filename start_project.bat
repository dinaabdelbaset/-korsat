@echo off
chcp 65001 >nul
echo ==============================================
echo  Programmer's Journey - Launching Full Stack
echo ==============================================

echo [1/2] Preparing and Starting Python Backend...
start "Backend API Server" cmd.exe /k "cd /d "%~dp0backend" && pip install fastapi uvicorn sqlalchemy pydantic && uvicorn main:app --reload"
timeout /t 3 /nobreak > nul

echo [2/2] Preparing and Starting React Frontend...
start "React Frontend" cmd.exe /k "cd /d "%~dp0frontend" && npm install && npm run dev"

echo.
echo ==============================================
echo Project is successfully running!
echo Frontend will open in your browser shortly...
echo ==============================================

timeout /t 5 /nobreak > nul
start http://localhost:5173
