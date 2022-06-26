import React from 'react'
import './shop.css'
import Book1 from '../../../assets/bookcovers/book1.jpg'
import Book2 from '../../../assets/bookcovers/book2.jpg'
import Book3 from '../../../assets/bookcovers/book3.jpg'
import Book4 from '../../../assets/bookcovers/book4.jpg'
import Book5 from '../../../assets/bookcovers/book5.jpg'
import Book6 from '../../../assets/bookcovers/book6.jpg'
import Book7 from '../../../assets/bookcovers/book7.jpg'
import Book8 from '../../../assets/bookcovers/book8.jpg'
import Book9 from '../../../assets/bookcovers/book9.jpg'
import Book10 from '../../../assets/bookcovers/book10.jpg'

const arrBook = [Book1,Book2,Book3,Book4,Book5,Book6,Book7,Book8,Book9,Book10]

const Shop = () => {
  return (
    <section className='shop-page flex-grow-1'>
        <div className='container'>
            <div className='title-page'>
                <p>Books <span>(Filtered by Category #1)</span></p>
            </div>

            <div className='book-list'>
                <div className='row'>
                    <div className='col-lg-3'>
                        <p className='bl-filter font-14px'>Filter by</p>

                        <div className='bl-main-filter'>
                            {/* Category */}
                            <div className='blmf-card'>
                                <p className='blmfc-title'>Category</p>
                                <ul className='blmfc-list'>
                                    <li>category_name</li>
                                    <li>Category #1</li>
                                    <li>Category #2</li>
                                </ul>
                            </div>

                            {/* Author */}
                            <div className='blmf-card'>
                                <p className='blmfc-title'>Author</p>
                                <ul className='blmfc-list'>
                                    <li>author_name</li>
                                    <li>Author #1</li>
                                    <li>Author #2</li>
                                </ul>
                            </div>

                            {/* Rating */}
                            <div className='blmf-card'>
                                <p className='blmfc-title'>Rating Review</p>
                                <ul className='blmfc-list'>
                                    <li>1 star</li>
                                    <li>2 star</li>
                                    <li>3 star</li>
                                    <li>4 star</li>
                                    <li>5 star</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-9'>
                        <div className='row mb-4'>
                            <div className='col-lg-6'>
                                <p className='bl-showing font-14px'>Showing 1-12 of 126 books</p>
                            </div>
                            <div className='col-lg-6 d-flex justify-content-end'>
                                <div className='dropdown me-4'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Shop
