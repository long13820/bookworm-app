import React from "react";
import Header from "./components/layout/Header/Header";
import Home from "./components/layout/Home/Home";
import Title from "./components/layout/Page-Title/PageTitle"

import {Routes, Route}from 'react-router-dom'
import Shop from "./components/layout/Shop/Shop";
import About from "./components/layout/About/About";
import Cart from "./components/layout/Cart/Cart";
import Product from "./components/layout/Product/Product";
function App() {
  return (
    <div className="d-flex flex-column m-height-100">
        <Header/>

        <Title title="About"/>

        {/* Config Routes pages */}

        <Routes>
            <Route path="/" element={<Home/>} />
            < path="/shop" element={<Shop/>}></>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/shop/1" element={<Product/>}></Route>
            <Route path="/about" element={<About/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
