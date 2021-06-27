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
    useGetIdentity,
    useCreate,
    useRedirect,
    useNotify,
} from 'react-admin';
import {useCallback, useContext} from "react";


const CreateUser = (props) => {
    const {identity} = useGetIdentity();
    let clients_filter = identity && props.permissions !== 'admin' ? {id: identity.client} : {},
        projects_filter = identity && props.permissions !== 'admin' ? {id: identity.projects} : {},
        users_filter = identity && props.permissions !== 'admin' ? {id: identity.users} : {};
    const users = useGetList('users', undefined, undefined, users_filter);
    const projects = useGetList('projects', undefined, undefined, projects_filter);
    const clients = useGetList('clients', undefined, undefined, clients_filter);
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
    if (clients.loading || users.loading || projects.loading) {
        return null;
    } else {
        return (
            <Create {...props}>
                <SimpleForm save={save}>
                    <TextInput source="name" label="ФИО" validate={required()}/>
                    <BooleanInput source="is_active" label="Активность" defaultValue={true}/>
                    <AutocompleteInput source="client" label="Клиент" choices={Object.values(clients.data)}
                                       validate={required()}/>
                    <TextInput source="role" label="Роль" validate={required()}/>
                    <AutocompleteInput source="leader" label="Руководитель" choices={Object.values(users.data)}/>
                    <SelectArrayInput source="users" label="Сотрудники" choices={Object.values(users.data)}/>
                    <SelectArrayInput source="projects" label="Проекты" choices={Object.values(projects.data)}/>
                </SimpleForm>
            </Create>
        );
    }
}

export default CreateUser;