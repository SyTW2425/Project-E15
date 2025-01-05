<script setup lang="ts">
import SubjectCreator from '@/components/SubjectCreator.vue';
import NavbarMenu from '@/components/NavbarMenu.vue';
import SelectionSubject from '@/components/SelectionSubject.vue';
</script>


<template>
  <header>
    <NavbarMenu />
  </header>
  <main class="main-container">
    <div class="column-container">
      <SelectionSubject />
      <SubjectCreator />
    </div>
  </main>
</template>









<style scoped>
.main-container {
  display: flex;
  flex-direction: row; /* Disposición horizontal */
  justify-content: space-between; /* Distribuye espacio entre los hijos */
  align-items: flex-start; /* Alinea los componentes arriba */
  gap: 2rem; /* Espaciado entre los componentes */
  width: 100%;
  max-width: 1200px; /* Define un ancho máximo */
  margin: 0 auto; /* Centra el contenedor */
  padding: 1rem;
}


.column-container {
  flex: 1; /* Permite que el contenedor ocupe espacio proporcional */
  display: flex; /* Permite flexbox para hijos */
  flex-direction: row; /* Coloca los hijos horizontalmente */
  gap: 2.5rem; /* Espaciado entre los hijos */
}

</style>






