<script setup>
import { ref } from 'vue'
import EquipmentList from './components/EquipmentList.vue'
import EquipmentDetails from './components/EquipmentDetails.vue'

const selectedEquipmentId = ref(null)

function onSelectEquipment(id) {
  selectedEquipmentId.value = id
}

function onBack() {
  selectedEquipmentId.value = null
}
</script>

<template>
  <div class="app">
    <header>
      <h1>Seguimiento de equipos</h1>
    </header>

    <main>
      <EquipmentList v-if="!selectedEquipmentId" @selectEquipment="onSelectEquipment" />
      <EquipmentDetails v-else :equipmentId="selectedEquipmentId" @back="onBack" />
    </main>

    <!-- Marca de agua -->
    <div class="watermark">AS</div>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  position: relative;
}

header {
  text-align: center;
  margin-bottom: 1rem;
}

main {
  background: rgb(116, 165, 134);
  padding: 1rem;
  border-radius: 8px;
}

/* Marca de agua fija abajo derecha */
.watermark {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 1.5rem;
  color: rgba(0,0,0,0.1);
  user-select: none;
  pointer-events: none;
  font-weight: bold;
  font-family: monospace;
  z-index: 9999;
}

/* Responsive */
@media (max-width: 600px) {
  .app {
    padding: 0.5rem;
  }
  .watermark {
    font-size: 1.2rem;
    bottom: 5px;
    right: 5px;
  }
}
</style>
