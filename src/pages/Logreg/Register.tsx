import { Link, useNavigate } from 'react-router-dom';
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import axios from 'axios';
import { usedApi, version } from '../../RouteApi'
import { useState, useContext, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { GlobalContext } from '../../App';
import { IconTrash, IconPhotoFilled } from '@tabler/icons-react';

const Register = () => {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    })

    const [isButtonValid, setIsButtonValid] = useState(false)
    const [isError, setIsError] = useState({ status: false, message: "" })

    interface Data {
        username: string,
        email: string,
        password: string,
        confirmPassword: string,
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
    const navigate = useNavigate();

    const { refresh, updateContext } = useContext(GlobalContext);

    const handleSubmit = async (data: Data) => {
        try {
            const { confirmPassword, ...rest } = data
            if (confirmPassword !== rest.password) {
                throw new Error("Password and Confirm Password must be the same")
            }

            const response = await axios.post(`${usedApi}${version}/register`, file ? { ...rest, image: file } : rest, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.status === 'success') {
                updateContext(!refresh)
                navigate('/login')
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
        if (allData.password !== allData.confirmPassword) {
            return false
        }
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(allData.email);
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

    if (cookies.get('token')) {
        return (
            <Container size={420} className='px-10 md:px-0'>
                <Title ta="center">
                    You are already logged in
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
                        <Anchor onClick={() => {
                            cookies.remove('token')
                            cookies.remove('image')
                            cookies.remove('username')
                            updateContext(!refresh)
                        }}
                            size="sm" component="button" className='text-red-600'>
                            Logout
                        </Anchor>
                    </Link>
                </Text>
            </Container>
        )
    }

    type DeleteImgButtonProps = {
        file: File | null
    }

    const DeleteImgButton = ({ file }: DeleteImgButtonProps) => {
        const needed = {
            className: `inline ${isButtonValid ? "text-red-500 cursor-pointer" : "text-gray-400"}`,
            size: 18,
        }

        if (file) {
            return <IconTrash
                {...needed}
                onClick={() => {
                    if (isButtonValid) {
                        setFile(null)
                    }
                }}
            />
        }
        return <></>
    }

    return (
        <Container size={420} className='px-10 md:px-0'>
            <Title ta="center">
                Create Your Account
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Link to="/login">
                    <Anchor size="sm" component="button">
                        Login
                    </Anchor>
                </Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {Object.keys(data).filter(key => key !== "password" && key !== "confirmPassword").map(key => {
                    return (
                        <TextInput
                            key={key}
                            label={camelCaseToTitleCase(key)}
                            placeholder={`Your ${camelCaseToTitleCase(key)}`}
                            required
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                            name={key}
                            className='mb-3'
                        />
                    )
                })}
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required mt="md"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    name="password"
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="Your password Again"
                    required mt="md"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    name="confirmPassword"
                />
                <section className='my-6'>
                    <label htmlFor="file-upload" className={`${isButtonValid ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer" : "bg-[#E9ECEF] text-[#B1B8BF]"} text-xs font-semibold py-2 px-4 rounded`}>
                        <IconPhotoFilled size={18} className='inline' />
                    </label>
                    <img src={file ? URL.createObjectURL(file) : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"} alt="" className='ml-3 mr-2 inline w-10 h-10 rounded-full object-cover' />
                    <DeleteImgButton file={file} />
                    <p className={`ml-2 inline text-xs font-semibold ${isButtonValid ? "text-black" : "text-[#B1B8BF]"}`}>{file ? shortenFileName(file.name, 10) : "No Image Selected"}</p>
                    <input type="file" id="file-upload" onChange={handleFileChange} accept=".png, .jpg, .jpeg" className="hidden" disabled={!isButtonValid} />
                </section>
                <Button
                    fullWidth
                    className='bg-[#3B82F6]'
                    onClick={() => {
                        handleSubmit(data)
                    }}
                    disabled={!isButtonValid}
                >
                    Register
                </Button>
                {isError.status && <Text color="red" mt="md" className='text-center'>{isError.message}</Text>}
            </Paper>
        </Container>
    );
}

export default Register;