import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { HistoryInterfaces } from "@/models/historyModel";
import { History } from "@/models/historyModel";
import { Types } from "mongoose";

export const useHistoryStore = defineStore ('History', () => {
    const history = ref<HistoryInterfaces[]>([]);
    const error = ref<string | null>(null);
    const errorMessage = computed(() => {
        return error.value ? error.value : '';
    });

    async function getHistory(userID: Types.ObjectId): Promise<HistoryInterfaces[]> {
        try {
            const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300';
            const response = await axios.get<HistoryInterfaces[]>(`${apiUrl}/history/${userID}`);
            history.value = response.data.map((history) => new History(
                history.userId, 
                history.methodName, 
                history.subjectName, 
                history.totalStudyTime, 
                history.date
            ));
            console.log('Store: ', history.value);
            error.value = null;
            return history.value;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Error:', err.message);
                error.value = 'Error getting the list of methods';
            }
            return []; 
        }
    }

    return { history, errorMessage, getHistory}
})