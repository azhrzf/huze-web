import { useRef } from 'react';
import { Text, Group, createStyles, rem } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        marginBottom: rem(30),
    },

    dropzone: {
        borderWidth: rem(1),
        paddingBottom: rem(50),
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    control: {
        position: 'absolute',
        width: rem(200),
        left: `calc(50% - ${rem(100)})`,
        bottom: rem(-20),
    },
}));

const IdentifyDrop = () => {
    const { classes, theme } = useStyles();
    const openRef = useRef<() => void>(null);

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={() => { }}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.pdf]}
                maxSize={30 * 1024 ** 2}
            >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center">
                        <Dropzone.Accept>
                            <IconDownload
                                size={rem(50)}
                                color={theme.colors[theme.primaryColor][6]}
                                stroke={1.5}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconCloudUpload
                                size={rem(50)}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                stroke={1.5}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text ta="center" fw={700} fz="lg" mt="xl">
                        <Dropzone.Accept>Drop image here</Dropzone.Accept>
                        <Dropzone.Reject>image less than 5mb</Dropzone.Reject>
                        <Dropzone.Idle>Upload image</Dropzone.Idle>
                    </Text>
                    <Text ta="center" fz="sm" mt="xs" c="dimmed">
                        Drag&apos;n&apos;drop image here to upload. We can accept only <i>.jpg, .jpeg, and .png</i> image that
                        are less than 5mb in size.
                    </Text>
                </div>
            </Dropzone>
            <button className={classes.control} onClick={() => openRef.current?.()}>
                <div className="bg-[#3B82F6] hover:bg-[#1C7ED6] rounded-xl py-2">
                    <p className="text-white text-lg font-semibold">Select file</p>
                </div>
            </button>
        </div>
    );
}

export default IdentifyDrop