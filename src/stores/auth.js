import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/api'

const API_URL = 'http://185.98.139.128:40140'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Erreur lors du parsing des données utilisateur:', error)
      localStorage.removeItem('user')
      return null
    }
  })

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  async function login(credentials) {
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Email et mot de passe requis')
      }

      // Conversion email -> username pour l'API
      const username = credentials.email.split('@')[0]
      const data = await apiService.post('/auth/login', {
        username: username,
        password: credentials.password
      })

      if (!data.token) {
        throw new Error('Token non reçu du serveur')
      }

      setToken(data.token)
      setUser(data.user)
      return data
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      throw error
    }
  }

  async function register(userData) {
    try {
      if (!userData.email || !userData.password) {
        throw new Error('Email et mot de passe requis')
      }

      const username = userData.email.split('@')[0]
      const data = await apiService.post('/users', {
        email: userData.email,
        username: username,
        password: userData.password,
        firstname: username,
        lastname: '',
        city: '',
        street: '',
        house_number: 0,
        zipcode: '',
        lat: '',
        long: '',
        phone: ''
      })

      // Après l'inscription, on connecte automatiquement l'utilisateur
      const loginData = await login({
        email: userData.email,
        password: userData.password
      })

      return loginData
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error)
      throw error
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout
  }
})
