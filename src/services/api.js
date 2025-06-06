// Configuration de base pour les requêtes API
const API_URL = 'http://185.98.139.128:40140' // URL de votre API basée sur votre fichier server.js
// const API_URL = 'http://localhost:5001'; // URL de votre API basée sur votre fichier server.js

/**
 * Récupère le token JWT depuis le localStorage
 * @returns {string|null} - Token JWT ou null
 */
function getAuthToken() {
  return localStorage.getItem('token')
}

/**
 * Créer les headers par défaut avec authentification si disponible
 * @returns {Object} - Headers de la requête
 */
function getDefaultHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  }
  
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

/**
 * Gère les erreurs d'API, notamment la déconnexion automatique en cas d'erreur 401
 * @param {Response} response - Réponse de l'API
 * @returns {Promise} - Promesse avec gestion d'erreur
 */
async function handleApiError(response) {
  const errorData = await response.json().catch(() => null)
  
  // Si erreur 401 (non autorisé), nettoyer le localStorage et rediriger
  if (response.status === 401) {
    console.log('Token invalide ou expiré, déconnexion automatique')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Rediriger vers la page de connexion si on n'y est pas déjà
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login'
    }
  }
  
  throw new Error(
    `Erreur API: ${response.status} - ${errorData?.message || response.statusText}`,
  )
}

/**
 * Service pour gérer les requêtes API
 */
const apiService = {
  /**
   * Effectue une requête GET
   * @param {string} endpoint - Point de terminaison de l'API
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async get(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: getDefaultHeaders(),
      })
      
      if (!response.ok) {
        await handleApiError(response)
      }
      
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête GET:', error)
      throw error
    }
  },

  /**
   * Effectue une requête POST
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        await handleApiError(response)
      }
      
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error)
      throw error
    }
  },

  /**
   * Effectue une requête PUT
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      })
      
      if (!response.ok) {
        await handleApiError(response)
      }
      
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête PUT:', error)
      throw error
    }
  },

  /**
   * Effectue une requête DELETE
   * @param {string} endpoint - Point de terminaison de l'API
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: getDefaultHeaders(),
      })
      
      if (!response.ok) {
        await handleApiError(response)
      }
      
      return response.json()
    } catch (error) {
      console.error('Erreur lors de la requête DELETE:', error)
      throw error
    }
  },

  /**
   * Effectue une requête sans authentification (pour login/register)
   * @param {string} endpoint - Point de terminaison de l'API
   * @param {Object} data - Données à envoyer
   * @param {string} method - Méthode HTTP (default: POST)
   * @returns {Promise} - Promesse contenant les données de la réponse
   */
  async publicRequest(endpoint, data = null, method = 'POST') {
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      
      if (data && method !== 'GET') {
        config.body = JSON.stringify(data)
      }
      
      const response = await fetch(`${API_URL}${endpoint}`, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(
          `Erreur API: ${response.status} - ${errorData?.message || response.statusText}`,
        )
      }
      
      return response.json()
    } catch (error) {
      console.error(`Erreur lors de la requête ${method}:`, error)
      throw error
    }
  },
}

export default apiService
