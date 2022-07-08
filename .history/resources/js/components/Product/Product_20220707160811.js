// import React from 'react'
// import './product.css'
// import Book1 from '../../../assets/bookcover/book1.jpg';
// import Book2 from '../../../assets/bookcover/book2.jpg';
// import Book3 from '../../../assets/bookcover/book3.jpg';
// import Book4 from '../../../assets/bookcover/book4.jpg';
// import Book5 from '../../../assets/bookcover/book5.jpg';
// import Book6 from '../../../assets/bookcover/book6.jpg';
// import Book7 from '../../../assets/bookcover/book7.jpg';
// import Book8 from '../../../assets/bookcover/book8.jpg';
// import Book9 from '../../../assets/bookcover/book9.jpg';
// import Book10 from '../../../assets/bookcover/book10.jpg';

// import defaultBookCover from '../../../assets/bookcover/defaultBookCover.png';
// import { ToastContainer } from 'react-toastify';
// import axios from 'axios';
// export default class Product extends React.Component{


//     constructor(props){
//         super(props);

//         this.state = {
//             details: {}
//         };
//     }

//     getDetail() {
//         const a = window.location.pathname;
//         const id = a.split('/shop/')[1];
//         const url = ' http://localhost:8000/api/books/' + id;
//         axios.get(url).then((result) => {
//           const objectBookCover = {
//             book1: Book1,
//             book2: Book2,
//             book3: Book3,
//             book4: Book4,
//             book5: Book5,
//             book6: Book6,
//             book7: Book7,
//             book8: Book8,
//             book9: Book9,
//             book10: Book10
//           };
//           Object.keys(result.data[0]).forEach((x) => {
//             if (x === 'book_cover_photo') {
//               if (result.data[0][x] === null) {
//                 result.data[0][x] = defaultBookCover;
//               } else {
//                 result.data[0][x] = objectBookCover[result.data[0][x]];
//               }
//             }
//             if (x === 'avg_rating') {
//               if (result.data[0][x] === null) {
//                 result.data[0][x] = 0;
//               }
//             }
//             if (x === 'book_price') {
//               result.data[0][x] = parseFloat(result.data[0][x]).toFixed(2);
//             }

//             if (x === 'discount_price') {
//               if (result.data[0][x] !== null) {
//                 result.data[0][x] = parseFloat(result.data[0][x]).toFixed(2);
//               }
//             }
//           });
//           result.data[0]['quantity'] = 1;
//           this.setState({ details: JSON.parse(JSON.stringify(result.data[0])) });
//         });
//       }



//     render(){
//     return (
//     <section className='detail-page flex-grow-1'>
//         <ToastContainer />
//         <div className='container'>
//             <div className='title-section'>
//                 <p className='title-page font-22px'>Category: {this.state.details.category_name}</p>
//             </div>

//             <div>
//                 <div className='row'>
//                     <div className='col-lg-8'>
//                         <div className='card card-book'>
//                             <div className='row'>
//                                  <div className='col-lg-4'>
//                                       <img
//                                         className='card-img-top'
//                                         width="100%"
//                                         height="340px"

