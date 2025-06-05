<script setup>
import Navbar from './layout/Navbar.vue'
</script>

<template>
  <header class="bg-white shadow-lg sticky top-0 z-50 transition-all duration-300">
    <div class="max-w-8xl mx-auto px-6 h-[80px] flex justify-between items-center">
      <div class="logo transform hover:scale-105 transition-transform duration-300">
        <router-link to="/" class="no-underline">
          <h1 class="m-0 text-3xl font-extrabold bg-gradient-to-r from-[#42b983] to-[#2c7d5d] bg-clip-text text-transparent">
            Ma Boutique
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
