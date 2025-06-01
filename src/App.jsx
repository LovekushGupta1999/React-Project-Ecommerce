import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Products from "./components/Products/Products";
import AOS from "aos";
import "aos/dist/aos.css";
import TopProducts from "./components/TopProducts/TopProducts";
import Banner from "./components/Banner/Banner";
import Subscribe from "./components/Subscribe/Subscribe";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Popup from "./components/Popup/Popup";
import RegistrationForm from "./components/User/RegistrationForm";
import LoginForm from "./components/User/LogInForm";
import AllProducts from "./components/AllProducts/AllProducts";
import ProductDetail from "./components/AllProducts/productdetail";
import CartPage from "./components/AllProducts/Cartpage"
import WishlistPage from "./components/AllProducts/WishlistPage";

const App = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
  
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
        <Navbar handleOrderPopup={handleOrderPopup} />

        <Routes>
          <Route path="/" element={
            <>
              <Hero handleOrderPopup={handleOrderPopup} />
              <Products />
              <TopProducts handleOrderPopup={handleOrderPopup} />
              <Banner />
              <Subscribe />
              <Testimonials />
            </>
          } />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetail />} />
           <Route path="/cart" element={<CartPage  />} />
           <Route path="/wishlist" element={<WishlistPage />} />

   
        </Routes>

        <Footer />
        <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
      </div>
   
  );
};

export default App;
