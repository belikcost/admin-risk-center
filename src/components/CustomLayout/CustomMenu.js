import * as React from 'react';
import {DashboardMenuItem, MenuItemLink} from 'react-admin';
import ReceiptIcon from "@material-ui/icons/Receipt";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import PersonIcon from "@material-ui/icons/Person";
import {makeStyles} from "@material-ui/core/styles";
import DashboardIcon from '@material-ui/icons/Dashboard';
const useStyles = makeStyles(() => ({
    menuItem: {
        color: 'rgba(255,255,255,.7)',
        margin: '2px 0',
        transition: 'all .3s',
        '&:hover': {
            color: '#fff',
            '& $menuIcon': {
                color: '#fff'
            }
        }
    },
    menuIcon: {
        color: 'inherit',
        transition: 'all .3s',
    }
}));

const CustomMenu = () => {
    const classes = useStyles();
    const permissions = localStorage.getItem('permissions');
    return (
        <div>
            <DashboardMenuItem className={classes.menuItem} to="/" primaryText="Главная" leftIcon={<DashboardIcon className={classes.menuIcon}/>}/>
            {permissions !== 'user' &&
            <MenuItemLink className={classes.menuItem} to="/users" primaryText="Пользователи" leftIcon={<PersonIcon className={classes.menuIcon}/>}/>}
            {permissions !== 'leader' && permissions !== 'user' &&
            <MenuItemLink className={classes.menuItem} to="/clients" primaryText="Клиенты" leftIcon={<BusinessCenterIcon className={classes.menuIcon}/>}/>}
            <MenuItemLink className={classes.menuItem} to="/projects" primaryText="Проекты" leftIcon={<ReceiptIcon className={classes.menuIcon}/>}/>
        </div>
    );
}

export default CustomMenu;