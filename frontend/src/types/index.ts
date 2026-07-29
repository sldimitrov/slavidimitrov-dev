export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  published_at: string;
  reading_time: number;
  tags: Tag[];
}

export interface ProjectImage {
  id: number;
  image: string;
  alt_text?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  repo_url: string | null;
  live_url: string | null;
  cover_image: string | null;
  tags: Tag[];
  featured: boolean;
  images: ProjectImage[];
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface WorkExperienceItem {
  id: number;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  achievements: string[];
}

export type SkillCategory = "language" | "framework" | "tool" | "database" | "automation" | "infrastructure";

export interface SkillItem {
  id: number;
  name: string;
  category: SkillCategory;
  proficiency: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface BlogPostsQuery {
  tag?: string;
  page?: number;
}

export interface ProjectsQuery {
  tag?: string;
  featured?: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}
