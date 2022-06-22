import React from 'react'
import './home.css'
import 'swiper/css'
import "swiper/css/navigation"
import {Swiper, SwiperSlide} from 'swiper/react';
import { Button } from 'reactstrap'

import Book1 from '../../../assets/bookcovers/book1.jpg';
import Book2 from '../../../assets/bookcovers/book2.jpg';
import Book3 from '../../../assets/bookcovers/book3.jpg';
import Book4 from '../../../assets/bookcovers/book4.jpg';
import Book5 from '../../../assets/bookcovers/book5.jpg';
import Book6 from '../../../assets/bookcovers/book6.jpg';
import Book7 from '../../../assets/bookcovers/book7.jpg';
import Book8 from '../../../assets/bookcovers/book8.jpg';
import Book9 from '../../../assets/bookcovers/book9.jpg';
import Book10 from '../../../assets/bookcovers/book10.jpg';

const arrBook = [Book1, Book2, Book3, Book4, Book5, Book6, Book7, Book8, Book9, Book10];

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
                    {
                        arrBook.map(book => {
                            return (
                                <SwiperSlide key={book} className="carousel">
                                    <div className='card'>
                                        <img cl/>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
            </Swiper>
        </div>
    </section>
  )
}

export default Home
