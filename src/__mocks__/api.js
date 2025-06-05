import { vi } from 'vitest'

// Mock du service API pour les tests
export default {
  post: vi.fn(),
  get: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
}
