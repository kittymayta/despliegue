import '@testing-library/jest-dom';

// Mock de next/router para evitar el error de "useRouter"
import { createMockRouter } from './src/lib/utils';  // Si tienes la función para crear el mock del router

// Mock del router
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue(createMockRouter()),
}));