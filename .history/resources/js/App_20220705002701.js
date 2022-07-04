import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useRef } from 'react';
// import About from './components/About/About';
// import Cart from './components/Cart/Cart';
// import Home from './components/Home/Home';
// import Product from './components/Product/Product';
// import Shop from './components/Shop/Shop';
// import Title from './components/Title/Title';

import { config } from '@fortawesome/fontawesome-svg-core';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

config.autoAddCss  = false;

const pathname = window.location.pathname;
const objectPath = {
  '/': 'Homepage',
  '/shop': 'Books',
  '/about': 'About us',
  '/cart': 'Cart'
};


function App() {
  const headerRef = useRef();
  return (
    <React.Fragment>
      <div className='d-flex flex-column m-height-100'>
        <Header ref={headerRef}/>

        {/* <Title title="About"/> */ }
        {pathname === '/about' ? <Title title={objectPath[pathname]}/> : ''}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/shop/1' element={<Product/>} />
          <Route path='/about' element={<About/>} />
        </Routes>

        <Footer/>

      </div>
    </React.Fragment>
  );
}

export default App;

