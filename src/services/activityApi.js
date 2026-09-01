import api from "./api";

// ==========================================
// ACTIVITY TIMELINE
// ==========================================

export const getActivityTimeline = async (
  module,
  moduleId
) => {
  const response = await api.get(
    `/activities/${module}/${moduleId}/`
  );

  return response.data;
};


// ==========================================
// ACTIVITY BY TYPE
// ==========================================

export const getActivityByType = async (
  module,
  moduleId,
  activityType
) => {
  const response = await api.get(
    `/activities/${module}/${moduleId}/${activityType}/`
  );

  return response.data;
};


// ==========================================
// NOTE
// ==========================================

export const createNote = async (data) => {
  const response = await api.post(
    "/activities/note/",
    data
  );

  return response.data;
};

export const updateNote = async (id, data) => {
  const response = await api.patch(
    `/activities/note/${id}/`,
    data
  );

  return response.data;
};

export const deleteNote = async (id) => {
  const response = await api.delete(
    `/activities/note/${id}/`
  );

  return response.data;
};


// ==========================================
// TASK
// ==========================================

export const createTask = async (data) => {
  const response = await api.post(
    "/activities/task/",
    data
  );

  return response.data;
};

export const updateTask = async (id, data) => {
  const response = await api.patch(
    `/activities/task/${id}/`,
    data
  );

  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(
    `/activities/task/${id}/`
  );

  return response.data;
};


// ==========================================
// MEETING
// ==========================================

export const createMeeting = async (data) => {
  const response = await api.post(
    "/activities/meeting/",
    data
  );

  return response.data;
};

export const updateMeeting = async (id, data) => {
  const response = await api.patch(
    `/activities/meeting/${id}/`,
    data
  );

  return response.data;
};

export const deleteMeeting = async (id) => {
  const response = await api.delete(
    `/activities/meeting/${id}/`
  );

  return response.data;
};


// ==========================================
// CALL
// ==========================================

export const createCall = async (data) => {
  const response = await api.post(
    "/activities/call/",
    data
  );

  return response.data;
};

export const updateCall = async (id, data) => {
  const response = await api.patch(
    `/activities/call/${id}/`,
    data
  );

  return response.data;
};

export const deleteCall = async (id) => {
  const response = await api.delete(
    `/activities/call/${id}/`
  );

  return response.data;
};


// ==========================================
// EMAIL
// ==========================================

export const createEmail = async (data) => {
  const response = await api.post(
    "/activities/email/",
    data
  );

  return response.data;
};

export const updateEmail = async (id, data) => {
  const response = await api.put(
    `/activities/email/${id}/`,
    data
  );

  return response.data;
};

export const deleteEmail = async (id) => {
  const response = await api.delete(
    `/activities/email/${id}/`
  );

  return response.data;
};
