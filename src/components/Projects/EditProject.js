import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    Toolbar,
    required, BooleanInput,
    DataProviderContext, useUpdate, useRedirect, useNotify
} from 'react-admin';
import {useCallback, useContext, useEffect, useState} from "react";
import Loading from "../Loading";
import Requests from "./Requests/Requests";

const CustomToolbar = (props) => (
    <Toolbar {...{...props, pristine: !props.pristine ? false : props.disabled}}/>
);

const EditProject = (props) => {
    const [users, setUsers] = useState({});
    const [clients, setClients] = useState({});
    const [leaders, setLeaders] = useState({});
    const [requests, setRequests] = useState({});
    const [disabled, setDisabled] = useState(true);
    const defaultLeaderFilter = {role: 'leader'};
    const dataProvider = useContext(DataProviderContext);
    const [update] = useUpdate('projects');
    const [updateReq] = useUpdate('requests');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath} = props;
    const thisId = props.id;
    const [userId, setUserId] = useState();
    let requestsRef = React.createRef();
    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            setUserId(res.id);
            dataProvider.getList("users", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role === 'admin' ? defaultLeaderFilter : {...defaultLeaderFilter, client: res.client}
            }).then(r => setLeaders(r));
            dataProvider.getList("users", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role !== 'admin' && {client: res.client}
            }).then(r => setUsers(r));
            dataProvider.getList("clients", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role === 'admin' ? {} : {id: res.client}
            }).then(r => setClients(r));
            dataProvider.getList("requests", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: {project_id: thisId},
            }).then(res => {
                setRequests(res);
            });
        });
    }, []);
    const save = useCallback(
        async (values, ref) => {
            let max, projects = [], requests = ref.current.state.localReqs,
                requestsAct = ref.current.state.localReqs.filter(e => e.is_active) || [];
            await dataProvider
                .getList('users', {
                    pagination: {page: 1, perPage: 9999},
                    sort: {field: 'id', order: 'ASC'},
                    filter: {client: values.client}
                }).then(response => {
                    response.data.forEach(u => {
                        u.projects && projects.push(...u.projects.filter(e => e !== values.id));
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
                        p.requests && requestsAct.push(...p.requests.filter(e => e.is_active));
                    });
                });
            await dataProvider
                .getOne('clients', {id: values.client}).then(response => {
                    max = response.data.max_app;
                });
            console.log(requests);
            if (requests.some(r => Object.values(r).some(v => v.length === 0))) {
                notify('Ошибка, не заполнены обязательные поля!')
                return;
            }
            if (requests.some(req => requests.some(r => req.value === r.value))) {
                notify('Ошибка, у вас есть заявки с одинаковым ИНН/номером!');
                return;
            }
            if (requestsAct.length > max) {
                notify('Ошибка, у данного клиента больше не может быть активных заявок!')
                return;
            }
            for (const r of requests) {
                try {
                    if (r.local) {
                        delete r.id;
                        delete r.local;
                        await dataProvider.create("requests", {data: r});
                    } else {
                        updateReq("requests", r.id, r);
                    }
                } catch {
                    notify('Ошибка при выполнении запроса!')
                    return;
                }
            }
            update("projects", values.id, values);
            redirectTo("/projects");
        },
        [update, notify, redirectTo, basePath]);

    if (!users.data || !leaders.data || !clients.data || !requests.data) {
        return (<Loading/>);
    } else {
        return (
            <Edit {...props}>
                <SimpleForm toolbar={<CustomToolbar disabled={disabled}/>} save={(v) => save(v, requestsRef)}>
                    <TextInput source="name" validate={required()} label="Название"/>
                    {(props.permissions === 'coordinator' || props.permissions === 'admin') &&
                    <SelectInput source="leader" label="Руководитель" choices={leaders.data} validate={required()}/>}
                    <SelectInput source="client" label="Клиент" choices={clients.data}
                                 validate={required()}/>
                    <BooleanInput onClick={() => console.log(requestsRef)} source="is_active" label="Активность"
                                  defaultValue={true}/>
                    <Requests
                        users={users.data}
                        dataProvider={dataProvider}
                        setDisabled={(v) => setDisabled(v)}
                        ref={requestsRef}
                        thisId={thisId}
                        userId={userId}
                        reqs={requests}
                        setReqs={setRequests}
                    />
                </SimpleForm>
            </Edit>
        );
    }
}

export default EditProject;