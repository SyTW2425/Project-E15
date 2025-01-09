<script setup lang="ts">
import NavbarMenu from "@/components/NavbarMenu.vue";
</script>

<template>
  <header>
    <NavbarMenu />
  </header>
  <main class="about-us-container">
    <section class="about-us-section">
      <h1>About Us</h1>
      <p>
        Welcome to StudyMethod! Our platform is designed to help students
        organize and optimize their study sessions with tools tailored to their
        needs.
      </p>
      <p>
        We are passionate about education and productivity, and we strive to
        provide the best experience for our users.
      </p>
      <h2>Meet the Team</h2>
      <ul class="team-list">
        <li>
          <h3>Marcos Padilla Herrera</h3>
          <p>Email: <a href="mailto:alu0101045177@ull.edu.es">alu0101045177@ull.edu.es</a></p>
        </li>
        <li>
          <h3>Emilio González Díaz</h3>
          <p>Email: <a href="mailto:alu0101316734@ull.edu.es">alu0101316734@ull.edu.es</a></p>
        </li>
        <li>
          <h3>Santiago López Cerro</h3>
          <p>Email: <a href="mailto:alu0101763613@ull.edu.es">alu0101763613@ull.edu.es</a></p>
        </li>
      </ul>
    </section>
  </main>
</template>

<style>
.about-us-container {
  padding: 2rem;
  background-color: #f7f7f7;
  color: #333;
  font-family: Arial, sans-serif;
}

.about-us-section {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.about-us-section h1 {
  font-size: 2.5rem;
  color: #4caf50;
}

.about-us-section p {
  font-size: 1.2rem;
  margin: 1rem 0;
}

.about-us-section h2 {
  margin-top: 2rem;
  font-size: 2rem;
  color: #4caf50;
}

.team-list {
  list-style: none;
  padding: 0;
}

.team-list li {
  margin: 1.5rem 0;
  border-bottom: 3px solid #ccc;
  padding-bottom: 1rem;
}

.team-list h3 {
  font-size: 1.5rem;
  color: #333;
}

.team-list a {
  color: #4caf50;
  text-decoration: none;
}

.team-list a:hover {
  text-decoration: underline;
}
</style>
