// import "./shop.css";
// import React, {useState} from 'react';
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
// import Pagination from "react-js-pagination";
// import axios from "axios";
// import MyDropdown from "../Dropdown/MyDropdown";
// import MyAccordion from "../MyAccordion/MyAccordion";


// const objectBookCover = {
//     "book1": Book1,
//     "book2": Book2,
//     "book3": Book3,
//     "book4": Book4,
//     "book5": Book5,
//     "book6": Book6,
//     "book7": Book7,
//     "book8": Book8,
//     "book9": Book9,
//     "book10": Book10,
// }

// export default class Shop extends React.Component{

//     // const [dropdownOpen, setDropdownOpen] = useState(false);

//     // const [dropdownSort, setDropdownSortOpen] = useState(false);
//     constructor(props){
//         super(props);
//         // this.toggle = this.toggle.bind(this);
//         // this.show = this.show.bind(this);
//         this.dropDownRef = React.createRef();
//         this.state = {
//             allBooks:[],
//             defaultBooks:[],
//             dropdownOpen:false,
//             dropdownShow: false,
//             activePage: 1,
//             itemCountPerPage:1,
//             totalItemCount:1,
//             paginate:5,
//             from:1,
//             to:undefined,
//             category_name: [],
//             author_name: [],
//             filter: {
//               author: '',
//               category: '',
//               rating: ''
//             },
//             nameFilter: {
//               author: '',
//               category: '',
//               rating: ''
//             }
//         };

//         this.handlePageChange = this.handlePageChange.bind(this);
//         this.handleFilter = this.handleFilter.bind(this);
//         this.handShow = this.handShow.bind(this);
//     }

//     toggle(){
//         this.setState((prevState) => ({
//             dropdownOpen : !prevState.dropdownOpen
//         }));
//     }

//     show(){
//         this.setState((prevState) => ({
//             dropdownShow : !prevState.dropdownShow
//         }));
//     }

//     async handlePageChange(pageNumber){
//         axios.get(`http://localhost:8000/api/books?paginate=${this.state.paginate}&page=${pageNumber}`)
//         .then(result => {

//             // console.log(result.data);
//             const allBooks = result.data.data;
//             const current_page = result.data.current_page;
//             const per_page = result.data.per_page;
//             const total = result.data.total;
//             const from = result.data.from;
//             const to = result.data.to;

//             allBooks.map((book) => (
//                 Object.keys(book).forEach((key) => {
//                     if(key === 'book_cover_photo'){
//                         if(book[key] === null || book[key] === 'null'){
//                             book[key] = defaultBookCover;
//                         }
//                         else{
//                             book[key] = objectBookCover[book[key]];
//                         }
//                     }
//                 })
//             ))

//             this.setState({
//                 allBooks: allBooks,
//                 activePage: current_page,
//                 itemCountPerPage: per_page,
//                 totalItemCount: total,
//                 from: from,
//                 to: to


//              })
//         });
//     }

//     async getBookData(){
//         axios.get(`http://localhost:8000/api/books?paginate=${this.state.paginate}&page=${this.state.activePage}`)
//         .then(result => {
//             const allBooks = result.data.data;
//             const current_page = result.data.current_page;
//             const per_page = result.data.per_page;
//             const total = result.data.total;
//             const from = result.data.from;
//             const to = result.data.to;

//             allBooks.map((book)=> (
//                 Object.keys(book).forEach((key) => {
//                     if(key === 'book_cover_photo'){
//                         if(book[key] === null || book[key] === 'null'){
//                             book[key] = defaultBookCover;
//                         }
//                         else{
//                             book[key] =  objectBookCover[book[key]];
//                         }
//                     }
//                 })
//             ))
//             this.setState({
//                 allBooks: allBooks,
//                 activePage: current_page,
//                 itemCountPerPage: per_page,
//                 totalItemCount: total,
//                 from: from,
//                 to: to


