import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";


class App extends Component {


  render() {

      const routes = (
          <Switch>
                <Route path="/addSkiClub" exact />
                <Route path="/" exact/>
                <Route component={NotFound}/>
          </Switch>
      )

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    )
  }
}

export default withRouter(App);
