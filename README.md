# 🧠 YouScrap — YouTube Data Scraper (Full Stack)

YouScrap is a **React + Express + Puppeteer** full-stack web application that allows users to **scrape and view YouTube video data** (titles, views, likes, comments, etc.) in a clean and easy-to-use interface.

---

## 🚀 Quick Start Guide (Windows)

Follow these steps carefully to get your app running successfully.

---

### 🪄 Step 1 — Install Node.js

Node.js (with npm) is required to run both the frontend and backend.

🔗 Download Node.js (LTS Version): [https://nodejs.org](https://nodejs.org)

Check installation in PowerShell or CMD:

```bash
node -v
npm -v
If you see version numbers, Node.js and npm are installed correctly.

📦 Step 2 — Get the Project
Download ZIP
Go https://github.com/MHKarimi-Codes/youtube-scraper-fullstack
Click the green Code button → Download ZIP.
Extract it anywhere on your computer (e.g., Desktop).

🗂️ Step 3 — Project Structure
After extraction or cloning, the project should look like this:
youtube-scraper-fullstack/
│
├── backend/          # Express server with Puppeteer scraper
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── youscrap/         # React frontend
│   ├── src/
│   ├── package.json
│   └── ...
│
├── start-app.bat     # Batch file to start both backend & frontend
└── README.md         # Project documentation

⚙️ Step 4 — Install Dependencies
You must install all dependencies before running the app.
🧩 Backend Setup
cd backend
npm install
This installs:
express — web server framework
puppeteer — headless browser for scraping
cors — allows frontend to access backend APIs
dotenv — environment variable management

💻 Frontend Setup
cd ../youscrap
npm install
This installs:
react and react-dom — frontend library
react-scripts — React development scripts
axios — for API requests to backend

Go back to the main folder:
cd ..
⚠️ Note: Users do not need to install React globally. All required packages are installed locally via npm install.

▶️ Step 5 — Run the Application
Double-click the start-app.bat file.
It will:
Start the backend on http://localhost:5000
Start the frontend on http://localhost:3000