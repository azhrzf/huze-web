import {
    createStyles,
    // Image,
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
        paddingTop: `calc(${theme.spacing.xl} * 4)`,
        paddingBottom: `calc(${theme.spacing.xl} * 4)`,
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
                            Identifikasi <span className={classes.highlight}>Ras</span> Anjing dan Kucing.
                        </Title>
                        <Text color="dimmed" mt="md">
                            Situs yang dapat membantu pengguna untuk mengenal lebih jauh mengenai hewan peliharaannya beserta bagaimana cara merawatnya.
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
                                <b>Akurasi tinggi</b> – model yang kami gunakan dirancang oleh machine learning engginer bersertifikasi.
                            </List.Item>
                            <List.Item>
                                <b>Gratis</b> – situs Huze dapat diakses secara gratis untuk identifikasi dalam kurun waktu yang ditentukan.
                            </List.Item>
                            <List.Item>
                                <b>Personalisasi</b> – pengguna dapat mengatur profil hewan peliharaannya untuk mendapatkan rekomendasi yang lebih akurat.
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button radius="xl" size="md" className={classes.control}>
                                Baca blog
                            </Button>
                            <Button variant="default" radius="xl" size="md" className={classes.control}>
                                Mulai identifikasi
                            </Button>
                        </Group>
                    </div>
                    {/* <Image src={image} className={classes.image} /> */}
                </div>
            </Container>
        </div>
    );
}

export default HomeSpotlight;