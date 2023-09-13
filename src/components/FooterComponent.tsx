import FooterNav from "./Footer/FooterNav";

const FooterComponent = () => {

    return (
        <footer>
            <FooterNav data={[
                {
                    title: 'Layanan',
                    links: [
                        { label: 'Identifier', link: '#' },
                        { label: 'Profile', link: '#' },
                        { label: 'Pets', link: '#' },
                    ],
                },
                {
                    title: 'Komunitas',
                    links: [
                        { label: 'Mobile', link: 'https://github.com/C23-PS404-Huze-Bangkit/mobile-development' },
                        { label: 'Machine Learning', link: 'https://github.com/C23-PS404-Huze-Bangkit/machine-learning' },
                        { label: 'Cloud', link: 'https://github.com/C23-PS404-Huze-Bangkit/cloud-computing' },
                    ],
                },
                {
                    title: 'Tim',
                    links: [
                        { label: 'About', link: '#' },
                        { label: 'Blog', link: '#' },
                        { label: 'Contact', link: '#' },
                    ],
                },
            ]} />
        </footer>
    );
}

export default FooterComponent