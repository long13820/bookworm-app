import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useRef } from 'react';


// import Title from './components/Title/Title';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import Product from './components/Product/Product';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

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
        {/* {pathname === '/about' ? <Title title={objectPath[pathname]}/> : ''} */}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/shop/:id' element={<Product/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Register/>}/>
        </Routes>

        <Footer/>

      </div>
    </React.Fragment>
  );
}

export default App;

