# KrishiMantra - Agricultural Advisory System

A dual-frontend agricultural advisory system with Flask backend, React Native farmer app, and React web admin dashboard.

## 🏗️ Project Structure

```
KrishiMantra/
├── backend/          # Flask API server
├── farmer-app/       # React Native Expo app for farmers
├── admin-app/        # React web app for administrators
├── docs/            # API documentation and demo scripts
├── logo.png         # KrishiMantra logo
└── README.md        # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- npm or yarn

### 1. Backend Setup (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend will run on `http://localhost:5000`

### 2. Farmer App Setup (React Native Expo)

```bash
cd farmer-app
npm install
npm start
```

Choose your platform:
- Press `w` for web
- Press `a` for Android (requires Android Studio)
- Press `i` for iOS (requires Xcode on macOS)

### 3. Admin App Setup (React Web)

```bash
cd admin-app
npm install
npm run dev
```

Admin app will run on `http://localhost:5173`

## 📱 Features

### Farmer App
- **Multilingual Support**: English, Hindi, Marathi
- **Onboarding**: Language, soil type, land size, location input
- **Crop Recommendations**: AI-powered suggestions based on soil and season
- **Step-by-step Advisory**: Detailed farming guidance
- **Weather Alerts**: Real-time weather warnings and actions

### Admin Dashboard
- **Crop Management**: CRUD operations for crop database
- **Advisory Management**: Create and manage farming guides
- **Weather Management**: Set up weather alerts and notifications
- **Analytics Dashboard**: Overview of system usage and data

### Backend API
- **RESTful API**: Clean endpoints for all operations
- **Dummy Data**: Ready-to-use sample data for testing
- **CORS Enabled**: Cross-origin requests supported
- **Extensible**: Easy to integrate with ML models and real APIs

## 🛠️ Technology Stack

- **Backend**: Flask, Flask-CORS
- **Farmer App**: React Native, Expo, React Navigation, i18next
- **Admin App**: React, Vite, TailwindCSS, React Router
- **Database**: SQLite (ready for PostgreSQL/MySQL)

## 📖 API Documentation

See [docs/api-contract.md](docs/api-contract.md) for detailed API documentation.

## 🎯 Demo Script

Follow [docs/demo-script.md](docs/demo-script.md) for a complete demo walkthrough.

## 🔧 Development

### Adding New Features

1. **Backend**: Add routes in `backend/app.py`
2. **Farmer App**: Add screens in `farmer-app/screens/`
3. **Admin App**: Add pages in `admin-app/src/pages/`

### Database Integration

Replace dummy data in `backend/app.py` with actual database queries:

```python
# Example: Replace dummy CROPS_DATA with database query
def get_crops_from_db():
    conn = sqlite3.connect('krishimantra.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM crops")
    return cursor.fetchall()
```

### ML Model Integration

Replace recommendation logic with actual ML models:

```python
# Example: Integrate crop recommendation model
from your_ml_model import CropRecommendationModel

model = CropRecommendationModel()
recommendations = model.predict(soil_type, season, location)
```

## 🌐 Deployment

### Backend (Flask)
- Deploy on Heroku, AWS, or DigitalOcean
- Use Gunicorn for production: `gunicorn app:app`

### Farmer App
- Build for web: `npm run build`
- Build APK: `eas build --platform android`
- Deploy web version to Netlify/Vercel

### Admin App
- Build: `npm run build`
- Deploy to Netlify, Vercel, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation in `/docs`
- Review the demo script for common use cases

---

**KrishiMantra** - Empowering farmers with technology 🌾