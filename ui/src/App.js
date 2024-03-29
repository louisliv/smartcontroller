import React from 'react';
import './App.css';
import './custom.scss';
import Home from './home';
import NodeDetail from './nodes/detail';
import DeviceDetail from './devices/detail';
import AddKasaDevice from './devices/add-kasa';
import AddDevice from './devices/add-device';

import { Route, Switch } from "react-router-dom";
import {
  Container,
} from 'reactstrap';

import SiteNavbar from './navbar';

function App() {
  return (
        <div>
            <SiteNavbar/>
            <Container fluid className="home-container">
                <Switch>
                  <Route exact path="/"><Home/></Route>
                  <Route path="/nodes/:nodeId" component={NodeDetail}/>
                  <Route path="/devices/:deviceId" component={DeviceDetail}/>
                  <Route path="/add-device" component={AddDevice}/>
                  <Route path="/add-kasa" component={AddKasaDevice}/>
                </Switch>
            </Container>
        </div>
  );
}

export default App;
