import React from "react";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import "./header.css";
import bookworm from '../../../assets/bookcover/bookworm.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShop, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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
                <div className="d-flex justify-content-end">
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto align-items-center" navbar>
                            <NavItem className="me-3">
                                <NavLink className={({isActive}) => (isActive ? 'active': '')} to ="/">
                                    {' '}
                                    <FontAwesomeIcon icon={faHome}/> Home
                                </NavLink>
                            </NavItem>
                            <NavItem className="me-3">
                                <NavLink className={({isActive}) => (isActive ? 'active': '')} to ="/shop">
                                    {' '}
                                    <FontAwesomeIcon icon={faShop}/> Shop
                                </NavLink>
                            </NavItem>
                            <NavItem className="me-3">
                                <NavLink className={({isActive}) => (isActive ? 'active': '')} to ="/">
                                    {' '}
                                    <FontAwesomeIcon icon={faCircleInfo}/> About
                                </NavLink>
                            </NavItem>
faCircleInfo
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>

        </div>
    );
    }
}
