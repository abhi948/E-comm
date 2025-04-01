import {axiosi} from '../../config/axios'

export const createReview=async(review)=>{
    try {
        const res=await axiosi.post('http://localhost:8000/reviews',review)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const fetchReviewsByProductId=async(id)=>{
    try {
        const res=await axiosi.get(`http://localhost:8000/reviews/product/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}

export const updateReviewById=async(update)=>{
    try {
        const res=await axiosi.patch(`http://localhost:8000/reviews/${update._id}`,update)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const deleteReviewById=async(id)=>{
    try {
        const res=await axiosi.delete(`http://localhost:8000/reviews/${id}`)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}