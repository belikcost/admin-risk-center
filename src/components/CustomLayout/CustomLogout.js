import * as React from 'react';
import { forwardRef } from 'react';
import { useLogout } from 'react-admin';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
    logout: {
        padding: '0',
        margin: '0 1rem',
        background: 'rgba(0,0,0,.96)',
        color: '#fff',
        cursor: 'pointer',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            background: 'rgba(0,0,0,.96)',
        }
    },
    icon: {
        background: 'rgba(255,255,255,.1)',
        borderRadius: '50%',
        transition: 'all .3s',
        padding: '7px 10px',
        '&:hover': {
            background: 'rgba(255,255,255,.25)'
        }
    },
    text: {
        fontSize: '12px',
        marginTop: '.25rem'
    }
}));
const CustomLogout = forwardRef((props, ref) => {
    const logout = useLogout();
    const handleClick = () => logout();
    const classes = useStyles();
    return (
        <div
            className={classes.logout}
            onClick={handleClick}
            ref={ref}
        >
            <div className={classes.icon}><ExitIcon/></div>
            <span className={classes.text}>Выход</span>
        </div>
    );
});

export default CustomLogout;