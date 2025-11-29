# Crop Recommendation Backend API

Complete backend server for the Crop Recommendation System built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── recommendationController.js  # Crop recommendation logic
│   └── chatController.js            # AI chatbot logic
├── models/
│   ├── Crop.js               # Crop data model
│   ├── Recommendation.js     # Recommendation history model
│   └── ChatMessage.js        # Chat conversation model
├── routes/
│   ├── recommendationRoutes.js     # Recommendation API routes
│   └── chatRoutes.js               # Chat API routes
├── middleware/
│   ├── validation.js         # Request validation middleware
│   └── errorHandler.js       # Error handling middleware
├── index.js                  # Main server file
├── package.json              # Dependencies and scripts
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and set your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/crop-recommendation
CLIENT_ORIGIN=http://localhost:8080
```

**For MongoDB Atlas (Cloud):**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Replace `MONGODB_URI` with your Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/crop-recommendation
   ```

**For Local MongoDB:**
1. Install MongoDB locally: [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS (using Homebrew)
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```
3. Use the default connection string: `mongodb://localhost:27017/crop-recommendation`

### Step 3: Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## 📡 API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Recommendations

#### Get Crop Recommendations
- **POST** `/api/recommendations`
- **Body:**
  ```json
  {
    "soilPH": 7.0,
    "moisture": 50,
    "soilType": "Loamy",
    "weather": "temperate",
    "pastCrop": "wheat",
    "sessionId": "optional-session-id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "bestMatch": {
        "cropName": "Wheat",
        "matchScore": 98
      },
      "recommendations": [
        {
          "cropName": "Wheat",
          "matchScore": 98,
          "expectedYield": "4.5 tons/acre",
          "profitPotential": "$2,400/acre",
          "sustainability": "Excellent",
          "reasoning": "..."
        }
      ],
      "formData": { ... }
    }
  }
  ```

#### Get Recommendation History
- **GET** `/api/recommendations/history?sessionId=xxx&limit=10`

#### Get Specific Recommendation
- **GET** `/api/recommendations/:id`

### Chat

#### Send Chat Message
- **POST** `/api/chat`
- **Body:**
  ```json
  {
    "message": "What crops are best for my soil?",
    "sessionId": "optional-session-id"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "data": {
      "sessionId": "session_xxx",
      "userMessage": "What crops are best for my soil?",
      "aiResponse": "I can help you get crop recommendations!...",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

#### Get Chat History
- **GET** `/api/chat/history?sessionId=xxx`

## 🔧 Database Models

### Crop
Stores reference data for different crops with ideal conditions.

### Recommendation
Stores user queries and AI-generated recommendations.

### ChatMessage
Stores chatbot conversation history.

## 🛠️ Development

### Adding New Crops

You can add crops directly to the database or they will be auto-initialized on first recommendation request. The default crops include:
- Wheat
- Corn
- Rice
- Cotton
- Soybean
- Sugarcane

### Extending the Chatbot

The chatbot currently uses rule-based responses. To integrate with an actual AI service (like OpenAI), modify `server/controllers/chatController.js`.

## 🔒 Security Notes

- Currently, all endpoints are public. For production, consider adding:
  - Authentication middleware (JWT)
  - Rate limiting
  - Input sanitization
  - HTTPS

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `MONGODB_URI` | MongoDB connection string | Required |
| `CLIENT_ORIGIN` | Frontend URL for CORS | `http://localhost:8080` |

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check your connection string in `.env`
- Verify network access for MongoDB Atlas

### CORS Errors
- Update `CLIENT_ORIGIN` in `.env` to match your frontend URL
- Ensure the frontend is making requests to the correct backend URL

### Port Already in Use
- Change `PORT` in `.env` to a different port
- Or stop the process using port 5000

## 📚 Next Steps

1. Update your frontend to call these API endpoints
2. Add authentication if needed
3. Deploy to a cloud service (Heroku, Railway, Render, etc.)
4. Set up MongoDB Atlas for production database

## 🤝 Support

For issues or questions, check the main project README or open an issue.

