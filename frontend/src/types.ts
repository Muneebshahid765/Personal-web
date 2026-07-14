export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  featured: boolean;
  technologies: string[];
  challenge: string;
  solution: string;
  results: string[];
  year: string;
  client: string;
  link?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
  content: string;
  featured: boolean;
  likes?: number;
  views?: number;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Skill {
  id?: number;
  name: string;
  level: number; // 0 - 100
  category: string;
  iconName?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  details: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InquiryMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  budget: string;
  details: string;
  created_at: string;
}

export type PageId = 'home' | 'about' | 'projects' | 'services' | 'skills' | 'experience' | 'blog' | 'contact' | 'admin';
