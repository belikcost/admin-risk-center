import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    BooleanInput, Toolbar, SaveButton
} from 'react-admin';
import {Component} from "react";

const EditToolbar = props => {
    return (
        <Toolbar {...props}>
            <SaveButton />
        </Toolbar>
    );
};

export default class EditClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Edit {...this.props}>
                <SimpleForm toolbar={<EditToolbar/>}>
                    <TextInput source="name" validate={required()} label="Название"/>
                    <TextInput source="max_users" validate={required()} label="Макс.сотрудников"/>
                    <TextInput source="max_app" validate={required()} label="Макс.активных заявок"/>
                    <BooleanInput source="is_active" label="Активность"/>
                </SimpleForm>
            </Edit>
        );
    }
}


