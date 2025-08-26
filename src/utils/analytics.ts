// analytics.ts - Enhanced version

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: string, ...args: any[]) => void;
  }
}

interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
}

// Simple developer detection
const isDeveloperMode = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('devmode') === 'true';
};

// Helper function to parse UTM parameters
export const parseUTMParameters = (): UTMParameters => {
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams: UTMParameters = {};

  const utmKeys: (keyof UTMParameters)[] = [
    'utm_source',
    'utm_medium', 
    'utm_campaign',
    'utm_term',
    'utm_content',
    'utm_id'
  ];

  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
};

// Helper function to store/retrieve UTM parameters for session attribution
export const storeUTMParameters = (): void => {
  const utmParams = parseUTMParameters();
  
  if (Object.keys(utmParams).length > 0) {
    sessionStorage.setItem('utm_parameters', JSON.stringify(utmParams));
  }
};

export const getStoredUTMParameters = (): UTMParameters => {
  const stored = sessionStorage.getItem('utm_parameters');
  return stored ? JSON.parse(stored) : {};
};

// Initialize analytics (GTM already loaded in HTML)
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return;
  const isDeveloper = isDeveloperMode();
  
  // Store UTM parameters on page load
  storeUTMParameters();
  
  // Add our tracking data to existing GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'analytics_initialized',
    user_type: isDeveloper ? 'developer' : 'visitor',
    is_developer: isDeveloper
  });
  
  if (isDeveloper) {
    console.log('Analytics initialized - Developer Mode ON (events filtered)');
    console.log('To disable: Remove ?devmode=true from URL');
  }
};

// Core tracking function
export const trackEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  const isDeveloper = isDeveloperMode();
  
  const eventData = {
    event: eventName,
    ...parameters,
    user_type: isDeveloper ? 'developer' : 'visitor',
    is_developer: isDeveloper
  };
  
  window.dataLayer.push(eventData);
  
  if (isDeveloper) {
    console.log('Event:', eventName, eventData);
  }
};

// Enhanced page view tracking with UTM parameters
export const trackPageView = (pageName?: string, useSessionUTM: boolean = true) => {
  if (typeof window === 'undefined' || !window.dataLayer) return;
  
  const isDeveloper = isDeveloperMode();
  
  // Get current UTM parameters
  let utmParams = parseUTMParameters();
  
  // If no current UTM parameters and useSessionUTM is true, use stored ones
  if (Object.keys(utmParams).length === 0 && useSessionUTM) {
    utmParams = getStoredUTMParameters();
  }
  
  // Prepare page view data
  const pageViewData = {
    event: 'page_view',
    page_title: pageName || document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_referrer: document.referrer || undefined,
    user_type: isDeveloper ? 'developer' : 'visitor',
    is_developer: isDeveloper,
    ...utmParams // Spread UTM parameters
  };
  
  // Remove undefined values
  Object.keys(pageViewData).forEach(key => {
    if (pageViewData[key as keyof typeof pageViewData] === undefined) {
      delete pageViewData[key as keyof typeof pageViewData];
    }
  });
  
  window.dataLayer.push(pageViewData);
  
  if (isDeveloper) {
    console.log('Page View:', pageViewData);
  }
};

// Alternative: Track page view with gtag (if you prefer gtag over dataLayer)
export const trackPageViewGtag = (pageName?: string, useSessionUTM: boolean = true) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  
  const isDeveloper = isDeveloperMode();
  
  let utmParams = parseUTMParameters();
  if (Object.keys(utmParams).length === 0 && useSessionUTM) {
    utmParams = getStoredUTMParameters();
  }
  
  const pageViewData = {
    page_title: pageName || document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_referrer: document.referrer || undefined,
    user_type: isDeveloper ? 'developer' : 'visitor',
    is_developer: isDeveloper,
    ...utmParams
  };
  
  // Remove undefined values
  Object.keys(pageViewData).forEach(key => {
    if (pageViewData[key as keyof typeof pageViewData] === undefined) {
      delete pageViewData[key as keyof typeof pageViewData];
    }
  });
  
  window.gtag('event', 'page_view', pageViewData);
  
  if (isDeveloper) {
    console.log('Page View :', pageViewData);
  }
};

export const trackFileOpen = (fileName: string, fileCategory?: string) => {
  trackEvent('file_open', {
    file_name: fileName,
    file_category: fileCategory || 'general'
  });
};

export const trackResumeDownload = () => {
  trackEvent('file_download', {
    file_name: 'resume.pdf',
    file_category: 'resume',
    value: 5
  });
};

export const trackNavigation = (section: string, fromSection?: string) => {
  trackEvent('page_navigation', {
    section_name: section,
    from_section: fromSection || 'unknown'
  });
};

export const trackInteractiveElement = (elementType: string, elementId: string, action: string = 'click') => {
  trackEvent('interactive_element', {
    element_type: elementType,
    element_id: elementId,
    action: action
  });
};

export const trackTimeOnPage = (seconds: number, page?: string) => {
  trackEvent('timing_complete', {
    name: 'time_on_page',
    value: Math.round(seconds),
    page_path: page || window.location.pathname
  });
};

export const trackContactClick = (method: string, location?: string) => {
  trackEvent('contact', {
    method: method,
    contact_location: location || 'unknown'
  });
};

export const trackProjectView = (projectName: string, projectCategory?: string) => {
  trackEvent('view_item', {
    item_id: projectName.toLowerCase().replace(/\s+/g, '_'),
    item_name: projectName,
    item_category: projectCategory || 'project'
  });
};

export const trackTerminalCommand = (command: string, success: boolean = true) => {
  trackEvent('terminal_command', {
    command_name: command,
    command_success: success
  });
};

// Enhanced debug function
export const getAnalyticsDebugInfo = () => {
  const currentUTM = parseUTMParameters();
  const storedUTM = getStoredUTMParameters();
  
  return {
    isDeveloperMode: isDeveloperMode(),
    dataLayerLength: window.dataLayer?.length || 0,
    lastEvents: window.dataLayer?.slice(-3) || [],
    currentUTMParameters: currentUTM,
    storedUTMParameters: storedUTM,
    referrer: document.referrer || 'none'
  };
};

// Utility function to clear stored UTM parameters (useful for testing)
export const clearStoredUTMParameters = () => {
  sessionStorage.removeItem('utm_parameters');
};