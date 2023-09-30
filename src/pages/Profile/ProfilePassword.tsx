import { Link, useNavigate } from 'react-router-dom';
import {
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
    PasswordInput,
} from '@mantine/core';
import axios from 'axios';
import { usedApi, version } from '../../RouteApi'
import { useState, useContext, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { GlobalContext } from '../../App';
import { IconX, IconPencil } from '@tabler/icons-react';

const ProfilePassword = () => {

    const cookies = useMemo(() => new Cookies(), []);

    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    })

    const [isButtonValid, setIsButtonValid] = useState(false)
    const [isError, setIsError] = useState({ status: true, message: "" })
    const [startEdit, setStartEdit] = useState(false)

    interface Data {
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string,
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

    const { refresh, updateContext } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleCookiesDelete = () => {
        navigate('/login')
        cookies.remove('token', { path: '/' })
        cookies.remove('image', { path: '/' })
        cookies.remove('username', { path: '/' })
        updateContext(!refresh)
    }

    const handleSubmit = async (data: Data) => {
        try {
            const response = await axios.patch(`${usedApi}${version}/users/${cookies.get('username')}/password`,
                { password: data.oldPassword, newPassword: data.newPassword }, {
                headers: {
                    Authorization: `Bearer ${cookies.get('token')}`
                },
            });
            if (response.data.status === 'success') {
                alert("Update password success")
                handleCookiesDelete()
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
        if (!startEdit) {
            return false
        }
        for (const value of Object.values(allData)) {
            if (value === '') {
                return false
            }
        }
        if (allData.newPassword !== allData.confirmNewPassword) {
            return false
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


    return (
        <>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {Object.keys(data).map(key => {
                    return (
                        <PasswordInput
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
                <section className='grid grid-cols-4 gap-3'>
                    <Button
                        fullWidth
                        className='bg-[#3B82F6] col-span-1'
                        onClick={() => {
                            setStartEdit(!startEdit)
                            setIsButtonValid(validateAll(data))
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

export default ProfilePassword;