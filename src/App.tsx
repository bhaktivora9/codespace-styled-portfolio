import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TopBar } from './components/TopBar';
import { LeftNavigation } from './components/LeftNavigation';
import { FileExplorer } from './components/FileExplorer';
import { LineNumberGutter } from './components/LineNumberGutter';
import { TabBar } from './components/TabBar';
import { SubTabBar } from './components/SubTabBar';
import { WelcomeSection } from './sections/WelcomeSection';
import { AboutSection } from './sections/AboutSection';
import { WorkSection } from './sections/WorkSection';
import { EducationSection } from './sections/EducationSection';
import { ProjectsSection } from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import { ContactSection } from './sections/ContactSection';
import { Terminal } from './components/Terminal';
import { ResumeSection } from './sections/ResumeSection';
import { StatusBar } from './components/StatusBar'
import { Download, Code2 } from 'lucide-react';
import { 
  initializeAnalytics,
  trackPageView, 
  trackFileOpen, 
  trackResumeDownload,
  trackTimeOnPage,
  trackEvent,
  trackNavigation,
  trackInteractiveElement,
  getAnalyticsDebugInfo,
  clearStoredUTMParameters
} from './utils/analytics';
import { personalInfo } from './data/portfolio';

import './index.css';

interface ContextMenuState {
  x: number;
  y: number;
  fileName: string;
}

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  color?: string;
  command?: string;
  children?: FileItem[];
}

interface FileStructureItem {
  name: string;
  type: 'file' | 'folder';
  color?: string;
  children?: FileStructureItem[];
}

// Debug Mode Configuration
const getURLParams = () => new URLSearchParams(window.location.search);
const DEBUG_MODE = getURLParams().get('devMode') === 'true';
const DEBUG_ANALYTICS = DEBUG_MODE && (getURLParams().get('analytics') !== 'false');
const DEBUG_INTERACTIONS = DEBUG_MODE && (getURLParams().get('interactions') !== 'false');
const DEBUG_PERFORMANCE = DEBUG_MODE && (getURLParams().get('performance') !== 'false');

// Debug Logger
const debugLog = (category: string, message: string, data?: any) => {
  if (!DEBUG_MODE) return;
  
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  /*const style = `
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2px 8px;
    border-radius: 3px;
    font-weight: bold;
  `;*/
  
  console.groupCollapsed(`%c[${timestamp}] ${category.toUpperCase()}`,  message);
  if (data) {
    console.log('Data:', data);
  }
  if (DEBUG_ANALYTICS) {
    console.log('Analytics State:', getAnalyticsDebugInfo());
  }
  console.groupEnd();
};

