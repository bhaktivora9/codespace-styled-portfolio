import React from "react";

interface QuickNavButtonProps {
  id?: string;
  icon: React.ElementType;
  label: string;
  color: string;     // Tailwind / CSS var classes
  iconColor: string; // Tailwind / CSS var classes
  fileName: string;
  onSelect?: (fileName: string) => void; // <- use this
  onClick?: () => void;                  // optional override
}

export function QuickNavButton({
  id,
  icon: Icon,
  label,
  color,
  iconColor,
  fileName,
  onSelect,
  onClick,
}: QuickNavButtonProps) {
  const handleClick = () => {
    if (onClick) return onClick();
    if (onSelect) return onSelect(fileName);
  };

  return (
    <button
      id={id}
      onClick={handleClick}
      className="flex flex-col items-center gap-2 p-4 
                 bg-[var(--vscode-bg-quaternary)] 
                 border border-[var(--vscode-border)] 
                 rounded-lg 
                 hover:bg-[var(--vscode-bg-panel)] 
                 transition-colors theme-transition"
    >
      <div id={`${id}-icon-container`} className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center transition-colors`}>
        <Icon id={`${id}-icon`} className={`w-6 h-6 ${iconColor}`} />
      </div>
      <span id={`${id}-label`} className="text-sm text-[var(--vscode-text-primary)] transition-colors">
        {label}
      </span>
    </button>
  );
}
