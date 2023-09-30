import { Link } from 'react-router-dom';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './Illustration';
import classes from './NothingFoundBackground.module.css';

export default function NothingFoundBackground() {
    return (
        <div className='container mx-auto max-w-screen-lg px-5 md:px-10'>
            <Container className={classes.root}>
                <div className={classes.inner}>
                    <div className="opacity-5">
                        <Illustration className={classes.image} />
                    </div>
                    <div className={classes.content}>
                        <Title className={classes.title}>Nothing to see here</Title>
                        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                            Page you are trying to open does not exist. You may have mistyped the address, or the
                            page has been moved to another URL. If you think this is an error contact support.
                        </Text>
                        <Link to="/">
                            <Group className="flex justify-center">
                                <Button size="md" className='bg-blue-500'>Take me back to home page</Button>
                            </Group>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    );
}