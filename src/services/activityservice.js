// import api from "./api";

// export const getActivityTimeline = (module, moduleId) => {
//   return api.get(`activities/${module}/${moduleId}/`);
// };

// export const getActivityType = (module, moduleId, activityType) => {
//   return api.get(
//     `activities/${module}/${moduleId}/${activityType}/`
//   );
// };


import api from "./api";

export const getActivityTimeline = (module, moduleId) => {
  return api.get(
    `/activities/activity/${module}/${moduleId}/`
  );
};

export const getActivityType = (
  module,
  moduleId,
  activityType
) => {
  return api.get(
    `/activities/activity/${module}/${moduleId}/${activityType}/`
  );
};

export const createCall = (data) => {
  return api.post("/calls/", data);
};