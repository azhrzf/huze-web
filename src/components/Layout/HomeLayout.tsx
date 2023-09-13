import HomeBlog from "../../pages/Home/HomeBlog"
import HomeSpotlight from "../../pages/Home/HomeSpotlight"

const HomeLayout = () => {
    return (
        <main>
            <section className="px-5 lg:px-0">
                <HomeSpotlight />
            </section>
            <article className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 container mx-auto max-w-screen-lg px-5 md:px-10">
                <HomeBlog
                    image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                    link="https://unsplash.com/photos/9uq2OQbT0Vw"
                    title="Why I write CSS in JavaScript"
                    description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                    rating="4.9"
                    author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                />
                <HomeBlog
                    image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                    link="https://unsplash.com/photos/9uq2OQbT0Vw"
                    title="Why I write CSS in JavaScript"
                    description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                    rating="4.9"
                    author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                />
                <HomeBlog
                    image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
                    link="https://unsplash.com/photos/9uq2OQbT0Vw"
                    title="Why I write CSS in JavaScript"
                    description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
                    rating="4.9"
                    author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
                />
            </article>

        </main>
    )

    // fix mantine and tailwind conflict
}

export default HomeLayout