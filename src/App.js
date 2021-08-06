import * as React from "react";
import './app.css';
import {Component} from "react";
import {Admin, Resource, fetchUtils} from 'react-admin';
import authProvider from "./authProvider";
import Home from "./components/Home";
import ClientsList from "./components/Clients/ClientsList";
import CreateClient from "./components/Clients/CreateClient";
import EditClient from "./components/Clients/EditClient";
import LoginPage from "./components/LoginPage";
import CreateProject from "./components/Projects/CreateProject";
import EditProject from "./components/Projects/EditProject";
import ProjectsList from "./components/Projects/ProjectsList";
import ShowProject from "./components/Projects/ShowProject";
import ShowClient from "./components/Clients/ShowClient";
import {createBrowserHistory} from 'history';
import UsersList from "./components/Users/UsersList";
import simpleRestProvider from 'ra-data-simple-rest';
import EditUser from "./components/Users/EditUser";
import ShowUser from "./components/Users/ShowUser";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import CustomLayout from "./components/CustomLayout/CustomLayout";
import CustomLogout from "./components/CustomLayout/CustomLogout";

const history = createBrowserHistory();
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const fetchJson = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({Accept: 'application/json'});
    }
    options.headers.set('Authorization', "Token " + localStorage.getItem('token'));
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider(process.env.REACT_APP_API, fetchJson);

export default class App extends Component {

    fetchResources(permission) {
        let show_client = ShowClient, clients_list = ClientsList, create_client = CreateClient,
            edit_client = EditClient, show_user = ShowUser, users_list = UsersList,
            edit_user = EditUser, show_project = ShowProject, create_project = CreateProject,
            edit_project = EditProject, projects_list = ProjectsList;
        if (permission === 'leader') {
            clients_list = null;
            create_project = null;
        } else if (permission === 'user') {
            users_list = null;
            clients_list = null;
            create_project = null;
        } else if (permission === 'coordinator') {
            clients_list = null;
        }

        return [
            <Resource name="users"
                      show={show_user}
                      options={{label: 'Пользователи'}}
                      list={users_list}
                      edit={edit_user}/>,
            <Resource name="clients"
                      options={{label: 'Клиенты'}}
                      show={show_client}
                      list={clients_list}
                      create={create_client}
                      edit={edit_client}/>,
            <Resource name="projects"
                      options={{label: 'Проекты'}}
                      list={projects_list}
                      create={create_project}
                      edit={edit_project}
                      show={show_project}/>,
        ];
    }

    render() {
        return (
            <Admin
                logoutButton={CustomLogout}
                layout={CustomLayout}
                authProvider={authProvider}
                loginPage={LoginPage}
                history={history}
                dataProvider={dataProvider}
                title={process.env.REACT_APP_TITLE}
                dashboard={Home}
                i18nProvider={i18nProvider}
            >
                {this.fetchResources}
            </Admin>
        );
    }
}
