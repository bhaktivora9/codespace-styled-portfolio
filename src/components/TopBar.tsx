  import React from 'react';
import { Server, Sun, Moon } from 'lucide-react';

interface TopBarProps {
    id?: string; // Add this line
  isDarkTheme: boolean;
  setIsDarkTheme: (isDark: boolean) => void;
   onServerClick?: () => void;
 
}

export const TopBar: React.FC<TopBarProps> = ({
  
  isDarkTheme,
  setIsDarkTheme,
  onServerClick,
}) => {
  //const [isServerPulsing, setIsServerPulsing] = React.useState(false);
  const handleServerClick = () => {
    if (onServerClick) {
      onServerClick();
    }
  };


  return (
    <div id="top-bar-container" className="h-9 p-3 flex items-center justify-between bg-vscode-primary border-b border-vscode text-xs select-none transition-vscode shadow-vscode">
      {/* Left Section - Logo and Name */}
      <div id="top-bar-logo-section" className="relative flex items-center gap-2" onClick={handleServerClick}>
        <div
          id="top-bar-server-container"
          className="relative cursor-pointer"
         
        >
          <Server
            className={`w-3 h-3 text-vscode-primary hover:text-vscode-muted transition-all duration-200 hover:scale-105 flex-shrink-0 `}
            id="top-bar-server-icon"
          />
          {/* Status Indicator */}
          <div
            id="top-bar-status-indicator"
            className={`absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-green-200 rounded-full shadow-sm transition-all duration-10 group animate-bounce animate-glow`}
            tabIndex={0}
            role="button"
            aria-label="Server status: Online"
          >
            <div
              id="top-bar-status-ping"
              className={` absolute inset-0 bg-green-500 group-hover:bg-green-500 rounded-full opacity-75 transition-all duration-10 animate-glow animate-bounce`} 
            ></div>
          </div>
        </div>

        <div id="top-bar-title-container" className="min-w-0 relative">
          <span id="top-bar-title-full" className="hidden sm:inline text-xs font-sans font-medium text-vscode-secondary hover:text-vscode-muted transition-all duration-200 hover:scale-105 cursor-pointer truncate px-1">
            dev.profile
          </span>
          <span id="top-bar-title-mobile" className="inline sm:hidden text-xs font-sans font-medium text-vscode-secondary hover:text-vscode-muted transition-all duration-200 hover:scale-105 cursor-pointer">
            dev
          </span>
        </div>
      </div>

      {/* Center Section - Title */}
      {/* Middle Section - Breadcrumb */}
      <div id="top-bar-center-section" className="flex items-center text-center justify-center flex-1 max-w-md mx-4">
        <div id="top-bar-search-container" className={`flex items-center gap-2 px-3 py-1 bg-vscode-tertiary rounded border border-vscode w-full transition-all duration-300 `}>
          <svg id="top-bar-search-icon" className="w-4 h-4 text-secondary-themed" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path id="top-bar-search-icon-path" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
  id="top-bar-search-display"
  value="codespace-styled-portfolio [Codespaces: dev.profile]"
  className="bg-transparent text-vscode-muted items-center truncate text-xs outline-none flex-1 cursor-default select-none"
  tabIndex={0}
  readOnly
/>


        </div>
      
      </div>

      {/* Right Section - Accent Selector and Theme Toggle */}
      <div id="top-bar-right-section" className="flex items-center gap-2">
        

        <button
          id="top-bar-theme-toggle"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
          className="p-1.5 rounded transition-vscode text-vscode-secondary hover:text-vscode-accent hover:bg-vscode-tertiary"
          title={isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {isDarkTheme ? (
            <Sun id="top-bar-sun-icon" size={14} className="transition-vscode" />
          ) : (
            <Moon id="top-bar-moon-icon" size={14} className="transition-vscode" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
