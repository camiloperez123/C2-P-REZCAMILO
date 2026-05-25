<script setup lang="ts">
const route = useRoute()
const id = route.params.id

const { data: evento, pending, error } = await useFetch(`/api/eventos/${id}`)

const form = reactive({ nombre: '', apellido: ''})
const loading = ref(false)
const errorMessage = ref('')
const exitoso = ref(false)

const formatFecha = (fecha: string) => {
  if (!fecha) return 'Fecha no disponible'  
  return new Date(fecha).toLocaleDateString('es-ES', { 
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'  
  })
}

async function registrar() {
  errorMessage.value = ''
  if (!form.nombre.trim() || !form.apellido.trim()) {
    errorMessage.value = 'Por favor completa Nombre y apellido.'
    return
  }
  loading.value = true
  try {
    await $fetch('/api/inscripciones', {
      method: 'POST',
      body: { eventoId: Number(id), nombre: form.nombre, apellido: form.apellido }
    })
    exitoso.value = true
  } catch (e: any) {
    errorMessage.value = e?.data?.message || 'Error al registrar. Intenta nuevamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 md:px-20 py-10">
    <div v-if="pending" class="text-center py-20 text-gray-400">Cargando evento...</div>
    <div v-else-if="error || !evento" class="text-center py-20 text-red-500">Evento no encontrado.</div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10">

      <!-- Detalle del Evento -->
      <div class="lg:col-span-7 space-y-6">
        <div class="rounded-xl overflow-hidden shadow border border-gray-100 h-72 bg-gray-100">
          <img v-if="evento.imagen" :src="evento.imagen" :alt="evento.nombre" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
            <Icon name="mdi:image-off" class="w-20 h-20" />
          </div>
        </div>

        <h1 class="text-4xl font-extrabold text-gray-900">{{ evento.nombre }}</h1>

        <div class="flex flex-col gap-3 text-gray-500">
          <div class="flex items-center gap-3">
            <Icon name="mdi:calendar" class="text-violet-600 w-5 h-5" />
            <span class="text-lg">{{ formatFecha(evento.fecha) }}</span>
          </div>
          <div class="flex items-center gap-3">
            <Icon name="mdi:map-marker" class="text-violet-600 w-5 h-5" />
            <span class="text-lg">{{ evento.lugar }}</span>
          </div>
          <div class="flex items-center gap-3">
            <Icon name="mdi:currency-usd" class="text-violet-600 w-5 h-5" />
            <span class="text-lg">{{ evento.valor === 0 ? 'Gratis' : `$${evento.valor.toLocaleString()}` }}</span>
          </div>
          <div class="flex items-center gap-3">
            <Icon name="mdi:account-group" class="text-violet-600 w-5 h-5" />
            <span class="text-lg font-semibold text-indigo-600">{{ evento.personas?.length ?? 0 }} Inscritos</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 pt-4">
          <div class="bg-indigo-50 p-6 rounded-xl">
            <Icon name="mdi:account-group" class="text-violet-600 w-8 h-8 mb-2" />
            <p class="text-2xl font-bold text-gray-900">{{ evento.personas?.length ?? 0 }}</p>
            <p class="text-sm text-gray-500">Personas Inscritas</p>
          </div>
          <div class="bg-blue-50 p-6 rounded-xl">
            <Icon name="mdi:certificate" class="text-blue-600 w-8 h-8 mb-2" />
            <p class="text-2xl font-bold text-gray-900">Certificado</p>
            <p class="text-sm text-gray-500">Horas Complementarias</p>
          </div>
        </div>
      </div>

      <!-- Formulario de Inscripción -->
      <div class="lg:col-span-5">
        <div class="sticky top-24 bg-white/80 backdrop-blur-md p-8 rounded-xl shadow border border-gray-100">

          <!-- Éxito -->
          <div v-if="exitoso" class="flex flex-col items-center text-center gap-4 py-8">
            <Icon name="mdi:check-circle" class="text-green-500 w-16 h-16" />
            <h2 class="text-2xl font-bold text-gray-900">¡Inscripción exitosa!</h2>
            <p class="text-gray-500">Te has registrado en <strong>{{ evento.nombre }}</strong>.</p>
            <NuxtLink to="/" class="mt-2 text-violet-600 font-semibold hover:underline">← Volver a eventos</NuxtLink>
          </div>

          <!-- Formulario -->
          <template v-else>
            <h2 class="text-2xl font-bold text-gray-900 mb-1">Inscripción al Evento</h2>
            <p class="text-gray-400 text-sm mb-6">Completa los datos para garantizar tu cupo.</p>

            <div class="flex flex-col gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                <input v-model="form.nombre" type="text" placeholder="Ej: Juan"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
                <input v-model="form.apellido" type="text" placeholder="Ej: Pérez"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none transition" />
              </div>

              <p v-if="errorMessage" class="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{{ errorMessage }}</p>

              <button
                @click="registrar"
                :disabled="loading"
                class="w-full bg-violet-600 text-white font-bold rounded-xl py-4 shadow hover:bg-violet-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Registrando...' : 'Confirmar Registro' }}
              </button>
            </div>

            <div class="flex items-center justify-center gap-2 mt-4 text-gray-400 text-xs">
              <Icon name="mdi:lock" class="w-4 h-4" />
              <span>Datos protegidos</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>