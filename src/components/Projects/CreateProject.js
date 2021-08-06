import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    required, BooleanInput,
    DataProviderContext
} from 'react-admin';
import {useContext, useEffect, useState} from "react";
import Loading from "../Loading";

const CreateProject = (props) => {
    const dataProvider = useContext(DataProviderContext);
    const [clients, setClients] = useState({});
    const [users, setUsers] = useState({});
    const defaultUserFilter = {role: 'leader'};
    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            dataProvider.getList("users", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role === 'admin' ? defaultUserFilter  : {...defaultUserFilter, client: res.client}
            }).then(r => setUsers(r));
            dataProvider.getList("clients", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role === 'admin' ? {} : {id: res.client}
            }).then(r => setClients(r));
        });
    }, []);
    if (!users.data || !clients.data) {
       return (<Loading/>);
    } else {
        console.log(clients, users)
        return (
            <Create {...props}>
                <SimpleForm>
                    <TextInput source="name" validate={required()} label="Название"/>
                    <SelectInput source="client" label="Клиент" choices={clients.data}
                                 validate={required()}/>
                    <SelectInput source="leader" label="Руководитель" choices={users.data}
                                 validate={required()}/>
                    <BooleanInput source="is_active" label="Активность" defaultValue={true}/>
                </SimpleForm>
            </Create>
        );
    }
}

export default CreateProject;