import * as React from "react";
import {Component} from "react";
import {Admin, Resource} from 'react-admin';
import PropTypes from 'prop-types';
import jsonServerProvider from 'ra-data-json-server';
import authProvider from "./authProvider";
import Home from "./components/Home";
import PersonIcon from '@material-ui/icons/Person';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import ReceiptIcon from '@material-ui/icons/Receipt';
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
import CreateUser from "./components/Users/CreateUser";
import EditUser from "./components/Users/EditUser";
import ShowUser from "./components/Users/ShowUser";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
const history = createBrowserHistory();
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');
const dataProvider = jsonServerProvider('http://localhost:3004');



export default class App extends Component {

    fetchResources(permission) {
        let show_client = ShowClient, clients_list = ClientsList, create_client = CreateClient,
            edit_client = EditClient, show_user = ShowUser, create_user = CreateUser, users_list = UsersList,
            edit_user = EditUser, show_project = ShowProject, create_project = CreateProject,
            edit_project = EditProject, projects_list = ProjectsList;
        if (permission === 'leader') {
            create_user = null;
            clients_list = null;
            create_project = null;
        } else if (permission === 'user') {
            users_list = null;
            clients_list = null;
            create_project = null;
        }

        return [
            <Resource name="users"
                      show={show_user}
                      icon={PersonIcon}
                      options={{label: 'Пользователи'}}
                      create={create_user}
                      list={users_list}
                      edit={edit_user}/>,
            <Resource name="clients"
                      options={{label: 'Клиенты'}}
                      show={show_client}
                      list={clients_list}
                      icon={BusinessCenterIcon}
                      create={create_client}
                      edit={edit_client}/>,
            <Resource name="projects"
                      options={{label: 'Проекты'}}
                      list={projects_list}
                      icon={ReceiptIcon}
                      create={create_project}
                      edit={edit_project}
                      show={show_project}/>,
        ];
    }

    render() {
        return (
            <Admin
                authProvider={authProvider}
                loginPage={LoginPage}
                history={history}
                dataProvider={dataProvider}
                title="Riskcenter App"
                dashboard={Home}
                i18nProvider={i18nProvider}
            >
                {this.fetchResources}
            </Admin>
        );
    }
}
