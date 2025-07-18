import React, { useState, useRef, useEffect } from 'react';
import { trackPageView, trackFileOpen, trackTerminalCommand, trackResumeDownload, trackContactClick } from './utils/analytics';
import { portfolioData } from './data/portfolio';
import { 
  ChevronRight, 
  ChevronDown, 
  FileText, 
  Folder, 
  FolderOpen,
  Settings,
  Search,
  GitBranch,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  X,
  Maximize2,
  Minimize2,
  Terminal as TerminalIcon,
  Play,
  Sun,
  Moon,
  Download
} from 'lucide-react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  icon?: string;
  children?: FileItem[];
  content?: string;
  command?: string;
}

interface TerminalCommand {
  command: string;
  output: string;
  timestamp: string;
}

const fileStructure: FileItem[] = [
  {
    name: 'portfolio',
    type: 'folder',
    children: [
      { name: 'Home.java', type: 'file', icon: '🏠', command: 'home' },
      { name: 'About.jsx', type: 'file', icon: '👨‍💻', command: 'about' },
      { name: 'Work.css', type: 'file', icon: '💼', command: 'experience' },
      { name: 'Contact.html', type: 'file', icon: '📧', command: 'contact' },
      { name: 'education.yml', type: 'file', icon: '🎓', command: 'education' },
      { name: 'projects.ts', type: 'file', icon: '🚀', command: 'projects' },
      { name: 'skills.json', type: 'file', icon: '⚡', command: 'skills' },
      { name: 'resume.pdf', type: 'file', icon: '📄', command: 'resume' }
    ]
  },
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'components', type: 'folder', children: [] },
      { name: 'App.tsx', type: 'file', icon: '⚛️' },
      { name: 'index.css', type: 'file', icon: '🎨' },
      { name: 'main.tsx', type: 'file', icon: '⚛️' }
    ]
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'index.html', type: 'file', icon: '🌐' }
    ]
  },
  { name: '.gitignore', type: 'file', icon: '📝' },
  { name: 'package.json', type: 'file', icon: '📦' },
  { name: 'README.md', type: 'file', icon: '📖' },
  { name: 'vite.config.ts', type: 'file', icon: '⚡' }
];

