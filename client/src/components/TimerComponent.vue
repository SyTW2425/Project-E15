<template>
    <div class="timer-component">
        <h1 class="timer-title">Timer</h1>
        <div class="timer-visual" :style="{ color: timerColor }">
            <p class="timer-display">{{ timeDisplay }}</p>
        </div>
        <div class="button-collections">
            <button class="timer-button-start" @click="startTimer(workDuration, breakDuration)">START</button>
            <button class="timer-button-pause" @click="pauseTimer">PAUSE</button>
            <button class="timer-button-stop" @click="stopTimer">RESTART</button>
        </div>
    </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/authstore'
import { useTimerStore } from '@/stores/timer_store'
import { defineComponent, onMounted, computed, ref } from 'vue'
import { usePreferencesStore } from '@/stores/userPreferences_store'


import { Types } from 'mongoose'
export default defineComponent({
    name: 'TimerComponent',
    setup() {
        const authStore = useAuthStore();
        const timerStore = useTimerStore();
        const userIDString = authStore.loggedUserId
        const preferencesStore = usePreferencesStore();
        if (!userIDString) {
            throw new Error('No se ha encontrado el ID del usuario')
        }
        const userID = new Types.ObjectId(userIDString)
        const timeDisplay = computed(() => timerStore.timeDisplay)
        const workDuration = ref(0);
        const breakDuration = ref(0);
        const methodName = ref('');
        onMounted(async () => {
            try {
                const preferences = await preferencesStore.getUserPreferences(userID);
                console.log("preferences", preferences)
                if (preferencesStore.userPreferences.length > 0) {
                    const preferences = preferencesStore.userPreferences[0];
                    workDuration.value = preferences.workDuration;
                    breakDuration.value = preferences.breakDuration;
                }

            } catch (error) {
                console.error('Error al obtener las preferencias del usuario:', error);
            }
        });

        const timerColor = computed(() => {
            const remainingTime = timerStore.currentTime; 
            const halfWorkDuration = workDuration.value * 30; 
            return remainingTime <= halfWorkDuration ? 'rgb(185, 58, 58)' : 'rgb(18, 102, 102)';
        });

        const startTimer = (workDuration: number, breakDuration: number) => {
            timerStore.startTimer(workDuration, breakDuration)
        }
        const pauseTimer = () => {
            timerStore.pauseTimer()
        }

        const stopTimer = () => {
            timerStore.stopTimer()
        }

        return {
            timeDisplay,
            startTimer,
            workDuration,
            breakDuration,
            pauseTimer,
            stopTimer,
            timerColor,
            methodName
        }
    } 
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

body {
    background-color: #151B23;
    margin: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    overflow: hidden;
}

.timer-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.timer-component h1 {
    margin-bottom: 20px;
    font-size: 3rem;
}

.timer-visual {
    display: flex;  
    align-items: center;
    justify-content: center;
    width: 80vw;
    height: 80vw;
    max-width: 350px;
    max-height: 350px;
    border: 6px solid rgb(18, 102, 102);
    color: rgb(18, 102, 102);
    border-radius: 50%;
    font-family: monospace;
    font-size: 4rem;
}

.timer-title {
    font-family: 'Lobster', cursive;
    font-size: 2rem;
}

.button-collections {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

button {
    width: 80px;
    height: 40px; 
    margin: 10px;
    font-size: 0.9rem;
    background-color: #4c7761; 
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.6s;
    border-radius: 50px;
}

button:hover {
    background-color: #344E41;
    cursor: not-allowed;
    border-color: #83af82;
    box-shadow: 0px 0px 4px #79ac92;
}

@media (max-width: 600px) {
    .timer-component h1 {
        font-size: 2.5rem;
    }

    .timer-visual {
        font-size: 3rem;
    }

    button {
        width: 70px;
    }
}
</style>

