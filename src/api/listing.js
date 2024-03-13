import axios from "./axios";

const createListingRequest = (data) => {
    return axios.post("/listing/create", data)
}


const getListingsRequest = (id) => {
    return axios.get(`/listings/${id}`)
}

const getUniquedListing = (id) => {
    return axios.get(`/listing/${id}`)
}

const deleteRequest = (id) => {
    return axios.delete(`/delete/listing/${id}`)
}


const updateListingRequest = (id, data) => {
    return axios.put(`/update/listing/${id}`, data)
}



const getSearchedListings = (url) => {
    return axios.get(`/get?${url}`)
}









export {
    createListingRequest,
    getListingsRequest,
    deleteRequest,
    getUniquedListing,
    updateListingRequest,
    getSearchedListings
}