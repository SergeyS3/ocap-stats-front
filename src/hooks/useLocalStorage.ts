import { ProjectCode } from '@/hooks/useProject'
import { useCallback } from 'react'


type LocalStorage = {
  project: ProjectCode
}

type UseLocalStorageResult = {
  getLocalStorageItem: <K extends keyof LocalStorage>(key: K) => LocalStorage[K]
  setLocalStorageItem: <K extends keyof LocalStorage>(key: K, val: LocalStorage[K]) => void
}

const useLocalStorage = (): UseLocalStorageResult => {
  const getLocalStorageItem: UseLocalStorageResult['getLocalStorageItem'] = useCallback(key => {
    return window.localStorage.getItem(key) as LocalStorage[typeof key]
  }, [])

  const setLocalStorageItem: UseLocalStorageResult['setLocalStorageItem'] = useCallback((key, val) => {
    window.localStorage.setItem(key, val)
  }, [])

  return { getLocalStorageItem, setLocalStorageItem }
}

export default useLocalStorage
