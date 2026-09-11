import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";


const getAuthConfig = () => {
  const token = localStorage.getItem("access");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// ============================================================
// START TWILIO CALL
// ============================================================

export const startCall = async (
  module,
  moduleId
) => {

  const response = await axios.post(
    `${API_URL}/activities/call/start/`,
    {
      module,
      module_id: moduleId,
    },
    getAuthConfig()
  );

  return response.data;
};


// ============================================================
// GET CALLS
// ============================================================

export const getCalls = async (
  module,
  moduleId
) => {

  const response = await axios.get(
    `${API_URL}/activities/call/`,
    {
      ...getAuthConfig(),

      params: {
        module,
        module_id: moduleId,
      },
    }
  );

  return response.data;
};



// ============================================================
// SYNC CALL FROM TWILIO
// ============================================================

export const syncCall = async (
  callId
) => {

  const response = await axios.get(
    `${API_URL}/activities/call/${callId}/sync/`,
    getAuthConfig()
  );

  return response.data;
};