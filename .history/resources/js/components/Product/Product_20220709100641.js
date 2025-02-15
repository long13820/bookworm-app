import React from 'react'
import './product.css'
import Book1 from '../../../assets/bookcover/book1.jpg';
import Book2 from '../../../assets/bookcover/book2.jpg';
import Book3 from '../../../assets/bookcover/book3.jpg';
import Book4 from '../../../assets/bookcover/book4.jpg';
import Book5 from '../../../assets/bookcover/book5.jpg';
import Book6 from '../../../assets/bookcover/book6.jpg';
import Book7 from '../../../assets/bookcover/book7.jpg';
import Book8 from '../../../assets/bookcover/book8.jpg';
import Book9 from '../../../assets/bookcover/book9.jpg';
import Book10 from '../../../assets/bookcover/book10.jpg';

import defaultBookCover from '../../../assets/bookcover/defaultBookCover.png';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
export default class Product extends React.Component{


    constructor(props){
        super(props);
        this.setMinusQuantity = this.setMinusQuantity.bind(this);
        this.setPlusQuantity = this.setPlusQuantity.bind(this);

        this.addToCart = this.addToCart.bind(this);
        this.state = {
            details: {}
        };
    }

    getDetail() {
        const a = window.location.pathname;
        const id = a.split('/shop/')[1];
        const url = ' http://localhost:8000/api/books/' + id;
        axios.get(url).then((result) => {
          const objectBookCover = {
            book1: Book1,
            book2: Book2,
            book3: Book3,
            book4: Book4,
            book5: Book5,
            book6: Book6,
            book7: Book7,
            book8: Book8,
            book9: Book9,
            book10: Book10
          };
          Object.keys(result.data[0]).forEach((x) => {
            if (x === 'book_cover_photo') {
              if (result.data[0][x] === null) {
                result.data[0][x] = defaultBookCover;
              } else {
                result.data[0][x] = objectBookCover[result.data[0][x]];
              }
            }
            if (x === 'avg_rating') {
              if (result.data[0][x] === null) {
                result.data[0][x] = 0;
              }
            }
            if (x === 'book_price') {
              result.data[0][x] = parseFloat(result.data[0][x]).toFixed(2);
            }

            if (x === 'discount_price') {
              if (result.data[0][x] !== null) {
                result.data[0][x] = parseFloat(result.data[0][x]).toFixed(2);
              }
            }
          });
          result.data[0]['quantity'] = 1;
          this.setState({ details: JSON.parse(JSON.stringify(result.data[0])) });
          console.log(result.data[0])
        });
      }
      setMinusQuantity(){
        if(this.state.details.quantity > 1){
            this.setState((prevState) => ({
                details: {
                    ...prevState.details,
                    quantity: prevState.details.quantity - 1
                }
            }));
        }
    }
    setPlusQuantity() {
        if (this.state.details.quantity < 8) {
          this.setState((prevState) => ({
            details: {
              ...prevState.details,
              quantity: prevState.details.quantity + 1
            }
          }));
        }
      }
    addToCart(){
        const cart = localStorage.getItem('cart');
        const cartObject = JSON.parse(JSON.stringify(this.state.details));
        if(cart !== null){
            let cartArray = [...JSON.parse(cart)];
            cartArray.push(cartObject);
            cartArray = cartArray.reverse();
            localStorage.setItem('cart', JSON.stringify(cartArray));
            toast.dismiss();
            toast.success('Add successfully', {
                position: 'bottom-right';
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined
            });
            this.props.checkCart();
        }
        else{
            let cartArray = [];
            cartArray.push(cartObject);
            cartArray = ca
        }
    }
      componentDidMount() {
        this.getDetail();
      }


