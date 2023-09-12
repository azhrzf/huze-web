import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import HomeSpotlight from "./components/Home/HomeSpotlight";
import HomeBlog from "./components/Home/HomeBlog";

const App = () => {
  return (
    <div>
      <HeaderComponent />
      <HomeSpotlight />
      <HomeBlog
        image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920&fit=max"
        link="https://unsplash.com/photos/9uq2OQbT0Vw"
        title="Why I write CSS in JavaScript"
        description="Writing CSS in JavaScript is a highly divisive topic with a lot of passion on both sides. Some people live by it, while others would rather it disappear."
        rating="4.9"
        author={{ name: 'Oleg Frolov', image: 'https://images.unsplash.com/photo-1534796636915-0f9f0f0cadc3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=80&fit=max' }}
      />
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