import React, {Component} from "react";
import Toolbar from '../../components/Navigation/Toolbar'
import styled from "styled-components";

const StyledMain = styled.main`
  padding-top: 80px;
`

class Layout extends Component{


    render() {
        return(
            <React.Fragment>
                <Toolbar/>
                <StyledMain>
                    {this.props.children}
                </StyledMain>
            </React.Fragment>
        )
    }
}



export default Layout