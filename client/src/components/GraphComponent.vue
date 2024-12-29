<template>  
    <main class="main-container">
        <!-- <p>GraphComponent</p> -->
            <div>
                <h3>Study Time Chart</h3>
                <Bar v-if="chartData" :chart-data="chartData" :options="chartOptions" />
                <p v-else>Cargando datos...</p>
            </div>
    </main>
</template>
    
<script lang="ts">

import { ref, onMounted, defineComponent } from 'vue';
import { useHistoryStore } from '@/stores/historyStore';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';
import { Types } from "mongoose";
import type { HistoryInterfaces } from '@/models/historyModel';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);



    export default defineComponent({
        components: {
            Bar
        },
        setup() {
            
            const historyStore = useHistoryStore();
            const userIDString  = sessionStorage.getItem('userId');
            if (!userIDString) {
                throw new Error('No se ha encontrado el ID del usuario');
            }

            const userID = new Types.ObjectId(userIDString);
            const history = ref<HistoryInterfaces[]>([])

            const chartData = ref({
            labels: [] as string[],
                datasets: [
                    {
                    label: 'Tiempo Total de Estudio (min)',
                    backgroundColor: '#344e41',
                    data: [] as number[],
                    },
                ],
            });

            const chartOptions = {
                responsive: true,
                plugins: {
                    legend: {
                    display: true,
                    },
                },
            };

            onMounted(async () => {
                try {
                    history.value = await historyStore.getHistory(userID);
                    if (history.value.length === 0) {
                        console.warn('No se encontraron sesiones de estudio.');
                    } else {
                        chartData.value.labels = history.value.map((session) => new Date(session.date).toLocaleDateString());
                        chartData.value.datasets[0].data = history.value.map((session) => Number(session.totalStudyTime)  );
                        console.log('totalTimeGraph:', chartData.value);






                        //console.log('dategraph: ',history.value.map((session) => new Date(session.date).toLocaleDateString()))
                        //console.log('totalTimeGraph: ', history.value.map((session) => session.totalStudyTime))
                    }
                } catch (error) {
                    console.error('Error al obtener el historial:', error);
                    // Aquí podrías mostrar un mensaje al usuario
                }
            });

            return {
                chartData,
                chartOptions
            }
        },
    });

</script>