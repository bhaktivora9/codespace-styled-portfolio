
import { GitBranch } from 'lucide-react';



export const StatusBar: React.FC = () => {



  return (
    <div className="bg-vscode-secondary text-vscode-muted px-4 py-1 flex items-center justify-between text-xs relative animate-slide-up">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <span className="animate-slide-in-left">Codespaces: bhakti.dev-github-theme</span>
        <div className="flex items-center gap-2">
          <GitBranch className="w-3 h-3 hover-bounce" />
          <span className="animate-slide-in-right stagger-1">master*</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse-gentle"></span>
          <span className="animate-slide-in-bottom stagger-2">1</span>
          <span className="w-2 h-2 bg-yellow-500 rounded-full ml-2 animate-pulse-gentle"></span>
          <span className="animate-slide-in-bottom stagger-3">2</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4 relative">
       <span className="animate-slide-in-right stagger-4">Portfolio Ready</span>
        <span className="animate-slide-in-right stagger-5">Layout: US</span>
      </div>
    </div>
  );
};
