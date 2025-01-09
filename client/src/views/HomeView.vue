<script setup lang="ts">
import NavbarMenu from "@/components/NavbarMenu.vue";
import { ref, onMounted } from 'vue';

const show = ref(false); 
onMounted(() => { 
  show.value = true; 
});
</script>

<template>
  <header>
    <NavbarMenu/>
  </header>
  <main class="home">
    <transition name="fade">
      <section v-if="show" class="welcome-section">
        <h1 class="welcome-title">Welcome to StudyMethod!</h1>
        <p class="welcome-subtitle">Your perfect tool to organize study sessions.</p>
        <div class="features">
          <div class="feature">
            <h2>📚 Manage Your Time</h2>
            <p>Organize work and break sessions with our intuitive timer.</p>
          </div>
          <div class="feature">
            <h2>📊 Track Your Progress</h2>
            <p>Review personalized stats to improve productivity.</p>
          </div>
          <div class="feature">
            <h2>🔒 Customize Your Preferences</h2>
            <p>Adapt the experience to your study needs.</p>
          </div>
        </div>
      </section>
    </transition>
  </main>
</template>

<style scoped>
/* General Styles */
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem;
  background-color: transparent;
  color: #344e41;
  min-height: 100vh;
  box-sizing: border-box;
}

/* Welcome Section */
.welcome-section {
  text-align: center;
  max-width: 900px;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #1a3c34;
  margin-bottom: 0.5rem;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #5a7769;
  margin-bottom: 2rem;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature {
  background-color: #e7f5ef;
  border: 1px solid #cce6d9;
  border-radius: 8px;
  padding: 1rem;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.feature h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #1a3c34;
}

.feature p {
  margin: 0;
  font-size: 1rem;
  color: #344e41;
}

/* Transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
