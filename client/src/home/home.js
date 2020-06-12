import React, { Component } from 'react';

import { NodeList } from 'nodes'

import {
    Container, 
    Row
} from 'reactstrap';

class Home extends Component {

    render() {
        return (
            <div className="home">
                <Container fluid className="home-container">
                    <Row>
                        <NodeList />
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;