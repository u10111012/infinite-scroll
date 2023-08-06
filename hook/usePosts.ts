import { useState, useEffect } from 'react'
import { getPostsPage } from '../api/axios'

const usePosts = (pageNum = 1) => {
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    // 怪怪 Der
    const [error, setError] = useState<Partial<Error>>(null)
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getPostsPage(pageNum, { signal })
            .then(data => {
                setResults(prev => [...prev, ...data])
                setHasNextPage(Boolean(data.length))
                setIsLoading(false)
            })
            .catch(e => {
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                if(e instanceof Error){
                  setError({ message:(e as Error).message})
                }
            })

        return () => controller.abort()

    }, [pageNum])

    return { isLoading, isError, error, results, hasNextPage }
}

export default usePosts