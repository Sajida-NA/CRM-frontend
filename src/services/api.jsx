
<<<<<<< HEAD
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Public API - does not send JWT token
export const publicApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});


export default api;
=======
 
import axios from "axios"; 
 
const api = axios.create({ 
  baseURL: "http://127.0.0.1:8000/api", 
}); 
 
api.interceptors.request.use( 
  (config) => { 
    const accessToken = localStorage.getItem("access"); 
 
    if (accessToken) { 
      config.headers.Authorization = `Bearer ${accessToken}`; 
    } 
 
    return config; 
  }, 
  (error) => { 
    return Promise.reject(error); 
  }, 
); 
 
export default api; 
>>>>>>> 4990ce55b0cc9f9e629b5d1ad65b07cb2ab0b5a5
