import React from 'react';
import { Download } from 'lucide-react';

interface ContextMenuProps {
  contextMenu: { x: number; y: number; show: boolean };
  onDownloadResume: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  contextMenu,
  onDownloadResume,
}) => {
  if (!contextMenu.show) return null;

  return (
    <div 
      className={`fixed bg-secondary-themed border border-themed rounded-lg shadow-lg py-2 z-50`}
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      <button
        onClick={onDownloadResume}
        className={`flex items-center gap-2 px-4 py-2 text-sm text-themed hover:text-primary-themed hover-themed w-full text-left`}
      >
        <Download className="w-4 h-4" />
        Download Resume
      </button>
    </div>
  );
};