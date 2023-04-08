import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import StorePage from './components/Store';
import NavBar from './components/Navbar';
import Header from './components/Header';
import AboutUs from './components/aboutPage';
import HomePage from './components/Homapage';
import ContactUs from './components/contactUS/ContactUs';
import ProductPage from './components/ProductPage';






function App() {
  
  return(
    <div>
      <NavBar />
      <Header />
      {/* <StorePage /> */}
      <BrowserRouter>
      <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/store/:productId" element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App