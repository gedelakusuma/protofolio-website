/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Skill, Education, Experience, Certification } from './types';
// @ts-ignore
import avatarPhoto from './assets/images/gedela_kusuma_portrait_1781514741217.jpg';

export const PERSONAL_INFO = {
  name: 'Gedela Kusuma',
  role: 'AI Student | Web Developer | Future AI Engineer',
  tagline: 'Building intelligent digital experiences with AI, creativity, and modern technology.',
  aboutText: 'I am a passionate Computer Science & Artificial Intelligence student who loves building modern web applications and AI-powered digital solutions. My academic curriculum and practical experience focus on creating professional, user-friendly, and futuristic experiences using AI models, web technologies, and innovative UI/UX design paradigms.',
  email: 'gkusuma533@gmail.com',
  phone: '+91 (Your Phone)', // Since it's not explicitly in the prompt, let's make it a nice placeholder or custom label that looks clean!
  location: 'Visakhapatnam, Andhra Pradesh, India',
  linkedin: 'https://linkedin.com/in/gedela-kusuma', // standard visual link
  github: 'https://github.com/gedelakusuma',
  resumeUrl: '#resume-section',
  avatar: avatarPhoto,
};

export const PROJECTS: Project[] = [
  {
    id: 'runwear',
    title: 'RUNWEAR',
    category: 'AI Fashion Website',
    description: 'RUNWEAR is a futuristic AI-powered fashion and outfit recommendation platform designed to provide smart styling suggestions and modern shopping experiences.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'AI Tools', 'Tailwind'],
    features: [
      'AI outfit recommendations based on user preferences and weather',
      'Trend-based fashion suggestion algorithms',
      'Premium, high-performance e-commerce user interface',
      'Fully fluid, mobile-first responsive landing page',
      'Smart personalized fashion categorizations',
      'Interactive visual product display and catalog component'
    ],
    demoUrl: 'https://runwear-iota.vercel.app/',
  },
  {
    id: 'snapbuy',
    title: 'SNAPBUY',
    category: 'E-Commerce Platform',
    description: 'SNAPBUY is a modern and stylish e-commerce platform for fashion, electronics, and lifestyle products with advanced UI/UX and a smooth, seamless shopping experience.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    features: [
      'Fast product search auto-complete and multi-category filters',
      'Special discounted offers and flash sales countdown banners',
      'Responsive, visually appealing shopping UI layout',
      'Interactive product catalog categories with custom cards',
      'Smooth, physics-optimized animations for page navigation',
      'Highly polished visual checkouts mock-up interface'
    ],
    demoUrl: 'https://snapbuys.vercel.app/',
  },
  {
    id: 'aurastyle',
    title: 'AURA STYLE',
    category: 'AI Fashion Styling Platform',
    description: 'AURA STYLE is an AI-based fashion assistant that analyzes outfits and provides personalized styling recommendations using intelligent machine learning fashion analysis.',
    techStack: ['Generative AI', 'HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
    features: [
      'AI outfit analyzer and color compatibility checker',
      'Personalized style profile suggestions and styling tips',
      'Smart predictive outfit recommendation engine',
      'Real-time fashion search queries and trend analysis',
      'Modern, glassmorphic conversational AI companion panel'
    ],
    demoUrl: 'https://aurastyle-one.vercel.app/',
  },
];

export const EDUCATION_LIST: Education[] = [
  {
    degree: 'B.Tech in Computer Science & Artificial Intelligence',
    school: 'B.Tech CSE & AI - Duvvada, Visakhapatnam',
    detail: 'CGPA: 9.07',
    location: 'Visakhapatnam, AP, India',
    duration: '2022 - 2026',
  },
  {
    degree: 'Intermediate (MPC)',
    school: 'Sri Chaitanya Junior College',
    detail: 'Percentage: 97%',
    location: 'Andhra Pradesh, India',
    duration: '2020 - 2022',
  },
  {
    degree: 'SSC (Secondary School Certificate)',
    school: 'Narasingabilli Z.P High School',
    detail: 'Percentage: 97.16%',
    location: 'Andhra Pradesh, India',
    duration: '2020',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp-jjh',
    company: 'JJH Global Solutions',
    role: 'Generative AI Intern',
    duration: 'Internship',
    description: 'Worked on AI-powered web projects and Generative AI solutions. Refactored and developed futuristic UI/UX designs and intelligent website concepts using modern generative AI tools and standard frontend technologies.',
    skillsLearned: ['Generative AI', 'Prompt Engineering', 'UI/UX Design', 'Modern Frontend'],
  },
  {
    id: 'exp-datavalley',
    company: 'Data Valley India Pvt. Ltd',
    role: 'Foundations of AI & ML Intern',
    duration: 'Internship',
    description: 'Acquired foundational training and hands-on experience in Artificial Intelligence and Machine Learning paradigms, designing predictive systems and exploring core data models.',
    skillsLearned: ['Machine Learning', 'Data Preprocessing', 'AI Foundations', 'Python'],
  },
  {
    id: 'exp-codingbrains',
    company: 'Coding Brains Technologies',
    role: 'Full Stack Java Intern',
    duration: 'Internship',
    description: 'Implemented standard full-stack Java solutions, connected systems with robust MySQL backend storage solutions, and improved object-oriented implementation workflows.',
    skillsLearned: ['Java', 'Object-Oriented Programming', 'Full Stack Development', 'MySQL'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Software Engineering',
    issuer: 'NPTEL',
    year: '2024',
    badgeAccent: '#7C3AED',
  },
  {
    title: 'Prompt Engineering',
    issuer: 'Infosys Springboard',
    year: '2024',
    badgeAccent: '#00D4FF',
  },
  {
    title: 'Full Stack Java',
    issuer: 'Coding Brains Technologies',
    year: '2023',
    badgeAccent: '#8B5CF6',
  },
];

export const SKILLS: Skill[] = [
  // Programming
  { name: 'Python', level: 90, category: 'programming' },
  { name: 'Java', level: 85, category: 'programming' },
  { name: 'C Language', level: 80, category: 'programming' },

  // Web
  { name: 'HTML & CSS', level: 95, category: 'web' },
  { name: 'JavaScript', level: 90, category: 'web' },
  { name: 'React & TypeScript', level: 85, category: 'web' }, // Since we build in React!

  // AI & ML
  { name: 'Generative AI', level: 92, category: 'ai' },
  { name: 'Prompt Engineering', level: 95, category: 'ai' },
  { name: 'NLP (Natural Language Processing)', level: 80, category: 'ai' },
  { name: 'AI Development Tools', level: 90, category: 'ai' },

  // Databases
  { name: 'MySQL / SQL', level: 85, category: 'database' },

  // Tools
  { name: 'VS Code', level: 95, category: 'tool' },
  { name: 'Eclipse IDE', level: 75, category: 'tool' },
  { name: 'GitHub & Git Version Control', level: 88, category: 'tool' },

  // Soft Skills
  { name: 'Problem Solving', level: 92, category: 'soft' },
  { name: 'Technical Creativity', level: 90, category: 'soft' },
  { name: 'Communication', level: 88, category: 'soft' },
];