//              })
//         })
//     }
//     async getFilter() {
//         const category_name_array = [];
//         const author_name_array = [];
//         await axios.get('http://localhost:8000/api/categories').then((result) => {
//           result.data.map((i) => {
//             category_name_array.push(i.category_name);
//           });
//           this.setState({
//             category_name: category_name_array
//           });
//         });
//         await axios.get('http://localhost:8000/api/authors').then((result) => {
//           result.data.map((i) => {
//             author_name_array.push(i.author_name);
//           });
//           this.setState({
//             author_name: author_name_array
//           });
//         });
//       }
//     async componentDidMount() {
//         await this.getBookData();
//         await this.getFilter();
//     }
//     async handleFilter(item, name) {
//         if (name === 'Rating star') {
//           if (item !== '') {
//             await this.setState((prevState) => ({
//               filter: {
//                 ...prevState.filter,
//                 rating: `&filter[star]=${item.split(' ')[0]}`
//               }
//             }));
//           } else {
//             await this.setState((prevState) => ({
//               filter: {
//                 ...prevState.filter,
//                 rating: ''
//               }
//             }));
//           }
//         } else if (name === 'Author') {
//           if (item !== '') {
//             await this.setState((prevState) => ({
//               filter: {
//                 ...prevState.filter,
//                 author: `&filter[author_name]=${item}`
//               }
//             }));
//           } else {
//             await this.setState((prevState) => ({
//               filter: {
//                 ...prevState.filter,
//                 author: ''
//               }
//             }));
//           }
//         } else if (name === 'Category') {
//           if (item !== '') {
//             await this.setState((prevState) => ({
//               filter: {
//                 ...prevState.filter,
//                 category: `&filter[category_name]=${item}`
//               }
//             }));
//           } else {
//             await this.setState((prevState) => ({
//               filter: {
//                 ...prevState.filter,
//                 category: ''
//               }
//             }));
//           }
//         }

//     const filterArray = Object.values(this.state.filter);
//     const finalFilterArray = filterArray.filter((n) => n);
//     let finalFilter = `http://localhost:8000/api/books?page=1&paginate=${this.state.paginate}`;
//     if (finalFilterArray.length > 0) {
//       finalFilterArray.map((x) => {
//         finalFilter += x;
//       });
//     }

//     await axios.get(finalFilter).then((result) => {
//         const allBooks = result.data.data;
//         const current_page = result.data.current_page;
//         const per_page = parseInt(result.data.per_page);
//         const total = result.data.total;
//         const from = result.data.from;
//         const to = result.data.to;
//         allBooks.map((book) =>
//           Object.keys(book).forEach((key) => {
//             if (key === 'book_cover_photo') {
//               if (book[key] === null || book[key] === 'null') {
//                 book[key] = defaultBookCover;
//               } else {
//                 book[key] = objectBookCover[book[key]];
//               }
//             }
//           })
//         );
//         this.setState({
//           allBooks: allBooks,
//           activePage: current_page,
//           itemCountPerPage: per_page,
//           totalItemCount: total,
//           from: from,
//           to: to
//         });
//       });
//     }
//     async handShow(number) {
//         console.log(number);
//         this.dropDownRef.current.changeTitle(number);
//         await this.setState({ paginate: parseInt(number.split(': ')[1]) });
//         await this.handlePageChange(1);
//       }
//     render(){
//     // console.log(this.state.allBooks);
//     // console.log(this.state.activePage)
//     // console.log(this.state.itemCountPerPage)
//     // console.log(this.state.totalItemCount)
//     return (

//             <section className=" shop-page flex-grow-1">
//               <div className="container-fluid">
//                 <div className="title-page">
//                 <p>
//                     Books{' '}
//                     {this.state.filter.author !== '' ||
//                     this.state.filter.category !== '' ||
//                     this.state.filter.rating !== '' ? (
//                       <span>(Filtered by</span>
//                     ) : (
//                       ''
//                     )}
//                     <span>
//                       {this.state.filter.category !== '' ? (
//                         <span style={{ 'font-weight': 'bold', 'font-style': 'italic' }}>
//                           {' '}
//                           Category:{' '}
//                           <span style={{ color: 'var(--darkblue)' }}>
//                             {this.state.filter.category.split('=')[1]}{' '}
//                           </span>
//                         </span>
//                       ) : (
//                         ''
//                       )}
//                       {this.state.filter.author !== '' ? (
//                         <span style={{ 'font-weight': 'bold', 'font-style': 'italic' }}>
//                           - Author:{' '}
//                           <span style={{ color: 'var(--darkblue)' }}>
//                             {this.state.filter.author.split('=')[1]}{' '}
//                           </span>
//                         </span>
//                       ) : (
//                         ''
//                       )}
//                       {this.state.filter.rating !== '' ? (
//                         <span style={{ 'font-weight': 'bold', 'font-style': 'italic' }}>
//                           - Rating:{' '}
//                           <span style={{ color: 'var(--darkblue)' }}>
//                             {this.state.filter.rating.split('=')[1]}
//                           </span>
//                           {parseInt(this.state.filter.rating.split('=')[1]) === 1 ? (
//                             <span style={{ color: 'var(--darkblue)' }}> star</span>
//                           ) : (
//                             <span style={{ color: 'var(--darkblue)' }}> stars</span>
//                           )}
//                         </span>
//                       ) : (
//                         ''
//                       )}
//                     </span>
//                     {this.state.filter.author !== '' ||
//                     this.state.filter.category !== '' ||
//                     this.state.filter.rating !== '' ? (
//                       <span>)</span>
//                     ) : (
//                       ''
//                     )}
//                   </p>
//                 </div>

