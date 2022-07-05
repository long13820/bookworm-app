import React from "react";
import { Navbar } from "reactstrap";
import "./header.css";
import bookworm from '../../../assets/bookcover/bookworm.png';
import { Link } from "react-router-dom";

export default class Header extends React.Component{

    render(){
    return(
        <div className="sticky-top">
            <Navbar color="light" light expand="md" className="sticky-top px-4">
                <Linkk to="/">
                    <img src={bookworm} alt="Bookworm logo/>
                </Link>
            </Navbar>

        </div>
    );
    }
}
