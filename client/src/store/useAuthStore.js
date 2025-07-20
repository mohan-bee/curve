import toast from 'react-hot-toast'
import {create} from 'zustand'
import { axiosInstance } from '../utils/axiosInstance'

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    users: null,
    login: async (username,email) => {
        set({loading: true})
        try {
            const res = await axiosInstance.post('/auth/login', {username, email})
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
        finally{
            set({loading: false})
        }
    },
    verify: async (otp) => {
        set({loading: true})
        try {
            const res = await axiosInstance.post('/auth/verify', {otp})
             if (res.status === 200) {
            set({ verified: true })
            toast.success(res.data.msg)
            } else {
                toast.error('Verification failed.')
            }
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
        finally{
            set({loading: false})
        }
    },
    getProfile: async () => {

        try {
            const res = await axiosInstance.get('/auth/profile')
            console.log("User",res.data.user.verified)
            set({user: res.data.user})
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },
    getAllUsers: async () => {

        try {
            const res = await axiosInstance.get('/auth/admin/users')
            console.log("DATA",res.data)
            set({users: res.data.allUsers})
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
        
    },
    blockUser: async (id) => {
        try {
            const res = await axiosInstance.get(`/auth/admin/block/${id}`)
            set({users: res.data.users})
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },
    verifyUser: async (id) => {
        try {
            const res = await axiosInstance.get(`/auth/admin/verify/${id}`)
            set({users: res.data.users})
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },
    logout: async () => {
         try {
            const res = await axiosInstance.get('/auth/logout')
            toast.success(res.data?.msg)
            window.location.reload()
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    }

}))