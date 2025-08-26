import React from 'react';
import { Github, ExternalLink, Code,  FolderCode } from 'lucide-react';
import { projects } from '../data/portfolio';

interface ProjectsSectionProps {
  color?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ color = 'var(--vscode-accent)' }) => {
  return (
    <div id="projects-section-container" className="animate-fade-in-up px-2 sm:px-4 md:px-6 lg:px-8">
<div id="projects-section-header" className="mb-4 sm:mb-6 md:mb-8 transform transition-all duration-500">
        <h1 id="projects-section-title" className="text-lg sm:text-xl md:text-2xl font-bold text-primary-themed font-sans mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 transition-colors duration-300">
          <FolderCode id="projects-section-icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110" style={{ color: 'var(--vscode-accent)' }} />
          <span id="projects-section-title-text" className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--vscode-accent), var(--vscode-accent))` }}>
            Featured Projects
          </span>
        </h1>
        <div id="projects-section-divider" className="w-16 sm:w-20 h-0.5 sm:h-1 rounded-full mb-3 sm:mb-4 md:mb-6" style={{ background: `linear-gradient(to right, var(--vscode-accent), var(--vscode-accent))` }}></div>
      </div>
      
      <div id="projects-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} id={`project-card-${index}`} className={`bg-vscode-bg-secondary rounded-md sm:rounded-lg overflow-hidden border border-vscode-${color} hover:border-vscode-accent transition-colors`}>
            {/* Project Image */}
            {project.image && (
              <div id={`project-image-container-${index}`} className="h-32 sm:h-40 md:h-48 overflow-hidden">
                <img 
                  id={`project-image-${index}`}
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 object-cover object-top"
                />
              </div>
            )}
            
            <div id={`project-content-${index}`} className="p-3 sm:p-4 md:p-6">
              {/* Project Header */}
              <div id={`project-header-${index}`} className="flex items-start justify-between mb-2 sm:mb-3">
                <h3 id={`project-name-${index}`} className="text-base sm:text-lg md:text-xl font-semibold text-vscode-text-active">{project.name}</h3>
                <div id={`project-links-${index}`} className="flex items-center gap-1 sm:gap-2">
                  {project.github && (
                    <a 
                      id={`project-github-link-${index}`}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 hover:bg-vscode-bg-tertiary rounded-md sm:rounded-lg transition-colors"
                      title="View Source Code"
                    >
                      <Github id={`project-github-icon-${index}`} size={16} className="sm:w-[18px] sm:h-[18px] text-vscode-text-secondary hover:text-vscode-accent" />
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      id={`project-demo-link-${index}`}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 hover:bg-vscode-tertiary rounded-md sm:rounded-lg transition-colors"
                      title="View Live Demo"
                    >
                      <ExternalLink id={`project-demo-icon-${index}`} size={16} className="sm:w-[18px] sm:h-[18px] text-vscode-text-secondary hover:text-vscode-accent" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Project Description */}
              <p id={`project-description-${index}`} className="text-vscode-text-primary mb-2 sm:mb-3 md:mb-4 leading-relaxed text-xs sm:text-sm md:text-base">
                {project.description}
              </p>
              
              {/* Technologies */}
              <div id={`project-technologies-${index}`} className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3 md:mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    id={`project-tech-${index}-${techIndex}`}
                    className="px-2 py-0.5 sm:px-3 sm:py-1 bg-vscode-bg-tertiary text-vscode-text-primary rounded-full text-xs sm:text-sm flex items-center gap-1"
                  >
                    <Code id={`project-tech-icon-${index}-${techIndex}`} size={10} className="sm:w-3 sm:h-3" />
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div id={`project-actions-${index}`} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                {project.github && (
                  <a 
                    id={`project-github-button-${index}`}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-vscode-bg-tertiary hover:bg-vscode-bg-panel rounded-md sm:rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    <Github id={`project-github-button-icon-${index}`} size={14} className="sm:w-4 sm:h-4" />
                    Source Code
                  </a>
                )}
                {project.demo && (
                  <a 
                    id={`project-demo-button-${index}`}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-vscode-accent hover:bg-vscode-accent-hover text-white rounded-md sm:rounded-lg transition-colors text-xs sm:text-sm"
                  >
                    <ExternalLink id={`project-demo-button-icon-${index}`} size={14} className="sm:w-4 sm:h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Call to Action */}
      <div id="projects-cta-section" className="mt-6 sm:mt-8 md:mt-12 text-center">
        <div id="projects-cta-container" className="bg-vscode-bg-secondary rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 border border-vscode-border">
          <h3 id="projects-cta-title" className="text-base sm:text-lg md:text-xl font-semibold text-vscode-text-active mb-2 sm:mb-3">
            Interested in my work?
          </h3>
          <p id="projects-cta-description" className="text-xs sm:text-sm md:text-base text-vscode-text-secondary mb-3 sm:mb-4">
            Check out more projects on my GitHub or get in touch to discuss collaboration opportunities.
          </p>
          <div id="projects-cta-buttons" className="flex justify-center gap-2 sm:gap-3 md:gap-4">
            <a 
              id="projects-cta-github-link"
              href="https://github.com/githublink"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-vscode-bg-tertiary hover:bg-vscode-bg-panel rounded-md sm:rounded-lg transition-colors text-xs sm:text-sm"
            >
              <Github id="projects-cta-github-icon" size={16} className="sm:w-[18px] sm:h-[18px]" />
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};