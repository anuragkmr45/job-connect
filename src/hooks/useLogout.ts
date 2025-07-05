// src/hooks/useLogout.ts
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/hooks'
import { clearAuth } from '@/store/authSlice'
import { persistor } from '@/store'

/**
 * Hook to log the user out:
 * - Clears the auth slice
 * - Purges persisted Redux state
 * - Redirects to the sign-in page
 */
export function useLogout() {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const logout = useCallback(async () => {
    // 1) clear auth state in Redux
    dispatch(clearAuth())

    // 2) purge persisted store so token is removed from storage
    await persistor.purge()

    // 3) navigate to sign-in
    router.push('/signin')
  }, [dispatch, router])

  return { logout }
}
