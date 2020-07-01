import React, { Component } from 'react';

import { NodeList } from 'nodes'

import {
    Row
} from 'reactstrap';

class Home extends Component {

    render() {
        return (
            <Row>
                <NodeList />
            </Row>
        );
    }
}

export default Home;