//                 <div className="book-list">
//                   <div className="row">
//                     <div className="col-lg-3 p-0">
//                       <p className="bl-filter font-14px">Filter by</p>

//                       <div>
//                         <MyAccordion
//                           categories={this.state.category_name}
//                           authors={this.state.author_name}
//                           handleFilter={this.handleFilter}
//                         />
//                       </div>
//                     </div>

//                     {this.state.allBooks.length > 0 ? (
//                       <div className="col-lg-9">
//                         <div className="row mb-4">
//                           <div className="col-lg-6">
//                             <p className="bl-showing font-14px">
//                               Showing {this.state.from}-{this.state.to} of&nbsp;
//                               {this.state.totalItemCount} books
//                             </p>
//                           </div>
//                           <div className="col-lg-6 d-flex justify-content-end">
//                             <div className="dropdown mr-3">
//                               <MyDropdown
//                                 title="Sort by"
//                                 list={[
//                                   'Sort by on sale',
//                                   'Sort by popularity',
//                                   'Sort by price: low to high',
//                                   'Sort by price: high to low'
//                                 ]}

//                               />
//                             </div>

//                             <div>
//                               <MyDropdown
//                                 ref={this.dropDownRef}
//                                 title="Show: 5"
//                                 list={['Show: 5', 'Show: 15', 'Show: 20', 'Show: 25']}
//                                 handShow={this.handShow}

//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div id="mainRow" className="row">
//                           {this.state.allBooks.map((book, index) => {
//                             return (
//                               <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
//                                 <a href={`shop/${book.id}`} className="card">
//                                   <img
//                                     className="card-img-top img-fluid"
//                                     src={book.book_cover_photo}
//                                     alt="Books"
//                                   />
//                                   <div className="card-body">
//                                     <p className="book-title font-18px">{book.book_title}</p>
//                                     <p className="book-author font-14px">{book.author_name}</p>
//                                   </div>
//                                   <div className="card-footer text-muted font-14px">
//                                     ${book.final_price}
//                                   </div>
//                                 </a>
//                               </div>
//                             );
//                           })}
//                         </div>

//                         <div className="d-flex justify-content-center">
//                           <Pagination
//                             activePage={this.state.activePage}
//                             itemsCountPerPage={this.state.itemCountPerPage}
//                             totalItemsCount={this.state.totalItemCount}
//                             pageRangeDisplayed={3}
//                             //firstPageText="First"
//                             prevPageText="Previous"
//                             nextPageText="Next"
//                             //lastPageText="Last"
//                             onChange={this.handlePageChange}
//                             itemClass="page-item"
//                             linkClass="page-link"
//                           />
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="col-lg-9">No data was found</div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </section>
//           );
//         }
// }

// import React, { useEffect, useState } from 'react'
// import Axios from 'axios';
// import { Link } from 'react-router-dom';
// import Pagination from 'react-js-pagination';

// export default function Shop() {

//   const [stateBook, setStateBook] = useState({
//     book: [],
//   });

//   const [stateSort, setStateSort] = useState({
//     sort: "onSale",
//   });

//   const [statePaginate, setStatePaginate] = useState({
//     paginate: 5
//   });

//   const [stateFilterCate, setStateFilterCate] = useState({
//     filterCate: null,
//   });

//   const [stateFilterAuthor, setStateFilterAuthor] = useState({
//     filterAuthor: null,
//   });

//   const [stateFilterStar, setStateFilterStar] = useState({
//     filterStar: null
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(false);


//   const [statePage, setStatePage] = useState({
//     from: 1,
//     to: 1,
//     activePage: 1,
//     itemsCountPerPage: 0,
//     totalItemsCount: 0,
//   });

//   const [stateAccordion, setStateAccordion] = useState({
//     categoryName: [],
//     authorName: []
//   });

//   const handleChangeSort = (e) => {
//     setStateSort(prevStateSort => ({
//       ...prevStateSort, sort: e.target.value
//     }));
//   };

