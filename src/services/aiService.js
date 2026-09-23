import api from "./api";

export const generateAISummary = async (data) => {
  const response = await api.post("/ai/summary/", {
    data,
  });

  return response.data;
};