import React from 'react'
import logo from '../../../assets/bookcovers/logo.jpeg'
const Footer = () => {
  return (
    <footer className='bg-light px-5 pt-3'>
        <div className='logo'>
            <img src={logo} alt=""/>
        </div>
        <div className='ms-4 pb-3' id="infor">
            <h4 className='my-0'>BOOKWORM</h4>
            <p> return Book::join('discount', 'discount.book_id', '=', 'book.id' )
            -> join('author', 'author.id', '=', 'book.author_id')
            ->selectRaw('book.id,
            book.book_title,
            book.book_price,
            book.book_cover_photo,
            author.author_name,
            discount.discount_price,
            book.book_price - discount.discount_price as sub_price')
            ->orderBy('sub_price', 'desc')
            ->limit(10)
            ->get();</p>
        </div>
    </footer>
  )
}

export default Footer