//   const handleChangePaginate = (e) => {
//     setStatePaginate(prevStatePaginate => ({
//       ...prevStatePaginate, paginate: e.target.value
//     }));

//     handlePageChange(1)
//   }

//   function handlePageChange(pageNumber) {
//     setStatePage({ activePage: pageNumber });
//   }

//   const getAccordionData = async () => {
//     setIsLoading(true);
//     setIsError(false);
//     try {
//       const resCategoryName = await Axios.get('http://localhost:8000/api/categories');
//       const resAuthorName = await Axios.get('http://localhost:8000/api/authors');

//       setStateAccordion({
//         categoryName: resCategoryName.data.data,
//         authorName: resAuthorName.data.data
//       })
//     } catch (error) {
//       setIsError(true);
//     }
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     getAccordionData();
//   }, [])

//   useEffect(() => {
//     getBookData();
//   }, [stateFilterCate.filterCate, stateFilterAuthor.filterAuthor, stateFilterStar.filterStar,
//   stateSort.sort, statePaginate.paginate, statePage.activePage])

//   const getBookData = async () => {
//     setIsLoading(true);
//     setIsError(false);
//     try {
//       if (stateFilterCate.filterCate != null
//         && stateFilterAuthor.filterAuthor != null
//         && stateFilterStar.filterStar != null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[category_name]=${stateFilterCate.filterCate}&filter[author_name]=${stateFilterAuthor.filterAuthor}&filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate != null
//         && stateFilterAuthor.filterAuthor != null
//         && stateFilterStar.filterStar == null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[category_name]=${stateFilterCate.filterCate}&filter[author_name]=${stateFilterAuthor.filterAuthor}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate != null
//         && stateFilterAuthor.filterAuthor == null
//         && stateFilterStar.filterStar != null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[category_name]=${stateFilterCate.filterCate}&filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate == null
//         && stateFilterAuthor.filterAuthor != null
//         && stateFilterStar.filterStar != null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[author_name]=${stateFilterAuthor.filterAuthor}&filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate != null
//         && stateFilterAuthor.filterAuthor == null
//         && stateFilterStar.filterStar == null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[category_name]=${stateFilterCate.filterCate}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate == null
//         && stateFilterAuthor.filterAuthor != null
//         && stateFilterStar.filterStar == null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[author_name]=${stateFilterAuthor.filterAuthor}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate == null
//         && stateFilterAuthor.filterAuthor == null
//         && stateFilterStar.filterStar != null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?filter[avg_star]=${stateFilterStar.filterStar}&sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//       else if (stateFilterCate.filterCate == null
//         && stateFilterAuthor.filterAuthor == null
//         && stateFilterStar.filterStar == null) {
//         const resBookCondition = await Axios.get(`http://localhost:8000/api/filterby?sort[type]=${stateSort.sort}&paginate=${statePaginate.paginate}&page=${statePage.activePage}`)
//         setStateBook({
//           book: resBookCondition.data.data
//         })
//         setStatePage({
//           from: resBookCondition.data.from,
//           to: resBookCondition.data.to,
//           activePage: resBookCondition.data.current_page,
//           itemsCountPerPage: resBookCondition.data.per_page,
//           totalItemsCount: resBookCondition.data.total
//         })
//       }
//     } catch (error) {
//       setIsError(true);
//     }
//     setIsLoading(false);
//   }

