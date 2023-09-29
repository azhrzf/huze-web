import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createContext, useState } from "react";

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
import Login from "./pages/Logreg/Login";
import Register from "./pages/Logreg/Register";

interface GlobalContextType {
  refresh: boolean;
  updateContext: (refresh: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  refresh: false,
  updateContext: () => { },
});

const App = () => {

  const [contextValues, setContextValues] = useState<GlobalContextType>({
    refresh: false,
    updateContext: (refresh: boolean) => {
      setContextValues({ ...contextValues, refresh });
    },
  });

  return (
    <GlobalContext.Provider value={contextValues}>
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
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App
export { GlobalContext }

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