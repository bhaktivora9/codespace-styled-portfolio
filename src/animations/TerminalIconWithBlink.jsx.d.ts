import React from 'react';

interface TerminalIconWithBlinkProps {
  size?: number;
  color?: string;
  hoverColor?: string;
  className?: string;
  animated?: boolean;
  forceBlinking?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

declare const TerminalIconWithBlink: React.FC<TerminalIconWithBlinkProps>;
export default TerminalIconWithBlink;