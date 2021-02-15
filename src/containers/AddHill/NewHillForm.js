import React from "react";
import TextInputForm from "../../components/CommonForms/TextInputForm";
import SelectInputForm from "../../components/CommonForms/SelectInputForm";
import {StyledDiv2Right800} from "../../components/StyledComponents";
import {Button, Form} from "react-bootstrap";


const NewHillForm = (props) => (
    <Form.Group>
        <TextInputForm title={"Name"} onChangeValue={props.onChangeName}/>
        <SelectInputForm
            title={"Size of hill"}
            items={props.sizesOfHill}
            valuesToShow={["designation"," ", "(","minHS","-","maxHS",")"]}
            onChangeValue={props.onChangeSizeOfHill}
        />

        <StyledDiv2Right800>
            <Button variant="primary" onClick={props.addNewHill}
                    disabled={props.newHillName.length < 1 || props.selectedVenueId === ""
                    || props.newHillSizeOfHillId === ""}>
                Add new hill
            </Button>
        </StyledDiv2Right800>
    </Form.Group>

)



export default NewHillForm