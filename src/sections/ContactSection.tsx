import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check, Send, Github, Linkedin  } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio';
import { trackContactClick } from '../utils/analytics';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  sendCopy: boolean;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface ContactSectionProps {
  color?: string;
}


export const ContactSection: React.FC<ContactSectionProps> = ({ color = 'var(--vscode-accent)' }) => {
  const [emailCopied, setEmailCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    sendCopy: false
  });
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  
  const GOOGLE_FORM_URL = 
'https://docs.google.com/forms/yourgoogleform/formResponse';
  const FORM_ENTRIES = {
    name: 'entry.XXXXXXX',
    email: 'XXXXXX',        
    subject: 'entry.YYYYYYY',
    message: 'entry.ZZZZZZZ',
    sendCopy: 'emailReceipt',     
  };
  const copyToClipboard = async (text: string) => {
    trackContactClick('email_copy');
    try {
      await navigator.clipboard.writeText(text);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Could not copy text: ', err);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
/*
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
*/  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    trackContactClick('contact_form_submit');
    
    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Please fix the errors above' });
      return;
    }
    
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const googleFormData = new FormData();
      
      googleFormData.append(FORM_ENTRIES.name, formData.name);
      googleFormData.append(FORM_ENTRIES.email, formData.email);
      googleFormData.append(FORM_ENTRIES.subject, formData.subject);
      googleFormData.append(FORM_ENTRIES.message, formData.message);
      
      if (formData.sendCopy) {
        // Use 'true' string value instead of boolean or 'on'
        googleFormData.append(FORM_ENTRIES.sendCopy, 'on');
        
        // Also ensure email is properly set for Google Forms
        googleFormData.append('emailAddress', formData.email);
      }

/*      googleFormData.append('fvv', '1');
      googleFormData.append('pageHistory', '0');
      googleFormData.append('fbzx', Date.now().toString());
*/      googleFormData.append('submissionTimestamp', Date.now().toString());

      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors',
        
      });

      console.log(response);
      const successMessage = formData.sendCopy 
        ? 'Message sent successfully! You should receive a copy at your email address.'
        : 'Message sent successfully! I\'ll get back to you soon.';

      setStatus({
        type: 'success',
        message: successMessage
      });

      setFormData({ name: '', email: '', subject: '', message: '', sendCopy: false });
      setTimeout(() => setStatus({ type: 'idle', message: '' }), 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };
  return (
    <div className="min-h-screen bg-themed text-themed flex p-2 justify-center ">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto">
        
        {/* Header */}
        <div id="contact-section-header" className="mb-4 sm:mb-6 md:mb-8 transform transition-all items-center justify-center duration-500">
        <h1 id="contact-section-title" className="text-lg sm:text-xl md:text-2xl font-bold text-primary-themed font-sans mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 transition-colors duration-300">
          <Mail id="contact-section-icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 hover:scale-110" style={{ color }} />
          <span id="contact-section-title-text" className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${color}, var(--vscode-accent))` }}>
            Connect, Create, Collabarate !
          </span>
        </h1>
        <div id="contact-section-divider" className="w-16 sm:w-20 h-0.5 sm:h-1 rounded-full mb-3 sm:mb-4 md:mb-6" style={{ background: `linear-gradient(to right, ${color}, var(--vscode-accent))` }}></div>

        <span id="contact-section-subtitle" className="text-md sm:text-lg md:text-xl font-light text-vscode-secondary font-sans mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3 transition-colors duration-300 ">
          To team up for a hackathon, research collabs, hiring conversations, or just a friendly hello — I'm all ears!


          </span>

      </div>
      
        

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12 lg:mb-16 items-start justify-center">
          
          {/* Contact Info Card */}
          <div className="bg-secondary-themed rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-transparent shadow-xl h-fit">
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-primary-themed mb-4 sm:mb-6">Get in Touch</h2>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Email */}
              <div className="group">
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-vscode-emerald/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-vscode-emerald" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-secondary-themed">Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      onClick={() => trackContactClick('email')}
                      className="text-xs sm:text-sm md:text-base text-primary-themed hover:text-vscode-emerald transition-colors break-all"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                  <button
                    onClick={() => copyToClipboard(personalInfo.email)}
                    className="opacity-0 group-hover:opacity-100 p-1 sm:p-2 rounded-md sm:rounded-lg hover:bg-tertiary-themed transition-all"
                  >
                    {emailCopied ? (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-vscode-emerald" />
                    ) : (
                      <Copy className="w-3 h-3 sm:w-4 sm:h-4 text-secondary-themed" />
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-vscode-blue/10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-vscode-blue" />
                </div>
                <div>
                  <p className="text-xs text-secondary-themed">Location</p>
                  <p className="text-xs sm:text-sm md:text-base text-primary-themed">{personalInfo.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-4 sm:mt-6 md:mt-8 pt-3 sm:pt-4 md:pt-6 border-t border-themed/10">
              <p className="text-xs text-secondary-themed mb-3 sm:mb-4">Connect with me</p>
              <div className="flex gap-2 sm:gap-3">
                <a 
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('github')}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-vscode-primary hover:bg-vscode-secondary/20 rounded-md sm:rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 text-vscode-primary group-hover:text-vscode-purple" />
                </a>
                <a 
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick('linkedin')}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-vscode-primary text-vscode-primary hover:bg-blue/10 rounded-md sm:rounded-lg flex items-center justify-center transition-colors group"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-themed group-hover:text-vscode-blue" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-secondary-themed rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-transparent">
            <h2 className="text-base sm:text-lg md:text-xl font-medium text-primary-themed mb-4 sm:mb-6">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-tertiary-themed border-0 rounded-lg sm:rounded-xl text-themed placeholder-secondary-themed focus:outline-none focus:ring-2 focus:ring-vscode-accent/50 transition-all text-sm ${errors.name ? 'ring-2 ring-red-500' : ''}`}
                    disabled={status.type === 'loading'}
                  />
                  {errors.name && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-tertiary-themed border-0 rounded-lg sm:rounded-xl text-themed placeholder-secondary-themed focus:outline-none focus:ring-2 focus:ring-vscode-accent/50 transition-all text-sm ${errors.email ? 'ring-2 ring-red-500' : ''}`}
                    disabled={status.type === 'loading'}
                  />
                  {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              {/* Subject */}
              <div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-tertiary-themed border-0 rounded-lg sm:rounded-xl text-themed placeholder-secondary-themed focus:outline-none focus:ring-2 focus:ring-vscode-accent/50 transition-all text-sm ${errors.subject ? 'ring-2 ring-red-500' : ''}`}
                  disabled={status.type === 'loading'}
                />
                {errors.subject && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.subject}</p>}
              </div>

              {/* Text Formatting Toolbar */}
              <div>
              {/*  <div className="flex items-center gap-1 mb-2 p-2 bg-tertiary-themed rounded-t-lg border-b border-themed/20">
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-themed/20 transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4 text-secondary-themed" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-themed/20 transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4 text-secondary-themed" />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded hover:bg-themed/20 transition-colors"
                    title="Underline"
                  >
                    <Underline className="w-4 h-4 text-secondary-themed" />
                  </button>
                  <div className="w-px h-6 bg-themed/20 mx-1"></div>
                  <button type="button" className="p-1.5 rounded hover:bg-themed/20 transition-colors" title="Bullet List">
                    <List className="w-4 h-4 text-secondary-themed" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-themed/20 transition-colors" title="Numbered List">
                    <ListOrdered className="w-4 h-4 text-secondary-themed" />
                  </button>
                  <button type="button" className="p-1.5 rounded hover:bg-themed/20 transition-colors" title="Link">
                    <Link className="w-4 h-4 text-secondary-themed" />
                  </button>
                </div>
*/}
              {/* Message */}
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message"
                  rows={6}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 bg-tertiary-themed border-0 rounded-b-lg text-themed placeholder-secondary-themed focus:outline-none focus:ring-2 focus:ring-vscode-accent/50 resize-none transition-all text-sm ${errors.message ? 'ring-2 ring-red-500' : ''}`}
                  disabled={status.type === 'loading'}
                />
                {errors.message && <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.message}</p>}
              </div>

              {/* Send Copy Toggle */}
              <div className="flex items-center justify-between">
                {/*<div className="flex items-center gap-3">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="sendCopy"
                      checked={formData.sendCopy}
                      onChange={handleCheckboxChange}
                      className="sr-only peer"
                      disabled={status.type === 'loading'}
                    />
   <div 
                className="relative w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:shadow-lg"
                style={{
                  backgroundColor: formData.sendCopy ? 'var(--vscode-accent)' : 'var(--bg-tertiary-themed)'
                }}
              ></div>                  </label>
                  <span className="text-sm text-secondary-themed">Send a copy of responses</span>
                </div>*/}
              </div>

              {/* Status Message */}
              {status.message && (
                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl text-xs sm:text-sm ${
                  status.type === 'success' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                    : status.type === 'error'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                    : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                }`}>
                  {status.message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.type === 'loading'}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-vscode-accent hover:bg-vscode-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg sm:rounded-xl transition-all font-medium text-sm"
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};