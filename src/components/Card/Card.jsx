// src/components/Card/Card.jsx
import React from 'react';
import './Card.css'; // Estilos específicos para la tarjeta

/**
 * Componente Card reutilizable para envolver contenido, como formularios.
 * Aplica un diseño limpio y centrado con sombra suave.
 * @param {object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido a renderizar dentro de la tarjeta.
 * @param {string} [props.className] - Clases CSS adicionales para la tarjeta.
 */
function Card({ children, className = '' }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
}

export default Card;
