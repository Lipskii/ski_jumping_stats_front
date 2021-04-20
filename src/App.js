import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import Results from "./containers/Results/Results";
import ShowResults from "./containers/Results/ShowResults";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";
import SkiJumpers from "./containers/SkiJumpers/SkiJumpers";
import ShowSkiJumper from "./containers/SkiJumpers/ShowSkiJumper";
import Hills from "./containers/Hills/Hills";
import ShowHill from "./containers/Hills/ShowHill";
import ShowSeries from "./containers/Series/ShowSeries";
import ShowChampionship from "./containers/Championships/ShowChampionship";

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

    // componentDidMount() {
    //     AuthService.login("frontend","221plamal07")
    //         .catch(error => console.log(error))
    // }

    //TEMPORARY SOLUTION
    render() {
        // AuthService.login("frontend","221plamal07")
        //     .catch(error => console.log(error))
        const routes = (
            <Switch>
                <Route path="/dbVenues" component={asyncVenues}/>
                <Route path="/dbResults" component={asyncResults}/>
                <Route path="/dbClubs" component={asyncSkiClubs}/>
                <Route path="/dbHills" component={asyncHills}/>
                <Route path="/dbJury" component={asyncJury}/>
                <Route path="/dbAthletes" component={asyncAthletes}/>
                <Route path="/skiJumpers" component={SkiJumpers}/>
                <Route path="/showSeries/:series" component={ShowSeries}/>
                <Route path="/showChampionships/:championship" component={ShowChampionship}/>
                <Route path="/hills" component={Hills}/>
                <Route path="/hill/:hill" exact component={ShowHill}/>
                <Route path="/showResults/:competition" exact component={ShowResults}/>
                <Route path="/skiJumper/:skiJumper" exact component={ShowSkiJumper}/>
                <Route path="/" component={Results}/>
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
