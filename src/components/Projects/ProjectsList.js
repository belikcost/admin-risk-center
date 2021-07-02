import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    ShowButton,
    BulkDeleteButton,
} from 'react-admin';
import {Fragment, useEffect, useState} from "react";
import {useMediaQuery} from "@material-ui/core";
import CardsList from "../CardsList";
import Loading from "../Loading";

const ProjectsList = (props) => {
    const isShowCard = useMediaQuery('(max-width: 1135px)');
    const [filter, setFilter] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const permission = props.permissions === 'leader' || props.permissions === 'user';
    const PostBulkActionButtons = btn_props => {
        if (permission) {
            return null;
        } else {
            return (
                <Fragment>
                    <BulkDeleteButton {...btn_props} />
                </Fragment>
            );
        }
    }
    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            !permission && setFilter({id: res.projects});
            setIsLoading(false);
        });
    }, [])
    if (permission && isLoading) {
        return (<Loading/>);
    } else {
        return (
            <List {...props} filter={filter} bulkActionButtons={<PostBulkActionButtons />}>
                {isShowCard ? <CardsList edit={true} delete={!permission}/> :
                    <Datagrid>
                        <TextField source="id" label="ID"/>
                        <TextField source="name" label="Название"/>
                        <BooleanField source="is_active" label="Активность"/>
                        <EditButton basePath="/projects" record="id"/>
                        <ShowButton basePath="/projects" record="id"/>
                    </Datagrid>
                }
            </List>
        )
    }
}

export default ProjectsList;