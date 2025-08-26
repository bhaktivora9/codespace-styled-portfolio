import React from 'react';
import {  Code2, Mail, Briefcase, FolderCode } from 'lucide-react';
import { Name } from '../components/Name'
import { QuickNavButton } from '../components/QuickNavButton';
interface WelcomeSectionProps {
  setActiveTab: (tab: string) => void;
  openTabs: string[];
  setOpenTabs: (tabs: string[] | ((prev: string[]) => string[])) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  setActiveTab,
  openTabs,
  setOpenTabs,
}) => {
  const handleSectionClick = (fileName: string) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs(prev => [...prev, fileName]);
    }
    setActiveTab(fileName);
  };

  return (
    <div className="flex-1 bg-vscode-primary items-center text-center text-themed overflow-y-auto">
      {/* Navigation arrows */}
      <div className="flex items-center justify-center pt-3 sm:pt-6 md:pt-6 lg:pt-6 xl:pt-6 2xl:pt-10">
      </div>

      {/* Welcome content */}
      <div className="flex flex-col items-center justify-center py-8 px-4 sm:px-6 md:px-8">
        
        {/* Main heading */}
        <div className="text-center mb-4 mt-2">
          <Name ></Name>
        </div>
<div className="mb-2">
        <p className="text-lg text-vscode-muted mb-2 transition-colors">
          Select a file from the explorer to get started
        </p>
<div className="flex gap-4 justify-center flex-wrap">
  
<QuickNavButton
    icon={Briefcase}
    label="Experience"
    fileName="Work.css"
    color="bg-vscode-sky hover:bg-blue-500/20"
    iconColor="text-white"
    onSelect={handleSectionClick}
  />
<QuickNavButton
    icon={Code2}
    label="Skills"
    fileName="skills.json"
    color="bg-vscode-yellow hover:bg-yellow-500/20"
    iconColor="text-white"
    onSelect={handleSectionClick}
  />
  <QuickNavButton
    icon={FolderCode}
    label="Projects"
    fileName="projects.ts"         
    color="bg-vscode-green hover:bg-green-500/20"
    iconColor="text-white"
    onSelect={handleSectionClick}
  />

  <QuickNavButton
    icon={Mail}
    label="Contact"
    fileName="Contact.html"           
    color="bg-vscode-orange hover:bg-orange-500/20"
    iconColor="text-white"
    onSelect={handleSectionClick}
  />
</div>

        {/* Terminal hint */}
        <div className="text-center animate-fade-in-up stagger-3">
          <p className="text-xs sm:text-sm
            text-secondary-themed mt-4 mb-4">
            Or use interactive terminal commands for quick navigation
          </p>
          <div className="inline-flex items-center gap-2
            bg-secondary-themed border border-themed rounded-lg
            px-3 py-2
            font-mono text-xs italic">
            <span className="text-muted-themed">$</span>
            <span className="text-secondary-themed">help - for available commands</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};