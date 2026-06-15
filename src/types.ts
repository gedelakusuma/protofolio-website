/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'programming' | 'web' | 'ai' | 'database' | 'tool' | 'soft';
}

export interface Education {
  degree: string;
  school: string;
  detail: string; // e.g. "CGPA: 8.99" or "Percentage: 97%"
  location: string;
  duration: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
  skillsLearned: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  badgeAccent: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
