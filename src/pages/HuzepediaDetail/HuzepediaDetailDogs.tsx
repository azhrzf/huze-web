import { InfinitySpin } from 'react-loader-spinner'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, createStyles, rem } from '@mantine/core';
import { usedApi, version } from '../../RouteApi'
import { Link, useParams } from "react-router-dom"
import { IconStarFilled, IconStar, IconArrowLeftBar } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(45),
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(40),
            lineHeight: 1.2,
        },
    },
}));


const HuzepediaDetailDogs = () => {
    const { classes } = useStyles();
    const { dogId } = useParams()

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


    const [dogData, setDogData] = useState<Dog | null>(null)
    const [isError, setIsError] = useState(false)
    const [errorCode, setErrorCode] = useState(404)

    useEffect(() => {
        const fetchDogData = async () => {
            try {
                const resDog = await axios.get(`${usedApi}${version}/dogs/${dogId}`)

                if (resDog.data.code && resDog.data.status === 'error') {
                    setErrorCode(resDog.data.code)
                    throw new Error(resDog.data.code)
                }
                setDogData(resDog.data.data.dogs[0])
            }
            catch (error) {
                setIsError(true)
            }
        }

        fetchDogData()
    }, [dogId])

    if (isError) {
        return `${errorCode}`
    }

    if (!dogData) {
        return (
            <div className="container mx-auto max-w-screen-lg px-5 md:px-10 flex justify-center align-middle">
                <InfinitySpin
                    color="#3B82F6"
                />
            </div>
        )
    }

    const PrintStars = (numStars: number) => {
        return (
            <>
                {Array.from({ length: numStars }, (_, index) => (
                    <IconStarFilled key={index} className='text-yellow-400' />
                ))}
                {Array.from({ length: 5 - numStars }, (_, index) => (
                    <IconStar key={index} className='text-yellow-400' />
                ))}
            </>
        )
    }

    const ReturnedData = ({ data }: { data: Dog }) => {
        return (
            <article className="container mx-auto max-w-screen-lg px-5 md:px-10">
                <Link to="../../" relative='path'>
                    <p className='text-[#3B82F6] mb-4 flex items-center'><IconArrowLeftBar size="30px" />Back to Huzepedia</p>
                </Link>
                <div className="mb-10">
                    <img src={data.image} alt={data.breed} className="w-full rounded-lg mb-10" />
                    <h1 className={classes.title}>
                        <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                            {data.breed}
                        </Text>{' '}
                    </h1>
                </div>
                <section className='mt-5'>
                    <h1 className='text-[#4c6075] text-2xl font-semibold'>Characteristic</h1>
                    <div className='grid grid-cols-3 gap-4 mt-3'>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Life Span</h1>
                            <Text color="dimmed" className='mt-3'>
                                {data.characteristics.life_span}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Height</h1>
                            <Text color="dimmed" className='mt-3'>
                                {data.characteristics.height}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Weight</h1>
                            <Text color="dimmed" className='mt-3'>
                                {data.characteristics.weight}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Origin</h1>
                            <Text color="dimmed" className='mt-3'>
                                {data.characteristics.origin}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Adaptability</h1>
                            <Text color="dimmed" className='mt-3 flex'>
                                {PrintStars(data.characteristics.adaptability)}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Friendliness</h1>
                            <Text color="dimmed" className='mt-3 flex'>
                                {PrintStars(data.characteristics.friendliness)}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>HNG Needs</h1>
                            <Text color="dimmed" className='mt-3 flex'>
                                {PrintStars(data.characteristics.hngneeds)}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Trainability</h1>
                            <Text color="dimmed" className='mt-3 flex'>
                                {PrintStars(data.characteristics.trainability)}
                            </Text>
                        </article>
                        <article>
                            <h1 className='text-[#4c6075] text-lg font-normal'>Exercise</h1>
                            <Text color="dimmed" className='mt-3 flex'>
                                {PrintStars(data.characteristics.exercise)}
                            </Text>
                        </article>
                    </div>
                </section>
                <section className='mt-5'>
                    <h1 className='text-[#4c6075] text-2xl font-semibold'>Description</h1>
                    <Text color="dimmed" className='mt-3'>
                        {data.description}
                    </Text>
                </section>
                <section className='mt-5'>
                    <h1 className='text-[#4c6075] text-2xl font-semibold'>Food</h1>
                    <Text color="dimmed" className='mt-3'>
                        {data.food}
                    </Text>
                </section>
                <section className='mt-5'>
                    <h1 className='text-[#4c6075] text-2xl font-semibold'>Care</h1>
                    <Text color="dimmed" className='mt-3'>
                        {data.care}
                    </Text>
                </section>
            </article>
        )
    }

    return (
        <ReturnedData data={dogData} />
    )
}

export default HuzepediaDetailDogs