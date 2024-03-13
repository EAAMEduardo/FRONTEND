import axios from "./axios"

const register = (user) => {
    return axios.post("/register", user)
}


const singIn = (user) => {
    return axios.post("/login", user)
} 

const google = (user) => {
    return axios.post("/google", user)
}

const update = (id,user) => {
    return axios.put(`/update/${id}`, user)
}

const verifyTokenRequest = () => {
    return axios.get("/verify-token")
}

const logout = () => {
    return axios.post("/logout")
}

const deleteAccount = (id) => {
  return axios.post(`/delete/${id}`)
}


const getOwner = (id) => {
    return axios.get(`/getUser/${id}`)
}

const deleteFav = (id, listing) => {
    return axios.post(`/delete-fav/${id}`, listing)
}



export {
    register,
    singIn,
    google,
    update,
   verifyTokenRequest,
   logout,
   deleteAccount,
   getOwner,
   deleteFav
}