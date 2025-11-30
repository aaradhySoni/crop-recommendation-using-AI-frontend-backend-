✨ Crop Recommendation System (AI-Powered)

A full-stack AI-powered crop recommendation platform built with React + Node.js + Express + MongoDB.
The system predicts the best crop based on soil conditions, weather, and other parameters.

🚀 Features

✨ Frontend (React + Vite + TypeScript)

Modern UI with TailwindCSS

Real-time suggestions

Dynamic forms

API integration with backend

Clean folder structure (pages, components, hooks, lib)

✨Backend (Node.js + Express + MongoDB)

AI-based crop recommendation API

Chat-based Q&A system

REST API routes

MongoDB models

Error handling & validation middleware

🗂️ Project Structure
project


│── public/

│── src/

│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── assets/
│



│── server/


│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── index.js
│



├── package.json

├── vite.config.ts

└── README.md



✨Tech Stack


✨Frontend

React + Vite

TypeScript

TailwindCSS

✨Backend

Node.js

Express.js

MongoDB (Mongoose)

dotenv

Joi validation

🛠️ Installation & Setup
⚙️ Clone the repository
git clone https://github.com/aaradhySoni/crop-recommendation-using-AI-frontend-backend-.git
cd crop-recommendation-using-AI-frontend-backend-

✨ Frontend Installation
npm install
npm run dev

✨ Backend Installation
cd server
npm install
npm start

✨ Environment Variables

Inside server/.env:

MONGO_URI=your_mongodb_connection_string
PORT=5000

📡 API Endpoints
POST /api/recommendation

Returns crop recommendation.

POST /api/chat

AI chat assistant.

🤝 Contributing

Pull requests and improvements are welcome.

📄 License

MIT License © 2025 Aaradhy Soni
