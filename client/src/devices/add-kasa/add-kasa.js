import React, { Component } from 'react';
import { Link } from "react-router-dom";

import DeviceApi from 'api/models/devices'

import {
    Col,
    ListGroup,
    ListGroupItem,
    Row
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash';

class AddKasaDevice extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        DeviceApi.discover().then((response) => {
            this.setState({'devices':response})
        });
    }

    loadNewDevices() { 
        if (this.state.devices) {
            let devices = [];
            _.forEach(this.state.devices, (device, key) => {
                devices.push(
                    <ListGroupItem key={key} className="bg-dark">
                        <Link to={{
                                pathname: '/add-device',
                                state: {
                                    kasaDevice: device
                                }
                            }}>
                            {device.name}
                        </Link>
                    </ListGroupItem>
                )
            })
            return (
                <ListGroup>
                    {devices}
                </ListGroup>
            );
        } else {
            return (
                <div className="text-center">
                    <FontAwesomeIcon icon={faSpinner} spin size="8x"></FontAwesomeIcon>
                </div>
                )
        }
        
    }

    render() {
        return (
            <Row>
                <Col xs='12'>
                    <ListGroup className='bg-dark'>
                        {this.loadNewDevices()}
                    </ListGroup>
                </Col>
            </Row>
        )
    }
}

export default AddKasaDevice;