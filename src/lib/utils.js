import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export function createMockRouter() {
  return {
    // Aquí defines las propiedades y métodos que necesitas simular
    push: jest.fn(),
    replace: jest.fn(),
    query: {},
    pathname: '/',
  };
}
