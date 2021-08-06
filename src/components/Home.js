import * as React from "react";
import {Title, useGetList} from 'react-admin';
import {makeStyles} from "@material-ui/core/styles";
import {useMediaQuery, Typography} from "@material-ui/core";

const Home = () => {
    const clients_list = useGetList('clients', undefined, undefined, undefined);
    const projects_list = useGetList('projects');
    const users_list = useGetList('users');

    const isLarge = useMediaQuery('(max-width: 1000px)');
    const useStyles = makeStyles(() => ({
        content: {
            padding: '0 1rem 1rem'
        },
        header: {
            color: '#fff',
            marginBottom: '2rem',
            padding: '0 2rem',
        },
        title: {
            textTransform: 'uppercase',
            fontSize: '16px'
        },
        subTitle: {
            color: 'rgba(255,255,255,.8)'
        },
        contentCard: {
            display: 'flex',
            flexDirection: 'column'
        },
        chartIcon: {
            width: '50px',
            height: '38px',
            marginLeft: '7px'
        },
        widgetWrapper: {
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: isLarge ? 'column' : 'row',
            alignItems: 'center'
        },
        widget: {
            backgroundColor: 'rgba(0,0,0,.2)',
            boxShadow: '0 1px 5px rgba(0,0,0,.1)',
            borderRadius: ' 2px',
            alignItems: 'center',
            display: 'flex',
            margin: isLarge ? '1rem 0' : '0 .5rem 0 0',
            justifyContent: 'space-around',
            color: '#fff',
            width: isLarge ? 'auto' : '100%',
            padding: '1.5rem 1.5rem 1.45rem'
        },
        text: {
            color: 'rgba(255,255,255,.7)',
            display: 'block',
            lineHeight: '12px'
        }
    }));

    const classes = useStyles({margin: '0'});
    if (clients_list.loading || projects_list.loading) {
        return null;
    } else {
        let clients = Object.values(clients_list.data).length, projects = Object.values(projects_list.data).length,
            users = Object.values(users_list.data).length;
        return (
            <div className={classes.content}>
                <Title title={process.env.REACT_APP_TITLE}/>
                <div className={classes.contentCard}>
                    <header className={classes.header}>
                        <Typography variant="h6" className={classes.title}>Главная</Typography>
                        <Typography variant="caption" className={classes.subTitle}>Добро пожаловать
                            на {process.env.REACT_APP_TITLE}!</Typography>
                    </header>
                    <div className={classes.widgetWrapper}>
                        <div className={classes.widget}>
                            <div>
                                <h2>{users}</h2>
                                <small className={classes.text}>Всего пользователей в системе</small>
                            </div>
                            <svg className={classes.chartIcon}>
                                <rect fill="rgba(255,255,255,0.85)" x="0.8531818181818182" y="12"
                                      width="2.5595454545454546"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="5.119090909090908" y="20"
                                      width="2.5595454545454555"
                                      height="16"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="9.385" y="4" width="2.5595454545454537"
                                      height="32"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="13.65090909090909" y="12"
                                      width="2.559545454545452"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="17.916818181818183" y="16"
                                      width="2.55954545454545"
                                      height="20"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="22.182727272727274" y="12"
                                      width="2.55954545454545"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="26.448636363636364" y="8"
                                      width="2.55954545454545"
                                      height="28"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="30.714545454545455" y="4"
                                      width="2.5595454545454537"
                                      height="32"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="34.98045454545454" y="24"
                                      width="2.5595454545454572"
                                      height="12"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="39.24636363636363" y="16"
                                      width="2.5595454545454572"
                                      height="20"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="43.51227272727272" y="0"
                                      width="2.5595454545454572"
                                      height="36"></rect>
                            </svg>
                        </div>
                        <div className={classes.widget}>
                            <div>
                                <h2>{clients}</h2>
                                <small className={classes.text}>Всего компаний на мониторинге</small>
                            </div>
                            <svg className={classes.chartIcon}>
                                <rect fill="rgba(255,255,255,0.85)" x="0.8531818181818182" y="12"
                                      width="2.5595454545454546"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="5.119090909090908" y="20"
                                      width="2.5595454545454555"
                                      height="16"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="9.385" y="4" width="2.5595454545454537"
                                      height="32"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="13.65090909090909" y="12"
                                      width="2.559545454545452"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="17.916818181818183" y="16"
                                      width="2.55954545454545"
                                      height="20"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="22.182727272727274" y="12"
                                      width="2.55954545454545"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="26.448636363636364" y="8"
                                      width="2.55954545454545"
                                      height="28"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="30.714545454545455" y="4"
                                      width="2.5595454545454537"
                                      height="32"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="34.98045454545454" y="24"
                                      width="2.5595454545454572"
                                      height="12"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="39.24636363636363" y="16"
                                      width="2.5595454545454572"
                                      height="20"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="43.51227272727272" y="0"
                                      width="2.5595454545454572"
                                      height="36"></rect>
                            </svg>
                        </div>
                        <div className={classes.widget}>
                            <div>
                                <h2>{projects}</h2>
                                <small className={classes.text}>Всего проектов на мониторинге</small>
                            </div>
                            <svg className={classes.chartIcon}>
                                <rect fill="rgba(255,255,255,0.85)" x="0.8531818181818182" y="12"
                                      width="2.5595454545454546"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="5.119090909090908" y="20"
                                      width="2.5595454545454555"
                                      height="16"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="9.385" y="4" width="2.5595454545454537"
                                      height="32"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="13.65090909090909" y="12"
                                      width="2.559545454545452"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="17.916818181818183" y="16"
                                      width="2.55954545454545"
                                      height="20"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="22.182727272727274" y="12"
                                      width="2.55954545454545"
                                      height="24"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="26.448636363636364" y="8"
                                      width="2.55954545454545"
                                      height="28"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="30.714545454545455" y="4"
                                      width="2.5595454545454537"
                                      height="32"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="34.98045454545454" y="24"
                                      width="2.5595454545454572"
                                      height="12"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="39.24636363636363" y="16"
                                      width="2.5595454545454572"
                                      height="20"></rect>
                                <rect fill="rgba(255,255,255,0.85)" x="43.51227272727272" y="0"
                                      width="2.5595454545454572"
                                      height="36"></rect>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;