import * as React from 'react';
import {useLogin} from 'react-admin';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import TelegramLoginButton from 'react-telegram-login';
import bg1 from './../img/1.jpg';
import CloseIcon from '@material-ui/icons/Close';
import {useState} from 'react';
import null_avatar from '../img/matthew.png'

const useStyles = makeStyles({
    title: {
        background: 'rgba(0,0,0,.3)',
        color: '#fff',
        textAlign: 'center',
        marginBottom: '1rem',
        fontFamily: 'Nunito, sans-serif'
    },
    wrapper: {
        position: 'fixed',
        background: 'url(' + bg1 + ')',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialog: {
        background: 'rgba(0,0,0,.2)',
        boxShadow: '0 1px 5px rgba(0,0,0,.1)'
    },
    error: {
        background: 'rgba(220,53,69,.95)',
        color: '#fff',
        padding: '1.25rem 1rem 1rem',
        borderRadius: '2px',
        position: 'relative'
    },
    errorText: {
        fontFamily: 'Nunito, sans-serif'
    },
    close: {
        color: 'rgba(255,255,255,.7)',
        transition: 'all .3s',
        position: 'absolute',
        width: '17px',
        top: 0,
        right: '2px',
        cursor: 'pointer',
        '&:hover': {
            color: '#fff'
        }
    }
});

const LoginPage = () => {
    const [error, setError] = useState(false);
    const login = useLogin();
    const classes = useStyles()
    const handleTelegramResponse = async response => {
        !response.photo_url && (response.photo_url = null_avatar);
        await fetch(process.env.REACT_APP_API + '/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(response)
        }).then(res => res.json()).then(res => {
            res.token ? localStorage.setItem('token', res.token) : setError(true);
        });
        !error && await fetch(process.env.REACT_APP_API + '/users/current', {
            method: 'GET',
            headers: {
                'Authorization': "Token " + localStorage.getItem('token')
            }
        }).then(res => res.json()).then(res => {
            login(res);
        });
    };

    return (
        <div className={classes.wrapper}>
            <Card className={classes.dialog}>
                <Typography variant="h6" component="h6" className={classes.title}>
                    Войти
                </Typography>
                <CardContent>
                    {error ?
                        (<div className={classes.error}>
                            <CloseIcon className={classes.close} onClick={() => setError(false)}/>
                            <Typography variant="subtitle2" className={classes.errorText}>
                                Ошибка! Вас нет в системе, доступ запрещён!
                            </Typography>
                        </div>)
                        :
                        (<TelegramLoginButton dataOnauth={handleTelegramResponse} botName="wmdemo_bot"/>)
                    }
                </CardContent>
            </Card>
        </div>
    );
};
export default LoginPage;