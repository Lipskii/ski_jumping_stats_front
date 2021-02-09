import styled from "styled-components";
import {Form, ListGroup, ListGroupItem, Button} from "react-bootstrap";

export const Header5 = styled.h5`
  text-align: center;
`

export const Header31 = styled.h3`
  text-align: center;
`

export const StyledDiv1 = styled.div`
  margin: auto;
  max-width: 500px;
  text-align: center;
  padding-bottom: 10px;
`

export const StyledDiv2Right = styled.div`
  margin: auto;
  max-width: 700px;
  text-align: right;
  padding-bottom: 10px;
`

export const StyledDiv2Centered = styled.div`
  margin: auto;
  max-width: 700px;
  text-align: center;
  padding-bottom: 10px;
`

export const CheckButton = styled(Button)`
    margin:auto;
`

export const StyledFormSmall = styled(Form)`
  margin:auto;
  max-height: 150px;
  max-width: 250px;
`
export const StyledForm = styled(Form)`
  margin: auto;
  max-width: 700px;
`

export const StyledFormLabel = styled(Form.Label)`
  margin-right: 10px;
`

export const StyledFormSelect = styled(Form.Control)`
  max-width: 200px;
  border-radius: 10px;
  align-content: center;
`

export const List = styled(ListGroup)`
  text-align: center;
  max-height: 300px;
  max-width: 460px;
  overflow: scroll;
  -webkit-overflow-scrolling: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  margin: auto;
  padding-bottom: 20px;
  
`

export const ListItem = styled(ListGroupItem)`
  max-height: 40px;
  font-size: smaller;
`