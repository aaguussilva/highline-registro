<script setup>
import { ref, onMounted } from 'vue'
import { firebaseActions } from '../firebase/services'
import RecordList from './RecordList.vue'
import WashList from './WashList.vue'
import RecordForm from './RecordForm.vue'
import WashForm from './WashForm.vue'

const props = defineProps({
  equipmentId: { type: String, required: true }
})

const emits = defineEmits(['back'])

const records = ref([])
const washes = ref([])

const editingRecord = ref(null) // null o registro para editar
const editingWash = ref(null)

async function loadData() {
  records.value = await firebaseActions.getRecords(props.equipmentId)
  washes.value = await firebaseActions.getWashes(props.equipmentId)
}

onMounted(loadData)

function goBack() {
  emits('back')
}

// --- Record handlers ---

function onAddRecord() {
  editingRecord.value = { id: null, member: '', pegues: 0, obs: '' }
}


function onEditRecord(record) {
  editingRecord.value = { ...record }
}

async function onSaveRecord(record) {
  try {
    if (record.id) {
      // editar no implementado en tu servicio, podés agregar updateDoc allí
      alert('Editar registro no implementado todavía')
    } else {
      await firebaseActions.addRecord(props.equipmentId, record.member, record.pegues, record.obs)
    }
    editingRecord.value = null
    await loadData()
  } catch (e) {
    console.error(e)
    alert('Error guardando registro')
  }
}

function onCancelRecord() {
  editingRecord.value = null
}

async function onDeleteRecord(record) {
  if (!confirm('Eliminar registro?')) return
  try {
    // borrar tampoco implementado, habría que agregar deleteDoc
    alert('Eliminar registro no implementado todavía')
  } catch (e) {
    console.error(e)
    alert('Error borrando registro')
  }
}

// --- Wash handlers ---

function onAddWash() {
  editingWash.value = null
}

function onEditWash(wash) {
  editingWash.value = { ...wash }
}

async function onSaveWash(wash) {
  try {
    if (wash.id) {
      alert('Editar lavado no implementado todavía')
    } else {
      await firebaseActions.addWash(props.equipmentId, wash.member, wash.obs)
    }
    editingWash.value = null
    await loadData()
  } catch (e) {
    console.error(e)
    alert('Error guardando lavado')
  }
}

function onCancelWash() {
  editingWash.value = null
}

async function onDeleteWash(wash) {
  if (!confirm('Eliminar registro de lavado?')) return
  try {
    alert('Eliminar lavado no implementado todavía')
  } catch (e) {
    console.error(e)
    alert('Error borrando lavado')
  }
}
</script>

<template>
  <section>
    <button @click="goBack">← Volver a Equipos</button>
    <h2>Detalles Equipo</h2>

    <h3>Registros de Pegue</h3>
    <RecordList
      :records="records"
      @editRecord="onEditRecord"
      @deleteRecord="onDeleteRecord"
      @addRecord="onAddRecord"
    />

    <h3>Registros de Lavado / Mantenimiento</h3>
    <WashList
      :washes="washes"
      @editWash="onEditWash"
      @deleteWash="onDeleteWash"
      @addWash="onAddWash"
    />

    <!-- Formularios modales -->
    <RecordForm
      v-if="editingRecord !== null"
      :modelValue="editingRecord"
      @save="onSaveRecord"
      @cancel="onCancelRecord"
    />

    <WashForm
      v-if="editingWash !== null"
      :modelValue="editingWash"
      @save="onSaveWash"
      @cancel="onCancelWash"
    />
  </section>
</template>

<style scoped>
button {
  margin-bottom: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}
button:hover {
  text-decoration: underline;
}
</style>
