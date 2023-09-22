import PetsList from "./PetsList"
import IntroLayout from "../../components/Intro";
import { TextInput, Button } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { useForm } from '@mantine/form';

const PetsLayout = () => {

    const form = useForm({
        initialValues: {
            name: '',
        },
    });

    return (
        <section className="container mx-auto max-w-screen-lg px-5 md:px-10 mb-10">
            <IntroLayout text="Start identifying and adding your pets here." />
            <div className="block md:flex justify-between gap-3 mb-7 container mx-auto max-w-screen-lg">
                <div className="flex gap-2 mb-5 md:mb-0">
                    <Button variant="light" className="bg-[#E7F5FF]">Indigo cyan</Button>
                    <Button variant="light" className="bg-[#E7F5FF]">Indigo cyan</Button>
                </div>
                <div className="flex gap-3 justify-between md:justify-normal">
                    <TextInput placeholder="Search" {...form.getInputProps('name')} className="w-64 md:w-auto" />
                    <Button variant="outline" onClick={() =>
                        form.setValues({
                            name: randomId(),
                        })
                    }>Search</Button>
                </div>
            </div>
            <div className="block md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                <PetsList
                    avatar="https://www.moroccoworldnews.com/wp-content/uploads/2023/08/spanish-national-team-eager-to-beat-morocco-in-race-for-lamine-yamal-800x534.jpeg"
                    name="Lamine Yamal"
                    email="yamal@barcae.id"
                    job="footballer"
                />
                <PetsList
                    avatar="https://www.moroccoworldnews.com/wp-content/uploads/2023/08/spanish-national-team-eager-to-beat-morocco-in-race-for-lamine-yamal-800x534.jpeg"
                    name="Lamine Yamal"
                    email="yamal@barcae.id"
                    job="footballer"
                />
                <PetsList
                    avatar="https://www.moroccoworldnews.com/wp-content/uploads/2023/08/spanish-national-team-eager-to-beat-morocco-in-race-for-lamine-yamal-800x534.jpeg"
                    name="Lamine Yamal"
                    email="yamal@barcae.id"
                    job="footballer"
                />
            </div>
        </section>
    )
}

// pass data to PetsList

export default PetsLayout