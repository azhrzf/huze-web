import axios from 'axios';
import { useState, useEffect } from 'react';
import { Accordion, Text, createStyles, rem } from '@mantine/core';

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
        textAlign: 'justify',
        fontSize: rem(20),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(15),
        },
    },
}));

const expandDesc = [
    {
        title: "About Us",
        description: "Welcome to Huze, the haven for pet enthusiasts worldwide. At Huze, we believe that every pet is a cherished member of your family, deserving of the best care possible. Founded in 2023, Huze is dedicated to providing up-to-date resources and information to help you understand and care for your pets with love and dedication.",
    },
    {
        title: "Mission",
        description: "Our mission at Huze is to offer reliable knowledge and practical advice on pet care. We believe that by understanding the unique needs of each species and individual, you can provide a happy and healthy life for your beloved pets."
    },
    {
        title: "Team",
        description: "We take pride in having a team of experts committed to providing reliable and useful information for you. Each member of our team is a specialist in their field and shares a passion for ensuring pets receive the best care."
    },
]

interface GithubUser {
    login: string;
    avatar_url: string;
    name: string;
}

async function getGithubUsersInfo(usernames: string[]): Promise<GithubUser[]> {
    const promises = usernames.map(username => axios.get(`https://api.github.com/users/${username}`));
    const responses = await Promise.all(promises);
    const users = responses.map(response => response.data);
    return users;
}

const AboutSection = () => {

    const { classes } = useStyles();

    const [activeMembers, setActiveMembers] = useState<GithubUser[]>([]);
    const [formerMembers, setFormerMembers] = useState<GithubUser[]>([]);

    useEffect(() => {
        getGithubUsersInfo(["azhrzf"]).then(members => {
            setActiveMembers(members);
        });
        getGithubUsersInfo(["tirtaagungjati", "abitbored", "firmen1", "fikrisoftwaredeveloper", "MR9910"]).then(members => {
            setFormerMembers(members);
        });
    }, []);

    const gerAllMembers = () => {
        return (
            <Accordion variant="separated" className='mt-5'>
                <Accordion.Item value="active-members">
                    <Accordion.Control>Active Members</Accordion.Control>
                    <Accordion.Panel>
                        <section>
                            {activeMembers.map(member => {
                                return (
                                    <div className="flex flex-row items-center">
                                        <img src={member.avatar_url} alt={member.login} className="w-10 h-10 rounded-full mr-3" />
                                        <a href={`https://github.com/${member.login}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                            <Text>{member.name}</Text>
                                            <Text size="xs">@{member.login}</Text>
                                        </a>
                                    </div>
                                )
                            })}
                        </section>
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="former-members">
                    <Accordion.Control>Former Members</Accordion.Control>
                    <Accordion.Panel>
                        <section>
                            {formerMembers.map(member => {
                                return (
                                    <div className="flex flex-row items-center mb-5">
                                        <img src={member.avatar_url} alt={member.login} className="w-10 h-10 rounded-full mr-3" />
                                        <a href={`https://github.com/${member.login}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                                            <Text>{member.name}</Text>
                                            <Text size="xs">@{member.login}</Text>
                                        </a>
                                    </div>
                                )
                            })}
                        </section>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        )
    }

    return (
        <section>
            {expandDesc.map(desc => {
                return (
                    <div className="mb-10">
                        <h1 className={classes.title}>
                            <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                                {desc.title}
                            </Text>{' '}
                        </h1>
                        <Text className={classes.description} color="dimmed">{desc.description}</Text>
                        {desc.title === "Team" ? gerAllMembers() : ""}
                    </div>
                )
            })}

        </section>
    );
}

export default AboutSection