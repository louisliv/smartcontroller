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
                    <Dropdown isOpen={this.state.dropdown} 
                        target={'add-icon'} 
                        toggle={this.toggle}>
                        <DropdownToggle tag="div" className="text-white">
                            <FontAwesomeIcon id="add-icon" 
                                icon={faPlus} 
                                size="2x"
                                style={{marginRight:'10px', cursor:'pointer'}}/>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem><Link to={"/add-pi"}>Raspberry Pi</Link></DropdownItem>
                            <DropdownItem><Link to={"/add-kasa"}>Kasa Smart Device</Link></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Link to="/" className="text-white"><FontAwesomeIcon icon={faHome} size="2x"/></Link>
                </Nav>
            </Navbar>
        );
    }
}

export default SiteNavbar;