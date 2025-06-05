import { describe, it, expect } from 'vitest'

// Fonctions utilitaires d'exemple à tester
function additionner(a, b) {
  return a + b
}

function formaterNom(prenom, nom) {
  if (!prenom || !nom) {
    throw new Error('Prénom et nom sont requis')
  }
  return `${prenom} ${nom}`
}

function estNombrePositif(nombre) {
  return typeof nombre === 'number' && nombre > 0
}

describe('Fonctions utilitaires', () => {
  describe('additionner', () => {
    it('devrait additionner deux nombres positifs', () => {
      expect(additionner(2, 3)).toBe(5)
    })

    it('devrait additionner des nombres négatifs', () => {
      expect(additionner(-2, -3)).toBe(-5)
    })

    it('devrait gérer zéro', () => {
      expect(additionner(5, 0)).toBe(5)
      expect(additionner(0, 0)).toBe(0)
    })
  })

  describe('formaterNom', () => {
    it('devrait formater correctement prénom et nom', () => {
      expect(formaterNom('Jean', 'Dupont')).toBe('Jean Dupont')
    })

    it('devrait lever une erreur si prénom manque', () => {
      expect(() => formaterNom('', 'Dupont')).toThrow('Prénom et nom sont requis')
    })

    it('devrait lever une erreur si nom manque', () => {
      expect(() => formaterNom('Jean', '')).toThrow('Prénom et nom sont requis')
    })
  })

  describe('estNombrePositif', () => {
    it('devrait retourner true pour un nombre positif', () => {
      expect(estNombrePositif(5)).toBe(true)
      expect(estNombrePositif(0.1)).toBe(true)
    })

    it('devrait retourner false pour zéro ou nombre négatif', () => {
      expect(estNombrePositif(0)).toBe(false)
      expect(estNombrePositif(-5)).toBe(false)
    })

    it('devrait retourner false pour des non-nombres', () => {
      expect(estNombrePositif('5')).toBe(false)
      expect(estNombrePositif(null)).toBe(false)
      expect(estNombrePositif(undefined)).toBe(false)
    })
  })
})
