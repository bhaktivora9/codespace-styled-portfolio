import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { educationList, certificates } from '../data/portfolio';

interface EducationSectionProps {
  color: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ color }) => {
  // Use CSS variable for accent color instead of prop
  const accentColor = 'var(--vscode-accent)';

  return (
    <div id="education-section-container" className="animate-fade-in-up px-2 sm:px-4 md:px-6 lg:px-8">
      <div id="education-section-header" className="mb-4 sm:mb-6 md:mb-8 transform transition-all duration-500">
        <h1 id="education-section-title" className="text-lg sm:text-xl md:text-2xl font-bold text-primary-themed font-sans mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 transition-colors duration-300">
          <GraduationCap id="education-section-icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110" style={{ color }} />
          <span id="education-section-title-text" className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${color}, var(--vscode-accent))` }}>
            Education & Certifications
          </span>
        </h1>
        <div id="education-section-divider" className="w-16 sm:w-20 h-0.5 sm:h-1 rounded-full mb-3 sm:mb-4 md:mb-6" style={{ background: `linear-gradient(to right, ${accentColor}, var(--vscode-accent))` }}></div>
      </div>

      {/* Timeline Container */}
      <div id="education-timeline-container" className="relative">
        {/* Main Timeline Line */}
        <div id="education-timeline-line" className="absolute left-3 sm:left-4 md:left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: accentColor }}></div>

        {/* Education */}
        <div id="education-timeline-education" className="relative mb-4 sm:mb-6 md:mb-8">
          {/* Education Timeline Node */}
          <div id="education-timeline-education-node" className="absolute left-1.5 sm:left-2 md:left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 z-10" style={{ backgroundColor: accentColor, borderColor: accentColor }}></div>
          
          {/* Education Card */}
          <div id="education-card" className="ml-6 sm:ml-8 md:ml-16 bg-secondary-themed rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            {/* Education Header */}
            <div id="education-card-header" className="flex items-center justify-between p-3 sm:p-4 md:p-6">
              <div id="education-card-header-content" className="flex items-center gap-2 sm:gap-3">
                <GraduationCap id="education-card-icon" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color }} />
                <div id="education-card-title-container">
                  <h3 id="education-card-title" className="text-base sm:text-lg md:text-xl font-bold text-primary-themed font-sans hover:text-vscode-accent transition-colors duration-300">
                    Education
                  </h3>
                </div>
              </div>
            </div>

            {/* Education Items */}
            <div id="education-card-content" className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 border-t border-themed/20">
              <div id="education-items-list" className="space-y-2 sm:space-y-3 md:space-y-4 mt-2 sm:mt-3 md:mt-4">
                {educationList.map((edu, index) => (
                <div key={index} id={`education-item-${index}`} className="bg-tertiary-themed rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-2 sm:p-3 md:p-4">
                  <div id={`education-item-header-${index}`} className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 sm:mb-2">
                    <h4 id={`education-item-degree-${index}`} className="text-sm sm:text-base font-semibold text-primary-themed font-sans">
                      {edu.degree}
                    </h4>
                    {edu.period && (
                      <div id={`education-item-period-${index}`} className="flex items-center gap-1 sm:gap-2 text-secondary-themed text-xs sm:text-sm font-mono mt-0.5 sm:mt-1 md:mt-0">
                        <Calendar id={`education-item-calendar-${index}`} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span id={`education-item-period-text-${index}`}>{edu.period}</span>
                      </div>
                    )}
                  </div>
                
                  <div id={`education-item-institution-${index}`} className="text-secondary-themed text-xs sm:text-sm font-sans mb-1 sm:mb-2">
                    <strong id={`education-item-institution-name-${index}`}>{edu.institution}</strong>
                    {edu.university && <span id={`education-item-university-${index}`}> - {edu.university}</span>}
                  </div>
                
                  {edu.description && (
                    <p id={`education-item-description-${index}`} className="text-secondary-themed text-xs sm:text-sm font-sans mb-1 sm:mb-2">
                      {edu.description}
                    </p>
                  )}
                
                  {edu.gpa && (
                    <div id={`education-item-gpa-${index}`} className="text-secondary-themed text-xs sm:text-sm font-sans">
                      <strong id={`education-item-gpa-label-${index}`}>GPA:</strong> <span id={`education-item-gpa-value-${index}`}>{edu.gpa}</span>
                    </div>
                  )}
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div id="education-timeline-certifications" className="relative mb-4 sm:mb-6 md:mb-8">
          {/* Certifications Timeline Node */}
          <div id="education-timeline-certifications-node" className="absolute left-1.5 sm:left-2 md:left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 z-10" style={{ backgroundColor: accentColor, borderColor: accentColor }}></div>
          
          {/* Certifications Card */}
          <div id="certifications-card" className="ml-6 sm:ml-8 md:ml-16 bg-secondary-themed rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            {/* Certifications Header */}
            <div id="certifications-card-header" className="flex items-center justify-between p-3 sm:p-4 md:p-6">
              <div id="certifications-card-header-content" className="flex items-center gap-2 sm:gap-3">
                <Award id="certifications-card-icon" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color }} />
                <div id="certifications-card-title-container">
                  <h3 id="certifications-card-title" className="text-base sm:text-lg md:text-xl font-bold text-primary-themed font-sans hover:text-vscode-accent transition-colors duration-300">
                    Professional Certifications
                  </h3>
                </div>
              </div>
            </div>

            {/* Certifications Items */}
            <div id="certifications-card-content" className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 border-t border-themed/20">
              <div id="certifications-items-list" className="space-y-2 sm:space-y-3 md:space-y-4 mt-2 sm:mt-3 md:mt-4">
                {certificates.map((cert, index) => (
                  <div key={index} id={`certification-item-${index}`} className="bg-tertiary-themed rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-2 sm:p-3 md:p-4">
                    <div id={`certification-item-header-${index}`} className="flex flex-col md:flex-row md:items-center md:justify-between mb-1 sm:mb-2">
                      <h4 id={`certification-item-degree-${index}`} className="text-sm sm:text-base font-semibold text-primary-themed font-sans">
                        {cert.degree}
                      </h4>
                      {cert.period && (
                        <div id={`certification-item-period-${index}`} className="flex items-center gap-1 sm:gap-2 text-secondary-themed text-xs sm:text-sm font-mono mt-0.5 sm:mt-1 md:mt-0">
                          <Calendar id={`certification-item-calendar-${index}`} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          <span id={`certification-item-period-text-${index}`}>{cert.period}</span>
                        </div>
                      )}
                    </div>
                    
                      {cert.credentials && (
                        <a
                          id={`certification-item-credentials-link-${index}`}
                          href={cert.credentials}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-vscode-accent hover:text-vscode-accent-hover text-xs sm:text-sm font-sans transition-colors duration-300 mt-0.5 sm:mt-1 md:mt-0"
                        >

                          View Credential
                        </a>
                      )}
                    <div id={`certification-item-institution-${index}`} className="text-secondary-themed text-xs sm:text-sm font-sans">
                      <strong id={`certification-item-institution-name-${index}`}>{cert.institution}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
                    <div id="education-timeline-certifications-node" className="absolute left-1.5 sm:left-2 md:left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 z-10" style={{ backgroundColor: accentColor, borderColor: accentColor }}></div>

        </div>


        {/* Timeline End with Simple Fade */}
        <div id="education-timeline-end" className="relative mt-4 sm:mt-6 md:mt-8">
          <div id="education-timeline-fade" className="absolute left-3 sm:left-4 md:left-6 top-0 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-vscode-accent via-vscode-accent/50 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};