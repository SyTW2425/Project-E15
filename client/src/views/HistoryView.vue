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
            <div class="columna">
                <h3>History</h3>
                <HistoryComponent/>
            </div>
            <div class="columna">
                <h3>Graph</h3>
                <GraphComponent/>
            </div>
        </div>
    </main>
</template>

<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
}

.columna {
    flex: 1;
    padding: 2rem;
    min-width: 18rem;
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