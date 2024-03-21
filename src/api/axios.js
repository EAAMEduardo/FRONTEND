import axios from "axios"

const instance = axios.create({
    baseURL: "https://backend-ol78.onrender.com/api",
    withCredentials: true
})

export default instance