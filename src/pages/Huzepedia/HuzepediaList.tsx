import { InfinitySpin } from 'react-loader-spinner'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usedApi, version } from '../../RouteApi'
import { Paper, Text, Title, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';

const HuzepediaList = () => {

    const form = useForm({
        initialValues: {
            value: '',
            dogs: true,
            cats: true
        },
    });

    const searchContent = (content: string, keyword: string) => {
        const regex = new RegExp(keyword, 'i');
        return regex.test(content);
    }

    const handleSearch = (filter: string) => {
        setCatDataHandler(catData.filter((cat: Cat) => {
            return searchContent(`${cat.breed}`, filter)
        }))
        setDogDataHandler(dogData.filter((dog: Dog) => {
            return searchContent(`${dog.breed}`, filter)
        }))
    }

    const [catData, setCatData] = useState([])
    const [catDataHandler, setCatDataHandler] = useState([])

    const [dogData, setDogData] = useState([])
    const [dogDataHandler, setDogDataHandler] = useState([])

    const [isError, setIsError] = useState(false)
    const [errorCode, setErrorCode] = useState(404)

    useEffect(() => {
        const fetchCatData = async () => {
            try {
                const resCat = await axios.get(`${usedApi}${version}/cats`)
                const resDog = await axios.get(`${usedApi}${version}/dogs`)

                if (resCat.data.code && resCat.data.status === 'error') {
                    setErrorCode(resCat.data.code)
                    throw new Error(resCat.data.code)
                }
                setCatData(resCat.data.data.cats)
                setCatDataHandler(resCat.data.data.cats)

                if (resDog.data.code && resDog.data.status === 'error') {
                    setErrorCode(resDog.data.code)
                    throw new Error(resDog.data.code)
                }
                setDogData(resDog.data.data.dogs)
                setDogDataHandler(resDog.data.data.dogs)
            }
            catch (error) {
                setIsError(true)
            }
        }

        fetchCatData()
    }, [])

    interface CatChar {
        id: string,
        life_span: string,
        length: string,
        weight: string,
        origin: string,
        affectionate: number,
        health: number,
        playfulness: number,
        kid_friendly: number,
        strangers_friendly: number,
        pet_friendly: number,
        groom: number,
        intelligence: number
    }

    interface Cat {
        id: string;
        breed: string;
        description: string;
        food: string;
        care: string;
        image: string;
        characteristics: CatChar
    }

    interface DogChar {
        id: string,
        life_span: string,
        height: string,
        weight: string,
        origin: string,
        adaptability: number,
        friendliness: number,
        hngneeds: number,
        trainability: number,
        exercise: number
    }

    interface Dog {
        id: string;
        breed: string;
        description: string;
        food: string;
        care: string;
        image: string;
        characteristics: DogChar
    }

    if (isError) {
        return `${errorCode}`
    }

    if (catData.length === 0 || dogData.length === 0) {
        return (
            <div className="container mx-auto max-w-screen-lg px-5 md:px-10 flex justify-center align-middle">
                <InfinitySpin
                    color="#3B82F6"
                />
            </div>
        )
    }

    return (
        <section>
            <div className="block md:flex justify-between gap-3 mb-7">
                <div className="flex gap-2 mb-5 md:mb-0">
                    <Button variant="light" className="bg-[#E7F5FF]" onClick={() => {
                        form.setFieldValue('dogs', true)
                        form.setFieldValue('cats', true)
                    }}>All</Button>
                    <Button variant="light" className="bg-[#E7F5FF]" onClick={() => {
                        form.setFieldValue('dogs', false)
                        form.setFieldValue('cats', true)
                    }}>Cats</Button>
                    <Button variant="light" className="bg-[#E7F5FF]" onClick={() => {
                        form.setFieldValue('dogs', true)
                        form.setFieldValue('cats', false)
                    }}>Dogs</Button>
                </div>
                <div className="flex gap-3 justify-between sm:justify-normal">
                    <TextInput placeholder="Search" {...form.getInputProps('value')} className="w-64 lg:w-auto" />
                    <Button variant="outline" onClick={() => {
                        handleSearch(form.values.value)
                    }
                    }>Search</Button>
                </div>
            </div>
            <article className="block md:grid grid-cols-2 lg:grid-cols-3 gap-4">
                {form.values.cats && catDataHandler.map((cat: Cat) => {
                    const card = {
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${cat.image})`
                    }
                    return (
                        <Link relative='path' to={`./cats/${cat.id}`}>
                            <Paper key={cat.breed} shadow="md" p="xl" radius="md" style={card} className="h-96 flex flex-col justify-end items-start background mb-8 md:mb-0 transition-all ease-in-out duration-300 hover:scale-95 cursor-pointer">
                                <div>
                                    <Text size="xs" className="text-white opacity-70 font-bold uppercase drop-shadow-2xl">
                                        <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Cat</p>
                                    </Text>
                                    <Title order={3} className="text-white font-extrabold leading-5d text-4xl drop-shadow-2xl">
                                        <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{cat.breed}</p>
                                    </Title>
                                </div>
                            </Paper>
                        </Link>
                    )
                })}
                {form.values.dogs && dogDataHandler.map((dog: Dog) => {
                    const card = {
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${dog.image})`
                    }
                    return (
                        <Link relative='path' to={`./dogs/${dog.id}`}>
                        <Paper key={dog.breed} shadow="md" p="xl" radius="md" style={card} className="h-96 flex flex-col justify-end items-start background mb-8 md:mb-0 transition-all ease-in-out duration-300 hover:scale-95 cursor-pointer">
                            <div>
                                <Text size="xs" className="text-white opacity-80 font-bold uppercase drop-shadow-2xl">
                                    <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>Dog</p>
                                </Text>
                                <Title order={3} className="text-white font-extrabold leading-5d text-4xl drop-shadow-2xl">
                                    <p className='drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{dog.breed}</p>
                                </Title>
                            </div>
                        </Paper>
                        </Link>
                    )
                })}
            </article>
        </section>
    )
}

export default HuzepediaList