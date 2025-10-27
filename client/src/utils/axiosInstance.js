import axios from "axios";

const baseURL = import.meta.env.MODE == "development" ? "http://localhost:8000/api" : "http://16.170.168.114:8080/api"
console.log(import.meta.env)
console.log(baseURL)
export const axiosInstance = axios.create({baseURL, withCredentials: true})
