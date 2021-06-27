import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    ShowButton,
    useGetIdentity, BulkDeleteButton,
} from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Fragment} from "react";

const ProjectsList = (props) => {
    const PostBulkActionButtons = btn_props => {
        if (props.permissions === 'leader' || props.permissions === 'user') {
            return null;
        } else {
            return (
                <Fragment>
                    <BulkDeleteButton {...btn_props} />
                </Fragment>
            );
        }
    }
    const {identity} = useGetIdentity();
    let filter = identity && props.permissions !== 'admin' && props.permissions !== 'coordinator' ?
        {id: identity.projects} : {};

    if (props.permissions !== 'admin' && !identity) {
        return (<CircularProgress/>);
    } else {
        return (
            <List {...props} filter={filter} bulkActionButtons={<PostBulkActionButtons />}>
                <Datagrid>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="Название"/>
                    <BooleanField source="is_active" label="Активность"/>
                    <EditButton basePath="/projects" record="id"/>
                    <ShowButton basePath="/projects" record="id"/>
                </Datagrid>
            </List>
        )
    }
}

export default ProjectsList;