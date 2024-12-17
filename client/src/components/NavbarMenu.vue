<template>
  <header class="menu-bar">
    <div class="menu-container">
      <nav class="menu">
        <div class="menu-toggle" @click="toggleMenu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
        <ul :class="{ 'active': isMenuActive }">
          <li><img src="./../assets/SM_logo.png" alt="Method Study Logo" class="logo" /></li>
          <li><h1 class="logo-text">Method Study</h1></li>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/about">Acerca de </router-link></li>
          <li><a href="#contacto">Contacto</a></li>
          <div class="auth-buttons">
            <ul>
              <li v-if="auth.isAuthenticated">
                <h3>Bienvenido, {{ auth.name }}</h3>
              </li>
              <li v-else>
                <button @click="handleLogin">Iniciar Sesión</button>
              </li>
              <li v-if="auth.isAuthenticated">
                <button class='logout' @click="handleLogout">Cerrar Sesión</button>
              </li>
              <li v-else>
                <button @click="handleRegister">Registrarse</button>
              </li>
            </ul>
          </div>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/authstore'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavbarMenu',
  setup() {
    const auth = useAuthStore()
    const router = useRouter()
    const isMenuActive = ref(false)

    const toggleMenu = () => {
      isMenuActive.value = !isMenuActive.value
    }

    const handleLogin = () => {
      router.push('/login')
    }

    const handleRegister = () => {
      router.push('/register')
    }

    const handleLogout = async () => {
      await auth.logout()
      router.push('/')
    }

    return {
      auth,
      handleLogin,
      handleRegister,
      handleLogout,
      isMenuActive,
      toggleMenu,
    }
  },
})
</script>

<style scoped>
.menu-bar {
  background-color: #344e41;
  color: rgba(7, 255, 139, 0.308);
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
}

.menu {
  display: flex;
  justify-content: space-between;
}

.menu-container {
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.bar {
  height: 3px;
  width: 25px;
  background-color: white;
  margin: 3px 0;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 10;
  display: flex;
}

.menu ul.active {
  display: block;
}

.menu ul li img.logo {
  margin-right: 10px;
}

.logo {
  height: auto;
  width: 50px;
  object-fit: contain;
  margin-top: 10;
}

.menu ul li h1 {
  margin-top: -6px;
}
.menu ul li {
  margin-left: 30px;
  margin-top: 0;
  height: 60px;
  display: flex;
  align-items: center;
}
.menu ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  line-height: 60px;
}

.menu ul li a:hover {
  color: #a3b18a;
  margin-top: 4px;
}

.menu h3 {
  margin-top: 10px;
  font-size: 1.2rem;
}

.auth-buttons button {
  background-color: #507757;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.4s;
  font-size: 0.9rem;
}

.auth-buttons {
  margin-left: 100px;
}

.auth-buttons button:hover {
  background-color: #23352c;
  margin-top: 2px;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .menu ul {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #344e41;
    width: 100%;
  }

  .menu ul.active {
    display: flex;
  }

  .auth-buttons {
    margin-left: 0;
  }
}
</style>
