import api from "./api";

export const getLeads = (params = {}) => {
  return api.get("leads/leadslist/", {
    params,
  });
};

export const createLead = (data) => {
  return api.post("leads/leadslist/", data);
};

export const updateLead = (id, data) => {
  return api.put(`leads/leadslist/${id}/`, data);
};

export const deleteLead = (id) => {
  return api.delete(`leads/leadslist/${id}/`);
};

export const getLeadById = (id) => {
  return api.get(`/leads/leadslist/${id}/`);
};

// Lead status dropdown
export const getLeadStatuses = () => {
  return api.get("leads/lead-statuses/");
};