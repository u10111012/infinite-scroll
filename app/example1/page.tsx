"use client"

import {useState,useRef,useCallback,ReactNode} from "react";
import usePosts from "@/hook/usePosts";
import Post from "@/components/post";

const Page = () => {
    const [pageNum,setPageNum] = useState(1)
    const {
        isLoading,
        isError,
        error,
        results,
        hasNextPage
    } = usePosts(pageNum)
    const intObserver = useRef<IntersectionObserver | null>(null);

    const lastPostRef = useCallback((post:ReactNode) => {
    if (isLoading) return

    if (intObserver.current) intObserver.current!.disconnect()

    intObserver.current = new IntersectionObserver(posts => {
        if (posts[0].isIntersecting && hasNextPage) {
            console.log('We are near the last post!')
            setPageNum(prev => prev + 1)
        }
    })

    if (post) intObserver.current!.observe(post)
    }, [isLoading, hasNextPage])

    if(isError) return <p className='text-center'>Error:{error.message}</p>

    const content = results.map((post,index) => {
        if(results.length === index+1) {
            return <Post ref={lastPostRef} key={post.id} post={post}/>
        }

        return <Post key={post.id} post={post}/>
    })

    return (
        <>
            <h1 id="top">&infin; Infinite Query &amp; Scroll<br />&infin; Ex. 1 - React only</h1>
            {content}
            {isLoading && <p className="text-center">Loading More Posts...</p>}
            <p className="text-center"><a href="#top">Back to Top</a></p>
        </>
    );
};

export default Page;