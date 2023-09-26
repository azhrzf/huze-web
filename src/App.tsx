import { Routes, Route, BrowserRouter } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import HomeLayout from "./pages/Home";
import IdentifyLayout from "./pages/Identify";
import BlogLayout from "./pages/Blog";
import BlogDetailLayout from "./pages/BlogDetail";
import PetsLayout from "./pages/Pets";
import ProfileLayout from "./pages/Profile";
import ShopLayout from "./pages/Shop";
import HuzepediaLayout from "./pages/Huzepedia";
import HzuepediaDetailCatsLayout from "./pages/HuzepediaDetail/HuzepediaDetailCats";
import HzuepediaDetailDogsLayout from "./pages/HuzepediaDetail/HuzepediaDetailDogs";
import AboutLayout from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomeLayout />} />
          <Route path="identify" element={<IdentifyLayout />} />
          <Route path="blogs" element={<BlogLayout />} />
          <Route path="blogs/:blogId" element={<BlogDetailLayout />} />
          <Route path="pets" element={<PetsLayout />} />
          <Route path="profile" element={<ProfileLayout />} />
          <Route path="shop" element={<ShopLayout />} />
          <Route path="huzepedia" element={<HuzepediaLayout />} />
          <Route path="huzepedia/cats/:catId" element={<HzuepediaDetailCatsLayout />} />
          <Route path="huzepedia/dogs/:dogId" element={<HzuepediaDetailDogsLayout />} />
          <Route path="about" element={<AboutLayout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

{/* <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/vans/:id" element={<VanDetail />} />
        <Route path="/host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} />
          <Route path="vans/:id" element={<HostVanDetail />}>
            <Route index element={<HostVanInfo/>}/>
            <Route path='pricing' element={<HostVanPricing />} />
            <Route path='photos' element={<HostVanPhotos />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  </BrowserRouter> */}