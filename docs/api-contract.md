# KrishiMantra API Contract

## Base URL
```
http://localhost:5000
```

## Endpoints

### 1. Crop Recommendations
**POST** `/recommend_crop`

**Request:**
```json
{
  "soil_type": "loamy",
  "season": "kharif",
  "land_size": "5",
  "pincode": "411001"
}
```

**Response:**
```json
{
  "status": "success",
  "recommendations": [
    {
      "crop_name": "wheat",
      "confidence": 85,
      "reason": "Suitable for loamy soil in kharif season",
      "expected_yield": "25-30 quintals/hectare"
    }
  ]
}
```

### 2. Advisory Guide
**POST** `/get_advisory`

**Request:**
```json
{
  "crop": "wheat"
}
```

**Response:**
```json
{
  "status": "success",
  "crop": "wheat",
  "advisory_steps": [
    {
      "step": 1,
      "title": "Land Preparation",
      "description": "Plow the field 2-3 times",
      "duration": "7 days"
    }
  ]
}
```

### 3. Weather Alerts
**GET** `/weather_alerts`

**Response:**
```json
{
  "status": "success",
  "alerts": [
    {
      "id": 1,
      "type": "rainfall",
      "severity": "medium",
      "message": "Moderate rainfall expected in next 2 days",
      "action": "Postpone harvesting activities"
    }
  ]
}
```

### 4. Health Check
**GET** `/health`

**Response:**
```json
{
  "status": "healthy"
}
```

## Error Responses
All endpoints return errors in this format:
```json
{
  "status": "error",
  "message": "Error description"
}
```

## Status Codes
- 200: Success
- 400: Bad Request
- 500: Internal Server Error