function App() {
  const [activeTab, setActiveTab] = useState('Home.java');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['portfolio', 'src']));
  const [activePanel, setActivePanel] = useState('TERMINAL');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; show: boolean }>({ x: 0, y: 0, show: false });
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<TerminalCommand[]>([
    {
      command: 'npm run dev',
      output: 'Portfolio server running at http://localhost:5173/',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle sidebar resizing
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 500) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  // Track analytics events
  useEffect(() => {
    trackPageView('Portfolio Home');
  }, []);

  const availableCommands = {
    'help': 'Available commands: home, about, contact, experience, education, projects, skills, resume, clear, ls',
    'home': 'Loading home section...',
    'about': 'Loading about section...',
    'contact': 'Loading contact information...',
    'experience': 'Loading work experience...',
    'education': 'Loading education details...',
    'projects': 'Loading project portfolio...',
    'skills': 'Loading technical skills...',
    'resume': 'Opening resume...',
    'clear': 'Terminal cleared',
    'ls': 'portfolio/  src/  public/  .gitignore  package.json  README.md  vite.config.ts'
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    trackPageView('Portfolio Home');
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setContextMenu({ x: 0, y: 0, show: false });
      setShowSettings(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleTerminalCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const timestamp = new Date().toLocaleTimeString();
    
    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    let output = '';
    if (availableCommands[cmd as keyof typeof availableCommands]) {
      output = availableCommands[cmd as keyof typeof availableCommands];
      
      const portfolioCommands = ['home', 'about', 'contact', 'experience', 'education', 'projects', 'skills', 'resume'];
      if (portfolioCommands.includes(cmd)) {
        trackTerminalCommand(cmd);
        const fileMap: { [key: string]: string } = {
          'home': 'Home.java',
          'about': 'About.jsx',
          'contact': 'Contact.html',
          'experience': 'Work.css',
          'education': 'education.yml',
          'projects': 'projects.ts',
          'skills': 'skills.json',
          'resume': 'resume.pdf'
        };
        setActiveTab(fileMap[cmd]);
      }
    } else {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setTerminalHistory(prev => [...prev, { command, output, timestamp }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTerminalCommand(currentCommand);
      setCurrentCommand('');
    }
  };

  const handleRightClick = (e: React.MouseEvent, fileName: string) => {
    if (fileName === 'resume.pdf') {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        show: true
      });
    }
  };

  const downloadResume = () => {
    // Simulate resume download
    trackResumeDownload();
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Bhakti_Developer_Resume.pdf';
    link.click();
    setContextMenu({ x: 0, y: 0, show: false });
  };

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const themeClasses = {
    bg: isDarkTheme ? 'bg-gray-900' : 'bg-white',
    bgSecondary: isDarkTheme ? 'bg-gray-800' : 'bg-gray-100',
    bgTertiary: isDarkTheme ? 'bg-gray-700' : 'bg-gray-200',
    text: isDarkTheme ? 'text-gray-300' : 'text-gray-700',
    textPrimary: isDarkTheme ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkTheme ? 'text-gray-400' : 'text-gray-600',
    border: isDarkTheme ? 'border-gray-700' : 'border-gray-300',
    hover: isDarkTheme ? 'hover:bg-gray-700/50' : 'hover:bg-gray-200/50',
    accent: isDarkTheme ? 'text-blue-400' : 'text-blue-600'
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item, index) => (
      <div key={index}>
        <div 
          className={`flex items-center py-1 px-2 ${themeClasses.hover} cursor-pointer text-sm ${
            activeTab === item.name ? `bg-blue-600/30 ${themeClasses.accent}` : themeClasses.text
          }`}
          style={{ paddingLeft: `${8 + level * 16}px` }}
          onClick={() => {
            if (item.type === 'folder') {
              toggleFolder(item.name);
            } else {
              setActiveTab(item.name);
              if (item.command) {
                trackFileOpen(item.name);
                handleTerminalCommand(item.command);
              }
            }
          }}
          onContextMenu={(e) => handleRightClick(e, item.name)}
        >
          {item.type === 'folder' ? (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown className="w-4 h-4 mr-1" />
              ) : (
                <ChevronRight className="w-4 h-4 mr-1" />
              )}
              {expandedFolders.has(item.name) ? (
                <FolderOpen className={`w-4 h-4 mr-2 ${themeClasses.accent}`} />
              ) : (
                <Folder className={`w-4 h-4 mr-2 ${themeClasses.accent}`} />
              )}
            </>
          ) : (
            <FileText className={`w-4 h-4 mr-2 ml-5 ${themeClasses.textSecondary}`} />
          )}
          <span className="flex-1">{item.name}</span>
          {item.icon && (
            <span className="text-xs ml-2">{item.icon}</span>
          )}
        </div>
        {item.type === 'folder' && expandedFolders.has(item.name) && item.children && (
          <div>
            {renderFileTree(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  const getTabContent = () => {
    const contentClasses = `p-8 ${themeClasses.text} max-w-4xl mx-auto`;
    
    switch (activeTab) {
      case 'Home.java':
        return (
          <div className={contentClasses}>
            <div className="text-center py-20">
              <div className="mb-8">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full mx-auto mb-6 border-2 border-gradient-to-r from-orange-400 to-pink-400 shadow-lg"
                />
              </div>
              <div className="mb-8">
                <h1 className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent`}>
                  Bhakti Developer
                </h1>
                <div className={`text-sm md:text-base ${themeClasses.textSecondary} mb-6 font-mono`}>
                  <span className="text-purple-400">const</span> <span className={themeClasses.textPrimary}>developer</span> = {'{'}
                  <br />
                  <span className="ml-4 text-blue-400">name:</span> <span className="text-green-400">"Bhakti.dev"</span>,
                  <br />
                  <span className="ml-4 text-blue-400">role:</span> <span className="text-green-400">"Full Stack Developer"</span>,
                  <br />
                  <span className="ml-4 text-blue-400">backend:</span> <span className="text-yellow-400">true</span>,
                  <br />
                  <span className="ml-4 text-blue-400">frontend:</span> <span className="text-yellow-400">true</span>
                  <br />
                  {'}'}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button 
                  onClick={() => setActiveTab('Contact.html')}
                  className={`px-6 py-2 text-sm border ${isDarkTheme ? 'border-gray-600 hover:border-gray-500' : 'border-gray-400 hover:border-gray-600'} rounded transition-colors ${themeClasses.text} hover:${themeClasses.textPrimary}`}
                >
                  Contact
                </button>
                <button 
                  onClick={() => setActiveTab('Work.css')}
                  className="px-6 py-2 text-sm bg-gradient-to-r from-orange-400 to-red-400 text-white rounded hover:from-orange-500 hover:to-red-500 transition-all"
                >
                  Work
                </button>
              </div>

              <div className={`grid md:grid-cols-3 gap-4 mt-12 ${themeClasses.textSecondary}`}>
                <div className={`p-4 ${themeClasses.bgSecondary} rounded border ${themeClasses.border}`}>
                  <Code className="w-6 h-6 mb-3 text-blue-400" />
                  <h3 className={`text-sm font-semibold mb-2 ${themeClasses.textPrimary}`}>Frontend</h3>
                  <p className="text-xs">React, Vue.js, TypeScript, Tailwind CSS</p>
                </div>
                <div className={`p-4 ${themeClasses.bgSecondary} rounded border ${themeClasses.border}`}>
                  <Briefcase className="w-6 h-6 mb-3 text-green-400" />
                  <h3 className={`text-sm font-semibold mb-2 ${themeClasses.textPrimary}`}>Backend</h3>
                  <p className="text-xs">Node.js, Python, PostgreSQL, MongoDB</p>
                </div>
                <div className={`p-4 ${themeClasses.bgSecondary} rounded border ${themeClasses.border}`}>
                  <Award className="w-6 h-6 mb-3 text-purple-400" />
                  <h3 className={`text-sm font-semibold mb-2 ${themeClasses.textPrimary}`}>Design</h3>
                  <p className="text-xs">UI/UX Design, Figma, Adobe Creative Suite</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'About.jsx':
        return (
          <div className={contentClasses}>
            <div className="mb-8">
              <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
                <User className="w-5 h-5 text-blue-400" />
                About Me
              </h1>
              <div className="w-12 h-0.5 bg-blue-400 mb-4"></div>
            </div>
            
            <div className="space-y-6">
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
                <div className={`text-sm font-mono ${themeClasses.textPrimary} mb-3`}>
                  <span className="text-gray-500">// </span>
                  <span className="text-purple-400">class</span> <span className="text-yellow-400">Developer</span> <span className="text-purple-400">extends</span> <span className="text-blue-400">Human</span>
                </div>
                <p className={`${themeClasses.text} leading-relaxed mb-3 text-sm`}>
                  I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. 
                  I specialize in React, Node.js, and modern cloud technologies, always striving to create intuitive 
                  user experiences backed by robust, maintainable code.
                </p>
                <p className={`${themeClasses.text} leading-relaxed text-sm`}>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                  or sharing knowledge with the developer community through technical writing and mentoring.
                </p>
              </div>

              <div className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
                <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-3 font-mono`}>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">techStack</span> = [
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'].map((tech) => (
                    <div key={tech} className={`${themeClasses.bgTertiary} border ${themeClasses.border} rounded px-2 py-1 text-center text-xs font-mono`}>
                      <span className="text-green-400">"{tech}"</span>
                    </div>
                  ))}
                </div>
                <div className={`text-sm font-mono ${themeClasses.textPrimary} mt-2`}>];</div>
              </div>
            </div>
          </div>
        );
      
      case 'Work.css':
        return (
          <div className={contentClasses}>
            <div className="mb-8">
              <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
                <Briefcase className="w-5 h-5 text-green-400" />
                Work Experience
              </h1>
              <div className="w-12 h-0.5 bg-green-400 mb-4"></div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Senior Full Stack Developer',
                  company: 'TechCorp Solutions',
                  period: '2022 - Present',
                  description: 'Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and mentored junior developers.',
                  technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker']
                },
                {
                  title: 'Full Stack Developer',
                  company: 'StartupXYZ',
                  period: '2020 - 2022',
                  description: 'Built MVP from ground up, scaling to 100K+ users. Developed real-time features using WebSockets and implemented payment processing.',
                  technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Stripe', 'Redis']
                },
                {
                  title: 'Frontend Developer',
                  company: 'Digital Agency',
                  period: '2019 - 2020',
                  description: 'Created responsive web applications for various clients. Improved site performance by 40% through optimization techniques.',
                  technologies: ['React', 'JavaScript', 'SCSS', 'Webpack', 'Jest']
                }
              ].map((job, index) => (
                <div key={index} className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-1`}>{job.title}</h3>
                      <p className="text-green-400 font-medium text-xs">{job.company}</p>
                    </div>
                    <div className={`flex items-center gap-2 ${themeClasses.textSecondary} mt-2 md:mt-0 text-xs`}>
                      <Calendar className="h-4 w-4" />
                      <span>{job.period}</span>
                    </div>
                  </div>
                  <p className={`${themeClasses.text} mb-3 text-sm`}>{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <span key={tech} className={`px-2 py-1 ${themeClasses.bgTertiary} ${themeClasses.text} rounded text-xs font-mono`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Contact.html':
        return (
          <div className={contentClasses}>
            <div className="mb-8">
              <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
                <Mail className="w-5 h-5 text-red-400" />
                Contact Information
              </h1>
              <div className="w-12 h-0.5 bg-red-400 mb-4"></div>
            </div>

            <div className="space-y-6">
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4`}>
                <div className={`text-sm font-mono ${themeClasses.textPrimary} mb-3`}>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">contact</span> = {'{'}
                </div>
                <p className={`${themeClasses.text} mb-4 text-sm ml-4`}>
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 ml-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-5 w-5 text-red-400" />
                      <span className="font-mono text-green-400">"bhakti.developer@email.com"</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-5 w-5 text-red-400" />
                      <span className="font-mono text-green-400">"+1 (555) 123-4567"</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-5 w-5 text-red-400" />
                      <span className="font-mono text-green-400">"San Francisco, CA"</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <a 
                      href="https://github.com" 
                      className={`flex items-center gap-3 ${themeClasses.text} hover:text-red-400 transition-colors text-sm`}
                    >
                      <Github className="h-5 w-5" />
                      <span className="font-mono text-blue-400">github.com/bhaktideveloper</span>
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      className={`flex items-center gap-3 ${themeClasses.text} hover:text-red-400 transition-colors text-sm`}
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="font-mono text-blue-400">linkedin.com/in/bhaktideveloper</span>
                    </a>
                  </div>
                </div>
                <div className={`text-sm font-mono ${themeClasses.textPrimary} mt-3`}></div>
              </div>
            </div>
          </div>
        );

      case 'resume.pdf':
        return (
          <div className={contentClasses}>
            <div className="mb-8">
              <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4 flex items-center gap-3`}>
                <FileText className="w-5 h-5 text-purple-400" />
                Resume
              </h1>
              <div className="w-12 h-0.5 bg-purple-400 mb-4"></div>
            </div>

            <div className="space-y-8">
              {/* PDF Viewer Simulation */}
              <div className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-6`}>
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center gap-2 px-3 py-2 ${themeClasses.bgTertiary} rounded mb-3`}>
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span className={`${themeClasses.textPrimary} font-medium text-sm`}>Bhakti_Developer_Resume.pdf</span>
                  </div>
                  <p className={`${themeClasses.textSecondary} mb-4 text-sm`}>
                    Right-click on resume.pdf in the file explorer to download
                  </p>
                </div>

                {/* Resume Content */}
                <div className={`${themeClasses.bg} border ${themeClasses.border} rounded p-6 max-w-3xl mx-auto`}>
                  <div className="text-center mb-6">
                    <h1 className={`text-xl font-bold ${themeClasses.textPrimary} mb-2`}>Bhakti Developer</h1>
                    <p className={`${themeClasses.textSecondary} mb-3 text-sm`}>Full Stack Developer & UI/UX Designer</p>
                    <div className={`flex flex-wrap justify-center gap-4 text-xs ${themeClasses.textSecondary}`}>
                      <span>📧 bhakti.developer@email.com</span>
                      <span>📱 +1 (555) 123-4567</span>
                      <span>📍 San Francisco, CA</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className={`text-sm font-bold ${themeClasses.textPrimary} mb-2 border-b ${themeClasses.border} pb-1`}>
                        Professional Summary
                      </h2>
                      <p className={`${themeClasses.text} leading-relaxed text-xs`}>
                        Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. 
                        Proven track record of building scalable applications serving 1M+ users and leading development teams.
                      </p>
                    </div>

                    <div>
                      <h2 className={`text-sm font-bold ${themeClasses.textPrimary} mb-2 border-b ${themeClasses.border} pb-1`}>
                        Technical Skills
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className={`font-semibold ${themeClasses.textPrimary} mb-1 text-xs`}>Frontend</h3>
                          <p className={`${themeClasses.textSecondary} text-xs`}>React, Vue.js, TypeScript, Tailwind CSS</p>
                        </div>
                        <div>
                          <h3 className={`font-semibold ${themeClasses.textPrimary} mb-1 text-xs`}>Backend</h3>
                          <p className={`${themeClasses.textSecondary} text-xs`}>Node.js, Python, PostgreSQL, MongoDB</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className={`text-sm font-bold ${themeClasses.textPrimary} mb-2 border-b ${themeClasses.border} pb-1`}>
                        Experience
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className={`font-semibold ${themeClasses.textPrimary} text-xs`}>Senior Full Stack Developer</h3>
                          <p className={`${themeClasses.textSecondary} text-xs`}>TechCorp Solutions • 2022 - Present</p>
                          <p className={`${themeClasses.text} text-xs mt-1`}>
                            Led development of microservices architecture serving 1M+ users
                          </p>
                        </div>
                        <div>
                          <h3 className={`font-semibold ${themeClasses.textPrimary} text-xs`}>Full Stack Developer</h3>
                          <p className={`${themeClasses.textSecondary} text-xs`}>StartupXYZ • 2020 - 2022</p>
                          <p className={`${themeClasses.text} text-xs mt-1`}>
                            Built MVP from ground up, scaling to 100K+ users
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // Add other cases for education, projects, skills, resume...
      default:
        return (
          <div className={contentClasses}>
            <div className={`${themeClasses.bgSecondary} border ${themeClasses.border} rounded p-4 mb-6`}>
              <div className={`text-sm font-mono ${themeClasses.textPrimary} mb-3`}>
                <span className="text-gray-500">// </span>
                <span className="text-purple-400">Welcome to</span> <span className="text-blue-400">Bhakti.dev</span>
              </div>
              <p className={`${themeClasses.text} text-sm mb-4`}>Select a file from the explorer or use terminal commands to navigate.</p>
              <h3 className={`text-sm font-semibold ${themeClasses.textPrimary} mb-2 font-mono`}>
                <span className="text-purple-400">const</span> <span className="text-blue-400">availableCommands</span> = [
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <code className="text-green-400 text-xs ml-4">"home"</code>
                <code className="text-green-400 text-xs">"about"</code>
                <code className="text-green-400 text-xs ml-4">"contact"</code>
                <code className="text-green-400 text-xs">"experience"</code>
                <code className="text-green-400 text-xs ml-4">"education"</code>
                <code className="text-green-400 text-xs">"projects"</code>
                <code className="text-green-400 text-xs ml-4">"skills"</code>
                <code className="text-green-400 text-xs">"help"</code>
              </div>
              <div className={`text-sm font-mono ${themeClasses.textPrimary} mt-2`}>];</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen ${themeClasses.bg} ${themeClasses.text} flex flex-col`}>
      {/* Top Bar */}
      <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} px-4 py-2 flex items-center justify-between`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code className={`w-5 h-5 ${themeClasses.accent}`} />
            <span className="text-sm font-medium">bhakti-portfolio [Codespaces: obscure space meme]</span>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <Settings 
            className={`w-4 h-4 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation();
              setShowSettings(!showSettings);
            }}
          />
          
          {/* Settings Dropdown */}
          {showSettings && (
            <div className={`absolute top-8 right-0 ${themeClasses.bgSecondary} border ${themeClasses.border} rounded-lg shadow-lg p-3 z-50 min-w-48`}>
              <div className="flex items-center justify-between">
                <span className="text-sm">Theme</span>
                <button
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                  className={`flex items-center gap-2 px-3 py-1 rounded ${themeClasses.bgTertiary} hover:${themeClasses.hover} transition-colors`}
                >
                  {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span className="text-sm">{isDarkTheme ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div ref={sidebarRef} className={`${themeClasses.bgSecondary} border-r ${themeClasses.border} flex flex-col relative`} style={{ width: `${sidebarWidth}px` }}>
          {/* Resize Handle */}
          <div 
            className={`absolute top-0 right-0 w-1 h-full cursor-col-resize ${themeClasses.hover} ${isResizing ? 'bg-blue-500' : ''}`}
            onMouseDown={handleMouseDown}
          />
          
          {/* Explorer Header */}
          <div className={`p-3 border-b ${themeClasses.border}`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-semibold ${themeClasses.textSecondary} uppercase tracking-wide`}>Explorer</span>
            </div>
          </div>

          {/* File Tree */}
          <div className="flex-1 overflow-y-auto">
            <div className="py-2">
              <div className={`flex items-center px-3 py-1 text-sm font-medium ${themeClasses.text}`}>
                <ChevronDown className="w-4 h-4 mr-1" />
                <span>BHAKTI-PORTFOLIO</span>
              </div>
              <div className="mt-1">
                {renderFileTree(fileStructure)}
              </div>
            </div>
          </div>

          {/* Bottom Icons */}
          <div className={`border-t ${themeClasses.border} p-2`}>
            <div className="flex flex-col gap-2">
              <div className={`flex items-center gap-2 text-xs ${themeClasses.textSecondary}`}>
                <Search className="w-4 h-4" />
                <span>OUTLINE</span>
              </div>
              <div className={`flex items-center gap-2 text-xs ${themeClasses.textSecondary}`}>
                <GitBranch className="w-4 h-4" />
                <span>TIMELINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className={`${themeClasses.bgSecondary} border-b ${themeClasses.border} flex items-center`}>
            <div className="flex">
              {['Home.java', 'About.jsx', 'Work.css', 'Contact.html'].map((tab) => (
                <div
                  key={tab}
                  className={`px-4 py-2 text-sm border-r ${themeClasses.border} cursor-pointer flex items-center gap-2 ${
                    activeTab === tab 
                      ? `${themeClasses.bg} ${themeClasses.textPrimary} border-t-2 border-t-blue-400` 
                      : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hover}`
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <FileText className="w-4 h-4" />
                  <span>{tab}</span>
                  {activeTab === tab && (
                    <X className="w-3 h-3 ml-1 hover:bg-gray-600 rounded" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className={`flex-1 overflow-y-auto ${themeClasses.bg} ${!isTerminalOpen ? 'pb-0' : ''}`}>
            {getTabContent()}
          </div>

          {/* Bottom Panel - Conditionally Rendered */}
          {isTerminalOpen && (
            <div className={`h-48 ${themeClasses.bgSecondary} border-t ${themeClasses.border} flex flex-col`}>
            {/* Panel Tabs */}
            <div className={`flex items-center border-b ${themeClasses.border}`}>
              {['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'PORTS'].map((panel) => (
                <button
                  key={panel}
                  className={`px-4 py-2 text-xs font-medium border-r ${themeClasses.border} ${
                    activePanel === panel 
                      ? `${themeClasses.bg} ${themeClasses.textPrimary}` 
                      : `${themeClasses.textSecondary} hover:${themeClasses.textPrimary} ${themeClasses.hover}`
                  }`}
                  onClick={() => setActivePanel(panel)}
                >
                  {panel}
                </button>
              ))}
              <div className="flex-1"></div>
              <div className="flex items-center gap-2 px-4">
                <input 
                  type="text" 
                  placeholder="Filter (e.g. text, !exclude, \\escape)"
                  className={`${themeClasses.bgTertiary} border ${themeClasses.border} rounded px-2 py-1 text-xs ${themeClasses.text} w-64`}
                />
                <Search className={`w-4 h-4 ${themeClasses.textSecondary}`} />
                <Maximize2 className={`w-4 h-4 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} cursor-pointer`} />
                <X 
                  className={`w-4 h-4 ${themeClasses.textSecondary} hover:${themeClasses.textPrimary} cursor-pointer`}
                  onClick={() => setIsTerminalOpen(false)}
                />
              </div>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto" ref={terminalRef}>
              {activePanel === 'TERMINAL' && (
                <div className="p-4 font-mono text-sm h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto">
                    {terminalHistory.map((entry, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex items-center gap-2 text-green-400">
                          <span>$</span>
                          <span>{entry.command}</span>
                          <span className={`${themeClasses.textSecondary} text-xs ml-auto`}>{entry.timestamp}</span>
                        </div>
                        <div className={`${themeClasses.text} ml-4 mb-2`}>{entry.output}</div>
                      </div>
                    ))}
                  </div>
                  <div className={`flex items-center gap-2 mt-2 border-t ${themeClasses.border} pt-2`}>
                    <span className="text-green-400">$</span>
                    <input
                      type="text"
                      value={currentCommand}
                      onChange={(e) => setCurrentCommand(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={`flex-1 bg-transparent ${themeClasses.text} outline-none`}
                      placeholder="Type a command (try 'help')"
                      autoFocus
                    />
                    <button
                      onClick={() => handleTerminalCommand(currentCommand)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              {activePanel === 'OUTPUT' && (
                <div className={`p-4 text-sm ${themeClasses.textSecondary}`}>
                  <div>[Extension Host] Portfolio loaded successfully</div>
                  <div>[Extension Host] All components rendered</div>
                  <div>[Extension Host] Interactive terminal ready</div>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Context Menu */}
      {contextMenu.show && (
        <div 
          className={`fixed ${themeClasses.bgSecondary} border ${themeClasses.border} rounded-lg shadow-lg py-2 z-50`}
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => { downloadResume(); trackContactClick('resume_download'); }}
            className={`flex items-center gap-2 px-4 py-2 text-sm ${themeClasses.text} hover:${themeClasses.textPrimary} ${themeClasses.hover} w-full text-left`}
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </div>
      )}

      {/* Status Bar */}
      <div className="bg-blue-600 text-white px-4 py-1 flex items-center justify-between text-xs relative">
        <div className="flex items-center gap-4">
          <span>Codespaces: obscure space meme</span>
          <div className="flex items-center gap-2">
            <GitBranch className="w-3 h-3" />
            <span>master*</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>0</span>
            <span className="w-2 h-2 bg-yellow-500 rounded-full ml-2"></span>
            <span>0</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isTerminalOpen && (
            <button
              onClick={() => setIsTerminalOpen(true)}
              className="flex items-center gap-1 hover:bg-blue-700 px-2 py-1 rounded transition-colors"
            >
              <TerminalIcon className="w-3 h-3" />
              <span>Terminal</span>
            </button>
          )}
          <span>Portfolio Ready</span>
          <span>Layout: US</span>
        </div>
      </div>
    </div>
  );
}

export default App;