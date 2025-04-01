import {axiosi} from '../../config/axios'

export const addToCart=async(item)=>{
    try {
        const res=await axiosi.post('http://localhost:8000/cart',item)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchCartByUserId=async(id)=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/cart/user/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const updateCartItemById=async(update)=>{
    try {
        const res=await axiosi.patch(`http://localhost:8000/cart/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteCartItemById=async(id)=>{
    try {
        const res=await axiosi.delete(`http://localhost:8000/cart/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const resetCartByUserId=async(userId)=>{
    try {
        const res=await axiosi.delete(`http://localhost:8000/cart/user/${userId}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
