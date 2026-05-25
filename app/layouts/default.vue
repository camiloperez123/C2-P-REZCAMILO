<template>
    <div class="min-h-screen flex flex-col">
        <header class="flex justify-between items-center w-full px-4 md:px-20 py-4 sticky top-0 z-50
        shadow-sm bg-white">
            <NuxtLink to="/" class="text-2xl font-black text-violet-600">
                SmartEvents
            </NuxtLink>
            <nav class="hidden md:flex gap-8 items-center">
                <NuxtLink to="/" class="text-sm font-semibold"
                :class="$route.path === '/' ? 'text-violet-600 border-b-2 border-violet-600 pb-1' : 'text-gray-500 hover:text-violet-600 transition-colors'">
                Eventos
                </NuxtLink>
                <NuxtLink to="/admin" class="text-sm font-semibold"
                :class="$route.path.startsWith('/admin') ? 'text-violet-600 border-b-2 border-violet-600 pb-1' : 'text-gray-500 hover:text-violet-600 transition-colors'">
                Admin
                </NuxtLink>
            </nav>
            <div class="flex items-center gap-6">
                <Icon name="mdi:bell" class="text-violet-600 hover:bg-gray-300 rounded-lg p-2" />
                <Icon name="mdi:account" class="text-violet-600 hover:bg-gray-300 rounded-lg p-2" />
            </div>
        </header>
        <main class="flex-1">
            <slot />
        </main>
        <footer class="flex flex-col w-full py-10 px-4 md:px-20 md:flex-row justify-between items-center gap-4 bg-indigo-50 border-t border-gray-200">
            <div class="flex flex-col items-center md:items-start gap-1">
                <span class="text-xl font-black text-violet-600">SmartEvents</span>
                <p class="text-sm text-gray-500">Universidad Técnica federico Santa Maria - Taller de Lenguaje de Programación</p>
            </div>
            <div class="flex flex-wrap justify-center gap-48 md:gap-20">
                <NuxtLink to="/" class="text-sm text-gray-500 hover:text-violet-600 transition">Eventos</NuxtLink>
                <NuxtLink to="/admin" class="text-sm text-gray-500 hover:text-violet-600 transition">Admin</NuxtLink>
            </div>
        </footer>
    </div>
</template>