import api from "./api";

// get AI insights
export const getAIInsights = (data) =>
  api.post("/ai/insights", data);