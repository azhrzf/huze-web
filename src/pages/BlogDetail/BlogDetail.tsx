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

interface Blog {
    id: string;
    thumbnail: string;
    title: string;
    article: string;
    writer: string;
    tag: string;
}

const splitSentence = (sentence: string) => {
    const totalWord = sentence.split(' ').length
    const halfWord = Math.floor(totalWord / 2)

    return { fitst: sentence.split(' ').slice(0, halfWord).join(' '), last: sentence.split(' ').slice(halfWord, sentence.length).join(' ') }
}

const BlogDetail = ({ data }: { data: Blog }) => {
    const { classes } = useStyles();

    return (
        <article className="container mx-auto max-w-screen-lg px-5 md:px-10">
            <div className="mb-10">
                <img src={data.thumbnail} alt={data.title} className="w-full rounded-lg mb-10" />
                <h1 className={classes.title}>
                    <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                        {splitSentence(data.title).fitst}
                    </Text>{' '}
                    {splitSentence(data.title).last}
                </h1>
            </div>
            <Text className={classes.description} color="dimmed">
                {data.article.split('\\n\\n').map(article => {
                    return <p className='mb-5 text-xl'>{article.split('\\n').map(innerArticle => {
                        return <p className='mb-5'>{innerArticle}</p>
                    })}</p>
                })}
            </Text>
        </article>
    )
}

export default BlogDetail