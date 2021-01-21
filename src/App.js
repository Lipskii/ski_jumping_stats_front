import React, {Component} from "react";
import Layout from "./hoc/Layout/Layout";
import {withRouter, Switch, Route} from 'react-router-dom'
import NotFound from "./containers/NotFound";
import axios1 from "./axios-base";
import axios from "axios";
import {Button} from "react-bootstrap";


class App extends Component {


    state = {
        datas: []
    }

    hello1 = () => {
        axios.get('/api/skiClubs')
            .then(res => {
                //console.log(res.data)
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                console.log(fetchedOrders)
            })
    }

   hello2 = () => {
       fetch('/api/skiClubs')
           .then(res =>
               console.log(res.json()))
           .then(data => console.log(data))


       console.log("Siema" + this.state.datas)
   }

    hello3 = () => {
        console.log(this.state.datas)
    }

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
            <main>
                <br/>
                <br/>
                <Button onClick={this.hello1}>SIEMA</Button>
                <Button onClick={this.hello2}>SIEMA</Button>
                <Button onClick={this.hello3}>CHECK</Button>
            </main>
        </div>
    )
  }
}

export default withRouter(App);
