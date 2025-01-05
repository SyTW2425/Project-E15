<template>
  <body>
    <div class="subject-selection">
      <h2>Select your subject to study</h2>
      <div class="subjects">
        <div v-for="subject in subjects" :key="subject.name" class="subject-card">
          <h3>{{ subject.name }}</h3>
          <p>{{ subject.description }}</p>
          <p style="font-weight: bold">
            Subject name: <span class="work-duration">{{ subject.name }}</span> minutos
          </p>
          <p style="font-weight: bold">
            Subject description: <span class="break-duration">{{ subject.description}}</span> minutos
          </p>
          <button @click="selectSubject(subject)">Seleccionar</button>
        </div>
      </div>
    </div>
  </body>
</template>


<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, computed } from 'vue'  
import { useAuthStore } from '@/stores/authstore'
import { useUsersStore } from '@/stores/users_store'
import { useSubjectStore } from '@/stores/subjects_store'
import { usePreferencesStore } from '@/stores/userPreferences_store' 
import type { Subject } from '@/models/subject_model'

export default defineComponent({
  name: 'SubjectSelection',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const userStore = useUsersStore()
    const subjectStore = useSubjectStore()
    const preferencesStore = usePreferencesStore();
    const userIDString = authStore.loggedUserId
    const subjects = computed(() => subjectStore.subjects);
    onMounted(async () =>{
        await userStore.getUsers();
        await subjectStore.getSubject();         
    }) 
    const selectSubject = async (subject:Subject) =>{
      const methodId = sessionStorage.getItem('methodId');
      if (!userIDString) {
          throw new Error('No se ha encontrado el ID del usuario')
      }
      if(!subject._id)
      {
        throw new Error('No se ha encontrado el ID de la asigunatura')
      }
      if(!methodId) {
                throw new Error('User ID or method ID not found');
      }     
      sessionStorage.setItem('methodId', subject._id.toString());
      sessionStorage.setItem('methodName', subject.name);
      await preferencesStore.addUserPreferences(userIDString, methodId, subject._id.toString())  

      router.push('/timer')
      
    }    
    return{
      selectSubject,
      subjects
    }
}   
})
</script>


<style scoped>
.subject-selection h2{
  text-align: center;
  margin-bottom: 2rem;
  color: rgb(139, 184, 172);
}

.methods {
  display: flex;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 60px;
  gap: 20px;
}



.subject-card {
  flex: 1 1 calc(25% - 20px);
  max-width: 300px;
  min-width: 100px;
  border: 1px solid #0a4f58;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.subject-card h3 {
  margin-top: 0;
  color: #2b7288;
  font-weight: bold;
}

.subject-card p {
  color: #588157;
}

.subject-card button {
  background-color: #344e41;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.4s;
}
.name {
  color: #3d9669;
  font-weight: bold;
  font-size: 1.2em;
}

.description {
  color: #2788a5;
  font-weight: bold;
  font-size: 1.2em;
}

.subject-selection .subjects {
  display: flex;
  flex-direction: column; /* Organiza las tarjetas en columnas */
  gap: 1rem; /* Espaciado entre tarjetas */
  align-items: center; /* Centra horizontalmente */
}

</style>