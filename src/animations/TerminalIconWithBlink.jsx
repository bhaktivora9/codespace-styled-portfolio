import React from 'react';

const TerminalIconWithBlink = ({ 
  size = 20, 
  color = 'currentColor', 
  hoverColor = 'var(--vscode-accent)',
  className = '',
  animated = true,
  forceBlinking = false,
  onMouseEnter,
  onMouseLeave,
  onClick
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);
  const shouldBlink = animated || forceBlinking || isHovered || isClicked;

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e) => {
    setIsHovered(false);
    onMouseLeave?.(e);
  };

  const handleClick = (e) => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
    onClick?.(e);
  };

  return (
    <div 
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <style>{`
        .cursor-blink {
          animation: ${shouldBlink ? 'blink 1s infinite' : 'none'};
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={isHovered ? hoverColor : color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke 0.2s ease' }}
      >
        <path d="m4 17 6-6-6-6" />
        <path d="M12 19h8" className="cursor-blink" />
      </svg>
    </div>
  );
};

export default TerminalIconWithBlink;
