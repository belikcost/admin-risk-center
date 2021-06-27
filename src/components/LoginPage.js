import * as React from 'react';
import {useLogin, useNotify} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TelegramLoginButton from 'react-telegram-login';

const useStyles = makeStyles({
    title: {
        background: '#2196f3',
        color: '#fff',
        textAlign: 'center',
        marginBottom: '1rem',

    },
    wrapper: {
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const MyLoginPage = ({theme}) => {
    const login = useLogin();
    const notify = useNotify();
    const classes = useStyles();
    const handleTelegramResponse = response => {
        console.log(response);
        response.projects = [1, 2];
        response.client = 2;
        response.users = [2];
        response.permissions = 'admin';
        localStorage.setItem('auth', JSON.stringify(response));
        let username = response.username, hash = response.hash;
        login(response).catch(() =>
            notify('Invalid email or password')
        );
    };

    return (
        <div className={classes.wrapper}>
            <Card>
                <Typography variant="h6" component="h6" className={classes.title}>
                   Войти
                </Typography>
                <CardContent className={classes.loginField}>
                    <TelegramLoginButton dataOnauth={handleTelegramResponse} botName="testerr92_bot"/>
                </CardContent>
            </Card>
        </div>
    );
};
export default MyLoginPage;