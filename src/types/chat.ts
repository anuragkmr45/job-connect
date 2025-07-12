// types/chat.ts
import type { Job } from './job';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  jobs?: Job[];   // when the bot returns matching jobs
}
