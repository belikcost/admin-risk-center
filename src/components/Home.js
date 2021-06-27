import * as React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {Title, useGetList} from 'react-admin';
import Typography from '@material-ui/core/Typography';

const Home = () => {
    const clients_list = useGetList('clients');
    const projects_list = useGetList('projects');
    if (clients_list.loading || projects_list.loading) {
        return null;
    } else {
        let clients = Object.values(clients_list.data).length, projects = Object.values(projects_list.data).length;
        return (
            <Card>
                <Title title="Главная"/>
                <CardContent>
                    <Typography variant="h6" component="h6">На мониторинге {clients} {clients === 1 && 'компания' ||
                    clients < 5 && clients !== 0 && 'компании' || 'компаний'}, {projects} {projects === 1
                    && 'проект' || projects < 5 && projects !== 0 && 'проекта' || 'проектов'}.</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default Home;