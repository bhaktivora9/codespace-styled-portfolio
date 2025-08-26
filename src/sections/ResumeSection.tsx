import React from "react";
import { Download, FileText } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { trackResumeDownload , trackEvent} from "../utils/analytics";

interface ResumeSectionProps {
  color: string;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ color }) => {
 // const accentColor = 'var(--vscode-accent)';

  //const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const resumeUrl = `${import.meta.env.BASE_URL}assets/${personalInfo.resume}`;


  
  const handleDownload = () => {
    try { 
      trackResumeDownload?.(); 
    } catch {}
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = personalInfo.resume;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Monitor iframe for download/print actions
  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleIframeLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
          // Monitor clicks within the PDF viewer
          iframeDoc.addEventListener('click', (event) => {
            console.log('Click detected within PDF iframe:', event.target);
            
            // Track PDF viewer interactions
            trackEvent('pdf_viewer_interaction', {
              event_category: 'resume_engagement',
              event_label: 'pdf_click',
              click_target: (event.target instanceof Element ? event.target.tagName : 'unknown')
            });
          });

          // Monitor keyboard shortcuts (Ctrl+P for print, Ctrl+S for save)
          iframeDoc.addEventListener('keydown', (event) => {
            if (event.ctrlKey || event.metaKey) {
              if (event.key === 'p' || event.key === 'P') {
                console.log('Print shortcut detected in PDF viewer');
                trackEvent('resume_print_attempt', {
                  event_category: 'resume_engagement',
                  event_label: 'keyboard_shortcut',
                  method: 'ctrl_p'
                });
              } else if (event.key === 's' || event.key === 'S') {
                console.log('Save shortcut detected in PDF viewer');
                trackEvent('resume_save_attempt', {
                  event_category: 'resume_engagement',
                  event_label: 'keyboard_shortcut',
                  method: 'ctrl_s'
                });
              }
            }
          });

          // Monitor context menu (right-click) which often contains download/print options
          iframeDoc.addEventListener('contextmenu', (_event) => {
            console.log('Context menu opened in PDF viewer');
            trackEvent('pdf_context_menu', {
              event_category: 'resume_engagement',
              event_label: 'right_click',
              page_location: window.location.href
            });
          });
        }
      } catch (error) {
        // Cross-origin restrictions may prevent access to iframe content
        console.log('Cannot access iframe content due to cross-origin restrictions');
        
        // Track that iframe loaded successfully even if we can't monitor internal actions
        trackEvent('pdf_iframe_loaded', {
          event_category: 'resume_engagement',
          event_label: 'iframe_ready',
          cross_origin_restricted: true
        });
      }
    };

    // Set up iframe load listener
    iframe.addEventListener('load', handleIframeLoad);

    // Cleanup
    return () => {
      iframe.removeEventListener('load', handleIframeLoad);
    };
  }, []);

  return (
    <div className="w-full flex flex-row bg-vscode-primary h-full">
      <div className="flex-1">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          {/* Title */}
          <h1 
            id="resume-section-title" 
            className="text-2xl font-bold text-primary-themed font-sans flex items-center gap-3 transition-colors duration-300"
          >
            <FileText 
              id="resume-section-icon" 
              className="w-6 h-6 transition-transform duration-300 hover:scale-110" 
              style={{ color }} 
            />
            <span 
              id="resume-section-title-text" 
              className="bg-gradient-to-r bg-clip-text text-transparent" 
              style={{ 
                backgroundImage: `linear-gradient(to right, ${color}, var(--vscode-accent))` 
              }}
            >
              Resume
            </span>
          </h1>

          {/* Download Button */}
          <button
            id="resume-section-download-button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2.5 lg:px-5 lg:py-3 bg-vscode-accent hover:bg-vscode-accent/90 text-white rounded-md transition-colors shadow-sm text-xs sm:text-sm md:text-base w-full sm:w-auto"
          >
            <Download 
              id="resume-section-download-icon" 
              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" 
            />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
        
        {/* Decorative Divider */}
        <div 
          id="resume-section-divider" 
          className="w-20 h-1 rounded-full mb-6" 
          style={{ 
            background: `linear-gradient(to right, ${color}, var(--vscode-accent))` 
          }}
        ></div>

        {/* Content Area */}
        <div className="w-full h-full flex flex-col mt-2 pt-2 bg-vscode-tertiary ">
          <iframe src={`${resumeUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                        ref={iframeRef}
 title="Resume PDF Viewer"
            id="resume-section-iframe"
        width="100%" 
        height="100%"

        className="w-full h-full "
        >
</iframe>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;