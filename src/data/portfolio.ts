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
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
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

export const personalInfo: PersonalInfo = {
  name: "Bhakti Developer",
  title: "Full Stack Developer & UI/UX Designer",
  email: "bhakti.developer@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  profileImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
  bio: "I'm a passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React, Node.js, and modern cloud technologies, always striving to create intuitive user experiences backed by robust, maintainable code.",
  tagline: "Building the future, one line of code at a time"
};

export const socialLinks: SocialLinks = {
  github: "https://github.com/bhaktideveloper",
  linkedin: "https://linkedin.com/in/bhaktideveloper",
  twitter: "https://twitter.com/bhaktideveloper",
  portfolio: "https://bhaktideveloper.dev"
};

export const experiences: Experience[] = [
  {
    title: "Senior Full Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Present",
    description: "Led development of microservices architecture serving 1M+ users. Implemented CI/CD pipelines and mentored junior developers.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"]
  },
  {
    title: "Full Stack Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Built MVP from ground up, scaling to 100K+ users. Developed real-time features using WebSockets and implemented payment processing.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Stripe", "Redis"]
  },
  {
    title: "Frontend Developer",
    company: "Digital Agency",
    period: "2019 - 2020",
    description: "Created responsive web applications for various clients. Improved site performance by 40% through optimization techniques.",
    technologies: ["React", "JavaScript", "SCSS", "Webpack", "Jest"]
  }
];

export const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Berkeley",
    period: "2015 - 2019",
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
    github: "https://github.com/bhaktideveloper/ecommerce-platform",
    demo: "https://ecommerce-demo.bhaktideveloper.dev",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Task Management App",
    description: "Collaborative task management application with real-time updates, team collaboration, and project tracking.",
    technologies: ["Vue.js", "Express.js", "MongoDB", "Socket.io"],
    github: "https://github.com/bhaktideveloper/task-manager",
    demo: "https://tasks.bhaktideveloper.dev",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    name: "Weather Dashboard",
    description: "Beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.",
    technologies: ["React", "TypeScript", "OpenWeather API", "Mapbox"],
    github: "https://github.com/bhaktideveloper/weather-dashboard",
    demo: "https://weather.bhaktideveloper.dev",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export const skills: Skill[] = [
  {
    category: "Frontend",
    items: ["React", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "SCSS"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Python", "Django", "PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Terraform"]
  },
  {
    category: "Tools & Others",
    items: ["Git", "Figma", "Adobe Creative Suite", "Jest", "Cypress", "Webpack", "Vite"]
  }
];

export const analytics = {
  gtagId: "G-XXXXXXXXXX" // Replace with your actual Google Analytics ID
};