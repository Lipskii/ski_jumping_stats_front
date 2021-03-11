import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import SkiClubs from "./containers/AddSkiClub/SkiClubs";
import Athletes from "./containers/AddAthlete/Athletes"
import Hills from "./containers/Hills/Hills";
import Venues from "./containers/Venues/Venues";


class App extends Component {


    render() {

        const routes = (
            <Switch>
                <Route path="/addVenue" component={Venues}/>
                <Route path="/addSkiClub" component={SkiClubs}/>
                <Route path="/addHill" component={Hills}/>
                <Route path="/addAthlete" component={Athletes}/>
                <Route path="/" exact/>
                <Route component={NotFound}/>
            </Switch>
        )


        return (
            <Layout>
                {routes}
            </Layout>
        )
    }
}

export default withRouter(App);
