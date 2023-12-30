import type { ProjectCode } from '@/hooks/useProject'
import { useCallback } from 'react'


type LocalStorage = {
  project: ProjectCode
}

const useLocalStorage = () => {
  const getLocalStorageItem = useCallback(<K extends keyof LocalStorage>(key: K) => {
    return window.localStorage.getItem(key) as LocalStorage[K]
  }, [])
  const setLocalStorageItem = useCallback(<K extends keyof LocalStorage>(key: K, val: LocalStorage[K]) => {
    return window.localStorage.setItem(key, val)
  }, [])

  return { getLocalStorageItem, setLocalStorageItem }
}

export default useLocalStorage
