import axios from "axios"

const instance = axios.create({
    baseURL: "https://mernbyeaam.netlify.app/api",
    withCredentials: true
})

export default instance