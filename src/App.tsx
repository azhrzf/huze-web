import { Routes, Route, BrowserRouter } from "react-router-dom";
import LayoutComponent from "./components/LayoutComponent";
import HomeLayout from "./components/Layout/HomeLayout";
import IdentifyLayout from "./components/Layout/IdentifyLayout";
import BlogLayout from "./components/Layout/BlogLayout";
import BlogDetailLayout from "./components/Layout/BlogDetailLayout";
import PetsLayout from "./components/Layout/PetsLayout";
import ProfileLayout from "./components/Layout/ProfileLayout";
import ShopLayout from "./components/Layout/ShopLayout";
import HuzepediaLayout from "./components/Layout/HuzepediaLayout";
import AboutLayout from "./components/Layout/AboutLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<HomeLayout />} />
          <Route path="identify" element={<IdentifyLayout/>}/>
          <Route path="blog" element={<BlogLayout />} />
          <Route path="blog/:blogId" element={<BlogDetailLayout />} />
          <Route path="pets" element={<PetsLayout />} />
          <Route path="profile" element={<ProfileLayout />} />
          <Route path="shop" element={<ShopLayout />} />
          <Route path="huzepedia" element={<HuzepediaLayout />} />
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