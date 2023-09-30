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


const HuzepediaDetailCats = () => {
    const { classes } = useStyles();
    const { catId } = useParams()

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


    const [catData, setCatData] = useState<Cat | null>(null)
    const [isError, setIsError] = useState(false)
    const [errorCode, setErrorCode] = useState(404)

    useEffect(() => {
        const fetchCatData = async () => {
            try {
                const resCat = await axios.get(`${usedApi}${version}/cats/${catId}`)

                if (resCat.data.code && resCat.data.status === 'error') {
                    setErrorCode(resCat.data.code)
                    throw new Error(resCat.data.code)
                }
                setCatData(resCat.data.data.cats[0])
            }
            catch (error) {
                setIsError(true)
            }
        }

        fetchCatData()
    }, [catId])

    if (isError) {
        return `${errorCode}`
    }

    if (!catData) {
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

    const ReturnedData = ({ data }: { data: Cat }) => {
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
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-3'>
                        {Object.keys(data.characteristics).filter(key => key !== "id").map(key => {
                            const desc = (txt: string | number) => {
                                if (typeof txt === "number") {
                                    return (
                                        <Text color="dimmed" className='mt-3 flex'>
                                            {PrintStars(Number(txt))}
                                        </Text>
                                    )
                                }
                                return (
                                    <Text color="dimmed" className='mt-3'>
                                        {txt}
                                    </Text>
                                )
                            }
                            return (
                                <article key={key}>
                                    <h1 className='text-[#4c6075] text-lg font-normal'>
                                        {key.replace(/_/g, ' ')
                                            .split(' ')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')}
                                    </h1>
                                    {desc(data.characteristics[key as keyof CatChar])}
                                </article>
                            )
                        })}
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
        <ReturnedData data={catData} />
    )
}

export default HuzepediaDetailCats