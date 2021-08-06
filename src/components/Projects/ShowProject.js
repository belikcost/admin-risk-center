import * as React from "react";
import {
    Show,
    SelectField,
    SimpleShowLayout,
    TextField,
    BooleanField,
    DataProviderContext
} from 'react-admin';
import Card from '@material-ui/core/Card';
import {makeStyles} from '@material-ui/core/styles';
import '@zach.codes/react-calendar/dist/calendar-tailwind.css';
import CardContent from '@material-ui/core/CardContent';
import {
    MonthlyBody,
    MonthlyDay,
    MonthlyCalendar,
    MonthlyNav,
    DefaultMonthlyEventItem,
} from '@zach.codes/react-calendar';
import {useContext, useState, useEffect} from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {format, startOfMonth} from "date-fns";
import Loading from "../Loading";
import {CardActions, CardHeader, useMediaQuery} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const ShowProject = (props) => {
    const [clients, setClients] = useState({});
    const [users, setUsers] = useState({});
    const isSmall = useMediaQuery('(max-width: 600px)');
    const isRemovePadding = useMediaQuery('(max-width: 850px)');
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const [isCalendar, setIsCalendar] = useState(false);
    const [apps, setApps] = useState([]);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dataProvider = useContext(DataProviderContext);
    const isShowCard = useMediaQuery('(max-width: 1135px)');
    const useStyles = makeStyles({
        calendarDay: {
            maxHeight: '10vh'
        },
        calendarButton: {
            cursor: 'pointer',
            color: 'rgba(255,255,255,.7)',
            transition: 'all .3s',
            '&:hover': {
                color: '#fff'
            }
        },
        calendar: {
            boxShadow: '0 1px 5px rgb(0 0 0 / 10%)',
            borderRadius: '2px',
            margin: !isSmall && '0 1rem 1rem',
            padding: isSmall ? '.5rem 1rem' : (isRemovePadding ? '24px 0' : '2.2rem'),
            backgroundColor: 'rgba(0,0,0,.2)',
            fontFamily: 'Nunito, sans-serif',
        }
    });

    useEffect(() => {

        dataProvider.getList("users", {
            pagination: {page: 1, perPage: 9999},
            sort: {field: 'id', order: 'ASC'},
            filter: {}
        }).then(r => setUsers(r));

        dataProvider.getList("clients", {
            pagination: {page: 1, perPage: 9999},
            sort: {field: 'id', order: 'ASC'},
            filter: {}
        }).then(r => setClients(r));

        dataProvider.getList("requests", {
            pagination: {page: 1, perPage: 9999},
            sort: {field: 'id', order: 'ASC'},
            filter: {project_id: props.id},
        }).then(res => {
            setApps(res.data);
            setIsLoading(false);
        });
    }, [])
    const TableField = (props) => {
        const useStyles = makeStyles(() => ({
            headerText: {
                color: '#fff',
                display: 'flex',
                alignItems: 'center'
            },
            label: {
                marginRight: '5px'
            },
            card: {
                width: '100%',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(0,0,0,.2)',
                marginBottom: '1rem'
            },
            actions: {
                flexDirection: 'column',
                alignItems: 'baseline'
            }
        }));
        const classes_card = useStyles();
        const showCalendar = (id) => {
            setIsLoading(true);
            fetch(process.env.REACT_APP_API + '/requests/' + id + '/meetings').then(r => r.json()).then(r => {
                let dates = [];
                r.dates.forEach(d => {
                    dates.push({date: new Date(d)});
                });
                setEvents(dates);
                setIsCalendar(true);
                setIsLoading(false);
            });
        }
        return (
            <>
                {isShowCard ? props.apps.map((a, i) =>
                    <Card key={i} className={classes_card.card}>
                        <CardHeader
                            title={<Typography variant="body2">{a.value}</Typography>}
                            subheader={
                                <>
                                    <div className={classes_card.headerText}>
                                        <Typography variant="body2" className={classes_card.label}>Компания:</Typography>
                                        <Typography variant="body2">{a.company_name}</Typography>
                                    </div>
                                    <div className={classes_card.headerText}>
                                        <Typography variant="body2" className={classes_card.label}>Тип:</Typography>
                                        <Typography variant="body2">{a.type === 'arbitrage' ? "Арбитражная" :
                                            "Мониторинговая"}</Typography>
                                    </div>
                                    <div className={classes_card.headerText}>
                                        <Typography variant="body2" className={classes_card.label}>Заявку
                                            создал:</Typography>
                                        <Typography
                                            variant="body2">{users.data.find(u => u.id === a.submitted_by).name}</Typography>
                                    </div>
                                    <div className={classes_card.headerText}>
                                        <Typography variant="body2"
                                                    className={classes_card.label}>Активность:</Typography>
                                        <Typography variant="body2">{a.is_active ? <CheckIcon fontSize="small"/> :
                                            <ClearIcon fontSize="small"/>}</Typography>
                                    </div>
                                </>
                            }
                        />
                        {a.type === 'arbitrage' &&
                        <CardActions className={classes_card.actions}>
                            <a className={classes.calendarButton}
                               onClick={() => showCalendar(a.id)}
                            ><DateRangeIcon/> {!isSmall &&
                            <span className="RaButton-label-7">Заседания</span>}
                            </a>
                        </CardActions>
                        }
                    </Card>
                ) : (<Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ИНН/номер дела</TableCell>
                            <TableCell align="left">Компания</TableCell>
                            <TableCell align="left">Тип</TableCell>
                            <TableCell align="left">Заявку создал</TableCell>
                            <TableCell align="left">Активность</TableCell>
                            <TableCell>&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.apps.map(a => (
                            <TableRow key={a.id}>
                                <TableCell align="left">{a.value}</TableCell>
                                <TableCell align="left">{a.company_name}</TableCell>
                                <TableCell
                                    align="left">{a.type === 'arbitrage' ? "Арбитражная" : "Мониторинговая"}</TableCell>
                                <TableCell
                                    align="left">{users.data.find(u => u.id === a.submitted_by).name}</TableCell>
                                <TableCell align="left">{a.is_active ? <CheckIcon fontSize="small"/> :
                                    <ClearIcon fontSize="small"/>}</TableCell>
                                <TableCell align="left">{a.type === 'arbitrage' &&
                                <a className={classes.calendarButton}
                                   onClick={() => showCalendar(a.id)}
                                ><DateRangeIcon/> {!isSmall &&
                                <span className="RaButton-label-7">Заседания</span>}
                                </a>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>)}

            </>
        );
    }
    const classes = useStyles();
    if (isCalendar) {
        return (
            <Card>
                <CardContent className={classes.calendar}>
                    <MonthlyCalendar
                        currentMonth={currentMonth}
                        onCurrentMonthChange={date => setCurrentMonth(date)}
                    >
                        <MonthlyNav/>
                        <MonthlyBody
                            events={events}
                        >
                            <MonthlyDay className={classes.calendarDay} renderDay={data =>
                                data.map((item, index) => (
                                    <DefaultMonthlyEventItem
                                        key={index}
                                        title={item.title}
                                        date={format(item.date, 'k:mm')}
                                    />
                                ))
                            }/>
                        </MonthlyBody>
                    </MonthlyCalendar>
                </CardContent>
            </Card>
        );
    } else {
        if (isLoading || !users.data || !clients.data) {
            return (<Loading/>);
        } else {
            return (
                <Show {...props}>
                    <SimpleShowLayout>
                        <TextField source="name" label="Название"/>
                        <SelectField choices={users.data} source="leader" label="Руководитель"/>
                        <SelectField choices={clients.data} source="client" label="Клиент"/>
                        <BooleanField source="is_active" label="Активность"/>
                        {apps.length !== 0 && <TableField apps={apps} id={props.id} className={classes.appsCont}/>}
                    </SimpleShowLayout>
                </Show>
            );
        }
    }
}
export default ShowProject;