//                                         alt='Books'
//                                       />
//                                       <p className='author text-right mt-3'>By (author) <span>Anna Banks</span></p>
//                                  </div>
//                                  <div className='col-lg-8'>
//                                       <div className='book-detail-layout'>
//                                           <br/>
//                                           <p className='book-title font-22px'></p>
//                                           <p>Book description</p>
//                                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eligendi inventore impedit
//                                             repellendus mollitia totam expedita a nam. Doloremque at eveniet obcaecati expedita. Soluta
//                                             officia
//                                             esse ipsa tempore, aliquid voluptatum?</p>
//                                           <br />
//                                           <p>"The multi-million copy bestseller"</p>
//                                           <p>Soon to be a major fim</p>
//                                           <p>A Number One New York Times Bestseller</p>
//                                           <br />
//                                           <p>'Painfully beautiful New York Times'</p>
//                                           <p>'Unforgettable...as engrossing as it is moving' Daily Mail</p>
//                                           <p>'A rare achievement' The Times</p>
//                                           <p>'I can't even express how much I love this book!' Reese Witherspoon</p>
//                                           <br />
//                                       </div>
//                                  </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className='col-lg-4'>
//                         <div className='card card-add-to-card'>
//                             <div className='card-header'>
//                                 <span className='price-first'>$49.99</span>
//                                 <span className='price-sale font-22px'>$29.99</span>
//                             </div>
//                             <div className='card-body'>
//                                 <div className='cb-content'>
//                                     <p className='label'>Quantity</p>
//                                     <div className='quantity'>
//                                         <i className='fas fa-minus'></i>
//                                         <span>1</span>
//                                         <i className='fas fa-plus'></i>
//                                     </div>
//                                     <br/>
//                                     <br/>
//                                     <a className='add-btn'>Add to cart</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <br/>
//                 <div className='row'>
//                     <div className='col-lg-8'>
//                         <div className='card card-review bg-white-smoke'>
//                             <div className='card-body'>
//                                 <p className='book-title'>
//                                     <span className='font-22px'>Customer Reviews</span>
//                                     <span>(Filtered by 5 star)</span>
//                                 </p>
//                                 <br/>
//                                 <div className='row star-row'>
//                                     <div className='col-lg-2'>
//                                         <p className='point font-24px'>4.6</p>
//                                         <p className='number'>(3,134)</p>
//                                     </div>
//                                     <div className='col-lg-10'>
//                                         <p className='point font-24px'>Star</p>
//                                         <ul className='list-start'>
//                                             <li>
//                                                 5 star (200)
//                                             </li>
//                                             <li>
//                                                 4 star (100)
//                                             </li>
//                                             <li>
//                                                 3 star (20)
//                                             </li>
//                                             <li>
//                                                 2 star (5)
//                                             </li>
//                                             <li>
//                                                 0 star (0)
//                                             </li>
//                                         </ul>
//                                     </div>
//                                 </div>
//                                 <br/>
//                                 <div className='row'>
//                                     <div className='col-lg-6'>
//                                         <p>Showing 1-12 of 3134 reviews</p>
//                                     </div>
//                                     <div className='col-lg-6 d-flex justify-content-end'>
//                                         <div className='dropdown mr-4'>
//                                             <button
//                                                 className='btn btn-secondary dropdown-toggle font-14px'
//                                                 type='button'
//                                                 id='dropdownMenuButton'
//                                                 data-toggle='dropdown'
//                                                 aria-haspopup='true'
//                                                 aria-expanded='false'
//                                             >
//                                                 Sort by on sale
//                                             </button>
//                                             <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
//                                                 <a className='dropdown-item' href='#'>Sort by date: newest to oldest</a>
//                                                 <a className='dropdown-item' href='#'>Sort by date: oldest to newest</a>
//                                             </div>
//                                         </div>

//                                         <div className='dropdown'>
//                                             <button
//                                                 className='btn btn-secondary dropdown-toggle font-14px'
//                                                 type='button'
//                                                 id='dropdownShowButton'
//                                                 data-toggle='dropdown'
//                                                 aria-haspopup="true"
//                                                 aria-expanded="false"
//                                             >
//                                                 Show 20
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Start 1 component */}
//                                 <div className='review-content'>
//                                     <p className='rc-title font-22px'>Review Title <span> | 5 starts</span></p>
//                                     <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
//                                         porro error totam,
//                                         exercitationem optio blanditiis nostrum quia?</p>
//                                     <p className='rc-day font-14px'>Month Date, Year</p>
//                                 </div>
//                                 {/* End 1 component */}
//                                 <div className='review-content'>
//                                     <p className='rc-title font-22px'>Amazing Story! You will LOVE it <span> | 5 starts</span></p>
//                                     <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
//                                         porro error totam,
//                                         exercitationem optio blanditiis nostrum quia?</p>
//                                     <p className='rc-day font-14px'>April 12, 2021</p>
//                                 </div>


