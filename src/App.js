import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import SkiClubs from "./containers/SkiClubs/SkiClubs";
import Athletes from "./containers/Athletes/Athletes"
import Hills from "./containers/Hills/Hills";
import Venues from "./containers/Venues/Venues";
import Jury from "./containers/Jury/Jury";
import Results from "./containers/Results/Results";


//TODO  look at delete in api
//TODO find and download flags miniatures, add photos to athletes form; fix update to country (cities)

class App extends Component {


    render() {

        const routes = (
            <Switch>
                <Route path="/dbVenues" component={Venues}/>
                <Route path="/dbResults" component={Results}/>
                <Route path="/dbClubs" component={SkiClubs}/>
                <Route path="/dbHills" component={Hills}/>
                <Route path="/dbJury" component={Jury}/>
                <Route path="/dbAthletes" component={Athletes}/>
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
