import React, { Component } from 'react';
import { NodeSelectors, NodeActions } from 'store/nodes';
import { connect } from 'react-redux';

import Node from './_components/node'

import _ from 'lodash';

import {
    Col, 
    Row
} from 'reactstrap'

class Nodes extends Component {
    componentWillMount() {
        NodeActions.getAll();
    }

    loadNodes() {
        let nodes = [];

        _.forEach(this.props.nodes, (node, key) => {
            nodes.push(
                <Col xs="6" md="4" key={key}>
                    <Node node={node} />
                </Col>
            )
        })

        return nodes;
    }

    render() {
        return (
            <Col xs='12'>
                <Row>
                    {this.loadNodes()}
                </Row>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        nodes: NodeSelectors.list(state.nodes)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Nodes)

export default ConnectedComponent;