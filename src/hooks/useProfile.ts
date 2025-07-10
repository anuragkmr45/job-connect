"use client"; 
// hooks/useProfile.ts
import { useGetProfileQuery, useUpdateProfileMutation } from '../services/profileService';

export const useProfile = () => {
    // ⚡️ this returns one single object
    const {
        data: profile,
        isLoading: loadingProfile,
        isError: fetchError,
        refetch: refetchProfile,
    } = useGetProfileQuery();

    // ⚡️ this returns a [triggerFn, resultObj] tuple
    const [updateProfile, {
        data: updatedProfile,
        isLoading: updating,
        isError: updateError,
    }] = useUpdateProfileMutation();

    return {
        // read‐only query state
        profile,           // Profile | undefined
        loadingProfile,    // boolean
        fetchError,        // boolean
        refetchProfile,    // () => void

        // mutation action + state
        updateProfile,     // (formData: FormData) => Promise<…>
        updatedProfile,    // Profile | undefined
        updating,          // boolean
        updateError,       // boolean
    };
}
