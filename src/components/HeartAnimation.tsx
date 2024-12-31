import React from 'react';

export const HeartAnimation: React.FC = () => {
  return (
    <canvas
      className="heart-canvas"
      style={{
        imageRendering: 'pixelated',
        width: '128px',
        height: '128px',
        animation: 'float 2s infinite ease-in-out'
      }}
    />
  );
};