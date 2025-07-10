// types/job.ts
export interface Category {
  label: string;
  tag: string;
}

export interface Company {
  display_name: string;
}

export interface Location {
  display_name: string;
  area: string[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  redirect_url: string;
  adref: string;
  contract_type?: string;
  contract_time?: string;
  salary_min?: number;
  salary_max: number;
  salary_is_predicted: string;
  created: string;            // ISO timestamp
  latitude?: number;
  longitude?: number;
  category: Category;
  company: Company;
  location: Location;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface SearchParams extends PaginationParams {
  q?: string | number;
  location?: string | number;
  salary_min?: number;
  salary_max?: number;
}

export interface PaginatedJobsResponse {
  count: number;
  page: number;
  pageSize: number;
  jobs: Job[];
}

export interface RecommendedJobsResponse {
  jobs: Job[];
}

export interface JobsSummary {
  saved: Job[];
  applied: Job[];
  viewed: Job[];
}
