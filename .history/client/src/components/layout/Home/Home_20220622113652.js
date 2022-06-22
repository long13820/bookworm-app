import React from 'react'
import './home.css'
import 'swiper/css'
import "swiper/css/navigation"
import { Button } from 'reactstrap'
const Home = () => {
  return (
    <section className='home-page'>
        <div className='container'>
            <div className='row align-items-center mb-4'>
                <div className='col-lg-6'>
                        <p>On Sale</p>
                </div>
                <div className='col-lg-6 d-flex justify-content-end'>
                    <Button variant="secondary" size="sm">
                        View All &nbsp; <i class="fas fa-angle-right"></i> 
                    </Button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
