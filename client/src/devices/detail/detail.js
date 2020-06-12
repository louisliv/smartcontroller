import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import DeviceApi from 'api/models/devices'

import { DeviceSelectors, DeviceActions } from 'store/devices';
import { connect } from 'react-redux';

import {
    Card,
    CardBody,
    CardTitle,
    Col,
    CardText
} from 'reactstrap'

import _ from 'lodash'

class DeviceDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };
    }

    componentWillMount() {
        console.log(this.props.match)
        DeviceActions.get(this.props.match.params.deviceId);
    }

    handlePowerOff(device) {
        DeviceApi.powerOff(device.id);
    }

    handlePowerOn(device) {
        DeviceApi.powerOn(device.id);
    }

    render() {
        return (
            <Col xs='12'>
                <Card>
                    <CardBody>
                        <div className="text-center">
                            <FontAwesomeIcon className="node-icon" icon={faPowerOff} size="3x"/>
                        </div>
                        <CardTitle className="text-center"><h2>{this.props.device.name}</h2></CardTitle>
                        <CardText>IP: {this.props.device.ip}</CardText>
                        <CardText>Type: {this.props.device.device_type_display}</CardText>
                    </CardBody>
                </Card>
            </Col>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        device: DeviceSelectors.one(state.devices, ownProps.match.params.deviceId)
    }
}

const ConnectedComponent = connect(mapStateToProps)(DeviceDetail)

export default ConnectedComponent;