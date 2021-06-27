import * as React from "react";
import {List, Datagrid, TextField, BooleanField, ShowButton, EditButton, useGetIdentity} from 'react-admin';
import CircularProgress from "@material-ui/core/CircularProgress";

const ClientsList = (props) => {
    const {identity} = useGetIdentity();
    let filter = identity && props.permissions !== 'admin' ? {id: identity.client} : {};
    console.log(identity, props)


    if (props.permissions !== 'admin' && !identity) {
        return (<CircularProgress/>);
    } else {
        return (
            <List {...props} filter={filter}>
                <Datagrid>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="Название"/>
                    <BooleanField source="is_active" label="Активность"/>
                    <EditButton basePath="/clients" record="id"/>
                    <ShowButton basePath="/clients" record="id"/>
                </Datagrid>
            </List>
        );
    }
}

export default ClientsList;