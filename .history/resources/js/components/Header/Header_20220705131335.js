import React from "react";
import { Navbar } from "reactstrap";
import "./header.css";


export default class Header extends React.Component{

    render(){
    return(
        <div className="sticky-top">
            <Navbar color="light" light>

            </Navbar>

        </div>
    );
    }
}
