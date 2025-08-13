<script setup>
import { ref, onMounted } from 'vue'
import { firebaseActions } from '../firebase/services'
import EquipmentItem from './EquipmentItem.vue'

const equipments = ref([])

async function loadEquipments() {
  equipments.value = await firebaseActions.getAllEquipment()
}

onMounted(loadEquipments)

function selectEquipment(id) {
  // emit evento para que App.vue sepa qué equipo fue seleccionado
  emit('selectEquipment', id)
}

const emit = defineEmits(['selectEquipment'])
</script>

<template>
  <section>
    <h2>Equipos</h2>
    <div v-if="!equipments.length">Cargando equipos...</div>
    <ul class="equipment-list">
      <li v-for="eq in equipments" :key="eq.id">
        <EquipmentItem :equipment="eq" @click="selectEquipment(eq.id)" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
.equipment-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  margin-bottom: 1rem;
}
</style>
