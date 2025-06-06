import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import App from '../App.vue'

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

// Mock du service API
vi.mock('@/services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

// Créer un router de test simple
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: { template: "<div>Page d'accueil</div>" },
    },
    {
      path: '/login',
      name: 'login',
      component: { template: "<div>Login</div>" },
    },
    {
      path: '/register',
      name: 'register',
      component: { template: "<div>Register</div>" },
    },
  ],
})

describe('App.vue', () => {
  let pinia

  beforeEach(() => {
    pinia = createPinia()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('devrait se monter correctement', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, pinia],
        stubs: {
          TheHeader: true,
          RouterView: true,
          Footer: true,
        },
      },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('devrait avoir les bonnes classes CSS', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, pinia],
        stubs: {
          TheHeader: true,
          RouterView: true,
          Footer: true,
        },
      },
    })

    const mainDiv = wrapper.find('div')
    expect(mainDiv.classes()).toContain('min-h-screen')
    expect(mainDiv.classes()).toContain('bg-gray-50')
  })

  it('devrait contenir la section main', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router, pinia],
        stubs: {
          TheHeader: true,
          RouterView: true,
          Footer: true,
        },
      },
    })

    const mainElement = wrapper.find('main')
    expect(mainElement.exists()).toBe(true)
    expect(mainElement.classes()).toContain('flex-1')
  })
})
