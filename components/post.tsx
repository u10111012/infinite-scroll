import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Post = React.forwardRef( ({post},ref)  => {

    const content = ref
        ? <Card className='bg-amber-600' ref={ref}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>Post ID: {post.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
          <CardFooter>
            <p>last Card Footer</p>
          </CardFooter>
        </Card>
        : <Card className='bg-gray-300'>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>Post ID: {post.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.body}</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>


    return content
})

Post.displayName = 'Post'

export default Post