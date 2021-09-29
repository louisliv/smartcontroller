import React, { Component } from 'react';

import DeviceApi from 'api/models/devices'

import Select from 'react-select';

import { NodeSelectors, NodeActions } from 'store/nodes';
import { DeviceActions } from 'store/devices';
import { connect } from 'react-redux';

import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    InputGroup,
    InputGroupAddon,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody
} from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import _ from 'lodash';

class AddDevice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            device: {},
            node: {},
            modalOpen: false,
            types: [],
            type: null
        };

        this.toggle = this.toggle.bind(this);
        this.onNodeSubmit = this.onNodeSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        NodeActions.getAll();
        DeviceApi.getDeviceTypes().then((response) => {
            this.setState({'types':response})
        });
        if (this.props.location.state.kasaDevice) {
            this.setState({
                device: this.props.location.state.kasaDevice
            })
        }
    }

    handleChange(value, index) {
        let device = this.state.device;
    
        if (device[index]) {
            _.merge(device[index], value);
        } else {
            device[index] = value
        }
        
        this.setState({
            device: device
        })
    }

    handleNodeChange(event, index) {
        let value = event.target.value
        let node = this.state.node;
    
        node[index] = value
        
        this.setState({
            node: node
        })
    }

    handleTypeChange(event, index) {
        let value = event.value
            
        this.setState({
            type: value
        })
    }

    onNodeSubmit(event) {
        event.preventDefault();
        NodeActions.create(this.state.node).then((response) => {
            this.toggle()
        })
    }

    onSubmit(event) {
        event.preventDefault();
        let device = {
            ip: this.state.device.ip,
            device_type: this.state.type,
            node: this.state.device.node.id,
            mac: this.state.device.mac
        }
        DeviceActions.create(device);
    }

    getOptionValue(option) {
        return option.id
    }

    getOptionLabel(option) {
        return option.name
    }

    getDeviceOptionValue(option) {
        return option.value
    }

    getDeviceOptionLabel(option) {
        return option.display
    }

    toggle(){
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        return (
            <Row>
                <Col xs='12'>
                    <Form>
                        <FormGroup>
                            <Label>IP</Label>
                            <Input value={this.state.device.ip}
                                onChange={(value) => this.handleChange(value, 'ip')}/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Node</Label>
                            <InputGroup>
                                <Select type="select" 
                                    name='node-select'
                                    options={this.props.nodes}
                                    className='text-dark node-select'
                                    onChange={(option) => this.handleChange(option, 'node')}
                                    getOptionValue={this.getOptionValue}
                                    getOptionLabel={this.getOptionLabel}/>
                                <InputGroupAddon addonType='append'>
                                    <Button color='success' onClick={this.toggle}>
                                        <FontAwesomeIcon icon={faPlus}/>
                                    </Button>
                                    </InputGroupAddon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label>Device Type</Label>
                            <InputGroup>
                                <Select type="select" 
                                    name='type-select'
                                    options={this.state.types}
                                    className='text-dark node-select'
                                    onChange={(option) => this.handleTypeChange(option, 'node')}
                                    getOptionValue={this.getDeviceOptionValue}
                                    getOptionLabel={this.getDeviceOptionLabel}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Button color="success" onClick={this.onSubmit}>Save</Button>
                        </FormGroup>
                    </Form>
                    <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
                        <ModalHeader>Add Node</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <Input value={this.state.node.name}
                                        onChange={(event) => this.handleNodeChange(event, 'name')}/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                            <Button color="success" onClick={this.onNodeSubmit}>Save</Button>
                        </ModalFooter>
                    </Modal>
                </Col>
            </Row>
        )
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        nodes: NodeSelectors.list(state.nodes)
    }
}

const ConnectedComponent = connect(mapStateToProps)(AddDevice)

export default ConnectedComponent;