import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import BlogSection from "../../pages/Blog/BlogSection"
import IntroLayout from './IntroLayout';

const BlogLayout = () => {

    const form = useForm({
        initialValues: {
            name: '',
        },
    });

    return (
        <section className="container mx-auto max-w-screen-lg px-5 md:px-10">
            <IntroLayout text="Welcome to our blog dedicated to the wonderful world of pet dogs and cats, where we share insights, tips, and heartwarming stories about our furry companions." />
            <div className="block md:flex justify-between gap-3 mb-7">
                <div className="flex gap-2 mb-5 md:mb-0">
                    <Button variant="light" className="bg-[#E7F5FF]">Indigo cyan</Button>
                    <Button variant="light" className="bg-[#E7F5FF]">Indigo cyan</Button>
                </div>
                <div className="flex gap-3 justify-between sm:justify-normal">
                    <TextInput placeholder="Search" {...form.getInputProps('name')} className="w-64 lg:w-auto" />
                    <Button variant="outline" onClick={() =>
                        form.setValues({
                            name: randomId(),
                        })
                    }>Search</Button>
                </div>
            </div>
            <div>
                <article className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <BlogSection
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                        link="https://unsplash.com/photos/9uq2OQbT0Vw"
                        title="Why I write CSS in JavaScript"
                        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                        rating="4.9"
                        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                    />
                    <BlogSection
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                        link="https://unsplash.com/photos/9uq2OQbT0Vw"
                        title="Why I write CSS in JavaScript"
                        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                        rating="4.9"
                        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                    />
                    <BlogSection
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                        link="https://unsplash.com/photos/9uq2OQbT0Vw"
                        title="Why I write CSS in JavaScript"
                        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                        rating="4.9"
                        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                    />
                    <BlogSection
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                        link="https://unsplash.com/photos/9uq2OQbT0Vw"
                        title="Why I write CSS in JavaScript"
                        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                        rating="4.9"
                        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                    />
                    <BlogSection
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                        link="https://unsplash.com/photos/9uq2OQbT0Vw"
                        title="Why I write CSS in JavaScript"
                        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                        rating="4.9"
                        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                    />
                    <BlogSection
                        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                        link="https://unsplash.com/photos/9uq2OQbT0Vw"
                        title="Why I write CSS in JavaScript"
                        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                        rating="4.9"
                        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                    />
                </article>
            </div>
        </section>
    )
}

export default BlogLayout