function App() {
  
  const fileStructure: FileStructureItem[] = [
    {
      name: 'my-portfolio',
      type: 'folder',
      children: [
        { name: 'About.java', type: 'file', color: 'var(--vscode-accent)' },
        { name: 'Work.css', type: 'file', color: 'var(--vscode-sky)' },
        { name: 'education.yml', type: 'file', color: 'var(--vscode-purple)' },
        { name: 'projects.ts', type: 'file', color: 'var(--vscode-emerald)' },
        { name: 'skills.json', type: 'file', color: 'var(--vscode-yellow)' },
        { name: 'Contact.html', type: 'file', color: 'var(--vscode-orange)' },
        { name: 'resume.pdf', type: 'file', color: 'var(--vscode-red)' }
      ]
    }
  ];

  // Performance tracking refs
  const startTime = useRef<number>(Date.now());
  const lastInteractionTime = useRef<number>(Date.now());
  const interactionCount = useRef<number>(0);

  // State declarations
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('');
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [isExplorerCollapsed, setIsExplorerCollapsed] = useState<boolean>(false);
  const [sidebarWidth, setSidebarWidth] = useState<number>(200);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [leftNavActiveItem, setLeftNavActiveItem] = useState('explorer');
  const [isTerminalMinimized, setIsTerminalMinimized] = useState<boolean>(false);
  const [terminalHeight, setTerminalHeight] = useState<number>(320);
  const [isTerminalResizing, setIsTerminalResizing] = useState<boolean>(false);
  const resumeUrl = `${import.meta.env.BASE_URL}assets/${personalInfo.resume}`;
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['my-portfolio']));

  // Debug: Track user interactions
  const trackInteraction = (type: string, details: any = {}) => {
    if (!DEBUG_INTERACTIONS) return;
    
    interactionCount.current++;
    const timeSinceLastInteraction = Date.now() - lastInteractionTime.current;
    lastInteractionTime.current = Date.now();
    
    debugLog('interaction', `User ${type}`, {
      interactionNumber: interactionCount.current,
      timeSinceLastInteraction: `${timeSinceLastInteraction}ms`,
      ...details
    });
  };




  const downloadResume = () => {
    debugLog('download', 'Resume download initiated');
    trackInteraction('download_resume');
    trackResumeDownload();
    
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sample_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setContextMenu(null);
    
    debugLog('download', 'Resume download completed');
  };

  const handleFileClick = (item: FileItem) => {
    debugLog('file', `File clicked: ${item.name}`, { fileType: item.type, hasCommand: !!item.command });
    trackInteraction('file_click', { fileName: item.name, fileType: item.type });
    trackFileOpen(item.name);
    
    // Performance tracking
    if (DEBUG_PERFORMANCE) {
      const clickTime = performance.now();
      requestIdleCallback(() => {
        const renderTime = performance.now() - clickTime;
        debugLog('performance', `File render time: ${renderTime.toFixed(2)}ms`);
      });
    }
    
    // Set dynamic accent color based on file
    const fileColor = getFileColor(item.name);
    if (fileColor && fileColor !== 'var(--vscode-accent)') {
      document.documentElement.style.setProperty('--vscode-accent', fileColor);
      document.documentElement.style.setProperty('--vscode-accent-hover', fileColor + '90');
      debugLog('theme', `Accent color changed to: ${fileColor}`);
    } else {
      document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
      document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
      debugLog('theme', 'Accent color reset to default');
    }
    
    // Add tab to openTabs if not already open
    if (!openTabs.includes(item.name)) {
      setOpenTabs(prev => {
        const newTabs = [...prev, item.name];
        debugLog('tabs', `Tab opened: ${item.name}`, { totalTabs: newTabs.length, allTabs: newTabs });
        return newTabs;
      });
    }
    setActiveTab(item.name);
    
    if (item.command) {
      debugLog('terminal', `Command associated with file: ${item.command}`);
    }
  };
  
  const handleCloseTab = useCallback((fileName: string) => {
    debugLog('tabs', `Closing tab: ${fileName}`);
    trackInteraction('close_tab', { fileName });
    trackEvent('tab_close', { tab_name: fileName });
    
    const newTabs = openTabs.filter(tab => tab !== fileName);
    setOpenTabs(newTabs);
      
    if (activeTab === fileName) {
      const newActiveTab = newTabs.length > 0 ? newTabs[newTabs.length - 1] : '';
      setActiveTab(newActiveTab);
      
      debugLog('tabs', `Active tab changed to: ${newActiveTab || 'none'}`, { 
        previousTab: fileName,
        remainingTabs: newTabs 
      });
      
      // Update accent color for new active tab or reset to default
      if (newActiveTab) {
        const fileColor = getFileColor(newActiveTab);
        if (fileColor && fileColor !== 'var(--vscode-accent)') {
          document.documentElement.style.setProperty('--vscode-accent', fileColor);
          document.documentElement.style.setProperty('--vscode-accent-hover', fileColor + '90');
        } else {
          document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
          document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
        }
      } else {
        document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
        document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
        debugLog('theme', 'All tabs closed - accent color reset');
      }
    }
  }, [openTabs, activeTab, setOpenTabs, setActiveTab]);

  // Handle server click to close all tabs and go to welcome
  const handleServerClick = () => {
    debugLog('navigation', 'Server icon clicked - returning to welcome');
    trackInteraction('server_click');
    trackNavigation('welcome', activeTab || 'unknown');
    
    setOpenTabs([]);
    setActiveTab('');
    document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
    document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
  };

  // Helper function to get file color from structure
  const getFileColor = (fileName: string): string => {
    for (const folder of fileStructure) {
      if (folder.children) {
        const file = folder.children.find(child => child.name === fileName);
        if (file && file.color) {
          return file.color;
        }
      }
    }
    return 'var(--vscode-accent)';
  };

  const handleSetActiveTab = useCallback((tab: string) => {
    debugLog('tabs', `Setting active tab: ${tab}`, { previousTab: activeTab });
    trackInteraction('switch_tab', { newTab: tab, previousTab: activeTab });
    trackNavigation(tab, activeTab);
    
    // Set dynamic accent color based on active tab
    const fileColor = getFileColor(tab);
    if (fileColor && fileColor !== 'var(--vscode-accent)') {
      document.documentElement.style.setProperty('--vscode-accent', fileColor);
      document.documentElement.style.setProperty('--vscode-accent-hover', fileColor + '90');
    } else {
      document.documentElement.style.setProperty('--vscode-accent', 'var(--vscode-default-accent)');
      document.documentElement.style.setProperty('--vscode-accent-hover', 'var(--vscode-default-accent-hover)');
    }
    
    setActiveTab(tab);
  }, [setActiveTab, activeTab]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    document.documentElement.className = isDarkTheme ? 'dark' : '';
    debugLog('theme', `Theme changed to: ${isDarkTheme ? 'dark' : 'light'}`);
  }, [isDarkTheme]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (contextMenu && event.target && event.target instanceof Element) {
        if (!event.target.closest('.context-menu')) {
          debugLog('context', 'Context menu closed by outside click');
          setContextMenu(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [contextMenu]);

  // Handle file opening from terminal
  useEffect(() => {
    const handleOpenFile = (event: CustomEvent) => {
      const { fileName } = event.detail;
      debugLog('terminal', `File open request from terminal: ${fileName}`);
      trackInteraction('terminal_file_open', { fileName });
      
      if (!openTabs.includes(fileName)) {
        handleFileClick({ name: fileName, type: 'file' });
      } else {
        handleSetActiveTab(fileName);
      }
    };

    window.addEventListener('openFile', handleOpenFile as EventListener);
    return () => {
      window.removeEventListener('openFile', handleOpenFile as EventListener);
    };
  }, [openTabs, handleSetActiveTab]);
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    debugLog('resize', 'Sidebar resize started');
      trackInteraction('resize_start');
      
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      setIsResizing(true);
      e.preventDefault();
    }
    if (target.classList.contains('terminal-resize-handle')) {
      setIsTerminalResizing(true);
      e.preventDefault();
    }
  }, []);/*
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      debugLog('resize', 'Sidebar resize started');
      trackInteraction('resize_start');
      setIsResizing(true);
      e.preventDefault();
    }
      if ((e.target as HTMLElement).classList.contains('terminal-resize-handle')) {
      setIsTerminalResizing(true);
      e.preventDefault();
    }
  }, []);*/