    render(){
    return (
    <section className='detail-page flex-grow-1'>
        <ToastContainer />
        <div className='container'>
            <div className='title-section'>
                <p className='title-page font-22px'>{this.state.details.category_name}</p>
            </div>

            <div>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='card card-book'>
                            <div className='row'>
                                 <div className='col-lg-4'>
                                      <img
                                        className='card-img-top'
                                        width="100%"
                                        height="340px"
                                        src={this.state.details.book_cover_photo}
                                        alt='Books'
                                      />
                                      <p className='author text-right mt-3'>By (author) <span>{this.state.details.author_name}</span></p>
                                 </div>
                                 <div className='col-lg-8'>
                                      <div className='book-detail-layout'>
                                          <br/>
                                          <p className='book-title font-22px'>{this.state.details.author_name}</p>
                                          <p>Book description</p>
                                          <p>{this.state.details.book_summary}</p>
                                          <br/>
                                      </div>
                                 </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card card-add-to-card'>
                            <div className='card-header'>
                                <span className={`price-first ${
                                    this.state.details.discount_price !== null ? 'price-first-line mr-3' : 'text-dark h4'
                                }`}>
                                    ${parseFloat(this.state.details.book_price * this.state.details.quantity).toFixed(2)}
                                </span>
                                {this.state.details.discount_price !== null ? (
                                    <span className='price-sale font-22px ms-2'>
                                        ${parseFloat(this.state.details.discount_price * this.state.details.quantity).toFixed(2)}
                                    </span>
                                ) : ('')}
                            </div>
                            <div className='card-body'>
                                <div className='cb-content'>
                                    <p className='label'>Quantity</p>
                                    <div className='quantity'>
                                        <i className={`fas fa-minus ${
                                            this.state.details.quantity === 1 ? 'cursor-not-allowed' : ''
                                        }`}
                                            onClick={this.setMinusQuantity}
                                        />
                                        <span>{this.state.details.quantity}</span>
                                        <i className={`fas fa-plus ${
                                            this.state.details.quantity === 8 ? 'cursor-not-allowed' : ''
                                        }`}
                                            onClick={this.setPlusQuantity}
                                        />
                                    </div>
                                    <br/>
                                    <br/>
                                    <a className='add-btn' onClick={this.addToCart}>Add to cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='card card-review bg-white-smoke'>
                            <div className='card-body'>
                                <p className='book-title'>
                                    <span className='font-22px'>Customer Reviews</span>
                                    <span>(Filtered by 5 star)</span>
                                </p>
                                <br/>
                                <div className='row star-row'>
                                    <div className='col-lg-2'>
                                        <p className='point font-24px'>4.6</p>
                                        <p className='number'>(3,134)</p>
                                    </div>
                                    <div className='col-lg-10'>
                                        <p className='point font-24px'>Star</p>
                                        <ul className='list-start'>
                                            <li>
                                                5 star (200)
                                            </li>
                                            <li>
                                                4 star (100)
                                            </li>
                                            <li>
                                                3 star (20)
                                            </li>
                                            <li>
                                                2 star (5)
                                            </li>
                                            <li>
                                                0 star (0)
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <br/>
                                <div className='row'>
                                    <div className='col-lg-6'>
                                        <p>Showing 1-12 of 3134 reviews</p>
                                    </div>
                                    <div className='col-lg-6 d-flex justify-content-end'>
                                        <div className='dropdown mr-4'>
                                            <button
                                                className='btn btn-secondary dropdown-toggle font-14px'
                                                type='button'
                                                id='dropdownMenuButton'
                                                data-toggle='dropdown'
                                                aria-haspopup='true'
                                                aria-expanded='false'
                                            >
                                                Sort by on sale
                                            </button>
                                            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                                                <a className='dropdown-item' href='#'>Sort by date: newest to oldest</a>
                                                <a className='dropdown-item' href='#'>Sort by date: oldest to newest</a>
                                            </div>
                                        </div>

                                        <div className='dropdown'>
                                            <button
                                                className='btn btn-secondary dropdown-toggle font-14px'
                                                type='button'
                                                id='dropdownShowButton'
                                                data-toggle='dropdown'
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Show 20
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Start 1 component */}
                                <div className='review-content'>
                                    <p className='rc-title font-22px'>Review Title <span> | 5 starts</span></p>
                                    <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
                                        porro error totam,
                                        exercitationem optio blanditiis nostrum quia?</p>
                                    <p className='rc-day font-14px'>Month Date, Year</p>
                                </div>
                                {/* End 1 component */}
                                <div className='review-content'>
                                    <p className='rc-title font-22px'>Amazing Story! You will LOVE it <span> | 5 starts</span></p>
                                    <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
                                        porro error totam,
                                        exercitationem optio blanditiis nostrum quia?</p>
                                    <p className='rc-day font-14px'>April 12, 2021</p>
                                </div>


                                <div className='review-content'>
                                    <p className='rc-title font-22px'>Amazing Story! You will LOVE it <span> | 5 starts</span></p>
                                    <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
                                        porro error totam,
                                        exercitationem optio blanditiis nostrum quia?</p>
                                    <p className='rc-day font-14px'>April 12, 2021</p>
                                </div>


                                <div className='review-content'>
                                    <p className='rc-title font-22px'>Amazing Story! You will LOVE it <span> | 5 starts</span></p>
                                    <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
                                        porro error totam,
                                        exercitationem optio blanditiis nostrum quia?</p>
                                    <p className='rc-day font-14px'>April 12, 2021</p>
                                </div>

                                <div className='row'>
                                    <div className='col-12 d-flex justify-content-center'>
                                        <nav>
                                            <ul className='pagination'>
                                                <li className='page-item'><a className='text-color-black page-link' href='#'>Previous</a></li>
                                                <li className='page-item'><a className='text-color-black page-link' href='#'>1</a></li>
                                                <li className='page-item'><a className='text-color-black page-link' href='#'>2</a></li>
                                                <li className='page-item'><a className='text-color-black page-link' href='#'>3</a></li>
                                                <li className='page-item'><a className='text-color-black page-link' href='#'>Next</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-4'>
                        <div className='card card-write'>
                            <div className='card-header bg-white'>
                                <p className='font-22px'>Write a Review</p>
                            </div>
                            <div className='card-body'>
                                <p>Add a title</p>
                                <input className='form-control'/>
                                <br/>
                                <br/>
                                <p>Details please! Your review helps other shoppers</p>
                                <textarea className='form-control'></textarea>
                                <br/>
                                <br/>
                                <p>Select a rating star</p>
                                <select className='form-control'>
                                    <option>1 Star</option>
                                    <option>2 Star</option>
                                    <option>3 Star</option>
                                    <option>4 Star</option>
                                    <option>5 Star</option>
                                </select>
                            </div>
                            <div className='card-footer bg-white'>
                                <a className='submit-btn'>Submit Review</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
    }
}


