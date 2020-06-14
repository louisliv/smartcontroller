import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import DeviceApi from 'api/models/devices'

import { NodeSelectors, NodeActions } from 'store/nodes';
import { connect } from 'react-redux';

import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Row,
} from 'reactstrap'

import _ from 'lodash'
import { Link } from 'react-router-dom';

class NodeDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
        };
    }

    componentWillMount() {
        NodeActions.get(this.props.match.params.nodeId);
    }

    handlePowerOff(device) {
        DeviceApi.powerOff(device.id);
    }

    handlePowerOn(device) {
        DeviceApi.powerOn(device.id);
    }

    loadDevices() {
        let devices = [];

        _.forEach(this.props.node.devices, (device, key) => {
            devices.push(
                <Col xs='4' key={key}>
                    <Link to={"/devices/" + device.id }>
                        <Card>
                            <CardBody>
                                <div className="text-center">
                                    <FontAwesomeIcon className="node-icon" icon={faPowerOff} size="3x"/>
                                </div>
                                <CardTitle className="text-center"><h2>{device.name}</h2></CardTitle>
                            </CardBody>
                        </Card>
                    </Link>
                </Col>
            )
        })

        return devices;
    }

    render() {
        return (
            <Row>
                {this.props.nodeId}
                {this.loadDevices()}
            </Row>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        node: NodeSelectors.one(state.nodes, ownProps.match.params.nodeId)
    }
}

const ConnectedComponent = connect(mapStateToProps)(NodeDetail)

export default ConnectedComponent;