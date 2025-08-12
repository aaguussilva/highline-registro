<template>
  <div class="wrap">
    <h1> Registro de cinta (demo)</h1>

    <section class="card ">
      <label style="color: green;">
        Miembro
        <select v-model="member">
          <option v-for="m in members" :key="m" :value="m">{{ m }}</option>
        </select>
      </label>

      <label style="color: green;">
        Subidas hoy
        <input type="number" v-model.number="count" min="0"/>
      </label>

      <div class="buttons">
        <button @click="saveRecord">Guardar registro</button>
      </div>
    </section>

    <section class="list">
      <h2>Registros (recientes)</h2>
      <table>
        <thead><tr><th>Fecha</th><th>Miembro</th><th>Subidas</th></tr></thead>
        <tbody>
          <tr v-for="r in records" :key="r.id">
            <td>{{ formatDate(r.timestamp) }}</td>
            <td>{{ r.member }}</td>
            <td>{{ r.count }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from './firebase'
import {
  collection, addDoc, query, orderBy, onSnapshot,
  serverTimestamp, doc, setDoc
} from 'firebase/firestore'

// Lista predefinida (editála)
const members = ['Agu','Sofi','Juan','Maru']
const member = ref(members[0])
const count = ref(1)

const records = ref([])
const lastWash = ref(null)

const registrosCol = collection(db, 'registros')
const metaDoc = doc(db, 'meta', 'estado_cinta')

function formatDate(ts) {
  if (!ts) return '-'
  // Firestore Timestamp tiene toDate()
  try { return ts.toDate().toLocaleString() } catch { return new Date(ts).toLocaleString() }
}

async function saveRecord() {
  if (!member.value) return alert('Elegí un miembro')
  try {
    await addDoc(registrosCol, {
      member: member.value,
      count: Number(count.value) || 0,
      timestamp: serverTimestamp()
    })
    count.value = 1
  } catch (e) {
    console.error(e)
    alert('Error al guardar')
  }
}

async function registerWash() {
  try {
    await setDoc(metaDoc, {
      last_wash: serverTimestamp(),
      by: member.value
    }, { merge: true })
  } catch (e) {
    console.error(e); alert('Error al registrar lavado')
  }
}

onMounted(() => {
  const q = query(registrosCol, orderBy('timestamp', 'desc'))
  onSnapshot(q, snap => {
    records.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  })

  onSnapshot(metaDoc, snap => {
    if (snap.exists()) lastWash.value = snap.data().last_wash
  })
})

const lastWashDisplay = computed(() => lastWash.value ? formatDate(lastWash.value) : 'Nunca')
</script>

<style>
/* estilo minimal retro: adaptalo */
.wrap{max-width:800px;margin:30px auto;font-family:monospace}
.card{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:12px;background:#f3f1e6;border-radius:8px}
label{display:flex;flex-direction:column;font-size:14px}
input,select{padding:6px;border-radius:4px;border:1px solid #ccc}
.buttons{display:flex;gap:8px}
button{padding:8px 12px;border-radius:6px;border:none;cursor:pointer;background:#333;color:#fff}
table{width:100%;border-collapse:collapse;margin-top:12px}
th,td{padding:8px;border:1px solid #ddd;text-align:left}
.meta{margin-top:10px}
</style>
