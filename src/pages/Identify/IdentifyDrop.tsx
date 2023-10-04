import { useRef, useState, useMemo } from 'react';
import { Text, Group, createStyles, rem, Card, Button, ActionIcon, Badge, Image } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { usedApi, version } from '../../RouteApi'
import { Dna } from 'react-loader-spinner'
import classesNew from './BadgeCard.module.css';
import { IconHeart } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: rem(30),
    },

    dropzone: {
        borderWidth: rem(1),
        paddingBottom: rem(50),
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: rem(200),
        left: `calc(50% - ${rem(100)})`,
        bottom: rem(-20),
    },
}));

const IdentifyDrop = () => {

    const cookies = useMemo(() => new Cookies(), []);

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

    interface ImgData {
        confidence: number,
        memory_usage: number,
        predicted_class: string,
        predicted_class_lower: string,
        type: string,
        remaining_req: number,
        detail: Cat | Dog,
    }

    const { classes, theme } = useStyles();
    const openRef = useRef<() => void>(null);

    const [imageMeta, setImageMeta] = useState<string | null>(null);
    const [isImgExist, setIsImgExist] = useState<boolean>(false);
    const [imgData, setImgData] = useState<ImgData | null>(null);
    const [isError, setIsError] = useState({
        status: false,
        message: ''
    });

    const handleDrop = async (files: File[]) => {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (event: ProgressEvent<FileReader>) => {
            setImageMeta(event.target?.result as string | null);
            setIsImgExist(true);
        };
        reader.readAsDataURL(file);

        try {
            const response = await axios.post(`${usedApi}${version}/identify`,
                {
                    username: cookies.get('username'),
                    image: file
                },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${cookies.get('token')}`
                    },
                });

            if (response.data && response.data.data.predicted_class) {
                setImgData(response.data.data);
            }
            else if (response.data.status === 'fail') {
                setIsError({
                    status: true,
                    message: response.data.message
                });
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            if (error.response && error.response.status === 429) {
                setIsError({
                    status: true,
                    message: "You have exceeded your rate limit. Please try again later."
                });
            } else {
                setIsError({
                    status: true,
                    message: "Something went wrong"
                });
            }
        }
    }

    const DnaRelease = () => {
        return (
            <div className="container mx-auto max-w-screen-lg px-5 md:px-10 ">
                <div className="flex justify-center align-middle">
                    <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />
                </div>
                <Text ta="center" fw={700} fz="lg" mt="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                    <p>Menunggu bos, server cloud mahal...</p>
                </Text>
            </div>
        )
    }

    const InDropZone = () => {
        return (
            <>
                <Dropzone
                    openRef={openRef}
                    onDrop={handleDrop}
                    className={classes.dropzone}
                    radius="md"
                    accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                    maxSize={30 * 1024 ** 5}
                >
                    <div style={{ pointerEvents: 'none' }}>
                        <Group position="center">
                            <Dropzone.Accept>
                                <IconDownload
                                    size={rem(50)}
                                    color={theme.colors[theme.primaryColor][6]}
                                    stroke={1.5}
                                />
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconCloudUpload
                                    size={rem(50)}
                                    color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                    stroke={1.5}
                                />
                            </Dropzone.Idle>
                        </Group>

                        <Text ta="center" fw={700} fz="lg" mt="xl">
                            <Dropzone.Accept>Drop image here</Dropzone.Accept>
                            <Dropzone.Reject>image less than 5mb</Dropzone.Reject>
                            <Dropzone.Idle>Upload image</Dropzone.Idle>
                        </Text>
                        <Text ta="center" fz="sm" mt="xs" c="dimmed">
                            Drag&apos;n&apos;drop image here to upload. We can accept only <i>.jpg, .jpeg, and .png</i> image that
                            are less than 5mb in size.
                        </Text>
                    </div>
                </Dropzone>
            </>
        )
    }

    const ReComponent = () => {
        if (imgData && imgData.predicted_class) {
            return (
                <section className="">
                    <div className="mb-6 md:md-0">
                        <Card withBorder radius="md" p="md" className={classesNew.card}>
                            <Card.Section>
                                <Image src={imgData.detail.image} alt={imgData.predicted_class} height={300} />
                            </Card.Section>
                            <Card.Section className={classesNew.section} mt="md">
                                <Group className='mb-4'>
                                    <img src={imageMeta as string} alt={imgData.predicted_class} className='rounded-full w-12 h-12 md:w-16 md:h-16 object-cover inline' />
                                    <Text className='text-xl md:text-3xl' fw={500}>
                                        {imgData.predicted_class}
                                    </Text>
                                    <Badge size="sm" variant="light">
                                        {imgData.type}
                                    </Badge>
                                </Group>
                                <Group className='mb-4'>
                                    <Badge variant="light" leftSection="🔥 Confidence:">
                                        {imgData.confidence.toFixed(2)}%
                                    </Badge>
                                    <Badge variant="light" leftSection="🖥️ Memory Used:">
                                        {(imgData.memory_usage / (1024 * 1024 * 1024)).toFixed(2)} GB
                                    </Badge>
                                </Group>
                                <Text fz="sm" mt="xs" className='mb-4'>
                                    {imgData.detail.description}
                                </Text>
                                <Text
                                    size="lg"
                                    fw={800}
                                    variant="gradient"
                                    gradient={{ from: 'red', to: 'orange', deg: 8 }}
                                >
                                    Remaining requests: {imgData.remaining_req}
                                </Text>
                                <Text fz="xs" mt="xs" c="dimmed">
                                    *Three requests per day unless you want to help me pay for the server. If you know how to optimize the use of h5, python, and flask models in cloud run, or how to make tflite work normally in the cloud, please let me know. I would really appreciate it.
                                </Text>
                            </Card.Section>
                            <Link to={`/huzepedia/${imgData.type}/${imgData.predicted_class_lower}`}>
                                <Group mt="xs">
                                    <Button radius="md" style={{ flex: 1 }} className='bg-[#3B82F6]'>
                                        Show details
                                    </Button>
                                    <ActionIcon variant="default" radius="md" size={36}>
                                        <IconHeart className={classesNew.like} stroke={1.5} />
                                    </ActionIcon>
                                </Group>
                            </Link>
                        </Card>
                    </div>
                    <div className=''>
                        <InDropZone />
                    </div>
                </section>
            )
        }
        else if (isError.status) {
            return (
                <div className="bg-red-500 text-white text-lg font-semibold p-2 rounded-xl">
                    <p>{isError.message}</p>
                </div>
            )
        }
        else if (isImgExist && imageMeta !== null && imgData === null) {
            return <DnaRelease />
        }
        return <InDropZone />
    }

    return (
        <div>
            <ReComponent />
        </div>
    );
}

export default IdentifyDrop