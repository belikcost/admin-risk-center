import * as React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    AutocompleteInput,
    required,
    SelectArrayInput,
    Toolbar,
    SaveButton,
    DataProviderContext, useUpdate, useRedirect, useNotify
} from 'react-admin';
import {useCallback, useContext, useState, useEffect} from "react";
import roles from "../../roles";
import Loading from "../Loading";
import {Input, InputLabel, MenuItem, Select, Chip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const EditToolbar = props => {
    const customProps = {...props, pristine: !(!props.pristine || props.disabled !== "true")};
    return (
        <Toolbar {...customProps}>
            <SaveButton />
        </Toolbar>
    );
};

const SelectUsers = (props) => {
    const useStyles = makeStyles({
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: '0 11px'
        },
        label: {
            fontSize: '12px',
            marginLeft: '11px'
        },
        select: {
            marginBottom: '1rem',
            width: '256px',
            '&:hover': {
                '&:before': {
                    borderBottom: '1px solid rgba(255,255,255,.2) !important'
                }
            },
            '&:before': {
                borderBottom: '1px solid rgba(255,255,255,.2)'
            },
            '&:after': {
                borderBottom: '1px solid #fff'
            }
        },
        chip: {
            margin: 2,
        },
    });
    const classes = useStyles();
    console.log(props.selected);
    return (
        <>
            <InputLabel className={classes.label}>
                Сотрудники
            </InputLabel>
            <Select
                disabled={props.disabled}
                className={classes.select}
                multiple
                value={props.selected.data}
                onChange={(e) => {
                    props.setSaveDisabled(false);
                    props.setSelected({...props.selected, data: e.target.value});
                }}
                input={<Input/>}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={props.users.data.find(u => u.id === value).name}
                                  className={classes.chip}/>
                        ))}
                    </div>
                )}
            >
                {props.users.data.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                        {u.name}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
}

const EditUser = (props) => {
    const [clients, setClients] = useState({});
    const [disabledClients, setDisabledClients] = useState(false);
    const [users, setUsers] = useState({});
    const [leaders, setLeaders] = useState({});
    const [saveDisabled, setSaveDisabled] = useState(true);
    const [projects, setProjects] = useState({});
    const [disabledProjects, setDisabledProjects] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});
    const dataProvider = useContext(DataProviderContext);
    const [update] = useUpdate('users');
    const redirectTo = useRedirect();
    const notify = useNotify();
    const {basePath} = props;
    const this_user_id = props.id;
    const [disabledChangeRole, setDisabledChangeRole] = useState(true);
    useEffect(() => {
        fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            dataProvider.getList("projects", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role !== 'admin' ? {id: res.projects} : {},
            }).then(r => {
                setProjects(r);
                res.role !== 'admin' && res.projects.length === 0 && setDisabledProjects(true)
            });
            dataProvider.getList("users", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role !== 'admin' ? {client: res.client, role: 'user'} : {role: 'user'}
            }).then(r => {
                setUsers({...r, data: r.data.filter(u => u.id !== +this_user_id)});
            });
            dataProvider.getList("users", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: res.role !== 'admin' ? {client: res.client, role: 'leader'} : {role: 'leader'}
            }).then(r => {
                setLeaders({...r, data: r.data.filter(u => u.id !== +this_user_id)});
            });
            dataProvider.getList("users", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: {leader: this_user_id, role: 'user'}
            }).then(r => {
                let data = [];
                r.data.forEach(e => data.push(e.id));
                setSelectedUsers({...r, data: data});

            });
            dataProvider.getList("clients", {
                pagination: {page: 1, perPage: 9999},
                sort: {field: 'id', order: 'ASC'},
                filter: {},
            }).then(r => {
                res.role !== 'admin' && setDisabledClients(true);
                setClients(r);
            });
            res.id !== +this_user_id && (res.role === 'admin' || res.role === 'coordinator') && setDisabledChangeRole(false);
        });
    }, []);
    const save = useCallback(
        async (values, users) => {
            if (values.client && values.is_active === true) {
                let max, now;
                await dataProvider.getOne('clients', {id: values.client}).then(response => max = response.data.max_users);
                await dataProvider.getList('users', {
                    pagination: {page: 1, perPage: 9999},
                    sort: {field: 'id', order: 'ASC'},
                    filter: {client: values.client, is_user_active: true}
                }).then(response => {
                    now = response.data.length;
                });
                if (now >= max) {
                    notify('У данного клиента больше не может быть активных учетных записей!')
                    return;
                }
            }
            await dataProvider.updateMany("users", {
                ids: users.data,
                data: {leader: values.id}
            });
            update('users', values.id, values);
            redirectTo("/users");
        },
        [update, notify, redirectTo, basePath]
    );

    if (!clients.data || !users.data || !projects.data || !selectedUsers.data || !leaders.data) {
        return <Loading/>
    } else {
        console.log(props.permissions);
        let disabledNotCoordinator = props.permissions !== 'coordinator' && props.permissions !== 'admin';
        let role_choices = props.permissions !== 'admin' ? roles.filter(e => e.id !== 'admin') : roles;
        return (
            <Edit {...props}>
                <SimpleForm save={(v) => save(v, selectedUsers)}
                            toolbar={<EditToolbar disabled={saveDisabled}/>}>
                    <TextInput source="name" label="ФИО" validate={required()}/>
                    <BooleanInput source="is_active" label="Активность" disabled={disabledNotCoordinator}/>
                    <AutocompleteInput source="client" label="Клиент" disabled={disabledClients}
                                       choices={clients.data} validate={required()}/>
                    <AutocompleteInput source="role" label="Роль" disabled={disabledChangeRole}
                                       choices={role_choices} validate={required()}/>
                    <AutocompleteInput source="leader" label="Руководитель" disabled={disabledNotCoordinator} choices={leaders.data}/>
                    <SelectUsers
                        disabled={disabledNotCoordinator}
                        selected={selectedUsers}
                        setSelected={setSelectedUsers}
                        users={users}
                        setSaveDisabled={setSaveDisabled}
                    />
                    <SelectArrayInput source="projects" label="Проекты" disabled={disabledProjects}
                                      choices={projects.data}/>
                </SimpleForm>
            </Edit>
        );
    }
}

export default EditUser;