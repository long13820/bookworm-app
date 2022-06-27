import React from 'react'
import logo from '../../../assets/bookcovers/logo.jpeg'
import './footer.css'
const Footer = () => {
  return (
    <footer className='bg-light px-5 pt-3'>
        <div className='logo'>
            <img src={logo} alt=""/>
        </div>
        <div className='ms-4 pb-3' id="infor">
            <h4 className='my-0'>BOOKWORM</h4>
            <p>Address: Nguyen Tu Nghiem Street, 2 Ward, Ho Chi Minh City</p>
            <p>Phone: 0969004098</p>
        </div>
    </footer>
  )
}

export default Footer

