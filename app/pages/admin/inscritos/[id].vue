<script setup lang="ts">
const route = useRoute()
const eventoId = route.params.id

const { data: inscritos, pending, refresh } = await useFetch(`/api/inscripciones/${eventoId}`)

const { data: eventos } = await useFetch('/api/eventos')
const eventoNombre = computed(() => {
  const e = eventos.value?.find((ev: any) => ev.id === Number(eventoId))
  return e?.nombre ?? 'Evento'
})

async function eliminar(personaId: number) {
  if (!confirm('¿Eliminar esta inscripción?')) return
  try {
    await $fetch(`/api/inscripciones/${personaId}`, { method: 'DELETE' })
    await refresh()
  } catch {
    alert('Error al eliminar la inscripción.')
  }
}
</script>
<template>
  <div class="flex min-h-screen">

    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main -->
    <main class="md:ml-64 flex-1 p-6 md:p-10 space-y-8">
      <header class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-violet-600 mb-1">
            <NuxtLink to="/admin" class="text-sm hover:underline"><Icon name="mdi:arrow-left" class="w-4 h-4" /> Eventos</NuxtLink>
          </div>
          <h1 class="text-3xl font-bold text-gray-900">
            Inscritos: {{ eventoNombre }}
          </h1>
          <p class="text-gray-400 text-sm mt-1">Gestión de participantes</p>
        </div>
      </header>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-indigo-50 p-6 rounded-xl border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">Total Inscritos</p>
          <p class="text-3xl font-bold text-gray-900">{{ inscritos?.length ?? 0 }}</p>
        </div>
      </div>

      <!-- Loading / Empty -->
      <div v-if="pending" class="text-center py-10 text-gray-400">Cargando inscritos...</div>
      <div v-else-if="!inscritos?.length" class="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
        <div class="text-5xl mb-4">
          <Icon name="mdi:account" class="w-16 h-16 text-gray-300" />
        </div>
        <h3 class="text-xl font-bold text-gray-700">No hay inscritos aún</h3>
        <p class="text-gray-400 mt-1">Cuando alguien se registre aparecerá aquí.</p>
      </div>

      <!-- Tabla de Inscritos -->
      <div v-else class="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Nombre</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Apellido</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="persona in inscritos" :key="persona.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold text-sm">
                      {{ persona.nombre[0]?.toUpperCase() }}{{ persona.apellido[0]?.toUpperCase() }}
                    </div>
                    <span class="font-semibold text-gray-900">{{ persona.nombre }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-500">{{ persona.apellido }}</td>
                <td class="px-6 py-4 text-right">
                  <button
                    @click="eliminar(persona.id)"
                    class="text-red-500 border border-red-200 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-500 hover:text-white transition flex items-center gap-1 ml-auto"
                  >
                    <Icon name="mdi:trash-can" class="w-4 h-4" /> <div class="text-sm">Eliminar Inscripción</div>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <span class="text-sm text-gray-400">Mostrando {{ inscritos?.length ?? 0 }} inscritos</span>
        </div>
      </div>
    </main>
  </div>
</template>