import React from 'react';

export const UserLookingAroundAnimation = ({ 
  size = 20, 
  color = 'currentColor', 
  hoverColor = 'var(--vscode-accent)',
  className = '',
  onMouseEnter,
  onMouseLeave,
  triggerAnimation = true
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width={size} 
      height={size}
      viewBox="0 0 24 24" 
      fill="none"
      stroke={color}
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={`${className} ${triggerAnimation && isHovered ? 'animate-morph' : ''}`}
      style={{
        stroke: isHovered ? hoverColor : color,
        transition: 'stroke 0.2s ease'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* body (shrinking instead of tilting) */}
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2">
        {triggerAnimation && isHovered && <animateTransform attributeName="transform" type="scale"
          values="1 1; 0.95 0.95; 0.95 0.95; 1 1"
          keyTimes="0; .28; .76; 1"
          dur="3.2s" calcMode="spline"
          keySplines="0.25 0.1 0.25 1; 0 0 1 1; 0.25 0.1 0.25 1"
          repeatCount="indefinite"/>}
      </path>

      {/* head (peeking left ↔ right with bob) */}
      <circle cx="12" cy="7" r="4">
        {triggerAnimation && isHovered && <>
          {/* side-to-side peek (more noticeable: ±5px) */}
          <animateTransform attributeName="transform" type="translate"
            values="0 0; 5 0; 5 0; -5 0; -5 0; 0 0"
            keyTimes="0; .28; .38; .66; .76; 1"
            dur="3.2s" calcMode="spline"
            keySplines="0.25 0.1 0.25 1; 0 0 1 1; 0.25 0.1 0.25 1; 0 0 1 1; 0.25 0.1 0.25 1"
            repeatCount="indefinite"/>
          {/* tiny bob */}
          <animateTransform attributeName="transform" additive="sum" type="translate"
            values="0 0; 0 .3; 0 0; 0 .3; 0 0"
            keyTimes="0; .28; .52; .76; 1"
            dur="3.2s" repeatCount="indefinite"/>
        </>}
      </circle>
    </svg>
  );
};