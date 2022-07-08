import "./shop.css";
import React, {useState} from 'react';
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
import Pagination from "react-js-pagination";
import axios from "axios";
import MyDropdown from "../Dropdown/MyDropdown";
import MyAccordion from "../MyAccordion/MyAccordion";


const objectBookCover = {
    "book1": Book1,
    "book2": Book2,
    "book3": Book3,
    "book4": Book4,
    "book5": Book5,
    "book6": Book6,
    "book7": Book7,
    "book8": Book8,
    "book9": Book9,
    "book10": Book10,
}

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
//     let finalFilter = `http://localhost:8000/api/filterby?page=1&paginate=${this.state.paginate}`;
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

export default class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            filterValue: undefined,
            per: '20',
            page: '1',
            isAsc: 'false',
            sort: 'sale',
            total: 0,
            from: 0,
            to: 0,
            page_count: 0,
            category: [],
            author: [],
            listpro: [],
            star: [
                { id: 1, des: '1 Star' },
                { id: 2, des: '2 Star' },
                { id: 3, des: '3 Star' },
                { id: 4, des: '4 Star' },
                { id: 5, des: '5 Star' }
            ],
            allBooks:[],
            defaultBooks:[],
            dropdownOpen:false,
                    dropdownShow: false,
                        activePage: 1,
                        itemCountPerPage:1,
                        totalItemCount:1,
                        paginate:5,
                        from:1,
                        to:undefined,
                        category_name: [],
                        author_name: [],
                        filter: {
                          author: '',
                          category: '',
                          rating: ''
                        },
                        nameFilter: {
                          author: '',
                          category: '',
                          rating: ''
                        }
        };
        // this.FuntionBy = this.FuntionBy.bind(this);
        this.setPage = this.setPage.bind(this);
    }


    componentWillMount() {
        axios.get('http://127.0.0.1:8000/api/category')
            .then(res => {
                this.setState({
                    category: res.data
                });
                //console.log(this.state.category);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.get('http://127.0.0.1:8000/api/author')
            .then(res => {
                this.setState({
                    author: res.data
                });
                // console.log(this.state.author);
            })
            .catch((error) => {
                console.log(error);
            });

        this.FetcData()
    }

    FetcData() {
        let config = {
            params: {
                // $loai, $condition, $category, $per, $isAscending
                filter: this.state.filter,
                filterValue: this.state.filterValue,
                sort: this.state.sort,
                // isAscending: this.state.isAsc,
                per: this.state.per,
                page: this.state.page
            }
        }

        axios.get('http://127.0.0.1:8000/api/filterby/', config)
            .then(res => {
                this.setState({
                    listpro: res.data.data,
                    page: res.data.current_page,
                    page_count: res.data.last_page,
                    from: res.data.from,
                    to: res.data.to,
                    total: res.data.total
                });
                console.log(this.state.listpro);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async setPage(number) {
        console.log("cur page: " + number)
        await this.setState({
            page: number
        })
        this.FetcData()
    }


    async filterCategory(cate) {
        await this.setState({
            filter: "category",
            filterValue: cate
        })

        this.FetcData()
    }

    async filterAuthor(author) {
        await this.setState({
            filter: "author",
            filterValue: author
        })

        this.FetcData()
    }

    async filterStar(star) {
        await this.setState({
            filter: "star",
            filterValue: star
        })

        this.FetcData()
    }

    async changeSort(event) {
        let value = event.target.value
        console.log(value)
        await this.setState({
            sort: value
        })

        this.FetcData()
    }

    async changePerPage(event) {
        await this.setState({
            per: event.target.value
        })
        this.FetcData()
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getFilerTitle() {
        // if(this.state.filter == "") return;

        let filter_name = this.capitalizeFirstLetter(this.state.filter)
        let filter_value = ""
        switch (this.state.filter) {
            case 'category':
                let category = this.state.category.find(item => {
                    return (item.id == this.state.filterValue)
                })
                filter_value = this.capitalizeFirstLetter(category.category_name)
                break;

            case 'author':
                let author = this.state.author.find(item => {
                    return (item.id == this.state.filterValue)
                })
                filter_value = this.capitalizeFirstLetter(author.author_name)
                break;

            case 'star':
                let star = this.state.star.find(item => {
                    return (item.id == this.state.filterValue)
                })
                filter_value = this.capitalizeFirstLetter(star.des)
                break;

            default:
                return;
                break;
        }

        return `( Filtered by ${filter_name}: ${filter_value} )`
    }

    render() {
        return (
            <div>
                <section className="section-pagetop bg-primary">
                    <div className="container">
                        <h2 style={{display: 'flex'}} className="title-page text-white">
                            Books
                            <h5 style={{marginTop:'10px', marginLeft:'5px'}}>{this.getFilerTitle()} </h5>
                        </h2>
                    </div>
                </section>

                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <b>Filter By</b>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            Category
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        {this.state.category.map(cate => (
                                            <div className="accordion-body" style={{ cursor: "pointer" }} key={cate.id} value={cate.id} id={cate.id} onClick={() => this.filterCategory(cate.id)}>
                                                {/* {cate.category_name.toUpperCase()} */}
                                                {this.capitalizeFirstLetter(cate.category_name)}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Author
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">

                                        {this.state.author.map(auth => (
                                            <div key={auth.id} style={{ cursor: "pointer" }} className="accordion-body" value={auth.id} id={auth.id} onClick={() => this.filterAuthor(auth.id)}>
                                                {/* {auth.author_name.toUpperCase()} */}
                                                {this.capitalizeFirstLetter(auth.author_name)}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Rating View
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">

                                        {this.state.star.map(st => (
                                            <div key={st.id} style={{ cursor: "pointer" }} className="accordion-body" value={st.id} id={st.id} onClick={() => this.filterStar(st.id)}>
                                                {st.des}
                                                {/* {this.capitalizeFirstLetter(st.des)} */}
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10">
                            <div className="row">
                                <div className="col-md-6">Showing {this.state.from} - {this.state.to} of {this.state.total} books</div>
                                <div className="col-md-4" >
                                    <select id="sortch" className="custom-select" onChange={(e) => this.changeSort(e)}>
                                        <option value="sale">Sort By On Sale</option>
                                        <option value="popular">Sort By Popularity</option>
                                        <option value="price-asc">Sort By Price: low to high</option>
                                        <option value="price-desc">Sort By Price: hight to low</option>
                                    </select>
                                </div>
                                <div className="col-md-2" >
                                    <select id="numch" defaultValue="20" className="custom-select" onChange={(e) => this.changePerPage(e)}>
                                        <option value="5">Show 5</option>
                                        <option value="15">Show 15</option>
                                        <option value="20">Show 20</option>
                                        <option value="25">Show 25</option>
                                    </select>
                                </div>
                            </div>
                            <br />
                            {/* Contents */}
                            <div className="row">
                                {this.state.listpro.map(book => (
                                    <div className="col-3">
                                        <Link key={book.id} to={"/book/" + book.id}>
                                            <div className="card" style={{ minHeight: '200px', marginRight: '10px' }} >
                                                {
                                                    (book.book_cover_photo==null)
                                                        ? <img style={{ minHeight: '200px' }} className="card-img-top" src={logo} alt={book.book_title + " photo"} />
                                                        : <img style={{ maxHeight: '200px' }} className="card-img-top" src={"images/" + book.book_cover_photo + ".jpg"} alt={book.book_title + " photo"} />
                                                }
                                                <div className="card-body">
                                                    <h5 className="card-title" style={{ wordWrap: 'break-word', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {book.book_title}
                                                    </h5>
                                                    <p className="card-text" style={{minHeight: '70px'}}>{book.author_name}</p>
                                                </div>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        {(book.book_price !== book.final_price)
                                                            ? <del>${book.book_price}</del>
                                                            : ""
                                                        }
                                                        <span style={{marginLeft: '10px', fontSize: '25px', color: 'red'}}>${book.final_price}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <br />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <br />
                            <Paginate
                                className="text-center"
                                page_count={this.state.page_count}
                                current_page={this.state.page}
                                setPage={this.setPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
