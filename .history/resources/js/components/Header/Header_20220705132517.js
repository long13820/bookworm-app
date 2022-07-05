import React from "react";
import { Navbar, NavbarToggler } from "reactstrap";
import "./header.css";
import bookworm from '../../../assets/bookcover/bookworm.png';

export default class Header extends React.Component{
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render(){
    return(
        <div className="sticky-top">
            <Navbar color="light" light expand="md" className="sticky-top px-4">
                <Link to="/">
                    <img src={bookworm} alt="Bookworm Logo"/>
                </Link>
                <NavbarToggler onClick={this.toggle}/>
                <div cl>

                </div>
            </Navbar>

        </div>
    );
    }
}
