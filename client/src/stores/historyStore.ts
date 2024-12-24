import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { HistoryInterfaces } from '@/models/historyModel'
import { History } from '@/models/historyModel'
import { Types } from 'mongoose'
// import VUE_API_URL from "@/axios.default.baseUrl";

export const useHistoryStore = defineStore('History', () => {
    const history = ref<HistoryInterfaces[]>([])
    const error = ref<string | null>(null)
    const errorMessage = computed(() => {
    return error.value ? error.value : ''
    })

    async function getHistory(userID: Types.ObjectId): Promise<HistoryInterfaces[]> {
    try {
        const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300'
        const response = await axios.get<HistoryInterfaces[]>(`${apiUrl}/history/${userID}`)
        history.value = response.data.map(
        (history) =>
            new History(
                history.userId,
                history.methodName,
                history.subjectName,
                history.totalStudyTime,
                history.date,
            ),
        )
        error.value = null
        return history.value
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error('Error:', err.message)
            error.value = 'Error getting the list of methods'
        }
        return []
        }
    }

    async function postHistory(
    userID: string,
    methodName: string,
    subjectName: string,
    totalStudyTime: number,
    ) {
    const userObjectId = new Types.ObjectId(userID)
    console.log('userID', userObjectId)
    console.log('methodName', methodName)
    console.log('subjectName', subjectName)
    console.log('totalStudyTime', totalStudyTime)

    try {
        console.log('history store post')
        const apiUrl = import.meta.env.VUE_APP_API_URL || 'http://localhost:5300'
        const response = await axios.post(`${apiUrl}/history`, {
        userId: userObjectId,
        methodName,
        subjectName,
        totalStudyTime,
        })
        error.value = null
        console.log('post History:', response.data)
      return response.data // Retorna la respuesta del servidor si es necesario
    } catch (err: unknown) {
        if (err instanceof Error) {
        console.error('Error:', err.message)
        error.value = 'Error al guardar la sesión'
        }
        return []
    }
    }

    return {
    history,
    errorMessage,
    getHistory,
    postHistory,
    }
})
