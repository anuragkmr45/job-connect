// types/profile.ts
export interface Profile {
    id: string;
    email: string;
    name: string;
    contact: string;
    military_trade: number;
    service_status: number;
    service_start_date: string;
    service_end_date: string;
    preferred_locations: number[];
    work_roles: number[];
    qualification: number;
    aadhaar: string;
    pan: string;
    profile_pic_url: string;
    created_at: string;
    updated_at: string;
}
