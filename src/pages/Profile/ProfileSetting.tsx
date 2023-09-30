import { Link } from 'react-router-dom';
import {
    TextInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import { IconTrash, IconPencil, IconX, IconPhotoFilled } from '@tabler/icons-react';
import axios from 'axios';
import { usedApi, version } from '../../RouteApi'
import { useState, useContext, useEffect, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { GlobalContext } from '../../App';
import { InfinitySpin } from 'react-loader-spinner'

const ProfileSetting = () => {

    const cookies = useMemo(() => new Cookies(), []);

    const [data, setData] = useState({
        username: '',
        firstName: '',
        lastName: '',
    })

    const [isButtonValid, setIsButtonValid] = useState(false)
    const [isError, setIsError] = useState({ status: false, message: "" })
    const [startEdit, setStartEdit] = useState(false)
    const [imgDeletePass, setImgDeletePass] = useState(false)
    const [imgAppearHelper, setImgAppearHelper] = useState(false)

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
            const file = event.target.files && event.target.files[0];
            if (file && file.size <= 5 * 1024 * 1024) {
                setFile(event.target.files[0]);
            }
            else {
                setIsError({
                    status: true,
                    message: "File size must be less than 5 MB"
                })
            }
        }
        setImgAppearHelper(true)
    };

    const { refresh, updateContext } = useContext(GlobalContext);

    const handleSubmit = async (data: Data) => {
        try {
            const response = await axios.patch(`${usedApi}${version}/users/${cookies.get('username')}`,
                file ? { ...data, image: file } : data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${cookies.get('token')}`
                },
            });
            console.log(response.data)
            if (response.data.status === 'success') {
                alert("Profile updated")
                setIsButtonValid(false)
                setStartEdit(false)
                cookies.set('username', response.data.data.username, { path: '/' })
                cookies.set('image', response.data.data.image, { path: '/' })
            }
            else if (response.data.status === 'fail') {
                setIsError({
                    status: true,
                    message: response.data.message
                })
            }
            if (imgDeletePass) {
                handleImgDelete()
                setImgDeletePass(false)
            }
            updateContext(!refresh)
        }
        catch (error) {
            console.error(error);
        }
    };

    const validateAll = (allData: Data): boolean => {
        if (!startEdit) {
            return false
        }
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
                const response = await axios.get(`${usedApi}${version}/users/${cookies.get('username')}`, {
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
                    cookies.set('image', response.data.data.users.image, { path: '/' })
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
    }, [cookies])

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
    else if (cookies.get('token') && data.username === '') {
        return (
            <div className="container mx-auto max-w-screen-lg px-5 md:px-10 flex justify-center align-middle">
                <InfinitySpin
                    color="#3B82F6"
                />
            </div>
        )
    }

    const selectImage = (file: File | null): string => {
        if (cookies.get('image') && cookies.get('image') !== "no_picture" && file === null && imgDeletePass && startEdit && !imgAppearHelper) {
            return "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
        }
        else if (cookies.get('image') && cookies.get('image') !== "no_picture" && file === null) {
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
        const needed = {
            className: `inline ml-2 ${isButtonValid && imgAppearHelper ? "text-red-500 cursor-pointer" : "text-gray-400"}`,
            size: 18,
        }

        if (cookies.get('image') && !file) {
            return <IconTrash
                {...needed}
                onClick={() => {
                    if (isButtonValid && imgAppearHelper) {
                        setFile(null)
                        setImgDeletePass(true)
                        setImgAppearHelper(false)
                    }
                }}
            />
        }
        else if (file) {
            return <IconTrash
                {...needed}
                onClick={() => {
                    if (isButtonValid && imgAppearHelper) {
                        setFile(null)
                        setImgAppearHelper(false)
                    }
                }}
            />
        }
    }

    const handleImgDelete = async () => {
        try {
            if (cookies.get('image') && !file) {
                const response = await axios.patch(`${usedApi}${version}/users/${cookies.get('username')}/delimage`, {}, {
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

    const handleImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";
    }

    return (
        <>
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
                            value={data[key as keyof Data]}
                        />
                    )
                })}
                <section className='my-6'>
                    <label htmlFor="file-upload" className={`${isButtonValid ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" : "bg-[#E9ECEF] text-[#B1B8BF]"} text-xs font-semibold py-2 px-4 rounded`}>
                        <IconPhotoFilled size={18} className='inline' />
                    </label>
                    <img
                        src={selectImage(file)}
                        alt={selectImage(file)}
                        onError={handleImgError}
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
                            setImgAppearHelper(!startEdit)
                            setIsButtonValid(!validateAll(data))
                        }}>
                        {startEdit ? <IconX /> : <IconPencil />}
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
        </>
    );
}

export default ProfileSetting;