import React, {Component} from "react";
import axios from "axios";


class HomePage extends Component {
    state = {

    }

    //for a moment, it's purpose is
    componentDidMount() {
        axios.post("/api/overallStandings/calculate",{
            seriesId: 9,
            season: 2021
        })
            .then(res => console.log(res))
            .catch(error => console.log(error))
    }



    render() {

        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}


export default HomePage