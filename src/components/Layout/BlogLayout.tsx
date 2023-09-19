import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import BlogSection from "../../pages/Blog/BlogSection"
import IntroLayout from './IntroLayout';

const BlogLayout = () => {

    const shortenSentence = (sentence: string, wordLimit: number) => {
        const words = sentence.split(/\s+/);
        if (words.length <= wordLimit) {
            return sentence;
        }
        const shortenedSentence = words.slice(0, wordLimit).join(' ');
        return shortenedSentence + '...';
    }

    const searchContent = (content: string, keyword: string) => {
        const regex = new RegExp(keyword, 'i');
        return regex.test(content);
    }

    const form = useForm({
        initialValues: {
            value: '',
        },
    });

    const [blogData, setBlogData] = useState([])
    const [blogDataHandler, setBlogDataHandler] = useState([])

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/v1/blogs")
                setBlogData(res.data.data.blogs)
                setBlogDataHandler(res.data.data.blogs)
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchBlogData()
    }, [])

    const handleSearch = (filter: string, tag: boolean = false) => {
        setBlogDataHandler(blogData.filter((blog: Blog) => {
            if (tag) {
                return blog.tag === filter
            }
            else {
                return searchContent(`${blog.title} ${blog.article} ${blog.writer} ${blog.tag}`, filter)
            }
        }))
    }

    interface Blog {
        id: number;
        thumbnail: string;
        title: string;
        article: string;
        writer: string;
        tag: string;
    }

    return (
        <section className="container mx-auto max-w-screen-lg px-5 md:px-10">
            <IntroLayout text="Welcome to our blog dedicated to the wonderful world of pet dogs and cats, where we share insights, tips, and heartwarming stories about our furry companions." />
            <div className="block md:flex justify-between gap-3 mb-7">
                <div className="flex gap-2 mb-5 md:mb-0">
                    {[...new Map(blogData.map((blog: Blog) => [blog.tag, blog])).values()].map((blog: Blog) => {
                        return (
                            <Button variant="light" className="bg-[#E7F5FF]" onClick={() => handleSearch(blog.tag, true)}>{blog.tag}</Button>
                        )
                    })}
                </div>
                <div className="flex gap-3 justify-between sm:justify-normal">
                    <TextInput placeholder="Search" {...form.getInputProps('value')} className="w-64 lg:w-auto" />
                    <Button variant="outline" onClick={() => {
                        handleSearch(form.values.value, false)
                    }
                    }>Search</Button>
                </div>
            </div>
            <div>
                <article className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogDataHandler.map((blog: Blog) => {
                        return (
                            <BlogSection
                                key={blog.id}
                                image={blog.thumbnail}
                                link={`/${blog.id}`}
                                title={blog.title}
                                description={shortenSentence(blog.article, 20)}
                                rating="4.9"
                                author={{ name: blog.writer, image: blog.thumbnail }}
                            />
                        )
                    })
                    }
                </article>
            </div>
        </section>
    )
}

export default BlogLayout