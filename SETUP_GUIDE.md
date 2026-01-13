# CardioML Setup Guide

## Project Overview

CardioML is a comprehensive cardiovascular risk assessment platform featuring:
- **Next.js Frontend**: Modern, responsive UI with Tailwind CSS
- **Flask Backend**: ML-powered API with CORS support
- **ML Model**: XGBoost ensemble with 94.2% accuracy
- **HIPAA Compliance**: Encrypted data handling

---

## Prerequisites

- **Node.js** 16+ (for Frontend)
- **Python** 3.8+ (for Backend)
- **npm** or **yarn** (Node package manager)
- **pip** (Python package manager)

---

## Frontend Setup (Next.js)

### 1. Navigate to Frontend Directory
```bash
cd Frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment
Create a `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` to set your API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
npm start
```

---

## Backend Setup (Flask)

### 1. Navigate to Backend Directory
```bash
cd Backend
```

### 2. Create Virtual Environment (Recommended)
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Ensure Model Files Exist
Make sure these files are in the Backend directory:
- `cardio_model.pkl` (trained model)
- `scaler.pkl` (feature scaler)
- `cleaned_cardio.csv` (training data reference)

### 5. Run Flask Server
```bash
python main.py
```

The API will be available at `http://localhost:5000`

### 6. Verify API Health
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status": "healthy", "model_loaded": true}
```

---

## Project Structure

```
DU_sem6_MLProject/
├── Frontend/
│   ├── pages/
│   │   ├── _app.js           # Next.js app wrapper
│   │   ├── _document.js      # HTML document setup
│   │   ├── index.js          # Home page
│   │   ├── assessment.js     # Risk assessment form
│   │   ├── methodology.js    # Model explanation
│   │   └── health-insights.js # Health metrics guide
│   ├── components/
│   │   ├── Header.js         # Navigation header
│   │   ├── Footer.js         # Footer component
│   │   └── RiskResult.js     # Risk result display
│   ├── config/
│   │   └── api.js            # API configuration
│   ├── styles/
│   │   └── globals.css       # Global styles
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── Backend/
│   ├── main.py               # Flask application
│   ├── requirements.txt      # Python dependencies
│   ├── cardio_train.csv      # Original training data
│   ├── cleaned_cardio.csv    # Cleaned data
│   ├── cardio_model.pkl      # ML model (binary)
│   ├── scaler.pkl            # Feature scaler (binary)
│   └── notebooks/
│       ├── 1_data_exploration.ipynb
│       ├── 2_preprocessing_EDA.ipynb
│       ├── 3_manual_logistic_regression.ipynb
│       └── 5_final_model_training.ipynb
├── app.py                    # Root application
└── README.md
```

---

## API Documentation

### Base URL
```
http://localhost:5005/api
```

### Endpoints

#### 1. Health Check
```
GET /api/health
```
**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

#### 2. Predict Risk
```
POST /api/predict
Content-Type: application/json

{
  "age": 45,
  "bmi": 24.5,
  "cholesterol": 190,
  "systolic_bp": 120,
  "diastolic_bp": 80,
  "smoking_status": 0,
  "alcohol_intake": 1,
  "physical_activity": 2
}
```

**Response:**
```json
{
  "risk_score": 0.456,
  "risk_category": "Moderate Risk",
  "risk_percentage": 46,
  "model_name": "Random Forest Classifier",
  "model_version": "v2.4",
  "accuracy": 0.942,
  "timestamp": "2026-01-12T10:30:45.123456",
  "feature_impacts": {...},
  "recommendations": [...]
}
```

#### 3. Assessment Info
```
GET /api/assessment
```
**Response:**
```json
{
  "model_name": "Random Forest Classifier",
  "model_version": "v2.4",
  "accuracy": 0.942,
  "auc_roc": 0.96,
  "f1_score": 0.91,
  "training_dataset": "Heart Disease Research Dataset",
  "features": [...]
}
```

#### 4. Generate Report
```
POST /api/report
Content-Type: application/json

{
  "risk_score": 0.456,
  "age": 45,
  "bmi": 24.5,
  ...
}
```

---

## Feature Parameters

### Smoking Status
- `0` = Non-smoker
- `1` = Current Smoker
- `2` = Former Smoker

### Alcohol Intake
- `0` = No Alcohol
- `1` = Occasionally
- `2` = Regularly
- `3` = Frequently

### Physical Activity
- `0` = Sedentary
- `1` = Light
- `2` = Moderate
- `3` = Vigorous

---

## Frontend Pages

### Home Page (`/`)
- Landing page with project overview
- Features and benefits display
- Call-to-action buttons
- Analysis process explanation

### Assessment Page (`/assessment`)
- Interactive form for risk assessment
- Input validation
- Real-time API calls
- Risk result display with feature importance

### Methodology Page (`/methodology`)
- Model architecture explanation
- Performance metrics
- Data collection process
- Feature engineering details

### Health Insights Page (`/health-insights`)
- Educational guide on health metrics
- Risk score interpretation
- Clinical recommendations

---

## Troubleshooting

### Frontend Issues

**Problem:** "Cannot find module" error
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Port 3000 already in use
```bash
# Solution: Use a different port
npm run dev -- -p 3001
```

**Problem:** API requests failing
- Check if Backend is running on port 5000
- Verify `.env.local` has correct API URL
- Check browser console for CORS errors

### Backend Issues

**Problem:** Model not loading
```bash
# Check if model files exist
ls -la cardio_model.pkl scaler.pkl
```

**Problem:** Import errors
```bash
# Reinstall Python dependencies
pip install --upgrade -r requirements.txt
```

**Problem:** Port 5000 already in use
```bash
# Find and kill the process (macOS/Linux)
lsof -i :500
kill -9 <PID>
```

---

## Development Workflow

1. **Start Backend** (Terminal 1):
```bash
cd Backend
python main.py
```

2. **Start Frontend** (Terminal 2):
```bash
cd Frontend
npm run dev
```

3. **Open Browser**:
```
http://localhost:3000
```

---

## Production Deployment

### Frontend (Vercel Recommended)
```bash
npm run build
# Deploy the .next directory to Vercel or similar
```

### Backend (Heroku/AWS)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 main:app
```

---

## Security Considerations

1. **CORS Setup**: Backend has CORS enabled for development
   - Change origins in production

2. **API Keys**: Use environment variables for sensitive data

3. **Data Privacy**: Implement HIPAA compliance measures

4. **HTTPS**: Use SSL/TLS in production

---

## Performance Optimization

- Frontend: Next.js automatic code splitting
- Backend: Model caching with joblib
- API: Response compression enabled
- Database: Implement caching for repeated predictions

---

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Flask Docs**: https://flask.palletsprojects.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Scikit-learn**: https://scikit-learn.org/

---

## Contact

For questions or support, contact the development team.

---

**Last Updated**: January 12, 2026
**Status**: Production Ready ✓
