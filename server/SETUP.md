# Quick Setup Guide

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Create Environment File
Create a `.env` file in the `server` directory with the following content:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crop-recommendation
CLIENT_ORIGIN=http://localhost:8080
```

### 3. Setup MongoDB

**Option A: Local MongoDB**
- Install MongoDB: https://www.mongodb.com/try/download/community
- Start MongoDB service
- Use: `MONGODB_URI=mongodb://localhost:27017/crop-recommendation`

**Option B: MongoDB Atlas (Cloud - Free)**
- Sign up: https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string
- Use: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crop-recommendation`

### 4. Start the Server
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📝 Testing the API

### Test Health Endpoint
```bash
curl http://localhost:5000/health
```

### Test Recommendation Endpoint
```bash
curl -X POST http://localhost:5000/api/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "soilPH": 7.0,
    "moisture": 50,
    "soilType": "Loamy",
    "weather": "temperate",
    "pastCrop": "wheat"
  }'
```

### Test Chat Endpoint
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What crops are best for my soil?"
  }'
```

## 🔗 Connecting Frontend

Update your frontend to call the backend API at `http://localhost:5000`

Example fetch call:
```javascript
const response = await fetch('http://localhost:5000/api/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    soilPH: 7.0,
    moisture: 50,
    soilType: 'Loamy',
    weather: 'temperate',
    pastCrop: 'wheat'
  })
});
```

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with correct values
- [ ] MongoDB running and accessible
- [ ] Server starts without errors
- [ ] Health endpoint returns success
- [ ] Frontend can connect to backend

## 🆘 Troubleshooting

**Port already in use?**
- Change `PORT` in `.env` to a different port (e.g., 5001)

**MongoDB connection failed?**
- Check MongoDB is running
- Verify connection string in `.env`
- For Atlas: Check IP whitelist and credentials

**CORS errors?**
- Update `CLIENT_ORIGIN` in `.env` to match your frontend URL

