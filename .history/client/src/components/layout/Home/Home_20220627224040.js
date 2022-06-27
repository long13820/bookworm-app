import React from 'react'
import './home.css'
import 'swiper/css'
import "swiper/css/navigation"
import {Swiper, SwiperSlide} from 'swiper/react';
import { Button } from 'reactstrap'

import {Autoplay, Navigation} from 'swiper'

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
    <section className='home-page flex-grow-1'>
        <div className='container'>
            <div className='row align-items-center mb-4'>
                <div className='col-lg-6'>
                        <p>On Sale</p>
                </div>
                <div className='col-lg-6 d-flex justify-content-end'>
                    <Button variant="secondary" size="sm" to="/shop">
                        View All &nbsp; <i class="fas fa-angle-right"></i>
                    </Button>
                </div>
            </div>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation={true}
                loop={true}
                loopFillGroupWithBlank={true}
                modules={[Autoplay, Navigation]}
                autoplay={{
                    delay:4000,
                    disableOnInteraction:false
                }}
                breakpoints={{
                    "@0.00":{
                        slidesPerView:1,
                        spaceBetween:10
                    },
                    "@0.75":{
                        slidesPerView:2,
                        spaceBetween:20,
                    },
                    "@1.00":{
                        slidesPerView:3,
                        spaceBetween:40,
                    },
                    "@1.50":{
                        slidesPerView:4,
                        spaceBetween:50,
                    },
                }}
                >
                    {
                        arrBook.map(book => {
                            return (
                                <SwiperSlide key={book} className="carousel">
                                    <div className='card h-100'>
                                        <img className='card-img-top img-fluid' src={book} alt="books"/>
                                        <div className='card-body d-flex flex-column'>
                                            <p className='book-title font-18px flex-grow-1'>Book title</p>
                                            <p className='book-author font-14px mt-3'>Author Name</p>
                                        </div>
                                        <div className='card-footer text-muted font-14px'>Price</div>
                                    </div>
                                </SwiperSlide>
                            )})
                    }
            </Swiper>
            <div className='book-list'>
                <div className='text-center'>
                    <p className='section-title font-20px mb-3'>Featured Books</p>
                    <div className='mb-4'>
                        <Button
                            color={this.state.recommended?'secondary' : 'link'}
                            onClick={this.recommendedBookClick}
                        >
                            Recommended
                        </Button>
                        <Button
                            color={this.state.recommended?'secondary' : 'link'}
                            onClick={this.BookClick}
                        >Popular</Button>
                    </div>
                </div>

                <div id="mainRow" className='row'>
                    {
                        arrBook.map(book => {
                            return (
                                <div className='col-lg-3 col-md-4 col-sm-6 col-12 mb-4 align-items-stretch' key={book}>
                                    <div className="card h-100">
                                        <img className='card-img-top img-fluid' src={book} alt="Books"/>
                                        <div className='card-body d-flex flex-column'>
                                            <p className='book-title font-18px flex-grow-1'>Book title</p>
                                            <p className='book-author font-14px mt-3'>Author Name</p>
                                        </div>
                                        <div className='card-footer text-muted font-14px'>Price</div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home
