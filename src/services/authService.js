import apiService from './api'

const authService = {
  /**
   * Récupère tous les utilisateurs
   * @returns {Promise} - Promesse contenant la liste des utilisateurs
   */
  getAllUsers() {
    return apiService.get('/users')
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
   * Ajoute un nouvel utilisateur
   * @param {Object} userData - Données de l'utilisateur à ajouter
   * @returns {Promise} - Promesse contenant l'utilisateur ajouté
   */
  addUser(userData) {
    return apiService.post('/users', userData)
  },
}

export default authService
