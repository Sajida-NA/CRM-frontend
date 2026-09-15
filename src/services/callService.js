
import api from "./api";

// =========================================================
// START DIRECT CALL
// CRM → Django → Twilio → Customer
// =========================================================

export const startDirectCall = async (module, moduleId) => {
  try {
    const response = await api.post(
      "/activities/call/direct/",
      {
        module: String(module).toLowerCase(),
        module_id: Number(moduleId),
      }
    );

    console.log(
      "DIRECT CALL RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "DIRECT CALL ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    throw error;
  }
};

// =========================================================
// START BRIDGE CALL
// CRM → Django → Twilio → CRM USER → Customer
// =========================================================

export const startBridgeCall = async (module, moduleId) => {
  try {
    const response = await api.post(
      "/activities/call/bridge/",
      {
        module: String(module).toLowerCase(),
        module_id: Number(moduleId),
      }
    );

    console.log(
      "BRIDGE CALL RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "BRIDGE CALL ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    throw error;
  }
};

// =========================================================
// GET CALLS FOR CRM RECORD
// =========================================================

export const getCalls = async (module, moduleId) => {
  try {
    const response = await api.get(
      "/activities/call/",
      {
        params: {
          module: String(module).toLowerCase(),
          module_id: Number(moduleId),
        },
      }
    );

    console.log(
      "GET CALLS RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "GET CALLS ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    throw error;
  }
};

// =========================================================
// GET SINGLE CALL
// =========================================================

export const getCall = async (callId) => {
  try {
    const response = await api.get(
      `/activities/call/${callId}/`
    );

    console.log(
      "GET CALL RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "GET CALL ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    throw error;
  }
};

// =========================================================
// SYNC CALL WITH TWILIO
// =========================================================

export const syncCall = async (callId) => {
  try {
    const response = await api.get(
      `/activities/call/${callId}/sync/`
    );

    console.log(
      "SYNC CALL RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "SYNC CALL ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    throw error;
  }
};

// =========================================================
// DELETE CALL
// =========================================================

export const deleteCall = async (callId) => {
  try {
    const response = await api.delete(
      `/activities/call/${callId}/`
    );

    console.log(
      "DELETE CALL RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE CALL ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );

    throw error;
  }
};

