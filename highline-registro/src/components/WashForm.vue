<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const member = ref('')
const obs = ref('')

watch(() => props.modelValue, (val) => {
  if (val) {
    member.value = val.member || ''
    obs.value = val.obs || ''
  } else {
    member.value = ''
    obs.value = ''
  }
}, { immediate: true })

function onSave() {
  if (!member.value) {
    alert('El miembro es requerido')
    return
  }
  emit('save', {
    ...props.modelValue,
    member: member.value,
    obs: obs.value
  })
}

function onCancel() {
  emit('cancel')
}
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal">
      <h3>{{ props.modelValue ? 'Editar Lavado' : 'Agregar Lavado' }}</h3>

      <label>
        Miembro:
        <input v-model="member" type="text" />
      </label>

      <label>
        Observación:
        <textarea v-model="obs" rows="3" />
      </label>

      <div class="buttons">
        <button @click="onSave">Guardar</button>
        <button @click="onCancel" type="button">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mismos estilos modal que RecordForm.vue */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  width: 320px;
  max-width: 90vw;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input, textarea {
  width: 100%;
  padding: 0.3rem;
  margin-top: 0.2rem;
  box-sizing: border-box;
}

.buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

button {
  padding: 0.4rem 0.8rem;
  cursor: pointer;
}
</style>
