import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
interface NameProps {
  id?: string;
}

export const Name: React.FC<NameProps> = ({ id }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  
  const fullText = `${personalInfo.name}`;
  const typingSpeed = 150; // milliseconds per character
  
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div id={id || "name-component"} className="text-center items-center text-center justify-center mb-8 animate-fade-in-up">
      <div id="name-container" className="inline-block bg-vscode-tertiary/30 backdrop-blur-sm border-2 border-vscode rounded-xl p-8 shadow-xl">
        <div id="name-terminal-prompt" className="flex items-start justify-center mb-4 text-sm font-mono text-secondary-themed">
          <span id="name-prompt-user" className="text-vscode-muted font-semibold"><span>{"> "}</span>dev@portfolio</span>
          <span id="name-prompt-colon" className="text-vscode-muted font-semibold mx-1">:</span>
          <span id="name-prompt-tilde" className="text-vscode-muted font-semibold">~</span>
          <span id="name-prompt-dollar" className="text-vscode-muted font-semibold ml-1">$</span>
          <span id="name-prompt-command" className="ml-2 text-vscode-muted">whoami</span>
        </div>
        
        <div id="name-display" className="relative">
          <h1 id="name-text" className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-themed">
            <span id="name-bracket-open" className="text-primary-themed"></span>
            <span id="name-typed-text" className="text-accent-themed">{displayedText}</span>
            <span id="name-cursor" className={`text-accent-themed transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
              {currentIndex < fullText.length ? '|' : '_'}
            </span>
            <span id="name-bracket-close" className="text-primary-themed"></span>
          </h1>
        </div>
        
        <div id="name-subtitle" className="mt-4 text-secondary-themed font-mono text-sm">
          <span id="name-role" className="ml-2">{personalInfo.title}</span>
        </div>
      </div>
    </div>
  );
};