import * as React from "react";
import {
    Show,
    TabbedShowLayout,
    SelectField,
    ReferenceManyField,
    Datagrid,
    Tab,
    TextField,
    BooleanField,
    ShowButton
} from 'react-admin';
import {Component} from "react";
import PropTypes from 'prop-types';
import { useRecordContext } from 'react-admin';

export default class ShowClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            clients: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:3004/clients').then((res) => res.json())
            .then((res) => this.setState({clients: res}));
        fetch('http://localhost:3004/users').then((res) => res.json())
            .then((res) => this.setState({users: res}));
    }

    render() {
        return (
            <Show {...this.props}>
                <TabbedShowLayout>
                    <Tab label="Main">
                        <TextField source="id" label="ID"/>
                        <TextField source="name" label="ФИО"/>
                        <BooleanField source="is_active" label="Активность"/>
                        <SelectField source="client" label="Клиент" choices={this.state.clients}/>
                        <TextField source="role" label="Роль"/>
                        <SelectField source="leader" label="Руководитель" choices={this.state.users}/>
                        <TableField source="users" label="Сотрудники"/>
                    </Tab>
                </TabbedShowLayout>
            </Show>
        );
    }
}
const TableField = (props) => {
    const { source } = props;
    const record = useRecordContext(props);
    const list = record[source];
    return (
        <ReferenceManyField reference="users" filter={{'id': list}} target="user_id" label="Users">
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="role" />
                <ShowButton basePath={'/'+source} record="id"/>
            </Datagrid>
        </ReferenceManyField>
    );
}

TableField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};