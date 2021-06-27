import * as React from "react";
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    useRecordContext
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
import {useState} from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import {format, startOfMonth} from "date-fns";

const useStyles = makeStyles({
    calendarDay: {
        maxHeight: '10vh'
    },
    calendar: {
        maxHeight: '80%',
        margin: '0 auto'
    }
});

const ShowProject = (props) => {
    const classes = useStyles();
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
    const [isCalendar, setIsCalendar] = useState(false);
    const TableField = (props) => {
        const {source} = props;
        const record = useRecordContext(props);
        if (!record[source]) return null;
        const showCalendar = (id) => {
            console.log(id, process.env.REACT_APP_URL);
            setIsCalendar(true);
            // fetch(process.env.REACT_APP_URL + "login", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json;charset=utf-8'
            //     },
            //     body: JSON.stringify({login: process.env.REACT_APP_LOGIN, password: process.env.REACT_APP_PASSWD})
            // }).then(res => res.json()).then(res => console.log(res));
            const res = [
                {
                    id: 1,
                    date: "Wed, 2 Jun 2021 12:35:40 UTC",
                },
                {
                    id: 2,
                    date: "Wed, 9 Jun 2021 12:35:40 UTC",
                },
                {
                    id: 3,
                    date: "Wed, 16 Jun 2021 12:35:40 UTC",
                },
                {
                    id: 4,
                    date: "Wed, 23 Jun 2021 12:35:40 UTC",
                }
            ];
            let dates = [];
            res.forEach(d => {
                dates.push({date: new Date(d.date)});
            });
            setEvents(dates);

        }
        let showCalendarButtonClasses = window.screen.availWidth > 600 ? 'MuiButtonBase-root MuiButton-root MuiButton-text RaButton-button-6 MuiButton-textPrimary MuiButton-textSizeSmall MuiButton-sizeSmall' : 'MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary'
        return (
            <>
                <label
                    className="MuiFormLabel-root MuiInputLabel-root RaLabeled-label-55 MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense">
                    <span>Заявки</span>
                </label>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">ИНН/номер дела</TableCell>
                            <TableCell align="left">Тип</TableCell>
                            <TableCell align="left">Активность</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {record[source].map(a => (
                            <TableRow key={a.id}>
                                <TableCell align="left">{a.id}</TableCell>
                                <TableCell align="left">{a.name}</TableCell>
                                <TableCell
                                    align="left">{a.type === 'arbitrage' ? "Арбитражная" : "Мониторинговая"}</TableCell>
                                <TableCell align="left">{a.is_active ? <CheckIcon fontSize="small"/> :
                                    <ClearIcon fontSize="small"/>}</TableCell>
                                <TableCell align="left">{a.type === 'arbitrage' &&
                                <a
                                    className={showCalendarButtonClasses}
                                    onClick={() => showCalendar(a.id)}><DateRangeIcon/> {window.screen.availWidth > 600 &&
                                <span className="RaButton-label-7">Календарь заседаний</span>}
                                </a>}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
        );
    }

    if (isCalendar) {
        return (
            <Card className={classes.calendarCard}>
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
                                        // Format the date here to be in the format you prefer
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
        return (
            <Show {...props}>
                <SimpleShowLayout>
                    <TextField source="id" label="ID"/>
                    <TextField source="name" label="Название"/>
                    <BooleanField source="is_active" label="Активность"/>
                    <TableField source="apps"/>
                </SimpleShowLayout>
            </Show>
        );
    }
}

export default ShowProject;