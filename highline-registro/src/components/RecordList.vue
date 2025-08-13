<script setup>
import { ref } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'


const props = defineProps({
  records: { type: Array, required: true }
})

const emit = defineEmits(['editRecord', 'deleteRecord', 'addRecord'])

function formatDate(ts) {
  if (!ts) return '-'
  try {
    return ts.toDate().toLocaleDateString()
  } catch {
    return new Date(ts).toLocaleDateString()
  }
}

function onEdit(record) {
  emit('editRecord', record)
}

function onDelete(record) {
  if (confirm('¿Eliminar este registro?')) {
    emit('deleteRecord', record)
  }
}

function onAdd() {
  emit('addRecord')
}
</script>

<template>
  <div class="record-list">
    <button @click="onAdd">Agregar registro</button>
    <table class="records-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Miembro</th>
          <th>Pegues</th>
          <th>Observación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in records" :key="r.id">
          <td>{{ formatDate(r.date) }}</td>
          <td>{{ r.member }}</td>
          <td>{{ r.pegues }}</td>
          <td>{{ r.obs || '-' }}</td>
          <td>
            <button @click="onEdit(r)" class="icon-btn" title="Editar" aria-label="Editar">
              <i class="fas fa-edit"></i>
            </button>
            <button @click="onDelete(r)" class="icon-btn" title="Borrar" aria-label="Borrar">
              <i class="fas fa-trash"></i>
            </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.records-table {
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
.record-list > button {
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.8rem;
}
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
</style>
