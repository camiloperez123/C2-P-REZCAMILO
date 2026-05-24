<script setup lang="ts">
const { data: eventos, pending, error } = await useFetch<any[]>('/api/eventos')

function formatFecha(fecha: string) {
  if (!fecha) return 'Fecha no disponible'
  return new Date(fecha).toLocaleString('es-CL', {
    day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}
</script>
npm install typescript --save-dev
<template>
  <div>
    <!-- Hero -->
    <section class="px-4 md:px-20 py-10 md:py-20">
      <div class="flex flex-col md:flex-row items-center bg-violet-600 rounded-4xl p-8 md:p-12 gap-10">
        <div class="flex-1 z-10">
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">
            ¡Hola, Estudiante! Descubre tu próxima gran experiencia.
          </h1>
          <p class="text-lg text-white/80 mb-6 max-w-lg">
            Explora los eventos disponibles en el campus, desde Talleres a Festivales académicos.
          </p>
        </div>
      </div>
    </section>

    <!-- Eventos -->
    <section class="px-4 md:px-20 pb-10">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Próximos Eventos</h2>
          <p class="text-gray-500 mt-1">Descubre las actividades que se vienen</p>
        </div>
      </div>

      <div v-if="pending" class="text-center py-20 text-gray-400">Cargando eventos...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500">Error al cargar eventos</div>
      <div v-else-if="!eventos?.length" class="text-center py-20 text-gray-400">No hay eventos disponibles.</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="evento in eventos"
          :key="evento.id"
          class="bg-white rounded-xl shadow border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
        >
          <!-- Imagen -->
          <div class="relative h-48 overflow-hidden bg-gray-100">
            <img
              v-if="evento.imagen"
              :src="evento.imagen"
              :alt="evento.nombre"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-5xl text-gray-300">📷</div>
          </div>

          <!-- Contenido -->
          <div class="p-6 flex-1 flex flex-col">
            <!-- FIX 1: nombre del evento -->
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ evento.nombre }}</h3>

            <div class="space-y-2 mb-6 text-sm text-gray-500">
              <div class="flex items-center gap-2">
                <span>📅</span>
                <span>{{ formatFecha(evento.fecha) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span>📍</span>
                <span>{{ evento.lugar }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span>💰</span>
                <span>{{ evento.valor === 0 ? 'Gratis' : `$${evento.valor.toLocaleString()}` }}</span>
              </div>
              <div class="flex items-center gap-2 text-indigo-600 font-semibold">
                <span>👥</span>
                <span>{{ evento.personas?.length ?? 0 }} Inscritos</span>
              </div>
            </div>

            <!-- FIX 2: backticks para que evalúe evento.id -->
            <NuxtLink
              :to="`/registro/${evento.id}`"
              class="mt-auto w-full bg-violet-600 text-white py-3 rounded-xl font-bold text-center hover:bg-violet-700 transition-colors block"
            >
              Registrarme
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Admin -->
    <section class="px-4 md:px-20 py-10">
      <div class="bg-indigo-50 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">¿Quieres organizar un evento?</h2>
          <p class="text-gray-500 mt-1">Accede al panel de administración para gestionar tus eventos académicos.</p>
        </div>
        <NuxtLink
          to="/admin"
          class="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all whitespace-nowrap"
        >
          Ir al panel Admin 
        </NuxtLink>
      </div>
    </section>
  </div>
</template>