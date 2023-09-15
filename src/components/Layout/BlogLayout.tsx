import { useForm } from '@mantine/form';
import { TextInput, Button, Box } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import BlogSection from "../../pages/Blog/BlogSection"

const BlogLayout = () => {
    const form = useForm({
        initialValues: {
            name: '',
        },
    });

    return (
        <section>
            <div>
                <Box maw={320} mx="auto">
                    <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
                    <Button
                        variant="outline"
                        onClick={() =>
                            form.setValues({
                                name: randomId(),
                            })
                        }
                    >
                        Set random values
                    </Button>
                </Box>
            </div>
            <div>
                <article className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto max-w-screen-lg px-5 md:px-10">
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