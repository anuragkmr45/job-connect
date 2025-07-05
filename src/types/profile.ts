// types/profile.ts
export interface Profile {
    id: string;
    email: string;
    name: string;
    contact: string;
    military_trade_id: number;
    service_status_id: number;
    service_start_date: string;
    service_end_date: string;
    preferred_location_ids: number[];
    work_role_ids: number[];
    qualification_id: number;
    aadhaar: string;
    pan: string;
    profile_pic_url: string;
    created_at: string;
    updated_at: string;
}
