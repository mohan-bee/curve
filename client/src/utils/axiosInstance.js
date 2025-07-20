import axios from "axios";

export const axiosInstance = axios.create({baseURL: "https://curve-9qnx.onrender.com/api", withCredentials: true})
