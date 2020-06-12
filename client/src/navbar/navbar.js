import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
    Navbar, 
    NavbarBrand,
    Nav
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';

class SiteNavbar extends Component {

    render() {
        return (
            <Navbar expand="md" className="home-navbar">
                <NavbarBrand className="mr-auto">SmartController</NavbarBrand>
                <Nav navbar>
                    <Link to="/"><FontAwesomeIcon icon={faHome} size="2x"/></Link>
                </Nav>
            </Navbar>
        );
    }
}

export default SiteNavbar;