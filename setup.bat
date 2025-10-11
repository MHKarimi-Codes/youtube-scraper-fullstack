@echo off
echo Starting backend server...
cd backend
start cmd /k "npm start"

timeout /t 5 /nobreak >nul

echo Starting frontend app...
cd ..
cd youscrap
start cmd /k "npm start"

echo Both backend and frontend are starting...
pause
