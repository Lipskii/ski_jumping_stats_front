import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import AddSkiClub from "./containers/AddSkiClub/AddSkiClub";



class App extends Component {



  render() {

      const routes = (
          <Switch>
                <Route path="/addSkiClub" component={AddSkiClub} />
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
