import { useEffect, useMemo, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getFileIcon } from '../utils/fileIcons';
import type { FileItem } from './FileExplorer';

interface TabBarProps {
  id?:string;
  fileStructure: FileItem[];
  activeTab: string;
  openTabs: string[];
  setActiveTab: (file: string) => void;
  onCloseTab: (file: string) => void;
}

export function TabBar({ fileStructure, activeTab, openTabs, setActiveTab, onCloseTab }: TabBarProps) {
  // --- Preindex for O(1) color lookup
  const fileMetaByName = useMemo(() => {
    const map = new Map<string, { color?: string }>();
    fileStructure.forEach(folder => {
      if (folder.children) {
        folder.children.forEach(file => {
          map.set(file.name, { color: file.color });
        });
      }
    });
    return map;
  }, [fileStructure]);

  const getColor = (filename: string) =>
    fileMetaByName.get(filename)?.color || 'var(--vscode-accent)';

  // --- Ext-based icon hook (swap later if you add more icons)
  const iconForFile = useCallback((filename: string) => getFileIcon(filename), []);

  // --- Refs to auto-scroll active tab into view
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLDivElement | null>(null);

  // --- Navigation state
  const currentIndex = openTabs.indexOf(activeTab);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex > -1 && currentIndex < openTabs.length - 1;
  const showNavigation = openTabs.length > 1;

  // --- Navigation functions
  const navigateLeft = useCallback(() => {
    if (canGoLeft) {
      setActiveTab(openTabs[currentIndex - 1]);
    }
  }, [canGoLeft, setActiveTab, openTabs, currentIndex]);

  const navigateRight = useCallback(() => {
    if (canGoRight) {
      setActiveTab(openTabs[currentIndex + 1]);
    }
  }, [canGoRight, setActiveTab, openTabs, currentIndex]);

  const closeFile = useCallback((file: string) => {
    onCloseTab(file);
  }, [onCloseTab]);

  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab, openTabs]);

  // --- Keyboard shortcuts like VS Code
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        if (e.code === 'PageUp') {
          e.preventDefault();
          navigateLeft();
        } else if (e.code === 'PageDown') {
          e.preventDefault();
          navigateRight();
        } else if (e.key.toLowerCase() === 'w') {
          // Ctrl+W closes current
          if (activeTab) {
            e.preventDefault();
            closeFile(activeTab);
          }
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTab, navigateLeft, navigateRight, closeFile]);

  // --- Horizontal wheel scrolling (shift not required)
  useEffect(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Don't render TabBar content if no tabs are open
  if (openTabs.length === 0) {
    return <div id="tab-bar-empty" className="bg-vscode-bg-secondary border-b border-vscode theme-transition" style={{ height: '0px', overflow: 'hidden' }} />;
  }

  return (
    <div id="tab-bar-container" className="bg-vscode-bg-secondary border-b border-vscode theme-transition">
      {/* Tab Bar with Navigation */}
      <div id="tab-bar-content" className="flex items-center">
        {showNavigation && (
          <button
            id="tab-bar-nav-left"
            onClick={navigateLeft}
            disabled={!canGoLeft}
            className={`flex items-center justify-center w-8 h-8 transition-colors ${
              canGoLeft
                ? 'text-vscode-text-primary hover:bg-vscode-bg-panel hover:text-vscode-text-active'
                : 'text-vscode-text-muted cursor-not-allowed'
            }`}
            title="Previous tab (Ctrl+PageUp)"
            aria-label="Previous tab"
          >
            <ChevronLeft id="tab-bar-nav-left-icon" className="w-4 h-4" />
          </button>
        )}

        {/* Tabs Container */}
        <div
          id="tab-bar-tabs-container"
          ref={tabsContainerRef}
          className="flex items-center gap-2 overflow-x-auto flex-1 px-2 py-2"
          role="tablist"
          aria-label="Open files"
        >
          {openTabs.map((file) => {
            const isActive = activeTab === file;
            const fileIcon = iconForFile(file);
            const color = getColor(file);

            return (
              <div
                id={`tab-bar-tab-${file.replace(/[^a-zA-Z0-9]/g, '-')}`}
                key={file}
                ref={isActive ? activeTabRef : null}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`group flex items-center gap-2 px-3 py-1 rounded-t border-t-2 cursor-pointer transition-all min-w-0 ${
                  isActive
                    ? `bg-vscode-bg-primary text-vscode-text-active border-t-2`
                    : 'bg-vscode-bg-secondary border-transparent text-vscode-text-primary hover:bg-vscode-bg-panel'
                }`}
                style={isActive ? { borderTopColor: color } : { borderTopColor: 'transparent' }}
                onClick={() => setActiveTab(file)}
                onAuxClick={(e) => {
                  // Middle-click closes tab
                  if (e.button === 1) {
                    e.preventDefault();
                    closeFile(file);
                  }
                }}
                title={file}
              >
                <div id={`tab-bar-tab-icon-${file.replace(/[^a-zA-Z0-9]/g, '-')}`} className="w-3 h-3 flex-shrink-0 transition-colors\" style={{ color }}>
                  {fileIcon}
                </div>
                <span id={`tab-bar-tab-name-${file.replace(/[^a-zA-Z0-9]/g, '-')}`} className="text-sm truncate whitespace-nowrap transition-colors">{file}</span>
                <button
                  id={`tab-bar-tab-close-${file.replace(/[^a-zA-Z0-9]/g, '-')}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(file);
                  }}
                  className="opacity-60 hover:opacity-100 text-vscode-text-secondary hover:text-vscode-text-primary transition-all p-0.5 rounded hover:bg-vscode-bg-tertiary"
                  title={`Close ${file}`}
                  aria-label={`Close ${file}`}
                >
                  <X id={`tab-bar-tab-close-icon-${file.replace(/[^a-zA-Z0-9]/g, '-')}`} className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showNavigation && (
          <button
            id="tab-bar-nav-right"
            onClick={navigateRight}
            disabled={!canGoRight}
            className={`flex items-center justify-center w-8 h-8 transition-colors ${
              canGoRight
                ? 'text-vscode-text-primary hover:bg-vscode-bg-panel hover:text-vscode-text-active'
                : 'text-vscode-text-muted cursor-not-allowed'
            }`}
            title="Next tab (Ctrl+PageDown)"
            aria-label="Next tab"
          >
            <ChevronRight id="tab-bar-nav-right-icon" className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
}