# from flask import Flask, jsonify, request
# from flask_cors import CORS
# import os

# app = Flask(__name__)
# CORS(app)

# # Dummy crop recommendation data
# CROPS_DATA = {
#     "wheat": {"season": "rabi", "soil": "loamy", "water": "medium"},
#     "rice": {"season": "kharif", "soil": "clay", "water": "high"},
#     "cotton": {"season": "kharif", "soil": "black", "water": "medium"},
#     "sugarcane": {"season": "year-round", "soil": "loamy", "water": "high"}
# }

# ADVISORY_DATA = {
#     "wheat": [
#         {"step": 1, "title": "Land Preparation", "description": "Plow the field 2-3 times", "duration": "7 days"},
#         {"step": 2, "title": "Sowing", "description": "Sow seeds at 2-3 cm depth", "duration": "2 days"},
#         {"step": 3, "title": "Irrigation", "description": "First irrigation after 20-25 days", "duration": "ongoing"}
#     ]
# }

# # --- Fertilizer requirement data (per acre, dummy values) ---
# FERTILIZER_DATA = {
#     "rice": {"nitrogen": 120, "phosphorus": 60, "potassium": 40},
#     "wheat": {"nitrogen": 150, "phosphorus": 75, "potassium": 50},
#     "maize": {"nitrogen": 180, "phosphorus": 90, "potassium": 60},
#     "sugarcane": {"nitrogen": 200, "phosphorus": 80, "potassium": 60},
#     "cotton": {"nitrogen": 100, "phosphorus": 50, "potassium": 30},
# }

# # --- EXISTING ROUTES ---

# @app.route('/recommend_crop', methods=['POST'])
# def recommend_crop():
#     data = request.get_json()
#     soil_type = data.get('soil_type', 'loamy')
#     season = data.get('season', 'kharif')

#     recommendations = []
#     for crop, details in CROPS_DATA.items():
#         if details['soil'] == soil_type or details['season'] == season:
#             recommendations.append({
#                 "crop_name": crop,
#                 "confidence": 85,
#                 "reason": f"Suitable for {soil_type} soil in {season} season",
#                 "expected_yield": "25-30 quintals/hectare"
#             })

#     return jsonify({
#         "status": "success",
#         "recommendations": recommendations[:3]
#     })


# @app.route('/get_advisory', methods=['POST'])
# def get_advisory():
#     data = request.get_json()
#     crop = data.get('crop', 'wheat')

#     advisory = ADVISORY_DATA.get(crop, ADVISORY_DATA['wheat'])

#     return jsonify({
#         "status": "success",
#         "crop": crop,
#         "advisory_steps": advisory
#     })


# @app.route('/weather_alerts', methods=['GET'])
# def weather_alerts():
#     alerts = [
#         {
#             "id": 1,
#             "type": "rainfall",
#             "severity": "medium",
#             "message": "Moderate rainfall expected in next 2 days",
#             "action": "Postpone harvesting activities"
#         },
#         {
#             "id": 2,
#             "type": "temperature",
#             "severity": "high",
#             "message": "High temperature alert for next 3 days",
#             "action": "Increase irrigation frequency"
#         }
#     ]

#     return jsonify({
#         "status": "success",
#         "alerts": alerts
#     })


# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({"status": "healthy"})


# # --- NEW ROUTE FOR PEST DETECTION ---
# @app.route('/pest-detect', methods=['POST'])
# def pest_detect():
#     """
#     Accepts an image upload and returns static pest detection info.
#     """
#     if 'file' not in request.files:
#         return jsonify({"status": "error", "message": "No file uploaded"}), 400

#     file = request.files['file']
    
#     # Optionally save image
#     save_path = os.path.join("uploads", file.filename)
#     os.makedirs("uploads", exist_ok=True)
#     file.save(save_path)

#     # --- Static response (dummy result) ---
#     detection_result = {
#         "status": "success",
#         "pest": "Aphid",
#         "confidence": "92%",
#         "recommendation": "Spray neem oil extract or insecticidal soap."
#     }

#     return jsonify(detection_result)


# # --- NEW ROUTE FOR FERTILIZER CALCULATOR ---
# @app.route('/calculate_fertilizer', methods=['POST'])
# def calculate_fertilizer():
#     data = request.get_json()
#     land_area = data.get("land_area", 0)
#     crop_type = data.get("crop_type", "").lower()

#     if not land_area or land_area <= 0:
#         return jsonify({"status": "error", "error": "Invalid land area"}), 400
    
#     crop_data = FERTILIZER_DATA.get(crop_type)
#     if not crop_data:
#         return jsonify({"status": "error", "error": f"No data found for crop '{crop_type}'"}), 400

#     result = {
#         "nitrogen": round(crop_data["nitrogen"] * land_area, 2),
#         "phosphorus": round(crop_data["phosphorus"] * land_area, 2),
#         "potassium": round(crop_data["potassium"] * land_area, 2),
#     }

#     return jsonify({
#         "status": "success",
#         "crop": crop_type,
#         "land_area": land_area,
#         "result": result
#     })


# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=5000)

from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import google.generativeai as genai
from dotenv import load_dotenv

# ----------------- Setup -----------------
app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("🚨 GEMINI_API_KEY missing from .env")

# Configure Gemini API
genai.configure(api_key=api_key)
chatbot_model = genai.GenerativeModel("gemini-1.5-flash")

# ----------------- Dummy Data -----------------
CROPS_DATA = {
    "wheat": {"season": "rabi", "soil": "loamy", "water": "medium"},
    "rice": {"season": "kharif", "soil": "clay", "water": "high"},
    "cotton": {"season": "kharif", "soil": "black", "water": "medium"},
    "sugarcane": {"season": "year-round", "soil": "loamy", "water": "high"}
}

ADVISORY_DATA = {
    "wheat": [
        {"step": 1, "title": "Land Preparation", "description": "Plow the field 2-3 times", "duration": "7 days"},
        {"step": 2, "title": "Sowing", "description": "Sow seeds at 2-3 cm depth", "duration": "2 days"},
        {"step": 3, "title": "Irrigation", "description": "First irrigation after 20-25 days", "duration": "ongoing"}
    ]
}

# --- Fertilizer requirement data (per acre, dummy values) ---
FERTILIZER_DATA = {
    "rice": {"nitrogen": 120, "phosphorus": 60, "potassium": 40},
    "wheat": {"nitrogen": 150, "phosphorus": 75, "potassium": 50},
    "maize": {"nitrogen": 180, "phosphorus": 90, "potassium": 60},
    "sugarcane": {"nitrogen": 200, "phosphorus": 80, "potassium": 60},
    "cotton": {"nitrogen": 100, "phosphorus": 50, "potassium": 30},
}

# ----------------- Routes -----------------

@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    data = request.get_json()
    soil_type = data.get('soil_type', 'loamy')
    season = data.get('season', 'kharif')

    recommendations = []
    for crop, details in CROPS_DATA.items():
        if details['soil'] == soil_type or details['season'] == season:
            recommendations.append({
                "crop_name": crop,
                "confidence": 85,
                "reason": f"Suitable for {soil_type} soil in {season} season",
                "expected_yield": "25-30 quintals/hectare"
            })

    return jsonify({
        "status": "success",
        "recommendations": recommendations[:3]
    })


@app.route('/get_advisory', methods=['POST'])
def get_advisory():
    data = request.get_json()
    crop = data.get('crop', 'wheat')

    advisory = ADVISORY_DATA.get(crop, ADVISORY_DATA['wheat'])

    return jsonify({
        "status": "success",
        "crop": crop,
        "advisory_steps": advisory
    })


@app.route('/weather_alerts', methods=['GET'])
def weather_alerts():
    alerts = [
        {
            "id": 1,
            "type": "rainfall",
            "severity": "medium",
            "message": "Moderate rainfall expected in next 2 days",
            "action": "Postpone harvesting activities"
        },
        {
            "id": 2,
            "type": "temperature",
            "severity": "high",
            "message": "High temperature alert for next 3 days",
            "action": "Increase irrigation frequency"
        }
    ]

    return jsonify({
        "status": "success",
        "alerts": alerts
    })


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy"})


# --- Pest Detection Route ---
@app.route('/pest-detect', methods=['POST'])
def pest_detect():
    if 'file' not in request.files:
        return jsonify({"status": "error", "message": "No file uploaded"}), 400

    file = request.files['file']
    save_path = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(save_path)

    detection_result = {
        "status": "success",
        "pest": "Aphid",
        "confidence": "92%",
        "recommendation": "Spray neem oil extract or insecticidal soap."
    }

    return jsonify(detection_result)


# --- Fertilizer Calculator Route ---
@app.route('/calculate_fertilizer', methods=['POST'])
def calculate_fertilizer():
    data = request.get_json()
    land_area = data.get("land_area", 0)
    crop_type = data.get("crop_type", "").lower()

    if not land_area or land_area <= 0:
        return jsonify({"status": "error", "error": "Invalid land area"}), 400
    
    crop_data = FERTILIZER_DATA.get(crop_type)
    if not crop_data:
        return jsonify({"status": "error", "error": f"No data found for crop '{crop_type}'"}), 400

    result = {
        "nitrogen": round(crop_data["nitrogen"] * land_area, 2),
        "phosphorus": round(crop_data["phosphorus"] * land_area, 2),
        "potassium": round(crop_data["potassium"] * land_area, 2),
    }

    return jsonify({
        "status": "success",
        "crop": crop_type,
        "land_area": land_area,
        "result": result
    })


# --- Chatbot Route (Gemini) ---
@app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        user_message = data.get("message", "")

        if not user_message:
            return jsonify({"status": "error", "error": "Message is required"}), 400

        response = chatbot_model.generate_content(
            f"You are a helpful farming assistant. "
            f"Answer farmer queries with practical local suggestions. "
            f"Farmer question: {user_message}"
        )

        return jsonify({
            "status": "success",
            "reply": response.text
        })
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500


# ----------------- Main -----------------
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

