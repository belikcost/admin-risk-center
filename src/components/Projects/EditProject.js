import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    required, BooleanInput, useGetIdentity, useGetList, DataProviderContext, useUpdate, useRedirect, useNotify
} from 'react-admin';
import {useCallback, useContext} from "react";

const EditProject = (props) => {
    const {identity} = useGetIdentity();
    let users_filter = identity && props.permissions !== 'admin' && props.permissions !== 'coordinator'
        ? {id: identity.users} : {};
    const users = useGetList('users', undefined, undefined, users_filter);
    const dataProvider = useContext(DataProviderContext);
    const [update] = useUpdate('projects');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath} = props;
    const save = useCallback(
        async (values) => {
            let max, client, projects = [], apps = values.apps.filter(e => e.is_active) || [];
            await dataProvider
                .getList('users', {
                    pagination: {page: 1, perPage: 9999},
                    sort: {field: 'id', order: 'ASC'}
                }).then(response => {
                    response.data.forEach(u => {
                        if (u.projects && u.projects.some(e => e === values.id)) {
                            projects.push(...u.projects.filter(e => e !== values.id));
                            client = u.client;
                        }
                    });
                    projects = [...new Set(projects)];
                });
            await dataProvider
                .getList('projects', {
                    pagination: {page: 1, perPage: 9999},
                    sort: {field: 'id', order: 'ASC'},
                    filter: {id: projects}
                }).then(response => {
                    response.data.forEach(p => {
                        p.apps && apps.push(...p.apps.filter(e => e.is_active));
                    });
                });
            await dataProvider
                .getOne('clients', {id: client}).then(response => {
                    max = response.data.max_app;
                });
            if (apps.length > max) {
                notify('У данного клиента больше не может быть активных заявок!')
                return;
            }
            update(values.id, "projects", values);
            redirectTo("/projects");
        },
        [update, notify, redirectTo, basePath]);

    return (
        <Edit {...props}>
            <SimpleForm save={save}>
                <TextInput source="name" validate={required()} label="Название"/>
                <SelectInput source="leader" label="Руководитель" choices={Object.values(users.data)}
                             validate={required()}/>
                <BooleanInput source="is_active" label="Активность" defaultValue={true}/>
                <ArrayInput source="apps" label="Заявки">
                    <SimpleFormIterator>
                        <TextInput source="id" disabled label="ID"/>
                        <TextInput source="name" label="ИНН/номер" validate={required()}/>
                        <SelectInput source="type" label="Тип" choices={[{id: 'arbitrage', name: 'Арбитражная'}, {
                            id: 'monitoring',
                            name: 'Мониторинговая'
                        }]} validate={required()}/>
                        <BooleanInput source="is_active" defaultValue={true} label="Активность"/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
}

export default EditProject;