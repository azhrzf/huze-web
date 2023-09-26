import huzelogo from "../../assets/images/logos/huzelogo.png"
import { NavLink, Link } from "react-router-dom"
import {
    createStyles,
    Header,
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconUserCircle,
    IconPaw,
    IconBasket,
    IconScan,
    IconChevronDown,
    IconAddressBook
} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({

    activeLink: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
    },

    link: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,

        [theme.fn.smallerThan('sm')]: {
            height: rem(42),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        }),
    },

    subLink: {
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,

        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        }),

        '&:active': theme.activeStyles,
    },

    dropdownFooter: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        margin: `calc(${theme.spacing.md} * -1)`,
        marginTop: theme.spacing.sm,
        padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
        paddingBottom: theme.spacing.xl,
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
            }`,
    },

    hiddenMobile: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    hiddenDesktop: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));

const mockdata = [
    {
        icon: IconUserCircle,
        title: 'Profile',
        description: 'This Pokémon’s cry is very loud and distracting',
    },
    {
        icon: IconScan,
        title: 'Identify',
        description: 'The fluid of Smeargle’s tail secretions changes',
    },
    {
        icon: IconPaw,
        title: 'Pets',
        description: 'Yanma is capable of seeing 360 degrees without',
    },
    {
        icon: IconBasket,
        title: 'Shop',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
    {
        icon: IconAddressBook,
        title: 'HuzePedia',
        description: 'The shell’s rounded shape and the grooves on its.',
    },
];

export default function HeaderNav() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const { classes, theme } = useStyles();

    const links = mockdata.map((item) => (
        <Link to={item.title.toLowerCase()} key={item.title} className="px-5 md:px-0">
            <UnstyledButton className={classes.subLink}>
                <Group noWrap align="flex-start">
                    <ThemeIcon size={34} variant="default" radius="md">
                        <item.icon size={rem(22)} color={theme.fn.primaryColor()} />
                    </ThemeIcon>
                    <div>
                        <Text size="sm" fw={500}>
                            {item.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                            {item.description}
                        </Text>
                    </div>
                </Group>
            </UnstyledButton>
        </Link>
    ));

    return (
        <Box pb={120}>
            <Header height={60} px="md">
                <Group className="px-5 lg:px-10 lg:container mx-auto xl:max-w-5xl" position="apart" sx={{ height: '100%' }}>
                    <Link to="/">
                        <img src={huzelogo} alt="logo" className="w-20" />
                    </Link>
                    <Group sx={{ height: '100%' }} spacing={0} className={classes.hiddenMobile}>
                        <NavLink to="." className={({ isActive }: { isActive: boolean }) => isActive ? classes.activeLink : classes.link}>Home</NavLink>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Features
                                        </Box>
                                        <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown sx={{ overflow: 'hidden' }}>
                                <Group position="apart" px="md">
                                    <Text fw={500}>Features</Text>
                                </Group>

                                <Divider
                                    my="sm"
                                    mx="-md"
                                    color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
                                />

                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <NavLink to="blogs" className={({ isActive }: { isActive: boolean }) => isActive ? classes.activeLink : classes.link}>Blog</NavLink>
                        <NavLink to="about" className={({ isActive }: { isActive: boolean }) => isActive ? classes.activeLink : classes.link}>About</NavLink>
                    </Group>

                    <Group className={classes.hiddenMobile}>
                        <Button variant="default">Log in</Button>
                        <div className="bg-blue-500 rounded-sm">
                            <Button>Sign up</Button>
                        </div>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
                </Group>
            </Header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title={<img src={huzelogo} alt="logo" className="w-20 mx-5" />}
                className={classes.hiddenDesktop}
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
                    <section className="px-5">
                        <NavLink to="." className={({ isActive }: { isActive: boolean }) => isActive ? classes.activeLink : classes.link}>Home</NavLink>
                        <UnstyledButton className={classes.link} onClick={toggleLinks}>
                            <Center inline>
                                <Box component="span" mr={5}>
                                    Features
                                </Box>
                                <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                            </Center>
                        </UnstyledButton>
                        <NavLink to="blogs" className={({ isActive }: { isActive: boolean }) => isActive ? classes.activeLink : classes.link}>Blog</NavLink>
                        <NavLink to="about" className={({ isActive }: { isActive: boolean }) => isActive ? classes.activeLink : classes.link}>About</NavLink>
                    </section>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />
                    <Group position="center" grow pb="xl" px="md" className="px-5">
                        <Button variant="default">Log in</Button>
                        <div className="bg-blue-500 rounded-sm flex align-middle justify-center hover:bg-[#1C7ED6]">
                            <Button>Sign up</Button>
                        </div>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box >
    );
}