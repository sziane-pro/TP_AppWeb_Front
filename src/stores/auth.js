import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiService from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // Initialisation du token depuis le localStorage
  const token = ref(localStorage.getItem('token') || null)
  
  // Initialisation correcte de l'utilisateur depuis le localStorage
  const user = ref((() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Erreur lors du parsing des données utilisateur:', error)
      localStorage.removeItem('user')
      return null
    }
  })())

  const isAuthenticated = computed(() => !!token.value)

  // Fonction pour sauvegarder le token
  function setToken(newToken) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  // Fonction pour sauvegarder les données utilisateur
  function setUser(userData) {
    user.value = userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  // Fonction pour vérifier si le token est expiré (si c'est un JWT)
  function isTokenExpired() {
    if (!token.value) return true
    
    try {
      // Décoder le JWT pour vérifier l'expiration
      const payload = JSON.parse(atob(token.value.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error)
      return true
    }
  }

  // Fonction pour nettoyer les données si le token a expiré
  function checkTokenValidity() {
    if (token.value && isTokenExpired()) {
      console.log('Token expiré, déconnexion automatique')
      logout()
      return false
    }
    return true
  }

  async function login(credentials) {
    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Email et mot de passe requis')
      }

      // Conversion email -> username pour l'API
      const username = credentials.email.split('@')[0]
      const data = await apiService.publicRequest('/auth/login', {
        username: username,
        password: credentials.password,
      })

      if (!data.token) {
        throw new Error('Token non reçu du serveur')
      }

      setToken(data.token)
      setUser(data.user)
      
      console.log('Connexion réussie, token sauvegardé')
      return data
    } catch (error) {
      console.error('Erreur lors de la connexion:', error)
      // Nettoyer en cas d'erreur
      logout()
      throw error
    }
  }

  async function register(userData) {
    try {
      if (!userData.email || !userData.password) {
        throw new Error('Email et mot de passe requis')
      }

      if (!userData.firstname || !userData.lastname) {
        throw new Error('Prénom et nom de famille requis')
      }

      // Utiliser le username fourni ou générer à partir de l'email
      const username = userData.username || userData.email.split('@')[0]
      
      const registrationData = {
        email: userData.email,
        username: username,
        password: userData.password,
        firstname: userData.firstname,
        lastname: userData.lastname,
        city: userData.city || '',
        street: userData.street || '',
        house_number: userData.house_number || 0,
        zipcode: userData.zipcode || '',
        lat: userData.lat || '',
        long: userData.long || '',
        phone: userData.phone || '',
      }

      await apiService.publicRequest('/users', registrationData)

      // Après l'inscription, on connecte automatiquement l'utilisateur
      const loginData = await login({
        email: userData.email,
        password: userData.password,
      })

      return loginData
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      throw error
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
    console.log('Déconnexion réussie, données nettoyées')
  }

  // Fonction pour restaurer l'état depuis le localStorage au démarrage
  function initializeAuth() {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      try {
        user.value = JSON.parse(storedUser)
        // Vérifier si le token est encore valide
        if (!checkTokenValidity()) {
          return false
        }
        console.log('Session restaurée depuis le localStorage')
        return true
      } catch (error) {
        console.error('Erreur lors de la restauration de la session:', error)
        logout()
        return false
      }
    }
    return false
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    logout,
    checkTokenValidity,
    isTokenExpired,
    initializeAuth
  }
})
