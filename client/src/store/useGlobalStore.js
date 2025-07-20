import {create} from 'zustand'

export const useGlobalStore = create((set, get) => ({
    noOfProblemsSolved: 1,
    timer: 0,
    timerInterval: null,
    currentPoints: 0,
    problemSolved: async () => {
        set({noOfProblemsSolved: get().noOfProblemsSolved + 1})
    },
    resetProblemSolved: async () => {
        set({noOfProblemsSolved: 1})
    },
    startTimer: () => {
        const existing = get().timerInterval;
        if (existing) clearInterval(existing); 

        set({ timer: 30 * 60 });  

        const interval = setInterval(() => {
            const current = get().timer;
            if (current <= 1) {
                clearInterval(get().timerInterval);
                set({ timer: 0, timerInterval: null });
                console.log("Timer finished");
            } else {
                set({ timer: current - 1 });
            }
        }, 1000);

        set({ timerInterval: interval });
    },


    stopTimer: () => {
        const interval = get().timerInterval;
        if (interval) {
            clearInterval(interval);
            set({ timerInterval: null });
        }
    },
    
}))