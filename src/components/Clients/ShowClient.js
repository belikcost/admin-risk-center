import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
} from 'react-admin';
import {Component} from "react";


export default class ShowClient extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Show {...this.props}>
                <SimpleShowLayout>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="Название"/>
                    <BooleanField source="is_active" label="Активность"/>
                    <TextField source="max_users" label="Макс.сотрудников"/>
                    <TextField source="max_app" label="Макс.активных заявок"/>
                </SimpleShowLayout>
            </Show>
        );
    }
}
