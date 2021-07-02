import * as React from "react";
import {Fragment, useEffect, useState} from 'react';
import {
    List,
    Datagrid,
    TextField,
    ShowButton,
    BooleanField,
    EditButton,
    BulkDeleteButton
} from 'react-admin';
import {useMediaQuery} from "@material-ui/core";
import CardsList from '../CardsList';
import Loading from "../Loading";

const UsersList = (props) => {
    const [filter, setFilter] = useState({});
    const isShowCard = useMediaQuery('(max-width: 1135px)');

    useEffect(() => {
        props.permissions !== 'admin' && fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            setFilter({id: res.users});
        });
    }, []);

    if (props.permissions !== 'admin' && Object.keys(filter).length === 0) {
        return <Loading/>;
    } else {
        return (
            <List {...props} filter={{role: ['leader', 'null', 'user', 'coordinator']}} bulkActionButtons={null}>
                {isShowCard ?
                    <CardsList edit={true} delete={false}/>
                    :
                    <Datagrid>
                        <TextField source="id" label="ID"/>
                        <TextField source="name" label="ФИО"/>
                        <BooleanField source="is_active" label="Активность"/>
                        <EditButton basePath="/users" record="id"/>
                        <ShowButton basePath="/users" record="id"/>
                    </Datagrid>
                }
            </List>
        );
    }
}

export default UsersList;