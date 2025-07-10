// types/help.ts

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqResponse {
  faq: FaqItem[];
}

export interface FeedbackRequest {
  name: string;
  email: string;
  message: string;
}

export interface FeedbackResponse {
  message: string;
}