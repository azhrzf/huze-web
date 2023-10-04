import IdentifyDrop from "./IdentifyDrop"
import { Text, createStyles, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Anchor, Container, Title } from '@mantine/core';
import Cookies from 'universal-cookie';
import { useMemo } from "react";

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

    description: {
        marginTop: theme.spacing.xl,
        fontSize: rem(20),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(15),
        },
    },
}));

const IdentifyLayout = () => {

    const { classes } = useStyles();
    const cookies = useMemo(() => new Cookies(), []);

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
        <section className="container mx-auto max-w-screen-lg px-5 md:px-10">
            <div className="mb-10">
                <h1 className={classes.title}>
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                        Cats, Dogs
                    </Text>{' '}
                    and All Things Pawsitively Amazing!
                </h1>
                <Text className={classes.description} color="dimmed">
                    Accurately and comprehensively identify various breeds of dogs and cats. Additionally, a warm-hearted salute to the exceptionally talented to {' '}
                    <Text fw={700} component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                        <a href="https://github.com/tirtaagungjati" target="_blank" rel="noreferrer">
                            Tirta Agung Jati
                        </a>
                    </Text>
                    , whose brilliance shines through in crafting the exceptional machine learning model. Should you have any inquiries about models and machine learning, please feel free to reach out to him</Text>
            </div>
            <IdentifyDrop />
        </section>
    )
}

export default IdentifyLayout