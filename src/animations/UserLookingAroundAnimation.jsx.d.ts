import React from 'react';

interface UserLookingAroundAnimationProps {
  size?: number;
  color?: string;
  hoverColor?: string;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent<SVGSVGElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<SVGSVGElement>) => void;
  triggerAnimation?: boolean;
}

export const UserLookingAroundAnimation: React.FC<UserLookingAroundAnimationProps>;
