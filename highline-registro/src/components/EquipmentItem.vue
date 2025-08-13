<script setup>
import { computed } from 'vue'

const props = defineProps({
  equipment: {
    type: Object,
    required: true
  }
})

// Por ahora solo nombre porque no tenemos datos derivados
// Puedes extender para mostrar días usados, pegues y última vez montado cuando tengas esa info

const name = computed(() => props.equipment.name || 'Sin nombre')
</script>

<template>
  <div class="equipment-item">
    <h3>{{ name }}</h3>
    <!-- Puedes agregar más info resumen aquí -->
  </div>
</template>

<style scoped>
.equipment-item {
  padding: 1rem;
  background: black;
  border-radius: 6px;
  box-shadow: 0 0 4px rgba(0,0,0,0.1);
  cursor: pointer;
  user-select: none;
  color: white;
}

.equipment-item:hover {
  background: darkgray;
}
</style>
