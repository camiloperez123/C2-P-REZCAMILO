<template>
  <aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-indigo-50 border-r border-gray-200 p-6 pt-20 pb-6 gap-6 z-40 overflow-y-auto">
    <div>
      <span class="text-2xl font-black text-violet-600">Smart Events</span>
      <p class="text-xs text-gray-400 uppercase tracking-widest mt-1">Admin Panel</p>
    </div>

    <nav class="flex flex-col gap-2 grow">
      <NuxtLink
        to="/admin"
        class="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-sm transition-all"
        :class="$route.path === '/admin' ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-white'"
      >
        <Icon name="mdi:calendar" class="w-5 h-5" />
        Gestión de Eventos
      </NuxtLink>
    </nav>

    <div class="border-t border-gray-200 pt-4">
      <NuxtLink to="/" class="flex items-center gap-3 text-gray-500 hover:text-violet-600 text-sm px-4 py-2">
        <Icon name="mdi:arrow-left" class="w-4 h-4" />
        <div class="font-semibold text-2xl">Volver al sitio</div>
      </NuxtLink>
    </div>
  </aside>
</template>