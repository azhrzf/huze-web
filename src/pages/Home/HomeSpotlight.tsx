import { Link } from "react-router-dom"
import drawermg from "../../assets/images/drawers/pria_dengan_anjing_dan_kucing.png"
import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import image from './image.svg';

const useStyles = createStyles((theme) => ({
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: `calc(${theme.spacing.xl} * 0.3)`,
        paddingBottom: `calc(${theme.spacing.xl} * 1)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    image: {
        flex: 1,

        [theme.fn.smallerThan('md')]: {
            display: 'none',
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: `${rem(4)} ${rem(12)}`,
    },
}));

const HomeSpotlight = () => {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Identify<span className={classes.highlight}>Dog and Cat</span>Breeds.
                        </Title>
                        <Text color="dimmed" mt="md">
                            A site that can help users learn more about their pets and how to care for them.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <IconCheck size={rem(12)} stroke={1.5} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>High accuracy</b> – the models we use are designed by certified machine learning engineers.
                            </List.Item>
                            <List.Item>
                                <b>Free</b> – the Huze site can be accessed free of charge for identification within the specified time period.
                            </List.Item>
                            <List.Item>
                                <b>Personalization</b> – users can customize their pet's profile to get more accurate recommendations.
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Link to="identify">
                                <div className="bg-blue-500 rounded-full">
                                    <Button radius="xl" size="sm" className={classes.control}>
                                        <span className="text-xs md:text-sm">Start Identifying</span>
                                    </Button>
                                </div>
                            </Link>
                            <Link to="huzepedia">
                                <Button variant="default" radius="xl" size="sm" className={classes.control}>
                                    <span className="text-xs md:text-sm">Explore Huzepedia</span>
                                </Button>
                            </Link>
                        </Group>
                    </div>
                    <Image src={drawermg} className={classes.image} />
                </div>
            </Container>
        </div>
    );
}

export default HomeSpotlight;