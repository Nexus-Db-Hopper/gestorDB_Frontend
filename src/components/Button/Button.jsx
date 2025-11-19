// src/components/Button/Button.jsx
import React from 'react';
import './Button.css'; // Estilos específicos para el botón

/**
 * Componente Button reutilizable con estilos modernos y manejo de estado de carga.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido a renderizar dentro del botón.
 * @param {function} [props.onClick] - Función a llamar cuando se hace clic en el botón.
 * @param {string} [props.type='button'] - Tipo de botón (submit, button, reset).
 * @param {boolean} [props.disabled=false] - Indica si el botón está deshabilitado.
 * @param {boolean} [props.loading=false] - Indica si el botón está en estado de carga.
 * @param {string} [props.variant='primary'] - Variante de estilo (primary, secondary, danger, ghost).
 * @param {string} [props.className] - Clases CSS adicionales para el botón.
 */
function Button({ children, onClick, type = 'button', disabled = false, loading = false, variant = 'primary', className = '' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`button ${variant} ${className}`}
    >
      {loading ? 'Cargando...' : children}
    </button>
  );
}

export default Button;
