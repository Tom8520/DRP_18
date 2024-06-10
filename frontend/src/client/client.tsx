import axios from "axios";

export const client = axios.create({
    baseURL: "/api",
});

export const setAuthToken = (token: any) => {
    if (token) {
        client.defaults.headers.common["Authorization"] = `${token}`;
    }
    else
        delete client.defaults.headers.common["Authorization"];
 }

 export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const isAuthenticated = () => {
    return !!getToken();
  };
  