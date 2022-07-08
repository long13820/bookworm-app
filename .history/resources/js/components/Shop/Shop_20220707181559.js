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

export default class Shop extends React.Component{

    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const [dropdownSort, setDropdownSortOpen] = useState(false);
    constructor(props){
        super(props);
        this.toggle = this.toggle.bind(this);
        this.show = this.show.bind(this);
        this.state = {
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

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handShow = this.handShow.bind(this);
    }

    toggle(){
        this.setState((prevState) => ({
            dropdownOpen : !prevState.dropdownOpen
        }));
    }

    show(){
        this.setState((prevState) => ({
            dropdownShow : !prevState.dropdownShow
        }));
    }

    async handlePageChange(pageNumber){
        axios.get(`http://localhost:8000/api/books?paginate=${this.state.paginate}&page=${pageNumber}`)
        .then(result => {

            // console.log(result.data);
            const allBooks = result.data.data;
            const current_page = result.data.current_page;
            const per_page = result.data.per_page;
            const total = result.data.total;
            const from = result.data.from;
            const to = result.data.to;

            allBooks.map((book) => (
                Object.keys(book).forEach((key) => {
                    if(key === 'book_cover_photo'){
                        if(book[key] === null || book[key] === 'null'){
                            book[key] = defaultBookCover;
                        }
                        else{
                            book[key] = objectBookCover[book[key]];
                        }
                    }
                })
            ))

            this.setState({
                allBooks: allBooks,
                activePage: current_page,
                itemCountPerPage: per_page,
                totalItemCount: total,
                from: from,
                to: to


             })
        });
    }

    async getBookData(){
        axios.get(`http://localhost:8000/api/books?paginate=${this.state.paginate}&page=${this.state.activePage}`)
        .then(result => {
            const allBooks = result.data.data;
            const current_page = result.data.current_page;
            const per_page = result.data.per_page;
            const total = result.data.total;
            const from = result.data.from;
            const to = result.data.to;

            allBooks.map((book)=> (
                Object.keys(book).forEach((key) => {
                    if(key === 'book_cover_photo'){
                        if(book[key] === null || book[key] === 'null'){
                            book[key] = defaultBookCover;
                        }
                        else{
                            book[key] =  objectBookCover[book[key]];
                        }
                    }
                })
            ))
            this.setState({
                allBooks: allBooks,
                activePage: current_page,
                itemCountPerPage: per_page,
                totalItemCount: total,
                from: from,
                to: to


             })
        })
    }
    async getFilter() {
        const category_name_array = [];
        const author_name_array = [];
        const url = 'http://localhost:8000/api/';
        await axios.get(url + 'getAllCategories').then((result) => {
          result.data.map((i) => {
            category_name_array.push(i.category_name);
          });
          this.setState({
            category_name: category_name_array
          });
        });
        await axios.get(url + 'getAllAuthors').then((result) => {
          result.data.map((i) => {
            author_name_array.push(i.author_name);
          });
          this.setState({
            author_name: author_name_array
          });
        });
      }
    async componentDidMount() {
        await this.getBookData();
        await this.getFilter();
    }
    async handleFilter(item, name) {
        if (name === 'Rating star') {
          if (item !== '') {
            await this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                rating: `&filter[avg_rating]=${item.split(' ')[0]}`
              }
            }));
          } else {
            await this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                rating: ''
              }
            }));
          }
        } else if (name === 'Author') {
          if (item !== '') {
            await this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                author: `&filter[author_name]=${item}`
              }
            }));
          } else {
            await this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                author: ''
              }
            }));
          }
        } else if (name === 'Category') {
          if (item !== '') {
            await this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                category: `&filter[category_name]=${item}`
              }
            }));
          } else {
            await this.setState((prevState) => ({
              filter: {
                ...prevState.filter,
                category: ''
              }
            }));
          }
        }

    const filterArray = Object.values(this.state.filter);
    const finalFilterArray = filterArray.filter((n) => n);
    let finalFilter = `http://localhost:8000/api/books?page=1&paginate=${this.state.paginate}`;
    if (finalFilterArray.length > 0) {
      finalFilterArray.map((x) => {
        finalFilter += x;
      });
    }

    await axios.get(finalFilter).then((result) => {
        const allBooks = result.data.data;
        const current_page = result.data.current_page;
        const per_page = parseInt(result.data.per_page);
        const total = result.data.total;
        const from = result.data.from;
        const to = result.data.to;
        allBooks.map((book) =>
          Object.keys(book).forEach((key) => {
            if (key === 'book_cover_photo') {
              if (book[key] === null || book[key] === 'null') {
                book[key] = defaultBookCover;
              } else {
                book[key] = objectBookCover[book[key]];
              }
            }
          })
        );
        this.setState({
          allBooks: allBooks,
          activePage: current_page,
          itemCountPerPage: per_page,
          totalItemCount: total,
          from: from,
          to: to
        });
      });
    }
    async handShow(number) {
        console.log(number);
        this.dropDownRef.current.changeTitle(number);
        await this.setState({ paginate: parseInt(number.split(': ')[1]) });
        await this.handlePageChange(1);
      }
    render(){
    // console.log(this.state.allBooks);
    // console.log(this.state.activePage)
    // console.log(this.state.itemCountPerPage)
    // console.log(this.state.totalItemCount)
    return (


    
}

