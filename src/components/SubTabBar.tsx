import React from 'react';
import { ChevronRight, Folder } from 'lucide-react';
import type { FileItem } from './FileExplorer';

interface SubTabBarProps {
  activeTab: string;
  id?: string;
  baseFolderPath: string;

}

export const SubTabBar: React.FC<SubTabBarProps> = ({ id ,activeTab,  baseFolderPath }) => {
  // Generate breadcrumb path based on active tab
  const generateBreadcrumb = (fileName: string) => {
    const basePath = [baseFolderPath];
    // Map file extensions to appropriate folders
    const pathMap: { [key: string]: string[] } = {
      '.jsx': [...basePath],
      '.java': [...basePath],
      '.css': [...basePath],
      '.yml': [...basePath],
      '.ts': [...basePath],
      '.json': [...basePath],
      '.html': [...basePath],
      '.pdf': [...basePath]
    };
    // Find matching extension
    const extension = Object.keys(pathMap).find(ext => fileName.endsWith(ext));
    const folderPath = extension ? pathMap[extension] : basePath;
    return [...folderPath, fileName];
  };

  const breadcrumbPath = generateBreadcrumb(activeTab);

  return (
    <div id={id || "sub-tab-bar"} className="bg-secondary-themed shadow-sm border-b border-vscode bg-tertiary-themed
      px-2 sm:px-3 md:px-4 lg:px-4 xl:px-4 2xl:px-4
      py-0.5 sm:py-0.5 md:py-1 lg:py-1 xl:py-1 2xl:py-1
      flex items-center 
      text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm
      text-secondary-themed italic overflow-x-auto scrollbar-hide">
      {/* Folder icon */}
      <Folder id="sub-tab-bar-folder-icon" className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 xl:w-2.5 xl:h-2.5 2xl:w-3 2xl:h-3
        mr-1 sm:mr-1 md:mr-1.5 lg:mr-1.5 xl:mr-1.5 2xl:mr-1.5
        text-secondary-themed flex-shrink-0" />
      
      {/* Breadcrumb path */}
      <div id="sub-tab-bar-breadcrumb" className="flex items-center min-w-0 flex-1">
        {breadcrumbPath.map((segment, index) => (
          <React.Fragment key={`breadcrumb-${index}`}>
            {index > 0 && (
              <ChevronRight id={`sub-tab-bar-chevron-${index}`} className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-2.5 lg:h-2.5 xl:w-2.5 xl:h-2.5 2xl:w-2.5 2xl:h-2.5
                mx-0.5 sm:mx-1 md:mx-1 lg:mx-1 xl:mx-1 2xl:mx-1
                text-secondary-themed flex-shrink-0" />
            )}
            <span 
              id={`sub-tab-bar-segment-${index}`}
              className={`hover:text-themed transition-colors duration-200 
                text-xs sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-xs
                truncate max-w-20 sm:max-w-24 md:max-w-32 lg:max-w-40 xl:max-w-48 2xl:max-w-56
                text-themed font-light`}
              title={segment}
            >
              {segment}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};