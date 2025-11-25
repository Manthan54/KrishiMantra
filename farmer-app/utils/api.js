// const API_BASE_URL = "http://192.168.43.248:5000";

// export const api = {
//   recommendCrop: async (data) => {
//     const response = await fetch(`${API_BASE_URL}/recommend_crop`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   },

//   getAdvisory: async (data) => {
//     const response = await fetch(`${API_BASE_URL}/get_advisory`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//     return response.json();
//   },

//   getWeatherAlerts: async () => {
//     const response = await fetch(`${API_BASE_URL}/weather_alerts`);
//     return response.json();
//   },

//   // 🐛 New API call for pest detection
//   detectPest: async (imageUri) => {
//     const formData = new FormData();
//     formData.append("file", {
//       uri: imageUri,
//       name: "pest.jpg",
//       type: "image/jpeg",
//     });

//     const response = await fetch(`${API_BASE_URL}/pest-detect`, {
//       method: "POST",
//       body: formData,
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.json();
//   },

//   // 🌱 New API call for fertilizer calculation
//   calculateFertilizer: async (landArea, cropType) => {
//     const response = await fetch(`${API_BASE_URL}/calculate_fertilizer`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         land_area: parseFloat(landArea),
//         crop_type: cropType,
//       }),
//     });

//     return response.json();
//   },
// };

const API_BASE_URL = "http://192.168.43.248:5000";

export const api = {
  recommendCrop: async (data) => {
    const response = await fetch(`${API_BASE_URL}/recommend_crop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getAdvisory: async (data) => {
    const response = await fetch(`${API_BASE_URL}/get_advisory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getWeatherAlerts: async () => {
    const response = await fetch(`${API_BASE_URL}/weather_alerts`);
    return response.json();
  },

  // 🐛 New API call for pest detection
  detectPest: async (imageUri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: "pest.jpg",
      type: "image/jpeg",
    });

    const response = await fetch(`${API_BASE_URL}/pest-detect`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.json();
  },

  // 🌱 New API call for fertilizer calculation
  calculateFertilizer: async (landArea, cropType) => {
    const response = await fetch(`${API_BASE_URL}/calculate_fertilizer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        land_area: parseFloat(landArea),
        crop_type: cropType,
      }),
    });

    return response.json();
  },

  // 💬 New API call for Chatbot (Gemini)
  chatbot: async (message) => {
    const response = await fetch(`${API_BASE_URL}/chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    return response.json();
  },
};
