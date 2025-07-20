import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";


export const useRunner = create((set) => ({
    // testOutput: null,
    runCode: async (code, args) => {
        set({loading: true})
        try {
            const res = await axiosInstance.post('/code/run', {code, args})
            // set({testOutput: res.data.output || res.data.error})
            console.log(res.data)
            return res.data.output
        } catch (error) {
            toast.error(error?.response?.data?.msg || error.message)
        }

    }
    
}))

