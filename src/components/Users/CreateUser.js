import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    AutocompleteInput,
    required,
    SelectArrayInput,
    useGetList,
    DataProviderContext,
    useCreate,
    useRedirect,
    useNotify,
} from 'react-admin';
import {useCallback, useContext, useEffect, useState} from "react";
import roles from "../../roles";
import Loading from "../Loading";


const CreateUser = (props) => {
    const [usersFilter, setUsersFilter] = useState({});
    const [clientsFilter, setClientsFilter] = useState({});
    const [projectsFilter, setProjectsFilter] = useState({});
    const dataProvider = useContext(DataProviderContext);
    const [create] = useCreate('users');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath} = props;
    const save = useCallback(
        async (values, redirect) => {
            if (values.client && values.is_active === true) {
                let max, now;
                await dataProvider.getOne('clients', {id: values.client}).then(response => max = response.data.max_users);
                await dataProvider
                    .getList('users', {
                        pagination: {page: 1, perPage: 9999},
                        sort: {field: 'id', order: 'ASC'},
                        filter: {client: values.client, is_active: true}
                    }).then(response => {
                        now = response.data.length;
                    });
                if (now >= max) {
                    notify('У данного клиента больше не может быть активных учетных записей!')
                    return;
                }
            }
            create(
                {
                    payload: {data: {...values, average_note: 10}},
                },
                {
                    onSuccess: ({data: newRecord}) => {
                        notify('ra.notification.created', 'info', {
                            smart_count: 1,
                        });
                        redirectTo(redirect, basePath, newRecord.id, newRecord);
                    },
                }
            );
        },
        [create, notify, redirectTo, basePath]
    );

    useEffect(() => {
        props.permissions !== 'admin' && fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            setUsersFilter({id: res.users});
            setClientsFilter({id: res.client});
            setProjectsFilter({id: res.projects});
        });
    }, []);

    const users = useGetList('users', undefined, undefined, usersFilter);
    const projects = useGetList('projects', undefined, undefined, projectsFilter);
    const clients = useGetList('clients', undefined, undefined, clientsFilter);

    if (Object.keys(usersFilter).length === 0) {
        return <Loading/>;
    } else {
        return (
            <Create {...props}>
                <SimpleForm save={save}>
                    <TextInput source="name" label="ФИО" validate={required()}/>
                    <BooleanInput source="is_active" label="Активность" defaultValue={true}/>
                    <AutocompleteInput source="client" label="Клиент" choices={Object.values(clients.data)}
                                       validate={required()}/>
                    <AutocompleteInput source="role" label="Роль" choices={props.permissions !== 'admin' ? roles.filter(e =>
                        e.id !== 'admin') : roles} validate={required()}/>
                    <AutocompleteInput source="leader" label="Руководитель" choices={Object.values(users.data)}/>
                    <SelectArrayInput source="users" label="Сотрудники" choices={Object.values(users.data)}/>
                    <SelectArrayInput source="projects" label="Проекты" choices={Object.values(projects.data)}/>
                </SimpleForm>
            </Create>
        );
    }
}

export default CreateUser;