//                                 <div className='review-content'>
//                                     <p className='rc-title font-22px'>Amazing Story! You will LOVE it <span> | 5 starts</span></p>
//                                     <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
//                                         porro error totam,
//                                         exercitationem optio blanditiis nostrum quia?</p>
//                                     <p className='rc-day font-14px'>April 12, 2021</p>
//                                 </div>


//                                 <div className='review-content'>
//                                     <p className='rc-title font-22px'>Amazing Story! You will LOVE it <span> | 5 starts</span></p>
//                                     <p className='rc-content'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis numquam
//                                         porro error totam,
//                                         exercitationem optio blanditiis nostrum quia?</p>
//                                     <p className='rc-day font-14px'>April 12, 2021</p>
//                                 </div>

//                                 <div className='row'>
//                                     <div className='col-12 d-flex justify-content-center'>
//                                         <nav>
//                                             <ul className='pagination'>
//                                                 <li className='page-item'><a className='text-color-black page-link' href='#'>Previous</a></li>
//                                                 <li className='page-item'><a className='text-color-black page-link' href='#'>1</a></li>
//                                                 <li className='page-item'><a className='text-color-black page-link' href='#'>2</a></li>
//                                                 <li className='page-item'><a className='text-color-black page-link' href='#'>3</a></li>
//                                                 <li className='page-item'><a className='text-color-black page-link' href='#'>Next</a></li>
//                                             </ul>
//                                         </nav>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className='col-lg-4'>
//                         <div className='card card-write'>
//                             <div className='card-header bg-white'>
//                                 <p className='font-22px'>Write a Review</p>
//                             </div>
//                             <div className='card-body'>
//                                 <p>Add a title</p>
//                                 <input className='form-control'/>
//                                 <br/>
//                                 <br/>
//                                 <p>Details please! Your review helps other shoppers</p>
//                                 <textarea className='form-control'></textarea>
//                                 <br/>
//                                 <br/>
//                                 <p>Select a rating star</p>
//                                 <select className='form-control'>
//                                     <option>1 Star</option>
//                                     <option>2 Star</option>
//                                     <option>3 Star</option>
//                                     <option>4 Star</option>
//                                     <option>5 Star</option>
//                                 </select>
//                             </div>
//                             <div className='card-footer bg-white'>
//                                 <a className='submit-btn'>Submit Review</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//   )
//     }
// }


