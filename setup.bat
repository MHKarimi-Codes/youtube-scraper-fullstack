@echo off
title YouScrap Setup
echo ====================================================
echo   🚀 Setting up YouScrap Full-Stack Project
echo ====================================================
echo.

REM --- Check if Node.js is installed ---
node -v >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed on your computer.
    echo Please install Node.js from https://nodejs.org/ and try again.
    pause
    exit /b
)

REM --- Install backend dependencies ---
echo.
echo 📦 Installing backend dependencies...
cd backend
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies.
    pause
    exit /b
)
cd ..

REM --- Install frontend dependencies ---
echo.
echo 📦 Installing frontend (React) dependencies...
cd youscrap
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies.
    pause
    exit /b
)
cd ..

echo.
echo ✅ All dependencies installed successfully!
echo ----------------------------------------------------
echo 🔥 Starting backend and frontend servers...
echo ----------------------------------------------------

REM --- Start backend in a new window ---
start cmd /k "cd backend && npm start"

REM --- Start frontend (React) in a new window ---
start cmd /k "cd youscrap && npm start"

echo.
echo ✅ Servers started successfully!
echo ----------------------------------------------------
echo 🌐 Backend running in one window
echo 💻 Frontend running in another window
echo ----------------------------------------------------
echo.
echo Press any key to close this setup window when you’re ready.
pause
