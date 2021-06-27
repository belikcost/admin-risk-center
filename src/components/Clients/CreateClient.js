import * as React from "react";
import {Create, SimpleForm, TextInput, BooleanInput, required} from 'react-admin';
import {Component} from "react";

export default class CreateClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Create {...this.props}>
                <SimpleForm>
                    <TextInput source="name" label="Название" validate={required()}/>
                    <TextInput source="max_users" label="Макс.сотрудников" validate={required()}/>
                    <TextInput source="max_app" label="Макс.активных заявок" validate={required()}/>
                    <BooleanInput defaultValue={true} source="is_active" label="Активность"/>
                </SimpleForm>
            </Create>
        );
    }
}