import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    AutocompleteInput,
    required,
    SelectArrayInput,
    useGetList,
    useGetIdentity, DataProviderContext, useUpdate, useRedirect, useNotify
} from 'react-admin';
import {useCallback, useContext} from "react";

const EditUser = (props) => {
    const {identity} = useGetIdentity();
    let clients_filter = identity && props.permissions !== 'admin' ? {id: identity.client} : {},
        projects_filter = identity && props.permissions !== 'admin' ? {id: identity.projects} : {},
        users_filter = identity && props.permissions !== 'admin' ? {id: identity.users} : {};
    const users = useGetList('users', undefined, undefined, users_filter);
    const projects = useGetList('projects', undefined, undefined, projects_filter);
    const clients = useGetList('clients', undefined, undefined, clients_filter);
    const dataProvider = useContext(DataProviderContext);
    const [update] = useUpdate('users');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath} = props;
    const save = useCallback(
        async (values) => {
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
            update('users', values.id, values);
            redirectTo("/users");
        },
        [update, notify, redirectTo, basePath]
    );
    if (clients.loading || users.loading || projects.loading) {
        return null;
    } else {
        return (
            <Edit {...props}>
                <SimpleForm save={save}>
                    <TextInput source="name" label="ФИО" validate={required()}/>
                    <BooleanInput source="is_active" label="Активность"/>
                    <AutocompleteInput source="client" label="Клиент" choices={Object.values(clients.data)} validate={required()}/>
                    <TextInput source="role" label="Роль" validate={required()}/>
                    <AutocompleteInput source="leader" label="Руководитель" choices={Object.values(users.data)}/>
                    <SelectArrayInput source="users" label="Сотрудники" choices={Object.values(users.data)}/>
                    <SelectArrayInput source="projects" label="Проекты" choices={Object.values(projects.data)}/>
                </SimpleForm>
            </Edit>
        );
    }
}

export default EditUser;