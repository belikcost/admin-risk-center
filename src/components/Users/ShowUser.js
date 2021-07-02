import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    SelectField,
    ReferenceManyField,
    Datagrid,
    useRecordContext,
    TextField,
    BooleanField,
    ShowButton, useGetList, useShowContext
} from 'react-admin';
import PropTypes from 'prop-types';
import roles from '../../roles'
import {useMediaQuery, Typography} from "@material-ui/core";
import CardsList from "../CardsList";
import {makeStyles} from "@material-ui/core/styles";
import Loading from "../Loading";

const ShowLayout = (props) => {
    const {record} = useShowContext();
    const clients = useGetList('clients');
    const users = useGetList('users');
    const leader_users = useGetList("users", undefined, undefined, {leader: props.id});
    if (clients.loading || users.loading || leader_users.loading) {
        return <Loading/>;
    } else {
        return (
            <SimpleShowLayout>
                <TextField source="id" label="ID"/>
                <TextField source="name" label="ФИО"/>
                <BooleanField source="is_active" label="Активность"/>
                {record.client && <SelectField source="client" label="Клиент" choices={Object.values(clients.data)}/>}
                <SelectField source="role" label="Роль" choices={roles}/>
                {record.leader &&
                <SelectField source="leader" label="Руководитель" choices={Object.values(users.data)}/>}
                {Object.values(leader_users.data).length !== 0 && <TableField source="users" label="Сотрудники"/>}
            </SimpleShowLayout>
        );
    }
}

const ShowUser = (props) => {
    return (
        <Show {...props}>
            <ShowLayout id={props.id}/>
        </Show>
    );
}

const TableField = (props) => {
    const {source} = props;
    const record = useRecordContext(props);
    const list = record[source];
    const useStyles = makeStyles(() => ({
        listLabel: {
            fontSize: '13px',
            margin: '8px 0'
        }
    }));
    const classes = useStyles();
    const isShowCard = useMediaQuery('(max-width: 1000px)');
    return (
        <>
            <Typography className={classes.listLabel}>Сотрудники</Typography>
            <ReferenceManyField reference="users" target="leader">
                {isShowCard ? <CardsList edit={false}/> : <Datagrid>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="ФИО"/>
                    <SelectField source="role" label="Роль" choices={roles}/>
                    <ShowButton basePath={'/' + source} record="id"/>
                </Datagrid>}
            </ReferenceManyField>
        </>
    );
}

TableField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};

export default ShowUser;