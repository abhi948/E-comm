import { axiosi } from "../../config/axios";

export const addAddress=async(address)=>{
    try {
        const res=await axiosi.post("http://localhost:8000/address",address)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchAddressByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/address/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateAddressById=async(update)=>{
    try {
        const res=await axiosi.patch(`http://localhost:8000/address/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteAddressById=async(id)=>{
    try {
        const res=await axiosi.delete(`http://localhost:8000/address/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}