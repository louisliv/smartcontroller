import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faPlug } from '@fortawesome/free-solid-svg-icons'
import { faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import DeviceApi from 'api/models/devices'
import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardTitle,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    DropdownItem
} from 'reactstrap'

import _ from 'lodash'

class Node extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false,
        };
    }

    toggle(event) {
        event.preventDefault();
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    handlePowerOff(device) {
        DeviceApi.powerOff(device.id);
    }

    handlePowerOn(device) {
        DeviceApi.powerOn(device.id);
    }

    loadDeviceIcons() {
        let deviceIcons = [];
        let icon;

        _.forEach(this.props.node.devices, (device, key) => {
            if (device.device_type === 'Raspberry Pi') {
                icon = faRaspberryPi
            } else {
                icon = faPlug
            }
            deviceIcons.push(
                <div key={key} >
                    <Dropdown isOpen={this.state.popoverOpen} target={'icon'+key} toggle={this.toggle}>
                        <DropdownToggle>
                            <FontAwesomeIcon id={'icon'+key} icon={icon}/>
                        </DropdownToggle>
                        <DropdownMenu >
                        <DropdownItem onClick={() => this.handlePowerOn(device)}>Power On</DropdownItem>
                            <DropdownItem onClick={() => this.handlePowerOff(device)}>Power Off</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            )
        })

        return deviceIcons;
    }

    render() {
        return (
            <Link to={"/nodes/"+ this.props.node.id}>
                <Card>
                    <CardBody>
                        <div className="text-center">
                            <FontAwesomeIcon className="node-icon" icon={faPowerOff} size="3x"/>
                        </div>
                        <CardTitle className="text-center"><h2>{this.props.node.name}</h2></CardTitle>
                        <div className="text-right">
                            {this.loadDeviceIcons()}
                        </div>
                    </CardBody>
                </Card>
            </Link>
        )
    }
}

export default Node;