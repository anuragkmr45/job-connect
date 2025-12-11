// src/types/jobNews.ts
export interface JobNews {
    id: number;
    title: string;
    body: string;
    source_image_url?: string | null;
    source_link?: string | null;
    published_at?: string | null;
    created_at?: string;
    updated_at?: string;
  }
  