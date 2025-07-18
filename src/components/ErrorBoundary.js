import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // Mantendrá el estado si ocurrió un error
  }

  /**
   * Se ejecuta cuando un error es lanzado en cualquier componente hijo.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true }; // Cambia el estado para mostrar un mensaje alternativo
  }

  /**
   * Se ejecuta cuando se captura un error en un componente hijo.
   */
  componentDidCatch(error, errorInfo) {
    console.error("Error capturado por el ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Si ocurrió un error, muestra un mensaje alternativo
      return <div>Algo salió mal...</div>;
    }

    // Si no hay error, renderiza los componentes hijos
    return this.props.children;
  }
}

export default ErrorBoundary;