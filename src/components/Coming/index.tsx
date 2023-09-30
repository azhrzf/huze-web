import { Link } from 'react-router-dom';
import { Container, Title, Text, Group, Button } from '@mantine/core';

export default function ComingSoon() {

    return (
        <div className='container mx-auto max-w-screen-lg px-5 md:px-10'>
            <Container className='flex flex-col justify-center items-center'>
                <Title className='text-5xl md:text-6xl mb-5'>Coming Soon</Title>
                <Text c="dimmed" size="lg" className='text-center'>
                    We're working hard to bring you something awesome. Stay tuned for updates!
                </Text>
                <Group className='mt-4'>
                    <Link to="/">
                        <Button variant="outline" size="md">
                            Take me back to home page
                        </Button>
                    </Link>
                </Group>
            </Container>
        </div>
    );
}