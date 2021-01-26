import styled from "styled-components";
import {Form, ListGroup, ListGroupItem} from "react-bootstrap";

export const Header3 = styled.h3`
  text-align: center;
`
export const StyledForm = styled(Form)`
  margin: auto;
  max-height: 150px;
  max-width: 250px;
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
  max-width: 500px;
  overflow: scroll;
  -webkit-overflow-scrolling: inherit;
  overflow-x: hidden;
  overflow-y: auto;
  margin: auto;
`

export const ListItem = styled(ListGroupItem)`
  max-height: 40px;
  font-size: smaller;
`