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
    CardText,
    Row,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'

import { CirclePicker, SwatchesPicker } from 'react-color';

class DeviceDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };

        this.handleColorChange = this.handleColorChange.bind(this);
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

    handleColorChange(color, event) {
        DeviceApi.changeColor(this.props.device.id, color.hex);
    }

    render() {
        let colorPicker;
        if (this.props.device && this.props.device.device_type == 'BULB'){
            colorPicker = (
                <SwatchesPicker width={600} height={300} onChange={this.handleColorChange}/>
            )
        }
        return (
            <Row>
                <Col xs='12'>
                    <Card className="controller-card">
                        <CardBody>
                            <div className="text-center text-white">
                                <FontAwesomeIcon className="node-icon" icon={faPowerOff} size="3x"/>
                            </div>
                            <CardTitle className="text-center"><h2>{this.props.device.name}</h2></CardTitle>
                            <CardText>IP: {this.props.device.ip}</CardText>
                            <CardText>Type: {this.props.device.device_type_display}</CardText>
                            {colorPicker}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
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