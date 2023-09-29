import { Link, useParams } from 'react-router-dom';
import {
    TextInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import axios from 'axios';
import { usedApi, version } from '../../RouteApi'
import { useState, useContext, useEffect, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { GlobalContext } from '../../App';

const ProfileSetting = () => {

    const { userId } = useParams()

    const [data, setData] = useState({
        username: '',
        firstName: '',
        lastName: '',
    })

    const [isButtonValid, setIsButtonValid] = useState(false)
    const [isError, setIsError] = useState({ status: false, message: "" })
    const [startEdit, setStartEdit] = useState(false)

    interface Data {
        username: string,
        firstName: string,
        lastName: string,
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setIsButtonValid(validateAll({
            ...data,
            [name]: value
        }))
        setData({
            ...data,
            [name]: value
        })
    }

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const cookies = useMemo(() => new Cookies(), []);

    const { refresh, updateContext } = useContext(GlobalContext);

    const handleSubmit = async (data: Data) => {
        try {
            const response = await axios.patch(`${usedApi}${version}/users/${userId}`, file ? { ...data, image: file } : data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.status === 'success') {
                updateContext(!refresh)
            }
            else if (response.data.status === 'fail') {
                setIsError({
                    status: true,
                    message: response.data.message
                })
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    const validateAll = (allData: Data): boolean => {
        for (const value of Object.values(allData)) {
            if (value === '') {
                return false
            }
        }
        return true
    };

    const camelCaseToTitleCase = (str: string): string => {
        const spaced = str.replace(/([A-Z])/g, ' $1');
        const capitalized = spaced.replace(/(\w)(\w*)/g, (_, first, rest) => {
            return first.toUpperCase() + rest.toLowerCase();
        });
        return capitalized;
    }

    const shortenFileName = (fileName: string, maxLength: number): string => {
        const [baseName, extension] = fileName.split('.');

        return baseName.length > maxLength
            ? `${baseName.slice(0, maxLength - 3)}___.${extension}`
            : fileName;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${usedApi}${version}/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${cookies.get('token')}`
                    }
                });
                if (response.data.status === 'success') {
                    setIsError({
                        status: false,
                        message: ""
                    })
                    setData({
                        username: response.data.data.username,
                        firstName: response.data.data.firstName,
                        lastName: response.data.data.lastName,
                    })
                    cookies.set('image', response.data.data.image, { path: '/' })
                }
                else if (response.data.status === 'fail') {
                    setIsError({
                        status: true,
                        message: response.data.message
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [cookies, userId])

    if (!cookies.get('token')) {
        return (
            <Container size={420} className='px-10 md:px-0'>
                <Title ta="center">
                    You must login first
                </Title>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Go to{' '}
                    <Link to="/">
                        <Anchor size="sm" component="button">
                            Home
                        </Anchor>
                    </Link>
                    {' or '}
                    <Link to="/login">
                        <Anchor size="sm" component="button">
                            Login
                        </Anchor>
                    </Link>
                </Text>
            </Container>
        )
    }

    const selectImage = (file: File | null): string => {
        if (cookies.get('image') && !file) {
            return cookies.get('image')
        }
        else if (file) {
            return URL.createObjectURL(file)
        }
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
    }

    const imageName = (file: File | null): string => {
        if (cookies.get('image') && !file) {
            return shortenFileName("urpicture.png", 10)
        }
        else if (file) {
            return shortenFileName(file.name, 10)
        }
        return shortenFileName("default.png", 10)
    }

    type DeleteImgButtonProps = {
        file: File | null
    }

    const DeleteImgButton = ({ file }: DeleteImgButtonProps) => {
        if (cookies.get('image') && !file) {
            return <IconTrash
                className={`inline ml-2 ${isButtonValid ? "text-red-500 cursor-pointer" : "text-gray-400"}`}
                size={18}
                onClick={() => {
                    if (isButtonValid) {
                        cookies.remove('image')
                        setFile(null)
                        handleImgDelete()
                    }
                }}
            />
        }
        else if (file) {
            return <IconTrash
                className={`inline ml-2 ${isButtonValid ? "text-red-500 cursor-pointer" : "text-gray-400"}`}
                size={18}
                onClick={() => {
                    if (isButtonValid) {
                        setFile(null)
                    }
                }}
            />
        }
    }

    const handleImgDelete = async () => {
        try {
            if (cookies.get('image') && !file) {
                const response = await axios.patch(`${usedApi}${version}/${userId}/delimage`, {}, {
                    headers: {
                        Authorization: `Bearer ${cookies.get('token')}`
                    }
                });
                if (response.data.status === 'success') {
                    setIsError({
                        status: false,
                        message: ""
                    })
                }
                else if (response.data.status === 'fail') {
                    setIsError({
                        status: true,
                        message: response.data.message
                    })
                }
                cookies.remove('image');
                setFile(null);
            } else if (file) {
                setFile(null);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container size={420} className='px-10 md:px-0'>
            <Title ta="center">
                Your Huze Profile
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Your profile page is your digital storefront.
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {Object.keys(data).map(key => {
                    return (
                        <TextInput
                            key={key}
                            label={camelCaseToTitleCase(key)}
                            placeholder={`Your ${camelCaseToTitleCase(key)}`}
                            required
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                            name={key}
                            className='mb-3'
                            disabled={!startEdit}
                        />
                    )
                })}
                <section className='my-6'>
                    <label htmlFor="file-upload" className={`${isButtonValid ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" : "bg-[#E9ECEF] text-[#B1B8BF]"} text-xs font-semibold py-2 px-4 rounded`}>
                        Choose Profile Picture
                    </label>
                    <img
                        src={selectImage(file)}
                        alt={selectImage(file)}
                        className='ml-3 inline w-10 h-10 rounded-full object-cover'
                    />
                    <DeleteImgButton file={file} />
                    <p
                        className={`ml-2 inline text-xs font-semibold ${isButtonValid ? "text-black" : "text-[#B1B8BF]"}`}>
                        {imageName(file)}
                    </p>
                    <input type="file" id="file-upload" onChange={handleFileChange} accept=".png, .jpg, .jpeg" className="hidden" disabled={!isButtonValid} />
                </section>
                <section className='grid grid-cols-4 gap-3'>
                    <Button
                        fullWidth
                        className='bg-[#3B82F6] col-span-1'
                        onClick={() => {
                            setStartEdit(!startEdit)
                        }}>
                        {startEdit ? "Cancel" : "Edit"}
                    </Button>
                    <Button
                        fullWidth
                        className='bg-[#3B82F6] col-span-3'
                        onClick={() => {
                            handleSubmit(data)
                        }}
                        disabled={!isButtonValid}
                    >
                        Update
                    </Button>
                </section>
                {isError.status && <Text color="red" mt="md" className='text-center'>{isError.message}</Text>}
            </Paper>
        </Container>
    );
}

export default ProfileSetting;