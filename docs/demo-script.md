# KrishiMantra Demo Script

## Demo Flow

### 1. Backend Setup
1. Start Flask backend server
2. Verify health endpoint is working
3. Test API endpoints with sample data

### 2. Farmer App Demo
1. **Onboarding Screen**
   - Select language (English/Hindi/Marathi)
   - Choose soil type (Loamy/Clay/Sandy/Black)
   - Enter land size (e.g., 5 acres)
   - Enter pincode (e.g., 411001)

2. **Dashboard Screen**
   - View crop recommendations based on soil type
   - See confidence scores and expected yields
   - Navigate to Advisory and Weather screens

3. **Advisory Screen**
   - View step-by-step farming guide for selected crop
   - See duration and detailed descriptions for each step

4. **Weather Screen**
   - View current weather alerts
   - See severity levels and recommended actions

### 3. Admin App Demo
1. **Dashboard**
   - View overview statistics
   - Check recent activity feed

2. **Crop Management**
   - Add new crop with season and soil requirements
   - View existing crops in table format
   - Edit/Delete crop entries

3. **Advisory Management**
   - Add new advisory steps for crops
   - Manage existing advisory content

4. **Weather Management**
   - Create new weather alerts
   - Set severity levels and recommended actions
   - View all active alerts

## Sample Test Data

### Crop Recommendation Test
```bash
curl -X POST http://localhost:5000/recommend_crop \
  -H "Content-Type: application/json" \
  -d '{"soil_type": "loamy", "season": "kharif"}'
```

### Advisory Test
```bash
curl -X POST http://localhost:5000/get_advisory \
  -H "Content-Type: application/json" \
  -d '{"crop": "wheat"}'
```

### Weather Alerts Test
```bash
curl http://localhost:5000/weather_alerts
```

## Demo Scenarios

### Scenario 1: New Farmer Onboarding
- Farmer selects Hindi language
- Has 3 acres of clay soil
- Located in Maharashtra (pincode: 411001)
- Gets rice and cotton recommendations

### Scenario 2: Seasonal Advisory
- Farmer wants guidance for wheat cultivation
- Views step-by-step advisory from land preparation to harvest
- Checks weather alerts for irrigation planning

### Scenario 3: Admin Management
- Admin adds new crop variety
- Creates weather alert for upcoming rainfall
- Updates advisory steps for better yield