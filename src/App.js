import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import HomePage from "./containers/HomePage/HomePage";
import Results from "./containers/Results/Results";
import ShowResults from "./containers/Results/ShowResults";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import SkiJumpers from "./containers/SkiJumpers/SkiJumpers";

const asyncVenues = asyncComponent(() => {
    return import("./containers/DB/Venues/DBVenues")
})
const asyncResults = asyncComponent(() => {
    return import("./containers/DB/Results/DBResults")
})
const asyncSkiClubs = asyncComponent(() => {
    return import("./containers/DB/SkiClubs/DBSkiClubs")
})
const asyncAthletes = asyncComponent(() => {
    return import("./containers/DB/Athletes/DBAthletes")
})
const asyncJury = asyncComponent(() => {
    return import("./containers/DB/Jury/DBJury")
})
const asyncHills = asyncComponent(() => {
    return import("./containers/DB/Hills/DBHills")
})

class App extends Component {

    render() {

        const routes = (
            <Switch>
                <Route path="/dbVenues" component={asyncVenues}/>
                <Route path="/dbResults" component={asyncResults}/>
                <Route path="/dbClubs" component={asyncSkiClubs}/>
                <Route path="/dbHills" component={asyncHills}/>
                <Route path="/dbJury" component={asyncJury}/>
                <Route path="/dbAthletes" component={asyncAthletes}/>
                <Route path="/results" component={Results}/>
                <Route path="/skiJumpers" component={SkiJumpers}/>
                <Route path="/showResults/:competition" exact component={ShowResults}/>
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
