import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import HomeComponent from "./components/Home";

const App = () => {
  return (
    <div>
      <HeaderComponent />
      <HomeComponent />
      <FooterComponent data={[
        {
          title: 'Product',
          links: [
            { label: 'Features', link: '#' },
            { label: 'Pricing', link: '#' },
            { label: 'Security', link: '#' },
            { label: 'Changelog', link: '#' },
          ],
        },
        {
          title: 'Community',
          links: [
            { label: 'Discord', link: '#' },
            { label: 'Twitter', link: '#' },
            { label: 'YouTube', link: '#' },
            { label: 'GitHub', link: '#' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', link: '#' },
            { label: 'Blog', link: '#' },
            { label: 'Contact', link: '#' },
            { label: 'Privacy Policy', link: '#' },
            { label: 'Terms & Conditions', link: '#' },
          ],
        },
      ]} />

    </div>
  )
}

export default App