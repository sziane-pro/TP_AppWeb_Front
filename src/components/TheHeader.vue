<script setup>
import Navbar from './layout/Navbar.vue'
</script>

<template>
  <header class="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex justify-between items-center">
      <div class="logo transform hover:scale-105 transition-transform duration-300 flex-shrink-0">
        <router-link to="/" class="no-underline">
          <h1 class="m-0 text-xl sm:text-2xl lg:text-3xl font-extrabold text-emerald-600 truncate">
            <span class="hidden sm:inline">ProductManager</span>
            <span class="sm:hidden">Ma boutique</span>
          </h1>
        </router-link>
      </div>
      <Navbar />
    </div>
  </header>
</template>

<style scoped>
header {
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
