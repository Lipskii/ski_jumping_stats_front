import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import DBSkiClubs from "./containers/DB/SkiClubs/DBSkiClubs";
import DBAthletes from "./containers/DB/Athletes/DBAthletes"
import DBHills from "./containers/DB/Hills/DBHills";
import DBVenues from "./containers/DB/Venues/DBVenues";
import Jury from "./containers/DB/Jury/DBJury";
import DBResults from "./containers/DB/Results/DBResults";
import HomePage from "./containers/HomePage/HomePage";
import Results from "./containers/Results/Results";

class App extends Component {


    render() {

        const routes = (
            <Switch>
                <Route path="/dbVenues" component={DBVenues}/>
                <Route path="/dbResults" component={DBResults}/>
                <Route path="/dbClubs" component={DBSkiClubs}/>
                <Route path="/dbHills" component={DBHills}/>
                <Route path="/dbJury" component={Jury}/>
                <Route path="/dbAthletes" component={DBAthletes}/>
                <Route path="/results" component={Results}/>
                <Route path="/" component={HomePage}/>
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
