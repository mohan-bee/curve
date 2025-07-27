import axios from "axios";

const baseURL = import.meta.env.MODE == "development" ? "http://localhost:8000/api" : "https://curve-9qnx.onrender.com/api"
console.log(baseURL)
export const axiosInstance = axios.create({baseURL, withCredentials: true})