//   return (
//     <div className='container'>
//       {isLoading ? (
//         <div className="text-center">
//           <div className="spinner-border text-info" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : (
//         <>
//           <h3 className="fs-4 fw-bold d-inline">Books </h3>
//           {stateFilterCate.filterCate != null ||
//             stateFilterAuthor.filterAuthor != null ||
//             stateFilterStar.filterStar != null ? (
//             <div className='d-inline fw-light'>
//               (Filltered by Category: {stateFilterCate.filterCate}, Author: {stateFilterAuthor.filterAuthor}, Star: {stateFilterStar.filterStar})
//             </div>
//           ) : (
//             <div></div>
//           )}
//           <hr className='mt-4 mb-5'></hr>
//           <div className='row'>
//             <div className='col-md-2'>
//               <h6>Filter By</h6>
//               <div className="accordion mt-4" id="accordionExample">
//                 <div className="accordion-item rounded-3 border border-1 border-dark">
//                   <h2 className="accordion-header" id="headingOne">
//                     <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                       Category
//                     </button>
//                   </h2>
//                   <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
//                     <div className="accordion-body">
//                       <ul className="list-group">
//                         {stateAccordion.categoryName.map((item, i) => (
//                           <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterCate({ filterCate: item.category_name })}>
//                             {item.category_name}
//                           </li>
//                         ))}
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterCate({ filterCate: null })}>
//                           All Category
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="accordion-item rounded-3 border border-1 border-dark mt-3">
//                   <h2 className="accordion-header" id="headingTwo">
//                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
//                       Author
//                     </button>
//                   </h2>
//                   <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
//                     <div className="accordion-body">
//                       {stateAccordion.authorName.map((item, i) => (
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterAuthor({ filterAuthor: item.author_name })}>
//                           {item.author_name}
//                         </li>
//                       ))}
//                       <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterAuthor({ filterAuthor: null })}>
//                         All Author
//                       </li>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="accordion-item rounded-3 border border-1 border-dark mt-3">
//                   <h2 className="accordion-header" id="headingThree">
//                     <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
//                       Rating Review
//                     </button>
//                   </h2>
//                   <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
//                     <div className="accordion-body">
//                       <ul className="list-group">
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 1 })}>1 Star</li>
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 2 })}>2 Star</li>
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 3 })}>3 Star</li>
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 4 })}>4 Star</li>
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: 5 })}>5 Star</li>
//                         <li className="list-group-item list-group-item-action" role="button" onClick={() => setStateFilterStar({ filterStar: null })}>All Star</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className='col-md-10'>
//               <div className="d-flex justify-content-between">
//                 <p style={{ marginRight: "20px" }}>Showing {statePage.from}-{statePage.to} of {statePage.totalItemsCount} books</p>
//                 <div className='d-flex'>
//                   <select value={stateSort.sort} onChange={handleChangeSort} style={{ marginRight: "10px" }} className="dropdown btn bg-quantity text-white">
//                     <option value="onSale" className='bg-quantity text-white'>Sort by on sale</option>
//                     <option value="popularity" className='bg-quantity text-white'>Sort by popularity</option>
//                     <option value="priceAsc" className='bg-quantity text-white'>Sort by price: low to high</option>
//                     <option value="priceDesc" className='bg-quantity text-white'>Sort by price: high to low</option>
//                   </select>
//                   <select value={statePaginate.paginate} onChange={handleChangePaginate} style={{ marginRight: "10px" }} className="dropdown btn bg-quantity text-white">
//                     <option value="5" className='bg-quantity text-white'>Show 5</option>
//                     <option value="15" className='bg-quantity text-white'>Show 15</option>
//                     <option value="20" className='bg-quantity text-white'>Show 20</option>
//                     <option value="25" className='bg-quantity text-white'>Show 25</option>
//                   </select>
//                 </div>
//               </div>
//               <div className='row mt-3 gy-4'>
//                 {stateBook.book.map((item, i) => {
//                   if (item.book_cover_photo == null) {
//                     item.book_cover_photo = "bookNull";
//                   }
//                   return (
//                     <div className="col-md-3" key={i}>
//                       <Link to={`/books/${item.book_id}`} style={{ textDecoration: 'none' }}>
//                         <div className='card border border-1 h-100'>
//                           <img src={"http://localhost:8000/assets/bookcover/" + item.book_cover_photo + ".jpg"} className="card-img-top img-book-card" alt="Image Error" />
//                           <div className="card-body">
//                             <h5 className="card-title">{item.book_title}</h5>
//                             <p className="card-text">{item.author_name}</p>
//                           </div>
//                           <div className='card-footer text-white'>
//                             {item.discount_price != null ? (
//                               <div>
//                                 <div className='d-inline text-decoration-line-through fw-light' style={{ marginRight: "5px" }}>
//                                   ${item.book_price}
//                                 </div>
//                                 <div className='d-inline fw-bold'>
//                                   ${item.discount_price}
//                                 </div>
//                               </div>
//                             ) : (
//                               <div>
//                                 <div className='fw-bold'>
//                                   ${item.book_price}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </Link>
//                     </div>
//                   )
//                 })}
//               </div>
//               <div className="d-flex justify-content-center mt-5">
//                 <Pagination
//                   activePage={statePage.activePage}
//                   itemsCountPerPage={statePage.itemsCountPerPage}
//                   totalItemsCount={statePage.totalItemsCount}
//                   pageRangeDisplayed={3}
//                   //firstPageText="First"
//                   prevPageText="Previous"
//                   nextPageText="Next"
//                   //lastPageText="Last"
//                   onChange={handlePageChange}
//                   itemClass='page-item'
//                   linkClass='page-link'
//                 />
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   )
// }
