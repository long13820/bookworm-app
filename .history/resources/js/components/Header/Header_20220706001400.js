import React from "react";
import { Button, Card, CardBody, Collapse, Fade, Modal, ModalHeader, Nav, Navbar, NavbarToggler, NavItem} from "reactstrap";
import "./header.css";
import Avatar from '../../../assets/avatar.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faShop, faCircleInfo, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import Register from "../Product/Register";
import Login from "../Login/Login";
import { ToastContainer , toast } from "react-toastify";
import axios from "axios";

export default class Header extends React.Component{
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.handleMenu = this.handleMenu.bind(this);
        this.setForm = this.setForm.bind(this);
        this.handleModal = this.handleModal.bind(this);

        this.state = {
            isOpen: false,
            isLogin: false,
            modal : false,
            loginForm:true,
            openMenu: false,
            name:'',
            email:'',
            cart: 0
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleModal(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleMenu(){
        this.setState({
            openMenu: !this.state.openMenu
        })
    }
    setForm(){
        this.setState({
            loginForm: !this.state.loginForm
        })
    }
    //logout
    logout(){
        const token = localStorage.getItem('access_token');
        if(token !== null){
            axios
                .get('http://localhost:8000/api/logout', {
                    headers:{
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    if(response.data.message === 'Logged out!'){
                        localStorage.removeItem('access_token')
                        toast.dismiss();
                        toast.success('Logout successfully', {
                            position: 'bottom-right',
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: false,
                            progress: undefined
                        });

                        setTimeout(()=> {
                            window.location.reload();
                        },500);
                    }
                })
        }
    }
    render(){
    return(
        <div className="sticky-top">
            <Navbar color="light" light expand="md" className="sticky-top px-4">
                <Link to="/" className="font-22px color-link">
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
                                    <FontAwesomeIcon icon={faCartShopping}/> Cart ({this.state.cart})
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
                                    <img src={Avatar} className="avatar-login" onClick={this.handleMenu} />
                                    <Fade in={this.state.openMenu}>
                                        <Card className="card-user">
                                            <CardBody className="text-user">
                                                <p>{this.state.name}</p>
                                                <p className="my-3">{this.state.email}</p>
                                                <Button className="background-dark-blue" onClick={this.logout}>
                                                    Logout
                                                </Button>
                                            </CardBody>
                                        </Card>
                                    </Fade>
                                </NavItem>
                            )
                            }
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
            <Modal isOpen={this.state.modal} >
                <ModalHeader toggle={this.handleModal}>
                    <div className="d-flex">
                        <div className="flex-grow-1 text-center pointer border-right" onClick={this.setForm}>
                            <p className={this.state.loginForm ? 'activetab' : ''}>Sign in</p>
                        </div>
                        <div className="flex-grow-1 text-center pointer " onClick={this.setForm}>
                            <p className={this.state.loginForm ? '' : 'activetab'}>Sign in</p>
                        </div>
                    </div>
                </ModalHeader>
                {this.state.loginForm === true ? <Login/> : <Register/>}
            </Modal>
            <ToastContainer/>
        </div>
    );
    }
}