import { React, useState, useEffect } from "react";
import {
    Card,
    Container,
    Row,
    Button,
    Col,
    Dropdown,
    DropdownButton,
    Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "Axios";
import "./product.css";
function Product() {
    let { id } = useParams();

    const [book, setBook] = useState([]);
    const [bookReview,setBookReview] = useState({
        reviewTotal: 0,
        reviewAvg:0,
        reviewList:[],

    })
    useEffect(() => {
        getBookData();
        getReviewData();
    }, []);

    const getReviewData = async ()  =>{
        const reviewListData = await axios.get(`http://127.0.0.1:8000/api/review/${id}`)
        const reviewTotalData = await axios.get(`http://127.0.0.1:8000/api/review/total/${id}`)
        const reviewAvgData = await axios.get(`http://127.0.0.1:8000/api/review/avgStart/${id}`)
        console.log(reviewListData)
        console.log(reviewTotalData)
        console.log(reviewAvgData)
        setBookReview({
            reviewList: reviewListData.data,
            reviewTotal: reviewTotalData.data,
            reviewAvg: reviewAvgData.data
        })
    }
    const getBookData = () => {
        axios
            .get(`http://127.0.0.1:8000/api/books/${id}`)
            .then((response) => response.data)
            .then(
                (result) => {
                    console.log(result.data);
                    setBook([...result.data]);
                },
                (error) => {
                    console.log("sth wrong");
                }
            );
    };
    return (
        <div className="container">
            {book.length > 0 &&
                book.map((item, idx) => (
                    <div key={idx}>
                        <h1 className="fs-4 fw-bold d-inline">
                            Category {item.category_name}{" "}
                        </h1>
                        <hr className="mt-4 mb-5"></hr>
                        <div className="row">
                            <div className="col-md-8">
                                <Card className="book-detail">

                                    <div className="col-md-6 pl-1">
                                            <Card.Img
                                                src={
                                                    "http://127.0.0.1:8000/images/bookcover/" +
                                                    item.book_cover_photo +
                                                    ".jpg"
                                                }
                                            />
                                            <Card.Text className="card-author">
                                                By(author) {item.author_name}
                                            </Card.Text>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mt-3">
                                                <Card.Title>
                                                    <strong>{item.book_title}</strong>
                                                </Card.Title>
                                                <Card.Text>
                                                    {item.book_summary}
                                                </Card.Text>
                                            </div>
                                        </div>

                                </Card>
                            </div>
                            <div className="col-md-4">
                                <Card className="book-price">
                                    <Card.Footer className="card_price"><del><span>${item.book_price}</span></del> <strong>${item.final_price}</strong></Card.Footer>
                                    <Card.Text>Quantity</Card.Text>
                                    <div className="mt-5 px-5">
                                        <Button variant="secondary"  size="sm">
                                            -
                                        </Button>
                                        <Button variant="secondary" size="sm">
                                            +
                                        </Button>
                                    </div>
                                    <div className="d-grid gap-2 ">
                                        <Button variant="secondary" size="lg">
                                           Add to cart
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                ))}

            <div className="row book-review">
                <div className="col-md-8">

                    <Card>
                        <Card.Title className="fw-bold fs-4 d-inline">
                            <strong>Customer Reviews</strong> (Filtered by 5 start)
                        </Card.Title>
                        <Card.Text>{bookReview.reviewAvg} Start</Card.Text>

                        <div className="d-flex">
                            <div><Card.Text><strong>({bookReview.reviewTotal})</strong></Card.Text></div>
                            <div><Card.Text>(Total rating start)</Card.Text></div>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Card.Text>Showing 1-12 of {bookReview.reviewTotal} reviews</Card.Text>
                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Sort by on sale"
                                className="btn_sort"
                            >
                                <Dropdown.Item href="">
                                    Sort by date newest to oldest
                                </Dropdown.Item>
                                <Dropdown.Item href="">
                                    Sort by date oldest to newest
                                </Dropdown.Item>
                            </DropdownButton>

                            <DropdownButton
                                id="dropdown-basic-button"
                                title="Show 20"
                                className="btn_page"
                            >
                                <Dropdown.Item href="">Show 5</Dropdown.Item>
                                <Dropdown.Item href="">Show 10</Dropdown.Item>
                                <Dropdown.Item href="">Show 15</Dropdown.Item>
                                <Dropdown.Item href="">Show 20</Dropdown.Item>
                            </DropdownButton>

                        </div>
                        <div className="col-md-12 mt-5">
                                {   bookReview.reviewList.length > 0 &&
                                    bookReview.reviewList.map((item,id)=>(
                                        <div key={id}>
                                            <Card.Title><strong>{item.review_title}</strong> | {item.rating_start} stars</Card.Title>
                                            <Card.Text>{item.review_details}</Card.Text>
                                            <Card.Text>{item.review_date}</Card.Text>
                                            <hr className="mt-5"></hr>
                                        </div>
                                    ))
                                }
                        </div>
                    </Card>
                </div>
                <div className="col-md-4">
                    <Form className="review-form">
                        <Form.Label>Write a Review</Form.Label>
                        <hr className="mt-4 mb-5"></hr>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Add a title</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>
                                Details Please! You review helps other shoppers.
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                        >
                            <Form.Label>Select a rating start</Form.Label>
                        </Form.Group>

                        <hr className="mt-4 mb-5"></hr>
                        <Button variant="primary" type="submit">
                            Submit Review
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export defaultProductl;
