import React from "react";
import { Navbar } from "reactstrap";
import "./header.css";
import bookworm from '../../../assets/bookcover/bookworm.png';

export default class Header extends React.Component{

    render(){
    return(
        <div className="sticky-top">
            <Navbar color="light" light expand="md" className="sticky-top px-4">
                <Link to="/">
                    <img src={bookworm} alt="Bookworm/>
                </Link>
            </Navbar>

        </div>
    );
    }
}
