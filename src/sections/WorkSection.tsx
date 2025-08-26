import React from 'react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronRight } from 'lucide-react';
import { experiences } from '../data/portfolio';
interface WorkSectionProps {
  color: string;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ color }) => {
  const [expandedRoles, setExpandedRoles] = React.useState<Set<string>>(new Set()); // All roles collapsed initially

  // Use CSS variable for accent color instead of prop
  const accentColor = 'var(--vscode-accent)';

  const toggleRole = (roleKey: string) => {
    const newExpanded = new Set(expandedRoles);
    if (expandedRoles.has(roleKey)) {
      newExpanded.delete(roleKey);
    } else {
      newExpanded.add(roleKey);
    }
    setExpandedRoles(newExpanded);
  };

  return (
    <div id="work-section-container" className="animate-fade-in-up px-2 sm:px-4 md:px-6 lg:px-8">
      <div id="work-section-header" className="mb-4 sm:mb-6 md:mb-8 transform transition-all duration-500">
        <h1 id="work-section-title" className="text-lg sm:text-xl md:text-2xl font-bold text-primary-themed font-sans mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 transition-colors duration-300">
          <Briefcase id="work-section-icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110" style={{ color }} />
          <span id="work-section-title-text" className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${color}, var(--vscode-accent))` }}>
            Work Experience
          </span>
        </h1>
        <div id="work-section-divider" className="w-16 sm:w-20 h-0.5 sm:h-1 rounded-full mb-3 sm:mb-4 md:mb-6" style={{ background: `linear-gradient(to right, ${color}, var(--vscode-accent))` }}></div>
      </div>

      {/* Timeline Container */}
      <div id="work-timeline-container" className="relative min-h-screen">
        {/* Main Timeline Line */}
        <div id="work-timeline-line" className="absolute left-3 sm:left-4 md:left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: color }}></div>

        {/* Experience Cards */}
        <div id="work-experience-cards" className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12">
          {experiences.map((company, companyIndex) => (
            <div key={companyIndex} id={`work-company-${companyIndex}`} className="relative min-h-[50vh] sm:min-h-[45vh] md:min-h-[40vh] lg:min-h-[35vh]">
              {/* Company Timeline Node */}
              <div id={`work-company-node-${companyIndex}`} className="absolute left-1.5 sm:left-2 md:left-4 w-3 h-3 sm:w-4 sm:h-4 bg-vscode-accent border-vscode-muted rounded-full z-10"></div>
              
              {/* Company Card */}
              <div id={`work-company-card-${companyIndex}`} className="ml-6 sm:ml-8 md:ml-12 lg:ml-16 bg-secondary-themed rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-all duration-300 min-h-[45vh] sm:min-h-[40vh] md:min-h-[35vh] lg:min-h-[30vh] flex flex-col">
                {/* Company Header */}
                <div id={`work-company-header-${companyIndex}`} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 md:p-6 gap-2 sm:gap-3 md:gap-4">
                  <div id={`work-company-info-${companyIndex}`} className="flex items-center gap-2 sm:gap-3 flex-1">
                    
                      <img 
                        id={`work-company-logo-${companyIndex}`}
                        src={company.logo} 
                        alt={`${company.company} logo`}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain rounded-md sm:rounded-lg shadow-sm flex-shrink-0"
                      />
                    
                    <div id={`work-company-details-${companyIndex}`}>
                      <h3 id={`work-company-name-${companyIndex}`} className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary-themed font-sans hover:text-vscode-accent transition-colors duration-300 cursor-pointer">
                        <a 
                          id={`work-company-link-${companyIndex}`}
                          href={company.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-vscode-accent transition-colors duration-300"
                        >
                          {company.company.includes('(Now Acquired by') ? (
                            <>
                              {company.company.split('(Now Acquired by')[0].trim()}
                              <span id={`work-company-acquisition-${companyIndex}`} className="block text-xs sm:text-sm font-normal text-secondary-themed italic mt-0.5 sm:mt-1">
                                Now Acquired by {company.company.split('(Now Acquired by')[1].replace(')', '').trim()}
                              </span>
                            </>
                          ) : (
                            company.company
                          )}
                        </a>
                      </h3>
                      <div id={`work-company-location-${companyIndex}`} className="flex items-center gap-1 sm:gap-2 text-secondary-themed text-xs mt-0.5 sm:mt-1">
                        <MapPin id={`work-company-location-icon-${companyIndex}`} className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span id={`work-company-location-text-${companyIndex}`} className="font-medium">{company.location}</span>
                      </div>
                    </div>
                  </div>
                  <div id={`work-company-period-container-${companyIndex}`} className="flex items-center gap-1 sm:gap-2">
                <div id={`work-company-period-wrapper-${companyIndex}`} className="flex items-center gap-2 sm:gap-4">
                  {/* Total Period */}
                  <div id={`work-company-period-${companyIndex}`} className="text-right sm:text-right">
                    <div id={`work-company-period-display-${companyIndex}`} className="flex items-center gap-1 sm:gap-2 text-secondary-themed text-xs font-mono">
                      <span id={`work-company-period-text-${companyIndex}`} className='text-themed italic'>{company.totalPeriod}</span>
                    </div>
                   
                  </div>
                      
                    </div>
                  </div>
                </div>

                {/* Roles within Company */}
                <div id={`work-company-roles-container-${companyIndex}`} className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6 border-t border-themed/20 flex-1">
                  <div id={`work-company-roles-${companyIndex}`} className="space-y-2 sm:space-y-3 md:space-y-4 mt-2 sm:mt-3 md:mt-4 h-full">
                    {company.roles.map((role, roleIndex) => {
                      const roleKey = `${companyIndex}-${roleIndex}`;
                      const isExpanded = expandedRoles.has(roleKey);
                      
                      return (
                        <div key={roleIndex} id={`work-role-${companyIndex}-${roleIndex}`} className="relative">
                          {/* Role Card */}
                          <div id={`work-role-card-${companyIndex}-${roleIndex}`} className="bg-tertiary-themed rounded-md sm:rounded-lg shadow-sm hover:shadow-md transition-all duration-300 min-h-[100px] sm:min-h-[90px] md:min-h-[80px] lg:min-h-[70px] xl:min-h-[60px] flex flex-col">
                            {/* Role Header - Clickable */}
                            <div 
                              id={`work-role-header-${companyIndex}-${roleIndex}`}
                              className="flex items-center justify-between p-2 sm:p-3 md:p-4 cursor-pointer hover:bg-themed transition-colors duration-200 min-h-[50px] sm:min-h-[48px] md:min-h-[44px] lg:min-h-[40px] xl:min-h-[36px]"
                              onClick={() => toggleRole(roleKey)}
                            >
                              <div id={`work-role-header-content-${companyIndex}-${roleIndex}`} className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-1 min-w-0">
                                {isExpanded ? (
                                  <ChevronDown id={`work-role-chevron-down-${companyIndex}-${roleIndex}`} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-200 flex-shrink-0" style={{ color: accentColor }} />
                                ) : (
                                  <ChevronRight id={`work-role-chevron-right-${companyIndex}-${roleIndex}`} className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 transition-transform duration-200 flex-shrink-0" style={{ color: accentColor }} />
                                )}
                                <div id={`work-role-info-${companyIndex}-${roleIndex}`} className="flex-1 min-w-0">
                                  <h4 id={`work-role-title-${companyIndex}-${roleIndex}`} className="text-xs sm:text-sm md:text-base font-semibold text-primary-themed font-sans truncate">
                                    {role.title}
                                  </h4>
                                  <div id={`work-role-period-${companyIndex}-${roleIndex}`} className="flex items-center gap-1 text-secondary-themed text-xs font-mono mt-0.5">
                                    <Calendar id={`work-role-calendar-icon-${companyIndex}-${roleIndex}`} className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                    <span id={`work-role-period-text-${companyIndex}-${roleIndex}`} className="truncate">{role.period}</span>
                                  </div>
                                </div>
                              </div>
                              {/* Career Level Indicator */}
                            </div>

                            {/* Expandable Role Details */}
                            {isExpanded && (
                              <div id={`work-role-details-${companyIndex}-${roleIndex}`} className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4 border-t flex-1" style={{ borderTopColor: `${color}10` }}>
                                {/* Role Description */}
                              <ul 
  id={`work-role-description-${companyIndex}-${roleIndex}`} 
  className="text-vscode-secondary text-xs sm:text-sm font-sans leading-relaxed mb-2 sm:mb-3 md:mb-4 mt-2 sm:mt-3 md:mt-4 list-disc pl-4 sm:pl-5"
>
  {role.description.map((item, index) => (
    <li key={index} className="mb-1">
      {item}
    </li>
  ))}
</ul>
                                {/* Technology Tags */}
                                <div id={`work-role-technologies-${companyIndex}-${roleIndex}`} className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                                  {role.technologies.map((tech, techIndex) => (
                                   <span  key={tech}
                                      id={`work-role-tech-${companyIndex}-${roleIndex}-${techIndex}`}
                                      className="px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 bg-secondary-themed text-vscode-tertiary rounded text-xs font-mono transition-all duration-300 hover:text-white hover:[background-color:var(--hover-accent)] whitespace-nowrap"
                                      >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Role Progression Arrow */}
                          {roleIndex < company.roles.length - 1 && (
                            <div id={`work-role-arrow-${companyIndex}-${roleIndex}`} className="flex items-center justify-center my-1 sm:my-1.5 md:my-2">
                              <div id={`work-role-arrow-icon-${companyIndex}-${roleIndex}`} className="text-xs sm:text-sm font-mono" style={{ color: accentColor }}>↑</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Timeline End with Simple Fade */}
        <div id="work-timeline-end" className="relative mt-0 ml-0.2">
          <div id="work-timeline-fade" className="absolute left-3 sm:left-4 md:left-6 top-0 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-vscode-accent via-vscode-accent/50 to-vscode-accent/95"></div>

        <div id={`work-company-node-end`} className="absolute left-1.5 sm:left-2 md:left-4 w-3 h-3 sm:w-4 sm:h-4 bg-vscode-accent border-vscode-muted rounded-full z-10"></div>

        </div>
      </div>
    </div>
  );
};