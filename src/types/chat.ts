// types/chat.ts
import type { Job } from './job';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  count?: number;
  page?: number;
  pageSize?: number;
  jobs?: Job[];   // ⬅️ important
}
