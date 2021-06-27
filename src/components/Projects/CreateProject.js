import * as React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    ArrayInput,
    SimpleFormIterator,
    required, BooleanInput, useGetIdentity, useGetList
} from 'react-admin';

const CreateProject = (props) => {
    const {identity} = useGetIdentity();
    let users_filter = identity && props.permissions !== 'admin' ? {id: identity.users} : {};
    const users = useGetList('users', undefined, undefined, users_filter);

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" validate={required()} label="Название"/>
                <SelectInput source="leader" label="Руководитель" choices={Object.values(users.data)}
                             validate={required()}/>
                <BooleanInput source="is_active" label="Активность" defaultValue={true}/>
                <ArrayInput source="apps" label="Заявки">
                    <SimpleFormIterator>
                        <TextInput source="name" label="ИНН/номер дела" validate={required()}/>
                        <SelectInput source="type" label="Тип" choices={[{id: 'arbitrage', name: 'Арбитражная'}, {
                            id: 'monitoring',
                            name: 'Мониторинговая'
                        }]} validate={required()}/>
                        <BooleanInput source="is_active" label="Активность" defaultValue={true}/>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
}

export default CreateProject;