import React from 'react';
import { useState } from 'react';
import { Volume2, MapPin, Mail, Copy, Check, Download, User, Code, Briefcase,Zap , Award } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { trackContactClick, trackResumeDownload } from '../utils/analytics';

interface AboutSectionProps {
  setActiveTab: (tab: string) => void;
  openTabs: string[];
  setOpenTabs: (tabs: string[] | ((prev: string[]) => string[])) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  setActiveTab,
  openTabs,
  setOpenTabs,
}) => {
  const profilePic = `${import.meta.env.BASE_URL}assets/${personalInfo.profileImage}?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop`
    const resumeUrl = `${import.meta.env.BASE_URL}assets/${personalInfo.resume}`;

  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const playAudio = () => {
    const a1 = document.getElementById('pronunciation-audio-1') as HTMLAudioElement | null;
//    const a2 = document.getElementById('pronunciation-audio-2') as HTMLAudioElement | null;

    const speak = (text: string) =>
      new Promise<void>((resolve) => {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 0.8;
        u.pitch = 1;
        u.volume = 1;
        u.onend = () => resolve();
        speechSynthesis.speak(u);
      });

    (async () => {
      // First name
      if (a1) {
        try {
          a1.currentTime = 0;
          await a1.play();
          await new Promise<void>((r) => {
            a1.onended = () => r();
          });
        } catch {
          if ('speechSynthesis' in window) await speak('Bhakti');
        }
      }

      // Last name
      const a2 = document.getElementById('pronunciation-audio-2') as HTMLAudioElement | null;
      if (a2) {
        try {
          a2.currentTime = 0;
          await a2.play();
        } catch {
          if ('speechSynthesis' in window) await speak('Vora');
        }
      }
    })().catch(() => {});
  };

  return (
    <div id="about-section-container" className="w-full h-full bg-[var(--vscode-bg-primary)] text-[var(--vscode-text-primary)] overflow-y-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Audio elements for pronunciation */}
      <audio id="pronunciation-audio-1" preload="auto">
        <source
          src="https://en-audio.link.mp3"
          type="audio/mpeg"
        />
      </audio>
    
      {/* Header Section */}
      <div id="about-section-header" className="py-2 sm:py-4 md:py-6 lg:py-8 min-h-screen">
        <div id="about-section-content" className="max-w-6xl mx-auto">
          {/* Profile Section */}
          <div id="about-profile-section" className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-4 sm:mb-6 md:mb-8">
            {/* Profile Picture */}
            <div id="about-profile-picture-container" className="relative w-24 h-24 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:w-60 xl:h-60 flex-shrink-0">
              <div id="about-profile-picture-placeholder" className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full " />
              <img
                id="about-profile-picture"
                alt="Bhakti Vora"
                className="w-full h-full object-cover object-top rounded-full border-1.5 sm:border-1 border-[var(--vscode-bg-secondary)] shadow-xl transition-all duration-700 hover:scale-105 opacity-0 animate-fade-in"
                src={profilePic}
                onLoad={(e) => {
                  const img = e.currentTarget;
                  img.style.opacity = '1';
                  const placeholder = img.previousElementSibling as HTMLElement | null;
                  if (placeholder) placeholder.style.display = 'none';
                }}
                onError={(e) => {
                  console.log('Image failed to load:', e.currentTarget.src);
                  // Keep placeholder visible if image fails to load
                }}
              />
{/* Zap Badge */}

      <div id="about-experience-badge" className="absolute -bottom-4 -left-8 sm:-bottom-6 sm:items-center sm:left-2 z-10">
  <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium shadow-lg justify-center bg-[(--var(vscode-secondary))] text-vscode-accent/90 backdrop-blur-sm border-dashed border-red-500 border-2`}>
    <Zap className="h-3 w-3 mr-1.5" />
    <span className="hidden sm:inline font-semibold">{personalInfo.totalExperience} Years Experience</span>
    <span className="sm:hidden">{personalInfo.totalExperience} Yrs</span>
  </span>
</div>
      </div>



            {/* Profile Info */}
            <div id="about-profile-info" className="flex-1 text-center lg:text-left">
              {/* Greeting */}
              <div id="about-greeting" className="mb-2 sm:mb-3 md:mb-4">
                <span id="about-greeting-text" className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[var(--vscode-text-secondary)] font-light flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                  Hi, I'm 
                  <span id="about-greeting-wave" className="inline-block animate-wave text-lg sm:text-xl md:text-2xl lg:text-3xl">👋</span>
                </span>
              </div>

              {/* Name with pronunciation */}
              <div id="about-name-container" className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <h1 id="about-name-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold tracking-tight text-[var(--vscode-text-primary)] leading-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {personalInfo.name}
                </h1>
                <button
                  id="about-pronunciation-button"
                  onClick={playAudio}
                  className="p-1 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-[var(--vscode-bg-tertiary)] self-center lg:self-start"
                  title="Hear pronunciation"
                >
                  <Volume2 id="about-pronunciation-icon" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[var(--vscode-text-secondary)]" />
                </button>
              </div>

              {/* Title */}
{/*              <div id="about-title-container" className="mb-3 sm:mb-4 md:mb-6">
                <h2 id="about-title-heading" className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-[var(--vscode-text-secondary)] font-light tracking-wide uppercase mt-1 sm:mt-2" style={{ fontFamily: "'Poppins', sans-serif" }}>

                </h2>
              </div>
*/}
              {/* Contact Info */}
              <div id="about-contact-info" className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 md:gap-6 mb-3 sm:mb-4">
              
                <div id="about-location-info" className="flex items-center gap-2">
                  <MapPin id="about-location-icon" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[var(--vscode-text-secondary)]" />
                  <span id="about-location-text" className="text-[var(--vscode-text-secondary)] text-xs sm:text-sm font-medium">{personalInfo.location}</span>
                </div>
                  <div id="about-email-info" className="flex items-center gap-2 group">
                  <Mail id="about-email-icon" className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[var(--vscode-text-secondary)]" />
                  <a 
                    id="about-email-link"
                    href={`mailto:${personalInfo.email}`}
                    className="text-[var(--vscode-text-secondary)] hover:text-[var(--vscode-accent)] transition-colors text-xs sm:text-sm font-medium"
                    onClick={() => trackContactClick('email')}
                  >
                    {personalInfo.email}
                  </a>
                  <button
                    id="about-email-copy-button"
                    onClick={copyEmail}
                    className="ml-1 p-0.5 sm:p-1 rounded hover:bg-[var(--vscode-bg-tertiary)] transition-colors opacity-0 group-hover:opacity-100"
                    title={emailCopied ? 'Copied!' : 'Copy email'}
                  >
                    {emailCopied ? (
                      <Check id="about-email-copy-check" className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[var(--vscode-green)]" />
                    ) : (
                      <Copy id="about-email-copy-icon" className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 text-[var(--vscode-text-secondary)]" />
                    )}
                  </button>
                </div>
              </div>
{/* Key Technologies Pills */}
              <div id="about-key-technologies" className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4 sm:mb-6">
                <span id="about-tech-java" className="px-3 py-1.5 bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-sm font-medium rounded-full border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] transition-colors">Java</span>
                <span id="about-tech-spring-boot" className="px-3 py-1.5 bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-sm font-medium rounded-full border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] transition-colors">Spring Boot</span>
                <span id="about-tech-kubernetes" className="px-3 py-1.5 bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-sm font-medium rounded-full border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] transition-colors">Kubernetes</span>
                <span id="about-tech-aws" className="px-3 py-1.5 bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-sm font-medium rounded-full border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] transition-colors">AWS</span>
                <span id="about-tech-aiml" className="px-3 py-1.5 bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-sm font-medium rounded-full border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] transition-colors">AI/ML</span>
              </div>

              {/* Action Buttons */}
              <div id="about-action-buttons" className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center lg:justify-start">
                <a
                  id="about-resume-download-button"
                  href={resumeUrl}
                  download="SampleResume.pdf"
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-vscode-accent hover:bg-vscode-accent-hover text-white rounded-md sm:rounded-lg transition-colors font-medium text-xs sm:text-sm"
                  onClick={() => {
                    
                    trackResumeDownload();
                  }}
                >
                  <Download id="about-resume-download-icon" className="w-3 h-3 sm:w-4 sm:h-4" />
                  Download Resume
                </a>
                <button
                  id="about-contact-button"
                    className="flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 bg-transparent hover:bg-[var(--vscode-bg-tertiary)] text-vscode-accent rounded-md sm:rounded-lg transition-colors font-medium border border-[var(--vscode-accent)] text-xs sm:text-sm"
                     onClick={() => {
                  if (!openTabs.includes('Contact.html')) {
                    setOpenTabs(prev => [...prev, 'Contact.html']);
                  }
                  setActiveTab('Contact.html');
                }}
                >
                  <User id="about-contact-icon" className="w-3 h-3 sm:w-4 sm:h-4"  />
                  Get In Touch
                </button>
              </div>
            </div>
          </div>

          {/* About Me Section */}
          <div id="about-me-section" className="bg-[var(--vscode-bg-secondary)] rounded-md sm:rounded-lg p-3 sm:p-4 md:p-6 border border-[var(--vscode-border)] mb-3 sm:mb-4 md:mb-6">
            <h3 id="about-me-heading" className="text-base sm:text-lg md:text-xl font-semibold text-[var(--vscode-text-primary)] mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3">
              <User id="about-me-icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-vscode-accent" />
              About Me
            </h3>
            <div id="about-me-content" className="text-[var(--vscode-text-primary)] leading-relaxed text-xs sm:text-sm md:text-base space-y-2 sm:space-y-3 text-left">
              <p id="about-me-paragraph-1">
                {personalInfo.bio1}
              </p>
              <p id="about-me-paragraph-2">
                {personalInfo.bio2}
              </p>
            </div>
          </div>

          {/* Current Focus */}
          <section id="about-current-focus-section" className="mb-4 sm:mb-6 md:mb-8">
            <div id="about-current-focus-container" className="bg-[var(--vscode-bg-secondary)] p-3 sm:p-4 rounded-md sm:rounded-lg border border-[var(--vscode-border)]">
              <h3 id="about-current-focus-heading" className="text-base sm:text-lg md:text-xl font-semibold text-[var(--vscode-text-primary)] mb-2 sm:mb-3 flex items-center">
                <Code id="about-current-focus-icon" className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5 text-vscode-accent" />
                Currently working on
              </h3>
              <p id="about-current-focus-text" className="text-[var(--vscode-text-primary)] text-left leading-relaxed mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base">
                 <span id="about-experience-highlight" className="font-bold text-[var(--vscode-text-primary)]">Task Management App :</span> Short Description
              </p>
              <div id="about-current-focus-tags" className="flex flex-wrap gap-1 sm:gap-2">
                <span id="about-tag-react" className="bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">ReactJS</span>
                <span id="about-tag-javascript" className="bg-[var(--vscode-bg-tertiary)] text-[var(--vscode-text-primary)] text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">Javascript</span>
                
              </div>
            </div>
          </section>

          <div id="about-stats-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div id="about-experience-stat" className="bg-[var(--vscode-bg-secondary)] rounded-md sm:rounded-lg p-3 sm:p-4 border border-[var(--vscode-border)] text-center">
              <div id="about-experience-stat-icon-container" className="flex items-center justify-center mb-2 sm:mb-3">
                <Briefcase id="about-experience-stat-icon" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-vscode-accent" />
              </div>
              <div id="about-experience-stat-number" className="text-xl sm:text-2xl font-bold text-[var(--vscode-text-primary)] mb-1">{personalInfo.totalExperience}</div>
              <div id="about-experience-stat-label" className="text-xs sm:text-sm md:text-base text-[var(--vscode-text-secondary)]">Years Experience</div>
            </div>
            
            <div id="about-certification-stat" className="bg-[var(--vscode-bg-secondary)] rounded-md sm:rounded-lg p-3 sm:p-4 border border-[var(--vscode-border)] text-center">
              <div id="about-certification-stat-icon-container" className="flex items-center justify-center mb-2 sm:mb-3">
                <Award id="about-certification-stat-icon" className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-vscode-accent" />
              </div>
              <div id="about-certification-stat-text" className="text-lg sm:text-xl font-bold text-[var(--vscode-text-primary)] mb-1">Cloud Practicinor Certificate</div>
              <div id="about-certification-stat-label" className="text-xs sm:text-sm md:text-base text-[var(--vscode-text-secondary)]">AWS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;