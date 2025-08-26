import React, { useState } from 'react';
// @ts-ignore
import  TerminalIconWithBlink  from '../animations/TerminalIconWithBlink';
// @ts-ignore
import { UserLookingAroundAnimation } from '../animations/UserLookingAroundAnimation';
import {
  Files,
  Search,
  GitBranch,
  Package,
  Settings,
  
  Terminal as TerminalIcon,
  X,
  User
} from 'lucide-react';
const navigationItems = [
  { id: 'explorer', icon: Files, label: 'Explorer', active: true },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'source-control', icon: GitBranch, label: 'Source Control' },
  { id: 'extensions', icon: Package, label: 'Extensions' },
  { id: 'terminal', icon: TerminalIcon, label: 'Terminal' },
  /*{ id: 'message', icon: MessageCircle, label: 'Send Message' },*/
];

const bottomItems = [
  { id: 'accounts', icon: User, label: 'Accounts' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

interface LeftNavigationProps {
    id?: string; 
  onItemClick?: (itemId: string) => void;
  isExplorerCollapsed?: boolean;
  setIsExplorerCollapsed?: (collapsed: boolean) => void;
  isTerminalOpen?: boolean;
  setIsTerminalOpen?: (open: boolean) => void;
  isTerminalMinimized?: boolean;
  setIsTerminalMinimized?: (minimized: boolean) => void;
  isDarkTheme?: boolean;
  setIsDarkTheme?: (isDark: boolean) => void;
  /*setShowFloatingForm?: (show: boolean) => void;*/
  activeNavItem?: string;
  setActiveNavItem?: (item: string) => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
    id,
  onItemClick,
  isExplorerCollapsed,
  setIsExplorerCollapsed,
  isTerminalOpen,
  setIsTerminalOpen,
  isTerminalMinimized,
  setIsTerminalMinimized,
  isDarkTheme,
  setIsDarkTheme,
  /*setShowFloatingForm,*/
  activeNavItem: propActiveNavItem,
  setActiveNavItem: propSetActiveNavItem
}) => {
  const [localActiveNavItem, setLocalActiveNavItem] = useState('explorer');
  const activeNavItem = propActiveNavItem || localActiveNavItem;
  const setActiveNavItem = propSetActiveNavItem || setLocalActiveNavItem;
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState({
    search: 0,
    'source-control': 0,
    extensions: 0,
    accounts: 0,
    settings: 0
  });
const [settingsHovered, setSettingsHovered] = useState(false);
  const [settingsBouncing, setSettingsBouncing] = useState(false);
  const [shakeItem, setShakeItem] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<{ show: boolean; message: string; type: string }>({
    show: false,
    message: '',
    type: ''
  });
  const [terminalCursorBlink, setTerminalCursorBlink] = useState<boolean>(false);
  const [settingsAnimating, setSettingsAnimating] = useState(false);

 
const handleItemClick = (itemId: string) => {
  setActiveNavItem(itemId);
  switch (itemId) {
    case "explorer":
      setIsExplorerCollapsed?.(!isExplorerCollapsed);
      break;
    case "terminal":
      if (isTerminalOpen) {
        // Terminal is open - close it completely
        setIsTerminalOpen?.(false);
        setIsTerminalMinimized?.(false); // Reset minimized state
        setActiveNavItem("explorer"); // Switch to explorer when closing
      } else {
        // Terminal is closed - open it
        setIsTerminalOpen?.(true);
        setIsTerminalMinimized?.(false); // Ensure it opens not minimized
      }

      // Cursor blink effect
      setTerminalCursorBlink(true);
      setTimeout(() => setTerminalCursorBlink(false), 50);
      break;
     /*case 'message':
        setShowFloatingForm?.(true);
        break;*/
    case "theme-toggle":
      setIsDarkTheme?.(!isDarkTheme);
      break;
    case "search":
      setShakeItem(itemId);
      setShowPopup({
        show: true,
        message: "🔍 Searching through 847 files...",
        type: "info",
      });
      setTimeout(() => setShakeItem(null), 600);
      setTimeout(
        () => setShowPopup({ show: false, message: "", type: "" }),
        3000
      );
      break;
    case "source-control": {
      setShakeItem(itemId);
      const errorMessages = [
        "Repository does not exist",
        "No longer allowed to contribute",
        "You are not authorized",
        "Access denied",
        "Repository archived",
      ];
      const currentCount = notifications["source-control"];
      const nextCount = (currentCount % errorMessages.length) + 1;
      setNotifications((prev) => ({ ...prev, "source-control": nextCount }));
      const errorMsg = errorMessages[nextCount - 1];
      setShowPopup({
        show: true,
        message: `🚫 Git Error: ${errorMsg}`,
        type: "error",
      });
      setTimeout(() => setShakeItem(null), 600);
      setTimeout(
        () => setShowPopup({ show: false, message: "", type: "" }),
        4000
      );
      break;
    }
    case "extensions":
      setShakeItem(itemId);
      setShowPopup({
        show: true,
        message: "📦 Installing a new extensions...",
        type: "success",
      });
      setTimeout(() => setShakeItem(null), 800);
      setTimeout(
        () => setShowPopup({ show: false, message: "", type: "" }),
        3000
      );
      break;
    case 'settings':
        
        setSettingsAnimating(true);
        setTimeout(() => setSettingsAnimating(false), 2000);
        
        break;
    case "accounts":
      break;
  }
  onItemClick?.(itemId);
};


  const getItemAnimation = (itemId: string) => {
    if (shakeItem !== itemId) return '';
    switch (itemId) {
      case 'search': return 'animate-bounce';
      case 'source-control': return 'animate-pulse';
      case 'extensions': return 'animate-spin';
      case 'settings': return 'animate-spin';
      default: return 'animate-pulse';
    }
  };

  return (
     <div 
      id={id || "left-navigation-container"}  className="relative w-12 bg-[var(--vscode-bg-primary)] h-full flex flex-col border-r border-[var(--vscode-border)] shadow-sm transition-all duration-300">
      {showPopup.show && (
        <div id="left-navigation-popup" className={`fixed top-16 z-50 animate-slide-in-right ${isExplorerCollapsed ? 'left-16' : 'left-64'}`}>
          <div id="left-navigation-popup-content" className={`px-4 py-3 rounded-lg shadow-lg border max-w-xs ${
            showPopup.type === 'error'
              ? 'bg-red-900/90 border-red-700 text-red-200'
              : showPopup.type === 'success'
              ? 'bg-green-900/90 border-green-700 text-green-200'
              : 'bg-blue-900/90 border-blue-700 text-blue-200'} backdrop-blur-sm`}>
            <div id="left-navigation-popup-inner" className="flex items-center justify-between gap-3">
              <span id="left-navigation-popup-message" className="text-sm font-medium font-sans">{showPopup.message}</span>
              <button id="left-navigation-popup-close" onClick={() => setShowPopup({ show: false, message: '', type: '' })} className="text-current hover:opacity-70 transition-opacity">
                <X id="left-navigation-popup-close-icon" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="left-navigation-main-items" className="flex-1 py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          // Determine if this nav item should appear active
          const isActive = (() => {
            switch (item.id) {
              case 'explorer':
                return !isExplorerCollapsed;
              case 'terminal':
                return (isTerminalOpen && !isTerminalMinimized) || activeNavItem === 'terminal';
              default:
                return activeNavItem === item.id;
            }
          })();
          const hasNotification = notifications[item.id as keyof typeof notifications] > 0;

          return (
            <div key={item.id} id={`left-nav-item-${item.id}`} className="relative w-full">
              <button
                id={`left-nav-button-${item.id}`}
                className={`w-full h-12 p-0 mb-1 flex items-center justify-center transition-all duration-200 hover:bg-[var(--vscode-bg-tertiary)] hover:text-[var(--vscode-accent)] group ${getItemAnimation(item.id)} ${
                  isActive ? 'border-r-2 border-r-[var(--vscode-accent)] bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] border-r-2 border-r-transparent'
                }`}
                onClick={() => handleItemClick(item.id)}
                title={item.label}
              >
                {item.id === 'terminal' ? (
                  <TerminalIconWithBlink 
                    size={20}
                    color={isActive ? 'var(--vscode-text-primary)' : 'currentColor'}
                    hoverColor="var(--vscode-accent)"
                    animated={false}
                    forceBlinking={terminalCursorBlink}
                    className={`transition-all duration-300 group-hover:animate-none ${
                      isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]'
                    } ${!isActive ? 'animate-soft-bounce' : ''}`}
                  />
                ) : (
                  <Icon id={`left-nav-icon-${item.id}`} size={20} className={`transition-all duration-300 ${
                    isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]'
                  }`} />
                )}
              </button>
              {hasNotification && (
                <div id={`left-nav-notification-${item.id}`} className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span id={`left-nav-notification-count-${item.id}`} className="text-white text-[10px] font-bold">
                    {notifications[item.id as keyof typeof notifications]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div id="left-navigation-bottom-items" className="py-2 ">
        {bottomItems.map((item) => {
          const isActive = activeNavItem === item.id;
          const hasNotification = notifications[item.id as keyof typeof notifications] > 0;

          return (
            <div key={item.id} id={`left-nav-bottom-item-${item.id}`} className="relative w-full">
              <button
                id={`left-nav-bottom-button-${item.id}`}
                className={`w-full h-12 p-0 mb-1 flex items-center justify-center transition-all duration-200 hover:bg-[var(--vscode-bg-tertiary)] hover:text-[var(--vscode-accent)] group ${getItemAnimation(item.id)} ${
                  isActive ? 'border-r-2 border-r-[var(--vscode-accent)] bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] border-r-2 border-r-transparent'
                }`}
                onClick={() => handleItemClick(item.id)}
                onMouseEnter={() => {
                  if (item.id === 'settings') {
                    setSettingsHovered(true);
                    setSettingsAnimating(true);
                    setTimeout(() => setSettingsAnimating(false), 2000);
                  }
                }}
                onMouseLeave={() => {
                  if (item.id === 'settings') {
                    setSettingsHovered(false);
                  }
                }}
                title={item.label}
              >
                {item.id === 'accounts' ? (
                  <UserLookingAroundAnimation 
                    size={20}
                    color={isActive ? 'var(--vscode-text-primary)' : 'var(--vscode-text-secondary)'}
                    hoverColor="var(--vscode-accent)"
                    triggerAnimation={true}
                    className={`transition-all duration-200 group-hover:text-[var(--vscode-accent)] focus:text-[var(--vscode-accent)] ${
                      isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)]'
                    }`}
                  />
                ) : (
                  React.createElement(item.icon, {
                    id: `left-nav-bottom-icon-${item.id}`,
                    size: 20,
                    className: `transition-all duration-200 ${(settingsAnimating || settingsHovered) && item.id === 'settings' ? 'animate-settings-rotation' : ''} ${settingsBouncing && item.id === 'settings' ? 'animate-basketball-bounce' : ''} ${
                      isActive ? 'text-[var(--vscode-text-primary)]' : 'text-[var(--vscode-text-secondary)] group-hover:text-[var(--vscode-accent)]'
                    }`
                  })
                )}
              </button>
              {hasNotification && (
                <div id={`left-nav-bottom-notification-${item.id}`} className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                  <span id={`left-nav-bottom-notification-count-${item.id}`} className="text-white text-[10px] font-bold">
                    {notifications[item.id as keyof typeof notifications]}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};