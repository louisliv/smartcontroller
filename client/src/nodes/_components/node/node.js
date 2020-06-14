import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff, faPlug } from '@fortawesome/free-solid-svg-icons'
import { faRaspberryPi } from '@fortawesome/free-brands-svg-icons'
import DeviceApi from 'api/models/devices'
import NodeApi from 'api/models/nodes'
import { Link } from "react-router-dom";

import {
    Card,
    CardBody,
    CardTitle,
    DropdownMenu,
    DropdownToggle,
    Dropdown,
    DropdownItem,
    Button
} from 'reactstrap'

import _ from 'lodash'

class Node extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdowns: {},
        };
    }

    toggle(event, device) {
        event.preventDefault();
        let newState = _.clone(this.state)
        newState.dropdowns[device.id].open = ! newState.dropdowns[device.id].open 
        this.setState(newState);
    }

    componentWillMount(device){
        let newState = _.clone(this.state)
        _.forEach(this.props.node.devices, (device, key) => {
            newState.dropdowns[device.id] = {open: false}
        })

        this.setState(newState);
    }

    handlePowerOff(device) {
        DeviceApi.powerOff(device.id);
    }

    handlePowerOn(device) {
        DeviceApi.powerOn(device.id);
    }

    handleNodePower(event, node) {
        event.preventDefault()
        NodeApi.togglePower(node.id);
    }

    loadDeviceIcons() {
        let deviceIcons = [];
        let icon;

        _.forEach(this.props.node.devices, (device, key) => {
            if (device.device_type === 'PI') {
                icon = faRaspberryPi
            } else {
                icon = faPlug
            }

            deviceIcons.push(
                <div key={key} >
                    <Dropdown isOpen={this.state.dropdowns[device.id].open} target={'icon'+key} toggle={(event) => this.toggle(event, device)}>
                        <DropdownToggle className="device-button">
                            <FontAwesomeIcon id={'icon'+key} icon={icon}/>
                        </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem><Link to={"/devices/" + device.id }>Details</Link></DropdownItem>
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
            
                <Card className="controller-card">
                    <CardBody>
                        <div className="text-center">
                            <Button className="node-icon" >
                                <FontAwesomeIcon 
                                    onClick={(event) => this.handleNodePower(event, this.props.node)} 
                                    icon={faPowerOff} 
                                    size="3x"/>
                            </Button>
                        </div>
                        <Link to={"/nodes/"+ this.props.node.id}>
                            <CardTitle className="text-center text-white"><h2>{this.props.node.name}</h2></CardTitle>
                        </Link>
                        <div className="flex justify-content-end">
                            {this.loadDeviceIcons()}
                        </div>
                    </CardBody>
                </Card>
        )
    }
}

export default Node;