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

const Login = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [isButtonValid, setIsButtonValid] = useState(false)
    const [isError, setIsError] = useState({ status: false, message: "" })

    interface Data {
        email: string,
        password: string
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        if (name === "email") {
            setIsButtonValid(validateEmailPassword(value, data.password))
        }
        else if (name === "password") {
            setIsButtonValid(validateEmailPassword(data.email, value))
        }
        setData({
            ...data,
            [name]: value
        })
    }

    const cookies = useMemo(() => new Cookies(), []);
    const navigate = useNavigate();

    const { refresh, updateContext } = useContext(GlobalContext);

    const handleSubmit = async (data: Data) => {
        try {
            const response = await axios.post(`${usedApi}${version}/login`, data);
            if (response.data.status === 'success') {
                cookies.set('token', response.data.data.token, { path: '/' });
                cookies.set('image', response.data.data.image, { path: '/' });
                cookies.set('username', response.data.data.username, { path: '/' });
                updateContext(!refresh)
                navigate('/')
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

    const validateEmailPassword = (email: string, password: string) => {
        if (email.trim() === '' || password.trim() === '') {
            return false;
        }
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    return (
        <Container size={420} className='px-10 md:px-0'>
            <Title ta="center">
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Link to="/register">
                    <Anchor size="sm" component="button">
                        Create account
                    </Anchor>
                </Link>
            </Text>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput
                    label="Email"
                    placeholder="you@mail.com"
                    required
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    name="email"
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required mt="md"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event)}
                    name="password"
                />
                <Button
                    fullWidth mt="xl"
                    className='bg-[#3B82F6]'
                    onClick={() => {
                        handleSubmit(data)
                    }}
                    disabled={!isButtonValid}
                >
                    Login
                </Button>
                {isError.status && <Text color="red" mt="md" className='text-center'>{isError.message}</Text>}
            </Paper>
        </Container>
    );
}

export default Login;