import React from 'react';
import './Avatar.css';

/**
 * Componente Avatar para fotos de perfil
 */
function Avatar({ src, alt = "Avatar", fallback = "?", size = "md" }) {
  const [error, setError] = React.useState(false);

  return (
    <div className={`avatar avatar-${size}`}>
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className="avatar-image"
          onError={() => setError(true)}
        />
      ) : (
        <div className="avatar-fallback">
          {fallback}
        </div>
      )}
    </div>
  );
}

export default Avatar;