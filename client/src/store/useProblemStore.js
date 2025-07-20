import {create} from 'zustand'
import { axiosInstance } from '../utils/axiosInstance'
import toast from 'react-hot-toast'

export const useProblemStore = create((set) => ({
    problems: null,
    getAllProblems: async () => {
        try {
            const res = await axiosInstance.get('/problem/all')
            console.log(res)
            set({problems: res.data.problems})
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },
    createProblem: async (name, description,topic, testcases) => {
        try {
            const res = await axiosInstance.post('/problem/create', {name, description,topic, testcases})
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },
    editProblem: async (id,name, description,topic, testcases) => {
        try {
            const res = await axiosInstance.put(`/problem/edit/${id}`, {name, description,topic, testcases})
            toast.success(res.data.msg)
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }
    },
    deleteProblem: async (id) => {
        try {
            const res = await axiosInstance.delete(`/problem/delete/${id}`)
            set({problems: res.data.problems})
            toast.success(res.data?.msg)
        } catch (error) {
            console.log(error.message)
        }
        
    }
}))