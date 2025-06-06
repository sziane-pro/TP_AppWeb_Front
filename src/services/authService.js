import apiService from './api'

/**
 * Service d'authentification avancé avec gestion du localStorage
 */
const authService = {
  
  // ========== GESTION DES TOKENS ==========
  
  /**
   * Récupère le token JWT depuis le localStorage
   * @returns {string|null} - Token JWT ou null
   */
  getToken() {
    return localStorage.getItem('token')
  },

  /**
   * Sauvegarde le token JWT dans le localStorage
   * @param {string} token - Token JWT à sauvegarder
   */
  setToken(token) {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },

  /**
   * Récupère les données utilisateur depuis le localStorage
   * @returns {Object|null} - Données utilisateur ou null
   */
  getUser() {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur:', error)
      return null
    }
  },

  /**
   * Sauvegarde les données utilisateur dans le localStorage
   * @param {Object} userData - Données utilisateur à sauvegarder
   */
  setUser(userData) {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  },

  /**
   * Vérifie si l'utilisateur est connecté
   * @returns {boolean} - True si connecté, false sinon
   */
  isAuthenticated() {
    const token = this.getToken()
    const user = this.getUser()
    return !!(token && user)
  },

  /**
   * Décode le payload du JWT (sans vérification de signature)
   * @param {string} token - Token JWT à décoder
   * @returns {Object|null} - Payload décodé ou null
   */
  decodeToken(token) {
    try {
      if (!token) return null
      const payload = token.split('.')[1]
      return JSON.parse(atob(payload))
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error)
      return null
    }
  },

  /**
   * Vérifie si le token JWT est expiré
   * @param {string} token - Token JWT à vérifier (optionnel, utilise celui du localStorage par défaut)
   * @returns {boolean} - True si expiré, false sinon
   */
  isTokenExpired(token = null) {
    const tokenToCheck = token || this.getToken()
    if (!tokenToCheck) return true

    const payload = this.decodeToken(tokenToCheck)
    if (!payload || !payload.exp) return true

    const currentTime = Date.now() / 1000
    return payload.exp < currentTime
  },

  /**
   * Nettoie toutes les données d'authentification
   */
  clearAuth() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log('Données d\'authentification nettoyées')
  },

  /**
   * Vérifie la validité de la session et nettoie si nécessaire
   * @returns {boolean} - True si la session est valide, false sinon
   */
  validateSession() {
    if (!this.isAuthenticated()) {
      return false
    }

    if (this.isTokenExpired()) {
      console.log('Session expirée, nettoyage automatique')
      this.clearAuth()
      return false
    }

    return true
  },

  // ========== APPELS API UTILISATEURS ==========

  /**
   * Récupère tous les utilisateurs
   * @returns {Promise} - Promesse contenant la liste des utilisateurs
   */
  getAllUsers() {
    return apiService.get('/users')
  },

  /**
   * Récupère un utilisateur par son ID
   * @param {string|number} id - ID de l'utilisateur
   * @returns {Promise} - Promesse contenant les données de l'utilisateur
   */
  getUserById(id) {
    return apiService.get(`/users/${id}`)
  },

  /**
   * Met à jour un utilisateur
   * @param {string|number} id - ID de l'utilisateur à mettre à jour
   * @param {Object} userData - Données de l'utilisateur à mettre à jour
   * @returns {Promise} - Promesse contenant l'utilisateur mis à jour
   */
  updateUser(id, userData) {
    return apiService.put(`/users/${id}`, userData)
  },

  /**
   * Supprime un utilisateur
   * @param {string|number} id - ID de l'utilisateur à supprimer
   * @returns {Promise} - Promesse contenant l'utilisateur supprimé
   */
  deleteUser(id) {
    return apiService.delete(`/users/${id}`)
  },

  /**
   * Ajoute un nouvel utilisateur (admin only)
   * @param {Object} userData - Données de l'utilisateur à ajouter
   * @returns {Promise} - Promesse contenant l'utilisateur ajouté
   */
  addUser(userData) {
    return apiService.post('/users', userData)
  },

  /**
   * Met à jour le profil de l'utilisateur connecté
   * @param {Object} userData - Nouvelles données du profil
   * @returns {Promise} - Promesse contenant les données mises à jour
   */
  updateProfile(userData) {
    const currentUser = this.getUser()
    if (!currentUser || !currentUser.id) {
      throw new Error('Aucun utilisateur connecté')
    }
    
    return this.updateUser(currentUser.id, userData).then(updatedUser => {
      // Mettre à jour les données en localStorage
      this.setUser(updatedUser)
      return updatedUser
    })
  },

  // ========== UTILITAIRES ==========

  /**
   * Initialise l'authentification au démarrage de l'application
   * @returns {boolean} - True si une session valide a été restaurée
   */
  initializeAuth() {
    console.log('Initialisation de l\'authentification...')
    
    const isValid = this.validateSession()
    if (isValid) {
      console.log('Session valide restaurée depuis le localStorage')
    } else {
      console.log('Aucune session valide trouvée')
    }
    
    return isValid
  },

  /**
   * Force le rafraîchissement des données utilisateur depuis l'API
   * @returns {Promise} - Promesse contenant les données utilisateur actualisées
   */
  async refreshUserData() {
    const currentUser = this.getUser()
    if (!currentUser || !currentUser.id) {
      throw new Error('Aucun utilisateur connecté')
    }

    try {
      const refreshedUser = await this.getUserById(currentUser.id)
      this.setUser(refreshedUser)
      return refreshedUser
    } catch (error) {
      console.error('Erreur lors du rafraîchissement des données utilisateur:', error)
      throw error
    }
  }
}

export default authService
