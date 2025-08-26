import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, Search, GitBranch,  PanelLeftClose } from 'lucide-react';
import { getFileIcon } from '../utils/fileIcons';

export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  color?: string;
  children?: FileItem[];
  content?: string;
  command?: string;
}

interface FileExplorerProps {
  id?:string;
  fileStructure: FileItem[];
  activeTab: string;
  expandedFolders: Set<string>;
  sidebarWidth: number;
  isResizing: boolean;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  onFileClick: (item: FileItem) => void;
  onFolderToggle: (folderName: string) => void;
  onRightClick: (e: React.MouseEvent, fileName: string) => void;
    onMouseDown: (e: React.MouseEvent<Element>) => void; // ✅ Changed to Element

}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  fileStructure,
  activeTab,
  expandedFolders,
  sidebarWidth,
  isResizing,
  isCollapsed,
  setIsCollapsed,
  onFileClick,
  onFolderToggle,
  onRightClick,
  onMouseDown
}) => {
  const [isProjectExpanded, setIsProjectExpanded] = React.useState(true);

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item, index) => (
      <div key={index}>
        <div 
          className={`flex items-center 
            py-1 px-2
            hover-themed cursor-pointer 
            text-sm font-sans ${
            activeTab === item.name ? `bg-vscode-tertiary border-r-2 border-vscode-accent text-vscode-primary` : ''
          } hover-scale-sm transition-all duration-200`}
          style={{ 
            paddingLeft: `${8 + level * 16}px`,
            fontFamily: 'var(--vscode-font-family)',
          }}
          onClick={() => {
            if (item.type === 'folder') {
              onFolderToggle(item.name);
            } else {
              onFileClick(item);
            }
          }}
          onContextMenu={(e) => onRightClick(e, item.name)}
        >
          {item.type === 'folder' ? (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown id={`file-explorer-chevron-down-${item.name.replace(/\s+/g, '-').toLowerCase()}`} className="w-4 h-4 mr-1 transition-transform duration-200 flex-shrink-0" />
              ) : (
                <ChevronRight id={`file-explorer-chevron-right-${item.name.replace(/\s+/g, '-').toLowerCase()}`} className="w-4 h-4 mr-1 transition-transform duration-200 flex-shrink-0" />
              )}
              {expandedFolders.has(item.name) ? (
                <FolderOpen id={`file-explorer-folder-open-${item.name.replace(/\s+/g, '-').toLowerCase()}`} className={`w-4 h-4 mr-2 accent-themed flex-shrink-0`} />
              ) : (
                <Folder id={`file-explorer-folder-${item.name.replace(/\s+/g, '-').toLowerCase()}`} className={`w-4 h-4 mr-2 accent-themed flex-shrink-0`} />
              )}
            </>
          ) : (
            <div id={`file-explorer-file-icon-${item.name.replace(/\s+/g, '-').toLowerCase()}`} className="w-4 h-4 mr-2 ml-5
              flex items-center justify-center hover-bounce flex-shrink-0">
              {getFileIcon(item.name)}
            </div>
          )}
          <span id={`file-explorer-item-name-${item.name.replace(/\s+/g, '-').toLowerCase()}`} className="flex-1 truncate min-w-0">{item.name}</span>
        </div>
        {item.type === 'folder' && expandedFolders.has(item.name) && item.children && (
          <div id={`file-explorer-folder-children-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          id="file-explorer-mobile-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)} 
        />
      )}
      
      {/* File Explorer */}
      <div 
        id="file-explorer-main-container"
        className={`bg-themed border-r border-vscode flex flex-col relative z-50 transition-transform duration-300 ease-in-out
          fixed sm:fixed md:relative lg:relative xl:relative 2xl:relative 
          top-0 left-0 h-full md:h-auto lg:h-auto xl:h-auto 2xl:h-auto
          max-w-xs sm:max-w-sm md:max-w-none lg:max-w-none xl:max-w-none 2xl:max-w-none
        animate-slide-in-left`} 
        style={{ 
          width: isCollapsed ? '0px' : 
                 window.innerWidth < 640 ? '100vw' :
                 window.innerWidth < 768 ? '320px' :
                 `${sidebarWidth}px`,
          minWidth: isCollapsed ? '0px' : 
                   window.innerWidth < 768 ? 'auto' :
                   '200px',
        }}
      >

        {/* Expanded State */}
        {!isCollapsed && (
          <>
  {/*      <div 
          id="file-explorer-resize-handle"
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover-themed transition-all duration-200 ${isResizing ? 'bg-blue-500 animate-glow' : ''}`}
          onMouseDown={onMouseDown}
        />
  */}      <div 
  id="file-explorer-resize-handle"
  className={`resize-handle absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-vscode-accent-hover transition-all duration-200 ${isResizing ? 'bg-vscode-accent' : 'hover:border-vscode-accent'}`}
  onMouseDown={onMouseDown}
  title="Drag to resize explorer width"
/>
        {/* Explorer Header */}
        <div id="file-explorer-header" className={`px-3 py-2 border-b border-vscode`}>
          <div id="file-explorer-header-content" className="flex items-center justify-between">
            <span className={`text-xs font-semibold text-secondary-themed uppercase tracking-wider
              truncate flex-1 mr-2 font-sans`}>
              <span id="file-explorer-title-full" className="hidden sm:inline">Explorer</span>
              <span id="file-explorer-title-mobile" className="inline sm:hidden">Files</span>
            </span>
            <button
              id="file-explorer-collapse-button"
              onClick={() => setIsCollapsed(true)}
              className={`p-1 hover-themed rounded transition-all duration-300 hover-rotate flex-shrink-0
                min-h-6 min-w-6`}
              title=""
              aria-label=""
            >
              <PanelLeftClose id="file-explorer-collapse-icon" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* File Tree */}
        <div id="file-explorer-tree-container" className="flex-1 overflow-y-auto animate-fade-in-scale">
          <div id="file-explorer-tree-content" className="py-1">
            <div 
              id="file-explorer-project-header" 
              className={`flex items-center px-2 py-1 
                text-xs font-medium text-themed cursor-pointer hover-themed transition-all duration-200 font-sans`}
              onClick={() => setIsProjectExpanded(!isProjectExpanded)}
            >
              {isProjectExpanded ? (
                <ChevronDown id="file-explorer-project-chevron" className="w-4 h-4 mr-1 transition-transform duration-200" />
              ) : (
                <ChevronRight id="file-explorer-project-chevron" className="w-4 h-4 mr-1 transition-transform duration-200" />
              )}
              <span id="file-explorer-project-name" className="animate-slide-in-right truncate">
                <span id="file-explorer-project-name-full" className="hidden sm:inline">dev-portfolio</span>
                <span id="file-explorer-project-name-short" className="inline sm:hidden">portfolio</span>
              </span>
            </div>
            {isProjectExpanded && (
              <div id="file-explorer-tree-items" className="">
                {renderFileTree(fileStructure)}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Icons */}
        <div id="file-explorer-bottom-section" className={`border-t border-vscode px-3 py-2`}>
          <div id="file-explorer-bottom-icons" className="flex flex-col gap-2">
            <div id="file-explorer-outline-section" className={`flex items-center gap-2 
              text-xs text-secondary-themed font-sans`}>
              <Search id="file-explorer-outline-icon" className="w-4 h-4 flex-shrink-0" />
              <span id="file-explorer-outline-text" className="truncate">OUTLINE</span>
            </div>
            <div id="file-explorer-timeline-section" className={`flex items-center gap-2 
              text-xs text-secondary-themed font-sans`}>
              <GitBranch id="file-explorer-timeline-icon" className="w-4 h-4 flex-shrink-0" />
              <span id="file-explorer-timeline-text" className="truncate">TIMELINE</span>
            </div>
          </div>
        </div>
          </>
        )}
      </div>
    </>
  );
};