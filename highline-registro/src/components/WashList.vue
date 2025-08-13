<script setup>
import '@fortawesome/fontawesome-free/css/all.css'

const props = defineProps({
  washes: { type: Array, required: true }
})

const emit = defineEmits(['editWash', 'deleteWash', 'addWash'])

function formatDate(ts) {
  if (!ts) return '-'
  try {
    return ts.toDate().toLocaleDateString()
  } catch {
    return new Date(ts).toLocaleDateString()
  }
}

function onEdit(wash) {
  emit('editWash', wash)
}

function onDelete(wash) {
  if (confirm('¿Eliminar este registro de lavado?')) {
    emit('deleteWash', wash)
  }
}

function onAdd() {
  emit('addWash')
}
</script>

<template>
  <div class="wash-list">
    <button @click="onAdd">Agregar lavado</button>
    <table class="washes-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Miembro</th>
          <th>Observación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="w in washes" :key="w.id">
          <td>{{ formatDate(w.date) }}</td>
          <td>{{ w.member }}</td>
          <td>{{ w.obs || '-' }}</td>
          <td>
            <button @click="onEdit(w)" class="icon-btn" title="Editar" aria-label="Editar">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="onDelete(w)" class="icon-btn" title="Borrar" aria-label="Borrar">
              <i class="fas fa-trash"></i>
            </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.icon-btn {
  background: none;
  border: none;
  padding: 6px;            /* poco padding para no ser tan grandes */
  margin: 0 4px;
  cursor: pointer;
  color: #555;
  font-size: 16px;         /* tamaño del icono */
  border-radius: 6px;      /* bordes redondeados */
  transition: background-color 0.2s ease, color 0.2s ease;
}

.icon-btn:hover {
  background-color: #eee;
  color: #111;
}

.icon-btn:focus {
  outline: 2px solid #007BFF;
  outline-offset: 2px;
}
.washes-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
button {
  margin-right: 0.3rem;
  cursor: pointer;
}
.wash-list > button {
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.8rem;
}
</style>
