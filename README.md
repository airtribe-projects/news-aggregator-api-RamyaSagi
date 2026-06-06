const fs = require('fs');
const path = require('path');

const readmeContent = `# News Aggregator API

A secure RESTful backend application built with Node.js, Express, and MongoDB that allows users to register, authenticate via JSON Web Tokens (JWT), manage their personalized news preferences (categories and languages), and view a tailored real-time news feed aggregated from an external News API service.

## Core Features

- **User Authentication**: Secure signup and login endpoints backed by JWT generation and salted password hashing via \`bcrypt\`.
- **Preference Customization**: Dynamic storage of preferred news categories (e.g., technology, business, sports) and languages on a per-user basis.
- **Personalized News Ingestion**: Automatic extraction of user preferences from MongoDB to construct filtered third-party API queries via \`axios\`.
- **Crash-Proof Design**: Employs structural optional chaining fallbacks (\`user?.preferences\`) to ensure the platform functions gracefully even for uninitialized user profiles.

---

## Directory Structure

\`\`\`text
├── src/
│   ├── config/
│   │   └── db.js                 # Database connection adapter for MongoDB/Mongoose
│   ├── controllers/
│   │   ├── auth.controller.js    # Business logic for account registration and session login
│   │   ├── news.controller.js    # Business logic for tailored external news integration
│   │   └── preferences.controller.js # Business logic for managing profile configurations
│   ├── middlewares/
│   │   └── auth.middleware.js    # JWT authorization token verification layer
│   ├── models/
│   │   └── user.model.js         # Mongoose schema modeling data structures and sub-documents
│   └── routes/
│       ├── auth.routes.js        # Route mappings for registration and validation
│       ├── news.routes.js        # Route mappings for fetching headlines
│       └── preferences.routes.js # Route mappings for user filters
├── .env                          # Local environment key-value configurations storage
├── app.js                        # Main application assembly, mounting, and fallback configurations
├── package.json                  # Dependencies registry and operational scripts
└── README.md                     # Technical project documentation
\`\`\`

---

## Prerequisites

Ensure you have the following installed locally on your workspace environment:
- [Node.js](https://nodejs.org/) (v18.x or v20.x LTS)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Running locally on default port \`27017\`)

---

## Installation & Setup

1. **Navigate to the Project Root Folder:**
   \`\`\`bash
   cd news-aggregator-api-RamyaSagi
   \`\`\`

2. **Install System Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables:**
   Create a \`.env\` file in the root folder of the project and populate it with your local runtime parameters:
   \`\`\`env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/news-aggregator
   JWT_SECRET=your_super_secret_jwt_key_here
   NEWS_API_KEY=your_32_character_newsapi_key_here
   \`\`\`
   *(Note: You can easily fetch a free individual token instantly from the [newsapi.org](https://newsapi.org) developer dashboard).*

---

## Running the Application

### Start the Live Server Engine
To boot the application and bind it to your local port network, execute:
\`\`\`bash
npm start
\`\`\`
On a clean boot, your shell console will log:
\`\`\`text
Server executing successfully on port 3000
MongoDB connected cleanly via Mongoose.
\`\`\`

### Run Automated Project Validations
To run your test suites and confirm routing compatibility against assessment parameters, use:
\`\`\`bash
npm test
\`\`\`

---

## REST API Specification Documentation

All operational endpoints are safely isolated behind the \`/api\` routing namespace prefix.

### 1. Authentication Endpoints

#### **POST** \`/api/register\`
- **Description**: Compiles a new credential record into the MongoDB database.
- **Payload Request Body**:
  \`\`\`json
  {
    "fullName": "Ramya Sagi",
    "email": "ramya@example.com",
    "password": "securepassword123"
  }
  \`\`\`
- **Response (201 Created)**:
  \`\`\`json
  {
    "message": "User registered successfully."
  }
  \`\`\`

#### **POST** \`/api/login\`
- **Description**: Evaluates password credentials and returns a signed bearer token.
- **Payload Request Body**:
  \`\`\`json
  {
    "email": "ramya@example.com",
    "password": "securepassword123"
  }
  \`\`\`
- **Response (200 OK)**:
  \`\`\`json
  {
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  \`\`\`

---

### 2. Preference Endpoints (Protected)
*Requires Request Header:* \`Authorization: Bearer <JWT_TOKEN>\`

#### **GET** \`/api/preferences\`
- **Description**: Pulls down the current user profile's preference matrix.
- **Response (200 OK)**:
  \`\`\`json
  {
    "preferences": {
      "categories": ["technology", "business"],
      "languages": ["en"]
    }
  }
  \`\`\`

#### **PUT** \`/api/preferences\`
- **Description**: Updates the active target array configurations inside the user profile.
- **Payload Request Body**:
  \`\`\`json
  {
    "categories": ["technology", "business"],
    "languages": ["en"]
  }
  \`\`\`
- **Response (200 OK)**:
  \`\`\`json
  {
    "message": "Preferences updated successfully."
  }
  \`\`\`

---

### 3. News Ingestion Endpoints (Protected)
*Requires Request Header:* \`Authorization: Bearer <JWT_TOKEN>\`

#### **GET** \`/api/news\`
- **Description**: Reads the user context, calls out to the external aggregator API using preferences as filters, and responds back with live headline arrays. Automatically handles missing keys or newly registered users by using safe \`'general'\` and \`'en'\` fallbacks.
- **Response (200 OK)**:
  \`\`\`json
  {
    "articles": [
      {
        "source": { "id": "techcrunch", "name": "TechCrunch" },
        "author": "Tech Staff Writer",
        "title": "Unveiling Modern Web Backend Trends",
        "description": "An exhaustive analysis of decoupled microservices and routing structures...",
        "url": "https://techcrunch.com/example-news-article",
        "publishedAt": "2026-06-06T23:00:00Z"
      }
    ]
  }
  \`\`\`

---

## Core Dependencies

- **Runtime Engine**: Node.js
- **Web App Framework**: Express.js
- **Database Driver**: Mongoose ORM / MongoDB
- **Security Utilities**: JsonWebToken (JWT) & Bcryptjs
- **Networking Utility**: Axios HTTP Client
`;

fs.writeFileSync(path.join(__dirname, 'README.md'), readmeContent, 'utf8');
console.log('Successfully compiled and saved your full README.md file!');