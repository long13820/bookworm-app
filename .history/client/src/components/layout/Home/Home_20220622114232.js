import React from 'react'
import './home.css'
import 'swiper/css'
import "swiper/css/navigation"
import {Swiper, SwiperSlide} from 'swiper/react';
import { Button } from 'reactstrap'

import Book1 from '.';
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
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>Slide 1</SwiperSlide>
                    <SwiperSlide>Slide 2</SwiperSlide>
                    <SwiperSlide>Slide 3</SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
        </div>
    </section>
  )
}

export default Home
