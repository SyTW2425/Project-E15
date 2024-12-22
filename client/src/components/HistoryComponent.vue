<template>  
    <main class="main-container">
        <div class="table-container scroll-container">
            <table class="table-sm main-table ">
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
                        <td>{{ new Date(session.date).toLocaleString().split(',')[0] }}</td>
                        <td>{{ session.methodName }}</td>
                        <td>{{ session.subjectName }}</td>
                        <td>{{ formatStudyTime(session.totalStudyTime)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<script lang="ts">
import { onMounted, defineComponent, ref } from 'vue';
import { useHistoryStore } from '@/stores/historyStore';
import type { HistoryInterfaces } from '@/models/historyModel';
// import SimpleBar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css';
import { Types } from 'mongoose';

export default defineComponent ({
    components: {
    },
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

        const formatStudyTime = (totalMinutes: number) => {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${hours}h ${minutes}m`;
        };

        return {
            history,
            formatStudyTime
        }
    },
});
</script>

<style scoped>

.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #151b23; 
}

.main-container h3 {
    text-align: center;
}

.table-container {
    text-align: center;
    position: relative; 
    width: 100%; 
    max-width: 600px;
}

.table-title {
    margin-bottom: 1rem; /* Espaciado entre el título y la tabla */
    font-size: 1.5rem;
    text-align: center; /* Centra el título horizontalmente */
}

.main-table {
    position: relative;
    width: 100%;
    max-width: 500px;
    max-height: 10px; /* Altura máxima del contenedor */
    overflow-y: auto; 
    border: 1px solid #08035000;
    font-size: 1rem;
    margin-top: 2rem; 
    background-color: #151B23;
    border-collapse: separate; 
    border-spacing: 0.9rem 0rem;
}


.main-table th, .main-table td {
    padding: 0.4rem; 
    text-align: center;
    padding-right: 15px;
}

.main-table th {
    font-weight: bold;
    text-align: center;
    vertical-align: middle;
    
}

.main-table th:nth-child(4),
.main-table td:nth-child(4) {
    width: 125px; /* Ajusta el ancho deseado */
    min-width: 125px;
    white-space: nowrap; /* Evita que el texto se divida en varias líneas */
}



.table-responsive {
    overflow-x: auto;
}
::v-deep(.scroll-container)::-webkit-scrollbar {
    width: 8px;
}

::v-deep(.scroll-container)::-webkit-scrollbar-track {
    background: #1f2a35;
}

::v-deep(.scroll-container)::-webkit-scrollbar-thumb {
    background-color: #3c4a56;
}

</style>