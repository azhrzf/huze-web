import BlogDetail from "./BlogDetail"
import { InfinitySpin } from 'react-loader-spinner'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usedApi, version } from '../../RouteApi'

const BlogDetailLayout = () => {
    interface Blog {
        id: string;
        thumbnail: string;
        title: string;
        article: string;
        writer: string;
        label: string;
    }

    const { blogId } = useParams()
    const [blogData, setBlogData] = useState<Blog | null>(null)
    const [isError, setIsError] = useState(false)
    const [errorCode, setErrorCode] = useState(404)

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const res = await axios.get(`${usedApi}${version}/blogs/${blogId}`)
                if (res.data.code && res.data.status === 'error') {
                    setErrorCode(res.data.code)
                    throw new Error(res.data.code)
                }
                setBlogData(res.data.data.blogs)
            }
            catch (error) {
                setIsError(true)
            }
        }

        fetchBlogData()
    }, [blogId])

    if (isError) {
        return `${errorCode}`
    }

    if (!blogData) {
        return (
            <div className="container mx-auto max-w-screen-lg px-5 md:px-10 flex justify-center align-middle">
                <InfinitySpin
                    color="#3B82F6"
                />
            </div>
        )
    }

    return (
        <BlogDetail data={blogData} />
    )
}

export default BlogDetailLayout