/*
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = Math.max(200, Math.min(400, e.clientX));
      setSidebarWidth(newWidth);
    }
        if (isTerminalResizing) {
      const windowHeight = window.innerHeight;
      const topBarHeight = 36; // TopBar height
      const availableHeight = windowHeight - topBarHeight;
      const mouseY = e.clientY - topBarHeight;
      const newHeight = Math.max(200, Math.min(600, availableHeight - mouseY));
      setTerminalHeight(newHeight);
    }
  }, [isResizing]);*/

   const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = Math.max(200, Math.min(400, e.clientX));
      setSidebarWidth(newWidth);
    }
    if (isTerminalResizing) {
      const windowHeight = window.innerHeight;
      const topBarHeight = 36; // TopBar height
      const availableHeight = windowHeight - topBarHeight;
      const mouseY = e.clientY - topBarHeight;
      const newHeight = Math.max(200, Math.min(600, availableHeight - mouseY));
      setTerminalHeight(newHeight);
    }
  }, [isResizing, isTerminalResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    setIsTerminalResizing(false);
  }, []);


  // Initialize analytics when app loads
  useEffect(() => {
    debugLog('init', 'Application initializing');
    
    // Small delay to ensure GTM is loaded first
    setTimeout(() => {
      initializeAnalytics();
      trackPageView('Portfolio Home');
      debugLog('analytics', 'Analytics initialized');
      
      if (DEBUG_MODE) {
        // Add debug utilities to window for console access
        (window as any).portfolioDebug = {
          getAnalyticsInfo: getAnalyticsDebugInfo,
          clearUTM: clearStoredUTMParameters,
          trackTestEvent: (name: string, data: any) => trackEvent(name, data),
          logInteractionCount: () => console.log(`Interactions: ${interactionCount.current}`),
          getPerformanceData: () => ({
            appLoadTime: Date.now() - startTime.current,
            interactionCount: interactionCount.current,
            openTabs: openTabs.length,
            activeTab
          })
        };
        
        debugLog('debug', 'Debug utilities added to window.portfolioDebug');
        console.log('🔧 Debug Mode Active - Use window.portfolioDebug for testing');
      }
    }, 100);
    
    startTime.current = Date.now();
  }, []);

  const toggleFolder = (folderName: string) => {
    debugLog('explorer', `Folder toggle: ${folderName}`);
    trackInteraction('folder_toggle', { folderName, wasExpanded: expandedFolders.has(folderName) });
    trackInteractiveElement('folder', folderName, 'toggle');
    
    const newExpanded = new Set(expandedFolders);
    if (expandedFolders.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = (Date.now() - startTime.current) / 1000;
      debugLog('session', `Session ending - time spent: ${timeSpent.toFixed(1)}s, interactions: ${interactionCount.current}`);
      
      if (timeSpent > 5) {
        trackTimeOnPage(timeSpent, 'portfolio_home');
        trackEvent('session_end', {
          time_spent_seconds: Math.round(timeSpent),
          total_interactions: interactionCount.current,
          tabs_opened: openTabs.length,
          final_active_tab: activeTab
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [openTabs.length, activeTab]);

  // Simple 3s loading delay with performance tracking
  useEffect(() => {
    const loadStartTime = performance.now();
    
    const loadingTimer = setTimeout(() => {
      const loadTime = performance.now() - loadStartTime;
      //debugLog('performance', `App load completed in ${loadTime.toFixed(2)}ms`);
      trackEvent('app_load_complete', { load_time_ms: Math.round(loadTime) });
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);
/*
  useEffect(() => {
  if (isResizing) {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }
}, [isResizing, handleMouseMove, handleMouseUp]);*/
  useEffect(() => {
    if (isResizing || isTerminalResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = isResizing ? 'col-resize' : 'ns-resize';
      document.body.style.userSelect = 'none';
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [isResizing, isTerminalResizing, handleMouseMove, handleMouseUp]);


  const handleRightClick = (e: React.MouseEvent, fileName: string) => {
    e.preventDefault();
    debugLog('context', `Right click on: ${fileName}`, { x: e.clientX, y: e.clientY });
    trackInteraction('right_click', { fileName, x: e.clientX, y: e.clientY });
    trackInteractiveElement('file', fileName, 'right_click');
    
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      fileName
    });
  };

  const LoadingScreen = () => {
    useEffect(() => {
      debugLog('loading', 'Loading screen displayed');
      trackEvent('loading_screen_shown');
    }, []);

    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center transition-colors text-center space-y-6">
        <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center shadow-2xl">
          <Code2 size={70} className="text-white" />
        </div>
        
        <p className="text-gray-400 text-sm">
          Setting up your development environment
          {DEBUG_MODE && <span className="block text-xs text-purple-400 mt-2">Debug Mode Active</span>}
        </p>
        
        <div className="space-x-2">
          <span className="dot bg-sky-400 inline-block"></span>
          <span className="dot bg-red-400 inline-block"></span>
          <span className="dot bg-purple-400 inline-block"></span>
          <span className="dot bg-amber-400 inline-block"></span>
          <span className="dot bg-green-400 inline-block"></span>
        </div>
      </div>
    );
  };

  const getTabContent = () => {
    const contentClasses = `flex-1 overflow-y-auto text-themed transition-all duration-300`;
    const paddingClasses = `p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8 flex-1`;

    // Show welcome screen if no tabs are open
    if (openTabs.length === 0 || !activeTab) {
      debugLog('content', 'Rendering welcome section');
      return (
        <div className={contentClasses}>
          <WelcomeSection 
            setActiveTab={handleSetActiveTab} 
            openTabs={openTabs} 
            setOpenTabs={setOpenTabs} 
          />
        </div>
      );
    }

    debugLog('content', `Rendering content for tab: ${activeTab}`);

    switch (activeTab) {
      case 'About.java':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={50} />
              <div className={paddingClasses}>
                <div className="font-mono">
                  <AboutSection setActiveTab={handleSetActiveTab} openTabs={openTabs} setOpenTabs={setOpenTabs} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Work.css':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={80} />
              <div className={paddingClasses}>
                <div className="font-mono">
                  <WorkSection color={getFileColor('Work.css')} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects.ts':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={60} />
              <div className={paddingClasses}>
                <div className="font-mono">
                  <ProjectsSection color="var(--vscode-green)" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'skills.json':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={70} />
              <div className={paddingClasses}>
                <SkillsSection />
              </div>
            </div>
          </div>
        );

      case 'Contact.html':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={50} />
              <div className={paddingClasses}>
                <ContactSection />
              </div>
            </div>
          </div>
        );

      case 'education.yml':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={30} />
              <div className={paddingClasses}>
                <EducationSection color={getFileColor('education.yml')} />
              </div>
            </div>
          </div>
        );

      case 'resume.pdf':
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={100} />
              <div className={paddingClasses}>
                <ResumeSection color={getFileColor('resume.pdf')}/>
              </div>
            </div>
          </div>
        );

      default:
        debugLog('content', `Unknown tab: ${activeTab}, showing welcome`);
        return (
          <div className={contentClasses}>
            <div className="flex">
              <LineNumberGutter lineCount={20} />
              <div className={paddingClasses}>
                <WelcomeSection 
                  setActiveTab={handleSetActiveTab} 
                  openTabs={openTabs} 
                  setOpenTabs={setOpenTabs} 
                />
              </div>
            </div>
          </div>
        );
    }
  };

  // Show loading screen initially
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div id="app-root" className="h-screen bg-vscode-primary text-vscode-primary flex flex-col overflow-hidden theme-transition">
      {/* Debug Panel (only in debug mode) */}
      {/*{DEBUG_MODE && (
        <div className="fixed top-4 right-4 z-50 bg-purple-900 text-white p-2 rounded text-xs opacity-80">
          <div>🔧 Debug Mode</div>
          <div>Interactions: {interactionCount.current}</div>
          <div>Active Tab: {activeTab || 'none'}</div>
          <div>Open Tabs: {openTabs.length}</div>
        </div>
      )}*/}
      
      <TopBar 
        id="app-top-bar" 
        isDarkTheme={isDarkTheme} 
        setIsDarkTheme={setIsDarkTheme}   
        onServerClick={handleServerClick}
      />
      
      <div id="app-main-container" className="flex flex-1 overflow-hidden">
        
        <LeftNavigation
          id="app-left-navigation"
          isExplorerCollapsed={isExplorerCollapsed}
          setIsExplorerCollapsed={setIsExplorerCollapsed}
          isTerminalOpen={isTerminalOpen}
          setIsTerminalOpen={setIsTerminalOpen}
          isTerminalMinimized={isTerminalMinimized}
          setIsTerminalMinimized={setIsTerminalMinimized}
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
/*          setShowFloatingForm={setShowFloatingForm}
*/          activeNavItem={leftNavActiveItem}
          setActiveNavItem={setLeftNavActiveItem}
        />

        <FileExplorer
          id="app-file-explorer"
          fileStructure={fileStructure}
          activeTab={activeTab}
          expandedFolders={expandedFolders}
          sidebarWidth={sidebarWidth}
          isResizing={isResizing}
          isCollapsed={isExplorerCollapsed}
          setIsCollapsed={setIsExplorerCollapsed}
          onFileClick={handleFileClick}
          onFolderToggle={toggleFolder}
          onRightClick={handleRightClick}
          onMouseDown={handleMouseDown}
        />
    
        <div id="app-content-area" className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isExplorerCollapsed ? 'ml-0' : ''}`}>
          <TabBar
            id="app-tab-bar"
            fileStructure={fileStructure}
            activeTab={activeTab}
            openTabs={openTabs}
            setActiveTab={handleSetActiveTab}
            onCloseTab={handleCloseTab}
          />
          {openTabs.length > 0 && <SubTabBar id="app-sub-tab-bar" activeTab={activeTab} baseFolderPath={fileStructure[0].name}/>}

          <div id="app-main-content" className={`main-content-area flex-1 ${activeTab ? 'overflow-y-auto' : 'overflow-y-auto'} bg-themed transition-all duration-300 ${
            isTerminalOpen ? 'pb-0' : ''
          }`}>
            {getTabContent()}
          </div>

          {isTerminalOpen && (
  <div
            id="app-terminal-container"
            className={`fixed bottom-0 flex flex-col z-50 bg-vscode-secondary shadow-2xl border-t border-vscode transition-all duration-300 ${
              isExplorerCollapsed ? 'left-12' : `left-[${sidebarWidth + 48}px]`
            }`}
            style={{ 
              height: `${terminalHeight}px`,
              right: '0px',
              left: isExplorerCollapsed ? '48px' : `${sidebarWidth + 48}px`
            }}
          >
    {/* Terminal resize handle */}
            <div 
              className={`terminal-resize-handle absolute top-0 left-0 right-0 h-1 cursor-row-resize hover:bg-vscode-accent/50 transition-all duration-200 ${isTerminalResizing ? 'bg-vscode-accent' : 'hover:bg-vscode-accent'}`}
              onMouseDown={handleMouseDown}
              title="Drag to resize terminal height"
            />

                        <div id="app-terminal-header" className="bg-vscode-secondary px-3 py-2 flex items-center justify-between border border-vscode">
                <div id="app-terminal-header-left" className="flex items-start justify-between gap-3">
                  <div id="app-terminal-icon" className="flex items-start gap-2 justify-between w-5 h-5 text-vscode-primary">
                    <span className="text-sm" style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>{'\>_'}</span>
                    <span id="app-terminal-label" className="text-vscode-secondary gap-2   text-sm " 
                      style={{ fontFamily: 'Consolas, "Courier New", monospace' }}>Terminal</span>
                  </div>
                </div>
                
                <div id="app-terminal-controls" className="flex items-center gap-2">
                  <button
                    id="app-terminal-close-btn"
                       onClick={(e) => {
                    e.stopPropagation();
                    setIsTerminalOpen(false);
                    setIsTerminalMinimized(false);
                   // Reset active nav item when closing terminal
                   if (leftNavActiveItem === 'terminal') {
                     setLeftNavActiveItem('explorer');
                   }
                  }}
               
                    className="p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-300 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
          
              <Terminal id="app-terminal" />
            </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <div 
          id="app-context-menu"
          className="fixed bg-vscode-secondary border border-vscode-border rounded-lg shadow-lg py-2 z-50 context-menu"
          style={{ 
            left: contextMenu.x, 
            top: contextMenu.y,
            minWidth: '150px'
          }}
        >
          {contextMenu.fileName === 'resume.pdf' && (
            <button
              id="app-context-menu-download"
              onClick={downloadResume}
              className="w-full px-4 py-2 text-left text-vscode-text-primary hover:bg-vscode-bg-tertiary transition-colors flex items-center gap-2"
            >
              <Download id="app-context-menu-download-icon" className="w-4 h-4" />
              Download Resume
            </button>
          )}
        </div>
      )}
      <StatusBar/>
    </div>
  );
}

export default App;