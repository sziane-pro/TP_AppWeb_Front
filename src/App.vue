<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
import Footer from './components/layout/Footer.vue'
// Vérifier si on est en mode développement
const isDevelopment = import.meta.env.DEV
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <TheHeader />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Styles de base */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Layout principal avec footer sticky */
main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
