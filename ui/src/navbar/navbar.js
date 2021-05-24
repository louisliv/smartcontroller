import React, { Component } from 'react';
import { Link } from "react-router-dom";

import {
    Navbar, 
    NavbarBrand,
    Nav,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
} from 'reactstrap';

import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus } from '@fortawesome/free-solid-svg-icons';

class SiteNavbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdown: false,
        };
    }
    toggle(event, device) {
        event.preventDefault();
        let newState = _.clone(this.state)
        newState.dropdown = ! newState.dropdown 
        this.setState(newState);
    }
    render() {
        return (
            <Navbar color="dark" dark expand="md" className="home-navbar">
                <NavbarBrand className="mr-auto">SmartController</NavbarBrand>
                <Nav navbar>
                    <Link to={"/add-kasa"} className="text-white">
                        <FontAwesomeIcon id="add-icon" 
                            icon={faPlus} 
                            size="2x"
                            style={{marginRight:'10px', cursor:'pointer'}}/>
                    </Link>
                    <Link to="/" className="text-white"><FontAwesomeIcon icon={faHome} size="2x"/></Link>
                </Nav>
            </Navbar>
        );
    }
}

export default SiteNavbar;