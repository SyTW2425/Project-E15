<template>  
    <main class="main-container">
            <table class="table table-striped table-dark table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Method</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(session, index) in history" :key="index"> 
                        <td>{{ new Date(session.date).toLocaleString() }}</td>
                        <td>{{ session.methodName }}</td>
                        <td>{{ session.subjectName }}</td>
                        <td>{{ session.totalStudyTime }}</td>
                    </tr>
                </tbody>
            </table>
    </main>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';
import { useHistoryStore } from '@/stores/historyStore';
import type { HistoryInterfaces } from '@/models/historyModel';
import { Types } from 'mongoose';

export default defineComponent ({
    setup() {
        const historyStore = useHistoryStore();
        const userIDString  = sessionStorage.getItem('userId');
        if (!userIDString) {
            throw new Error('No se ha encontrado el ID del usuario');
        }
        const userID = new Types.ObjectId(userIDString);
        const history = ref<HistoryInterfaces[]>([])

        onMounted(async () => {
            history.value = await historyStore.getHistory(userID);
            console.log('Components: ', history.value);
        });

        return {
            history
        }
    },
});
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #151B23; 
}

.table {
    font-size: 0.8rem; /* Reducir tamaño del texto */
    max-width: 700px; /* Limitar el ancho de la tabla */
    margin: auto; /* Centrar la tabla */
}

.table th, .table td {
    padding: 0.4rem; /* Reducir padding */
    text-align: center;
}

.table-responsive {
    overflow-x: auto;
}
</style>