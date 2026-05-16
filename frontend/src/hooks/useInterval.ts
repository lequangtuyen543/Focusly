import { useEffect, useRef } from 'react'

export function useInterval(cb: () => void, delay: number | null) {
  const savedRef = useRef(cb)
  useEffect(() => { savedRef.current = cb }, [cb])
  useEffect(() => {
    if (delay === null) return
    const id = setInterval(() => savedRef.current(), delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
