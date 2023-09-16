import { Text, createStyles, rem } from '@mantine/core';

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

const IntroNav = ({ text }: { text: string }) => {

    const { classes } = useStyles();

    return (
        <div className="mb-10">
            <h1 className={classes.title}>
                <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                    Cats, Dogs
                </Text>{' '}
                and All Things Pawsitively Amazing!
            </h1>
            <Text className={classes.description} color="dimmed">{text}</Text>
        </div>
    )
}

export default IntroNav