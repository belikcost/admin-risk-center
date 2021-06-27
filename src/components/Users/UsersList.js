import * as React from "react";
import { Fragment } from 'react';
import {List, Datagrid, TextField, ShowButton, BooleanField, EditButton, useGetIdentity, BulkDeleteButton} from 'react-admin';
import CircularProgress from "@material-ui/core/CircularProgress";


const UsersList = (props) => {
    const PostBulkActionButtons = btn_props => {
        if (props.permissions === 'leader') {
            return null;
        } else {
            return (
                <Fragment>
                    <BulkDeleteButton {...btn_props} />
                </Fragment>
            );
        }
    };
    const {identity} = useGetIdentity();
    let filter = identity && props.permissions !== 'admin' ? {id: identity.users} : {};

    if (props.permissions !== 'admin' && !identity) {
        return (<CircularProgress/>);
    } else {
        return (
            <List {...props} filter={filter} bulkActionButtons={<PostBulkActionButtons />}>
                <Datagrid>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="ФИО"/>
                    <BooleanField source="is_active" label="Активность"/>
                    <EditButton basePath="/users" record="id"/>
                    <ShowButton basePath="/users" record="id"/>
                </Datagrid>
            </List>
        );
    }
}

export default UsersList;