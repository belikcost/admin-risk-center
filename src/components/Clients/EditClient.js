import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    required,
    BooleanInput
} from 'react-admin';
import {Component} from "react";

export default class EditClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Edit {...this.props}>
                <SimpleForm>
                    <TextInput source="id" label="ID" disabled/>
                    <TextInput source="name" validate={required()} label="Название"/>
                    <TextInput source="max_users" validate={required()} label="Макс.сотрудников"/>
                    <TextInput source="max_app" validate={required()} label="Макс.активных заявок"/>
                    <BooleanInput source="is_active" label="Активность"/>
                </SimpleForm>
            </Edit>
        );
    }
}


