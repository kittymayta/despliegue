const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Asegúrate de que la ruta sea correcta a tu aplicación Next.js
  dir: './', 
});

// Configuración adicional de Jest
const customJestConfig = {
  coverageProvider: 'v8', // Usa V8 para la cobertura de código
  testEnvironment: 'jsdom', // Configura el entorno de prueba para simular un navegador
  moduleNameMapper: {
    // Mapea alias "@/" a "src"
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Asegúrate de que 'jest.setup.js' se esté usando
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Transforma archivos JS y JSX usando Babel
  },
};

// Exporta la configuración combinada
module.exports = createJestConfig(customJestConfig);