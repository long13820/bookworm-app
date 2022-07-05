import React from "react";
import "./header.css";


export default class Header extends React.Component{

    render(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top px-5">
            <a className="navbar-brand" href="#">BOOKWORM</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/shop">Shop</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/cart">Cart(0)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Sign in</a>
                    </li>

                </ul>

            </div>
        </nav>
    );
}

export default Header;
