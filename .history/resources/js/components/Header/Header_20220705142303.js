import React from "react";
import { Collapse, Nav, Navbar, NavbarToggler, NavItem, NavLink } from "reactstrap";
import "./header.css";
import Avatar from '../../../assets/avatar.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShop, faCircleInfo, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default class Header extends React.Component{
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false,
            isLogin: false,
            modal : false,

        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleModal(){
        this.state({
            isOpen: !this.state.isOpen
        })
    }
    handleMenu(){
        this.syh
    }
    render(){
    return(
        <div className="sticky-top">
            <Navbar color="light" light expand="md" className="sticky-top px-4">
                <Link to="/" className="font-22px ">
                    BOOKWORM
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
                                <NavLink className={({isActive}) => (isActive ? 'active': '')} to ="/about">
                                    {' '}
                                    <FontAwesomeIcon icon={faCircleInfo}/> About
                                </NavLink>
                            </NavItem>
                            <NavItem className="me-3">
                                <NavLink className={({isActive}) => (isActive ? 'active': '')} to ="/cart">
                                    {' '}
                                    <FontAwesomeIcon icon={faCartShopping}/> Cart(0)
                                </NavLink>
                            </NavItem>

                            {this.state.isLogin === false ? (
                                <NavItem>
                                    <div className="login-btn" onClick={this.handleModal}>
                                        Sign in
                                    </div>
                                </NavItem>
                            ) : (
                                <NavItem className="nav-item-user">
                                    <img src={Avatar} className="avatar-login" onClick={this.han}></img>
                                </NavItem>
                            )
                            }
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>

        </div>
    );
    }
}
