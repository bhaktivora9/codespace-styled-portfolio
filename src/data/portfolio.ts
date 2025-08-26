export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string;
  bio: string;
  tagline: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter?: string;
  portfolio?: string;
}


export interface Experience {
  company: string;
  location: string;
  logo: string;
  link: string;
  totalPeriod:string;
  roles: {
    title: string;
    period: string;
    description: string[];
    technologies: string[];
  }[];
}
export interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certs {
  degree: string;
  institution: string;
  period?: string;
  credentials?: string;
  gpa?: string;
}

export const certificates: Certs[] = [
{
  degree:"Cloud Practitioner.",
  institution:"AWS",
  credentials:"https://hudsoncourses.com/wp-content/uploads/2020/04/AWS-Certified-Cloud-Practitioner-CERTIFICATE-EXAMPLE.png",
  period:"May 2023"

}
];



export const personalInfo: PersonalInfo = {
  name: "YOUR NAME",
  title: "Full Stack Developer & UI/UX Designer",
  email: "youremailid@test.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  profileImage: "ProfilePic.png",
  totalExperience: "6+",
  resume:"Sample-Resume-Template.pdf",
  bio1: "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and modern cloud technologies, always striving to create intuitive user experiences backed by robust, maintainable code.",
  bio2: "I also hold a certificate in..",
  tagline: "Building the future, one line of code at a time"
};

export const socialLinks: SocialLinks = {
  github: "https://github.com/yourgitlink",
  linkedin: "https://linkedin.com/yourprofilelinkedin",
  
  
};

export const experiences: Experience[] = [{
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    logo: "https://leadingage.org/wp-content/uploads/2022/09/depiction-of-ideas-technology-1200x776-1.jpg",
    link: "",
    totalPeriod: "2020 - Present",
    roles: [{
      title: "Senior Full Stack Developer",
      period: "2022 - Present",
      description: ["Built MVP from ground up, scaling to 100K+ users. Developed real-time features using WebSockets and implemented payment processing.",
        "Architected and deployed a microservices-based e-commerce platform using React, Node.js, and GraphQL that processed $2.3M in transactions within the first quarter, while reducing page load times by 67%",
        "Spearheaded the implementation of a CI/CD pipeline with GitHub Actions and Docker, cutting deployment time from 3 hours to 12 minutes and eliminating 94% of post-release bugs",
        "Led a cross-functional team of 7 developers to integrate machine learning recommendations into the product catalog, resulting in a 28% increase in average order value and improved customer retention"
      ],
      technologies: ["TypeScript", "JavaScript", "Django", "PostgreSQL", "AWS", "Docker"]
    }, {
      title: "Full Stack Developer",
      period: "2020 - 2022",
      description: ["Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and mentored junior developers.",
        "Built and maintained RESTful APIs using Django and PostgreSQL that powered mobile and web applications for 50,000+ monthly active users",
        "Refactored legacy JavaScript codebase to TypeScript, reducing bug reports by 31% and improving team velocity on feature development.",
        "Designed and implemented automated test suites with Jest and Cypress, increasing code coverage from 43% to 87% within one quarter while documenting best practices for the engineering team"
      ],
      technologies: ["Vue.js", "Express.js", "MongoDB", "Stripe", "Redis"]
    }]

  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    totalPeriod: "2019 - 2020",
    link: "",
    logo: "https://codedesign.org/storage/app/media/uploaded-files/digital%20marketing%20agency.png",
    roles: [{
      title: "Full Stack Developer",
      period: "2019 - 2020",
      description: ["Created responsive web applications for various clients. Improved site performance by 40% through optimization techniques."],
      technologies: ["React", "JavaScript", "SCSS", "Webpack", "Jest"]
    }]

  }
 ]

export const educationList: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Berkeley",
    period: "2015 - 2019",
    description: "Focused on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.",
    gpa: "3.8/4.0"
  },
  {
    degree: "Masters of Science in Computer Science",
    institution: "University of California, Berkeley",
    period: "2020 - 2022",
    description: "Focused on software engineering, algorithms, and data structures. Graduated Magna Cum Laude.",
    gpa: "3.8/4.0"
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    institution: "General Assembly",
    period: "2019",
    description: "Intensive 12-week program covering modern web development technologies and best practices.",
  }
];

