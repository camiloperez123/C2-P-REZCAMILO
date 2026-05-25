<script setup lang="ts">
const { data: eventos, refresh } = await useFetch('/api/eventos')

const mostrarFormulario = ref(false)
const guardando = ref(false)
const errorForm = ref('')
const exitoForm = ref(false)

const nuevo = reactive({ nombre: '', fecha: '', lugar: '', valor: 0, imagen: '' })

const totalInscritos = computed(() =>
  eventos.value?.reduce((acc: number, e: any) => acc + (e.personas?.length ?? 0), 0) ?? 0
)

function formatFecha(fecha: string) {
  if (!fecha) return ''
  return new Date(fecha).toLocaleString('es-CL', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

async function guardar() {
  errorForm.value = ''
  exitoForm.value = false
  if (!nuevo.nombre.trim() || !nuevo.fecha || !nuevo.lugar.trim()) {
    errorForm.value = 'Nombre, fecha y lugar son obligatorios.'
    return
  }
  guardando.value = true
  try {
    await $fetch('/api/eventos', {
      method: 'POST',
      body: { ...nuevo, valor: Number(nuevo.valor) }
    })
    Object.assign(nuevo, { nombre: '', fecha: '', lugar: '', valor: 0, imagen: '' })
    exitoForm.value = true
    mostrarFormulario.value = false
    await refresh()
  } catch (e: any) {
    errorForm.value = e?.data?.message || 'Error al guardar el evento.'
  } finally {
    guardando.value = false
  }
}
</script>
<template>
  <div class="flex min-h-screen">

    <!-- Sidebar -->
    <aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-indigo-50 border-r border-gray-200 p-6 gap-6 z-40">
      <div>
        <span class="text-2xl font-black text-violet-600">Smart Events</span>
        <p class="text-xs text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
      </div>
      <nav class="flex flex-col gap-2 grow">
        <span class="flex items-center gap-3 bg-violet-600 text-white rounded-xl px-4 py-3 font-semibold text-sm">
          📅 Gestión de Eventos
        </span>
        
      </nav>
      <div class="border-t border-gray-200 pt-4">
        <NuxtLink to="/" class="flex items-center gap-3 text-gray-500 hover:text-violet-600 text-sm px-4 py-2">
          ← Volver al sitio
        </NuxtLink>
      </div>
    </aside>

    <!-- Main -->
    <main class="md:ml-64 flex-1 p-6 md:p-10 space-y-8">
      <header>
        <h1 class="text-3xl font-bold text-gray-900">Gestión de Eventos</h1>
        <p class="text-gray-400 text-sm mt-1">Panel de administración</p>
      </header>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">Total Eventos</p>
          <p class="text-3xl font-bold text-violet-600">{{ eventos?.length ?? 0 }}</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">Total Inscritos</p>
          <p class="text-3xl font-bold text-indigo-600">{{ totalInscritos }}</p>
        </div>
        <div class="bg-violet-600 p-6 rounded-xl shadow text-white flex flex-col justify-center items-center text-center">
          <p class="text-sm opacity-80 mb-3">Acción Rápida</p>
          <button @click="mostrarFormulario = !mostrarFormulario"
            class="bg-white text-violet-600 px-4 py-2 rounded-xl font-bold hover:scale-105 transition text-sm">
            + Agregar Evento
          </button>
        </div>
      </div>

      <!-- Formulario Nuevo Evento -->
      <div v-if="mostrarFormulario" class="bg-white p-8 rounded-xl shadow border border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Agregar Nuevo Evento</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-1">Nombre del Evento *</label>
              <input v-model="nuevo.nombre" type="text" placeholder="Ej: Hackathon Campus 2024"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-600 mb-1">Fecha y Hora *</label>
                <input v-model="nuevo.fecha" type="datetime-local"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-600 mb-1">Precio (CLP)</label>
                <input v-model="nuevo.valor" type="number" placeholder="0"
                  class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-1">Lugar *</label>
              <input v-model="nuevo.lugar" type="text" placeholder="Auditorio Principal"
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-600 mb-1">URL de Imagen</label>
              <input v-model="nuevo.imagen" type="url" placeholder="https://..."
                class="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-violet-500 outline-none transition" />
            </div>
          </div>
          <div class="flex flex-col gap-4">
            <p v-if="errorForm" class="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">{{ errorForm }}</p>
            <p v-if="exitoForm" class="text-green-600 text-sm bg-green-50 px-4 py-2 rounded-lg">✅ Evento creado correctamente.</p>
            <div class="flex justify-end gap-3 mt-auto">
              <button @click="mostrarFormulario = false"
                class="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition">
                Cancelar
              </button>
              <button @click="guardar" :disabled="guardando"
                class="px-6 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition shadow disabled:opacity-50">
                {{ guardando ? 'Guardando...' : 'Guardar Evento' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de Eventos -->
      <div class="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="p-4 text-xs font-semibold text-gray-500 uppercase">Evento</th>
                <th class="p-4 text-xs font-semibold text-gray-500 uppercase">Fecha & Lugar</th>
                <th class="p-4 text-xs font-semibold text-gray-500 uppercase">Precio</th>
                <th class="p-4 text-xs font-semibold text-gray-500 uppercase">Inscritos</th>
                <th class="p-4 text-xs font-semibold text-gray-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="!eventos?.length">
                <td colspan="5" class="text-center py-10 text-gray-400">No hay eventos creados aún.</td>
              </tr>
              <tr v-for="evento in eventos" :key="evento.id" class="hover:bg-gray-50 transition">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img v-if="evento.imagen" :src="evento.imagen" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center text-xl">📷</div>
                    </div>
                    <span class="font-semibold text-gray-900">{{ evento.nombre }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <div class="flex flex-col">
                    <span class="text-sm text-gray-700">{{ formatFecha(evento.fecha) }}</span>
                    <span class="text-xs text-gray-400">{{ evento.lugar }}</span>
                  </div>
                </td>
                <td class="p-4">
                  <span class="font-bold" :class="evento.valor === 0 ? 'text-gray-400' : 'text-violet-600'">
                    {{ evento.valor === 0 ? 'Gratis' : `$${evento.valor.toLocaleString()}` }}
                  </span>
                </td>
                <td class="p-4">
                  <span class="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-semibold">
                    {{ evento.personas?.length ?? 0 }}
                  </span>
                </td>
                <td class="p-4 text-right">
                  <NuxtLink :to="`/admin/inscritos/${evento.id}`"
                    class="text-indigo-600 border border-indigo-200 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-600 hover:text-white transition">
                    Ver Inscritos
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>