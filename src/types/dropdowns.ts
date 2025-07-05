// src/types/dropdowns.ts
export interface Trade { id: number; name: string }
export interface Status { id: number; name: string }
export interface Location { id: number; name: string }
export interface Role { id: number; name: string }
export interface Qual { id: number; level: string; stream: string }

export interface Dropdowns {
    trades: Trade[]
    statuses: Status[]
    locations: Location[]
    roles: Role[]
    quals: Qual[]
}
