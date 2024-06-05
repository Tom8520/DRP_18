import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
});


export const setAuthToken = (token: any) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else
        delete axios.defaults.headers.common["Authorization"];
 }