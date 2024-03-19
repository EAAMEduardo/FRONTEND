import axios from "axios"

const instance = axios.create({
    baseURL: "http://mernbyeaam.netlify.app/api",
    withCredentials: true
})

export default instance