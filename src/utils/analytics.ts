import { analytics } from '../data/portfolio';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      send_to: analytics.gtagId
    });
  }
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_location: window.location.href
  });
};

export const trackFileOpen = (fileName: string) => {
  trackEvent('file_open', {
    file_name: fileName,
    event_category: 'portfolio_navigation'
  });
};

export const trackTerminalCommand = (command: string) => {
  trackEvent('terminal_command', {
    command: command,
    event_category: 'terminal_interaction'
  });
};

export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    event_category: 'engagement',
    event_label: 'resume_pdf'
  });
};

export const trackContactClick = (method: string) => {
  trackEvent('contact_click', {
    contact_method: method,
    event_category: 'engagement'
  });
};