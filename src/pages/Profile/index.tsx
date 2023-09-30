import { Outlet, useNavigate } from "react-router-dom"
import { useState, useMemo } from "react";
import { Container, Title, SegmentedControl, Text } from '@mantine/core';
import Cookies from 'universal-cookie';

const ProfileLayout = () => {

    const navigate = useNavigate();
    const cookies = useMemo(() => new Cookies(), []);

    const [selectedOption, setSelectedOption] = useState('Info');

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        if (option === 'Password') {
            navigate('/profile/password')
        }
        else {
            navigate('/profile')
        }
    };

    const Navigation = () => {
        if (cookies.get('token')) {
            return (
                <>
                    <Title ta="center">
                        Your Huze Profile
                    </Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Your profile page is your digital storefront.
                    </Text>

                    <SegmentedControl
                        radius="xl"
                        size="xs"
                        data={['Info', 'Password']}
                        className='mt-5'
                        onChange={handleOptionChange}
                        value={selectedOption}
                    />
                </>
            )
        }
    }

    return (
        <Container size={420} className='px-10 md:px-0 flex flex-col items-center justify-center'>
            <Navigation />
            <Outlet />
        </Container>
    )
}

export default ProfileLayout