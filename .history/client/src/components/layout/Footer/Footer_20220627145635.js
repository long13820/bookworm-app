import React from 'react'
import logo from '../../../assets/bookcovers/logo.jpeg'
const Footer = () => {
  return (
    <footer className='bg-light px-5 pt-3'>
        <div className='logo'>
            <img src={logo} alt=""/>
        </div>
        <div className='ms-4 pb-3' id="infor">
            <h4 className=''></h4>
        </div>
    </footer>
  )
}

export default Footer