export const projects: Project[] = [
  {
    name: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    github: "https://github.com/fullstackdeveloper/ecommerce-platform",
    demo: "https://ecommerce-demo.fullstackdeveloper.dev",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Task Management App",
    description: "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Socket.io"],
    github: "https://github.com/fullstackdeveloper/task-manager",
    demo: "https://tasks.fullstackdeveloper.dev",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.",
    technologies: ["React", "TypeScript", "OpenWeather API", "Mapbox"],
    github: "https://github.com/fullstackdeveloper/weather-dashboard",
    demo: "https://weather.fullstackdeveloper.dev",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export const skills: Skill[] = [

  
  { 
    name: "JavaScript", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/javascript/F7DF1E?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/javascript/F7DF1E?viewbox=auto",
    category: "Programming Languages" 
  },
{ 
    name: "Node.js", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/nodedotjs/339933?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/nodedotjs/68CC44?viewbox=auto",
    category: "Programming Languages" 
  },
 { 
    name: "Figma", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/figma/coral?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/figma/coral?viewbox=auto",
    category: "Programming Languages" 
  },
 { 
    name: "ReactJS", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/react/61DAFB?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/react/61DAFB?viewbox=auto",
    category: "Programming Languages" 
  },
 
{ 
    name: "Java", 
    score: 7, 
    badgeLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", 
    badgeDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Programming Languages" 
  },
  // Java Technologies
  { 
    name: "Spring Framework", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/spring/6DB33F?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/spring/68BC45?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Spring Hibernate", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/hibernate/59666C?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/hibernate/BCAE79?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Spring Boot", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/springboot/6DB33F?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/springboot/68BC45?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Spring Security", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/springsecurity/6DB33F?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/springsecurity/68BC45?viewbox=auto",
    category: "Java Technologies" 
  },
  { 
    name: "Python", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/python/3776AB?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/python/4B8BBE?viewbox=auto",
    category: "Programming Languages" 
  },
  { 
    name: "PHP", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/php/777BB4?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/php/8892BF?viewbox=auto",
    category: "Programming Languages" 
  },
  

  // Databases
  { 
    name: "SQL", 
    score: 7, 
    badgeLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg", 
    badgeDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-original-wordmark.svg",
    category: "Databases" 
  },
  { 
    name: "PostgreSQL", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/postgresql/4169E1?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/postgresql/336791?viewbox=auto",
    category: "Databases" 
  },
  { 
    name: "MySQL", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/mysql/4479A1?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/mysql/00758F?viewbox=auto",
    category: "Databases" 
  },
  { 
    name: "Elasticsearch", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/elasticsearch/005571?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/elasticsearch/FEC514?viewbox=auto",
    category: "Databases" 
  },
  { 
    name: "MongoDB", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/mongodb/47A248?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/mongodb/4DB33D?viewbox=auto",
    category: "Databases" 
  },

  // Middleware Technologies
  { 
    name: "Apache Kafka", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/apachekafka/000000?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/apachekafka/FFFFFF?viewbox=auto",
    category: "Middleware Technologies" 
  },
  { 
    name: "Netflix Ribbon", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/netflix/E50914?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/netflix/E50914?viewbox=auto",
    category: "Middleware Technologies" 
  },

  // CI/CD and Other Tools
  { 
    name: "GitHub", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/github/181717?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/github/FFFFFF?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Docker", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/docker/2496ED?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/docker/2496ED?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Kubernetes", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/kubernetes/326CE5?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/kubernetes/326CE5?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "SPLUNK", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/splunk/000000?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/splunk/FFFFFF?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Dynatrace", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/dynatrace/1496FF?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/dynatrace/1496FF?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },
  { 
    name: "Grafana", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/grafana/F46800?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/grafana/F46800?viewbox=auto",
    category: "CI/CD and Other Tools" 
  },

  // Cloud Technologies
  { 
    name: "AWS", 
    score: 7, 
    badgeLight: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-4.svg", 
    badgeDark: "https://cdn.worldvectorlogo.com/logos/amazon-web-services-7.svg",
    category: "Cloud Technologies" 
  },
  { 
    name: "AWS Lambda", 
    score: 7, 
    badgeLight: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg", 
    badgeDark: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg",
    category: "Cloud Technologies" 
  },
  { 
    name: "AWS S3", 
    score: 7, 
    badgeLight: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg", 
    badgeDark: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Amazon-S3-Logo.svg",
    category: "Cloud Technologies" 
  },
  { 
    name: "GCP", 
    score: 4, 
    badgeLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg", 
    badgeDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original-wordmark.svg",
    category: "Cloud Technologies" 
  },

  // AI & Machine Learning
  { 
    name: "TensorFlow", 
    score: 4, 
    badgeLight: "https://cdn.simpleicons.org/tensorflow/FF6F00?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/tensorflow/FF6F00?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "PyTorch", 
    score: 4, 
    badgeLight: "https://cdn.simpleicons.org/pytorch/EE4C2C?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/pytorch/EE4C2C?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "Scikit-learn", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/scikitlearn/F7931E?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/scikitlearn/F7931E?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "Pandas", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/pandas/150458?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/pandas/E70488?viewbox=auto",
    category: "AI & Machine Learning" 
  },
  { 
    name: "NumPy", 
    score: 7, 
    badgeLight: "https://cdn.simpleicons.org/numpy/013243?viewbox=auto", 
    badgeDark: "https://cdn.simpleicons.org/numpy/4DABCF?viewbox=auto",
    category: "AI & Machine Learning" 
  }
  
]

export const analytics = {
  gtagId: "G-XXXXXXXXXX" // Replace with your actual Google Analytics ID
};


export const terminalCommands = {
  help: [
    'Available commands:',
    '  help       - Show this help message',
    '  clear      - Clear terminal',
    '  about      - Open About section',
    '  work       - Open Work Experience',
    '  experience - Open Work Experience',
    '  education  - Open Education section',
    '  projects   - Open Projects section',
    '  skills     - Open Skills section',
    '  contact    - Open Contact section',
    '  resume     - Open Resume',
    '  whoami     - Show user info',
    '  ls         - List available files',
    '  pwd        - Show current directory',
    '  date       - Show current date',
    '  echo <msg> - Echo a message'
  ],
  about: ['Opening About.java...'],
  work: ['Opening Work.css...'],
  experience: ['Opening Work.css...'],
  education: ['Opening education.yml...'],
  projects: ['Opening projects.ts...'],
  skills: ['Opening skills.json...'],
  contact: ['Opening Contact.html...'],
  resume: ['Opening resume.pdf...'],
  whoami: ['dev@portfolio:~$ Your NAME - Developer'],
  ls: [
    'About.java',
    'Work.css',
    'education.yml',
    'projects.ts',
    'skills.json',
    'Contact.html',
    'resume.pdf'
  ],
  pwd: ['/home/dev/portfolio'],
  date: [new Date().toString()]
};

