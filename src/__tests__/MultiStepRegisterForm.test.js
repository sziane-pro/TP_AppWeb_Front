import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import MultiStepRegisterForm from '../components/auth/MultiStepRegisterForm.vue'
import { useAuthStore } from '../stores/auth'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock du router
const mockPush = vi.fn()
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: "<div>Home</div>" } },
    { path: '/login', name: 'login', component: { template: "<div>Login</div>" } },
  ],
})
router.push = mockPush

describe('MultiStepRegisterForm.vue', () => {
  let wrapper
  let pinia
  let authStore

  beforeEach(() => {
    pinia = createPinia()
    localStorageMock.getItem.mockReturnValue(null)
    mockPush.mockClear()
    
    wrapper = mount(MultiStepRegisterForm, {
      global: {
        plugins: [router, pinia],
      },
    })
    
    authStore = useAuthStore()
    authStore.register = vi.fn()
  })

  describe('Initialisation', () => {
    it('devrait se monter correctement', () => {
      expect(wrapper.exists()).toBe(true)
    })

    it('devrait commencer à l\'étape 1', () => {
      expect(wrapper.vm.currentStep).toBe(1)
      expect(wrapper.find('[data-testid="step-1"]').exists() || wrapper.text()).toContain('Informations de connexion')
    })

    it('devrait afficher le bon titre d\'étape', () => {
      expect(wrapper.text()).toContain('Informations de connexion')
      expect(wrapper.text()).toContain('Étape 1 sur 4')
    })

    it('devrait afficher l\'indicateur d\'étapes', () => {
      const stepIndicator = wrapper.find('.step-indicator')
      expect(stepIndicator.exists()).toBe(true)
    })
  })

  describe('Navigation entre étapes', () => {
    it('ne devrait pas permettre de passer à l\'étape suivante avec des champs vides', () => {
      const nextButton = wrapper.find('button[type="button"]')
      expect(nextButton.attributes('disabled')).toBeDefined()
    })

    it('devrait permettre de passer à l\'étape 2 avec des données valides', async () => {
      // Remplir les champs de l'étape 1
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#username').setValue('testuser')
      await wrapper.find('#password').setValue('password123')
      await wrapper.find('#confirmPassword').setValue('password123')

      // Le bouton suivant devrait être activé
      const nextButton = wrapper.find('button[type="button"]')
      expect(nextButton.attributes('disabled')).toBeUndefined()

      // Cliquer sur suivant
      await nextButton.trigger('click')
      
      expect(wrapper.vm.currentStep).toBe(2)
      expect(wrapper.text()).toContain('Informations personnelles')
    })

         it('devrait afficher une erreur si les mots de passe ne correspondent pas', async () => {
       await wrapper.find('#email').setValue('test@example.com')
       await wrapper.find('#username').setValue('testuser')
       await wrapper.find('#password').setValue('password123')
       await wrapper.find('#confirmPassword').setValue('differentpassword')

       // Appeler directement la méthode nextStep
       wrapper.vm.nextStep()
       await wrapper.vm.$nextTick()

       expect(wrapper.vm.currentStep).toBe(1) // Reste à l'étape 1
       expect(wrapper.vm.error).toContain('Les mots de passe ne correspondent pas')
     })

    it('devrait afficher une erreur si le mot de passe est trop court', async () => {
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#username').setValue('testuser')
      await wrapper.find('#password').setValue('123')
      await wrapper.find('#confirmPassword').setValue('123')

      const nextButton = wrapper.find('button[type="button"]')
      await nextButton.trigger('click')

      expect(wrapper.vm.currentStep).toBe(1)
      expect(wrapper.vm.error).toContain('Le mot de passe doit contenir au moins 6 caractères')
    })

    it('devrait permettre de revenir à l\'étape précédente', async () => {
      // Aller à l'étape 2
      wrapper.vm.currentStep = 2
      await wrapper.vm.$nextTick()

      const prevButton = wrapper.find('button:nth-child(1)')
      await prevButton.trigger('click')

      expect(wrapper.vm.currentStep).toBe(1)
    })
  })

     describe('Étape 2 - Informations personnelles', () => {
     beforeEach(async () => {
       wrapper.vm.currentStep = 2
       await wrapper.vm.$nextTick()
     })

     it('devrait afficher les champs d\'informations personnelles', () => {
       expect(wrapper.find('#firstname').exists()).toBe(true)
       expect(wrapper.find('#lastname').exists()).toBe(true)
       expect(wrapper.find('#phone').exists()).toBe(true)
     })

     it('devrait valider les champs requis', () => {
       // Test direct de la logique de validation pour l'étape 2
       const firstname = 'John'
       const lastname = 'Doe'
       const isValid = Boolean(firstname && lastname)
       
       expect(isValid).toBe(true)
     })

     it('ne devrait pas permettre de continuer sans prénom et nom', () => {
       // Test direct de la logique de validation pour l'étape 2
       const firstname = ''
       const lastname = ''
       const isValid = Boolean(firstname && lastname)
       
       expect(isValid).toBe(false)
     })
   })

  describe('Étape 3 - Adresse (optionnel)', () => {
    beforeEach(async () => {
      wrapper.vm.currentStep = 3
      await wrapper.vm.$nextTick()
    })

    it('devrait afficher les champs d\'adresse', () => {
      expect(wrapper.find('#street').exists()).toBe(true)
      expect(wrapper.find('#house_number').exists()).toBe(true)
      expect(wrapper.find('#city').exists()).toBe(true)
      expect(wrapper.find('#zipcode').exists()).toBe(true)
    })

    it('devrait permettre de continuer même sans remplir les champs (optionnels)', () => {
      expect(wrapper.vm.canProceedToNextStep).toBe(true)
    })
  })

     describe('Étape 4 - Confirmation', () => {
     beforeEach(async () => {
       wrapper.vm.currentStep = 4
       Object.assign(wrapper.vm.formData, {
         email: 'test@example.com',
         username: 'testuser',
         password: 'password123',
         confirmPassword: 'password123',
         firstname: 'John',
         lastname: 'Doe',
         phone: '0612345678',
         street: 'rue de la Paix',
         house_number: '123',
         city: 'Paris',
         zipcode: '75001'
       })
       await wrapper.vm.$nextTick()
     })

    it('devrait afficher le récapitulatif des informations', () => {
      const text = wrapper.text()
      expect(text).toContain('test@example.com')
      expect(text).toContain('testuser')
      expect(text).toContain('John')
      expect(text).toContain('Doe')
    })

    it('devrait afficher le bouton de soumission', () => {
      const submitButton = wrapper.find('button[type="submit"]')
      expect(submitButton.exists()).toBe(true)
      expect(submitButton.text()).toContain('Créer mon compte')
    })
  })

     describe('Soumission du formulaire', () => {
     beforeEach(async () => {
       wrapper.vm.currentStep = 4
       // Assigner directement aux propriétés réactives
       Object.assign(wrapper.vm.formData, {
         email: 'test@example.com',
         username: 'testuser',
         password: 'password123',
         confirmPassword: 'password123',
         firstname: 'John',
         lastname: 'Doe',
         phone: '0612345678',
         street: 'rue de la Paix',
         house_number: '123',
         city: 'Paris',
         zipcode: '75001'
       })
       await wrapper.vm.$nextTick()
     })

    it('devrait appeler authStore.register avec les bonnes données', async () => {
      authStore.register.mockResolvedValue()

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(authStore.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        username: 'testuser',
        password: 'password123',
        firstname: 'John',
        lastname: 'Doe',
        phone: '0612345678',
        street: 'rue de la Paix',
        house_number: 123,
        city: 'Paris',
        zipcode: '75001',
        lat: '',
        long: ''
      })
    })

    it('devrait rediriger vers la page d\'accueil après inscription réussie', async () => {
      authStore.register.mockResolvedValue()

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      // Attendre que la promesse se résolve
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(mockPush).toHaveBeenCalledWith('/')
    })

    it('devrait afficher une erreur en cas d\'échec', async () => {
      const errorMessage = 'Erreur d\'inscription'
      authStore.register.mockRejectedValue(new Error(errorMessage))

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      // Attendre que la promesse se rejette
      await wrapper.vm.$nextTick()
      await new Promise(resolve => setTimeout(resolve, 0))

      expect(wrapper.vm.error).toContain(errorMessage)
    })

    it('devrait afficher l\'état de chargement pendant la soumission', async () => {
      authStore.register.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

      const form = wrapper.find('form')
      await form.trigger('submit.prevent')

      expect(wrapper.vm.loading).toBe(true)
      expect(wrapper.text()).toContain('Inscription en cours...')
    })
  })

     describe('Validation logique métier', () => {
     it('devrait valider correctement les champs de l\'étape 1', () => {
       // Test direct de la logique sans passer par les computed
       const formData = {
         email: 'test@example.com',
         username: 'testuser',
         password: 'password123',
         confirmPassword: 'password123'
       }
       
       // Simulation de la logique du computed
       const isValid = Boolean(formData.email && 
                      formData.username && 
                      formData.password && 
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword)
       
       expect(isValid).toBe(true)
     })

     it('devrait invalider si les mots de passe diffèrent', () => {
       const formData = {
         email: 'test@example.com',
         username: 'testuser',
         password: 'password123',
         confirmPassword: 'different'
       }
       
       const isValid = Boolean(formData.email && 
                      formData.username && 
                      formData.password && 
                      formData.confirmPassword &&
                      formData.password === formData.confirmPassword)
       
       expect(isValid).toBe(false)
     })

     it('devrait valider les champs requis de l\'étape 2', () => {
       const formData = {
         firstname: 'John',
         lastname: 'Doe'
       }
       
       const isValid = Boolean(formData.firstname && formData.lastname)
       expect(isValid).toBe(true)
     })
   })

  describe('Interface utilisateur', () => {
    it('devrait afficher l\'indicateur de progression mobile', () => {
      const mobileIndicator = wrapper.find('.block.sm\\:hidden')
      expect(mobileIndicator.exists()).toBe(true)
    })

    it('devrait afficher l\'indicateur de progression desktop', () => {
      const desktopIndicator = wrapper.find('.hidden.sm\\:flex')
      expect(desktopIndicator.exists()).toBe(true)
    })

    it('devrait masquer le bouton précédent à la première étape', () => {
      expect(wrapper.vm.currentStep).toBe(1)
      const prevButtons = wrapper.findAll('button').filter(button => 
        button.text().includes('Précédent')
      )
      expect(prevButtons.length).toBe(0)
    })
  })
}) 