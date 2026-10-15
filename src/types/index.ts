export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'client';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  architect: string | null;
  status: 'active' | 'archived' | 'draft';
  cover_image_url: string | null;
  completion_date: string | null;
  area_sqm: number | null;
  project_type: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectCode {
  id: string;
  project_id: string;
  code: string;
  is_active: boolean;
  expires_at: string | null;
  created_at: string;
}

export interface ProjectUser {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  project_id: string;
  title: string | null;
  description: string | null;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  mime_type: string | null;
  sort_order: number;
  created_at: string;
}

export interface Video {
  id: string;
  project_id: string;
  title: string | null;
  description: string | null;
  file_url: string;
  thumbnail_url: string | null;
  file_name: string | null;
  file_size: number | null;
  duration_seconds: number | null;
  sort_order: number;
  created_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface Plan {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string | null;
  floor_level: string | null;
  plan_type: string;
  sort_order: number;
  created_at: string;
}

export interface Download {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  file_type: string | null;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface InteractiveExperience {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  experience_type: 'pixel_streaming' | 'executable' | 'vr' | 'web';
  url: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: number | null;
  platform: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface TimelineEvent {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  event_date: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  milestone_type: string;
  sort_order: number;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
}
