import * as React from "react";
import {List, Datagrid, TextField, BooleanField, ShowButton, EditButton} from 'react-admin';
import {useMediaQuery} from '@material-ui/core';
import CardsList from "../CardsList";
import {useEffect, useState} from "react";
import Loading from "../Loading";

const ClientsList = (props) => {
    const isShowCard = useMediaQuery('(max-width: 1135px)');
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            res.role !== 'admin' && setFilter({id: res.client});
            setIsLoading(false);
        });
    }, [])

    if (props.permissions !== 'admin' && isLoading) {
        return (<Loading/>);
    } else {
        return (
        <List {...props} filter={filter} bulkActionButtons={null}>
            {isShowCard ?  <CardsList edit={true} delete={false}/> :
                <Datagrid>
                <TextField source="id" label="ID"/>
                <TextField source="name" label="Название"/>
                <BooleanField source="is_active" label="Активность"/>
                <EditButton basePath="/clients" record="id"/>
                <ShowButton basePath="/clients" record="id"/>
            </Datagrid>}

        </List>
        );
    }
}

export default ClientsList;