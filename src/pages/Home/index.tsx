import HomeSpotlight from "./HomeSpotlight"

const HomeLayout = () => {
    return (
        <main>
            <section className="px-5 lg:px-0">
                <HomeSpotlight />
            </section>
        </main>
    )

    // fix mantine and tailwind conflict
}

export default HomeLayout