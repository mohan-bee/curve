import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
export const useTopicStore = create((set, get) => ({
    topics: null,
    randomProblem: null,
    createTopicLoading: false,
    getTopicsLoading: false,


    getAllTopics: async () => {
        set({ getTopicsLoading: true });
        try {
            const res = await axiosInstance.get('/topic/all');
            set({ topics: res.data.topics });
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ getTopicsLoading: false });
        }
    },

    createTopic: async (title, description, coverImg) => {
        set({ createTopicLoading: true });
        try {
            const res = await axiosInstance.post('/topic/create', { title, description, coverImg });
            set({ topics: res.data.topic });
            toast.success(res.data?.msg);
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ createTopicLoading: false });
        }
    },

    editTopic: async (id, title, description, coverImg) => {
        try {
            const res = await axiosInstance.put(`/topic/edit/${id}`, { title, description, coverImg });
            set({ topics: res.data.topic });
            toast.success(res.data?.msg);
        } catch (error) {
            console.log(error.message);
        }
    },

    deleteTopic: async (id) => {
        try {
            const res = await axiosInstance.delete(`/topic/delete/${id}`);
            set({ topics: res.data.topics });
            toast.success(res.data?.msg);
        } catch (error) {
            console.log(error.message);
        }
    },

    getOneTopic: async (id) => {
        try {
            const res = await axiosInstance.get(`/topic/${id}`);
            set({ randomProblem: res.data.randomProblem });
            console.log(res.data);
            toast.success(res.data?.msg);
        } catch (error) {
            console.log(error.message);
        }
    },

    exitCurve: async () => {
        try {
            const res = await axiosInstance.put('/topic/exit');
            toast.success(res.data?.msg);
            get().stopTimer();  
        } catch (error) {
            console.log(error.message);
        }
    },


    
}));
