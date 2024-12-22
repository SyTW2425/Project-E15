<script setup lang="ts">
import NavbarMenu from '@/components/NavbarMenu.vue';
import HistoryComponent from '@/components/HistoryComponent.vue';
import GraphComponent from '@/components/GraphComponent.vue';
</script>

<template>
    <header>
        <NavbarMenu/>
    </header>
    <main>
        <div class="container">
            <div class="columna history-column">
                <!-- <h3>History</h3> -->
                <HistoryComponent/>
            </div>
            <div class="columna graph-column">
                <!-- <h3>Graph</h3> -->
                <GraphComponent/>
            </div>
        </div>
    </main>
</template>

<style scoped>

header {
    position: sticky;
    top: 0;
    z-index: 1000; 
    background-color: #151b23; 
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centra los elementos horizontalmente */
    align-items: center; /* Centra los elementos verticalmente */
    gap: 2rem;
    height: calc(100vh - 60px);  
}

.columna {
    flex: 1 1 auto; /* Asegura que las columnas se expandan */
    min-width: 0;
}
/* 
.history-column {

    padding: 1rem;
    text-align: center;
    overflow: auto;
    max-height: 40rem; 
    position: relative;
    max-width: 60rem;
    width: 100%;
    
}

.graph-column {
    text-align: center;
    padding: 1rem;

    
} */

.history-column,
.graph-column {
    text-align: center;
    padding: 1rem;
    max-width: 600px;
    width: 100%;
    overflow: auto;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .columna {
        flex: none; 
        width: 100%; 
    }
}
</style>