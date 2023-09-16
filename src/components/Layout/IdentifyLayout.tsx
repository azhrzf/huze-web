import IdentifyDrop from "../../pages/Identify/IdentifyDrop"
import IntroLayout from "./IntroLayout"

const IdentifyLayout = () => {
    return (
        <section className="container mx-auto max-w-screen-lg px-5 md:px-10">
            <IntroLayout text="Welcome to our blog dedicated to the wonderful world of pet dogs and cats, where we share insights, tips, and heartwarming stories about our furry companions." />
            <IdentifyDrop />
        </section>
    )
}

export default IdentifyLayout