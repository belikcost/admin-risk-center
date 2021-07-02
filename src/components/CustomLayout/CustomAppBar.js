import * as React from 'react';
import {AppBar} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';
import {useMediaQuery, ClickAwayListener, Typography, IconButton} from "@material-ui/core";
import BrushIcon from '@material-ui/icons/Brush';
import CheckIcon from '@material-ui/icons/Check';
const CustomAppBar = props => {
    const isSmall = useMediaQuery('(max-width: 600px)');
    const useStyles = makeStyles((theme) => (
        {
            root: {
                position: 'relative',
                display: 'flex',
                justifyContent: isSmall ? 'center' : 'flex-end'
            },
            title: {
                flex: 1,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
            },
            button: {
                color: '#fff'
            },
            themes: {
                display: 'flex',
                flexWrap: 'wrap'
            },
            theme: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                cursor: 'pointer',
                margin: '0 4px 4px 0'
            },
            appbar: {
                background: isSmall ? '#000' : 'rgba(0,0,0,.3)',
                height: '72px',
                boxShadow: '0 0 13px rgba(0,0,0,.22)',
                position: isSmall ? 'sticky' : 'static',
                justifyContent: 'center'
            },
            dropdown: {
                position: 'absolute',
                zIndex: 1,
                backgroundColor: "#000",
                marginTop: isSmall ? '58px' : '40px',
                padding: '.5rem 1.5rem',
                borderRadius: '2px',
                boxShadow: '0 4px 18px rgba(0,0,0,.5)',
                width: '208px'
            },
            text: {
                color: 'rgba(255,255,255,.85)',
                marginBottom: '.25rem'
            }
        }
    ));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };
    const changeTheme = (i) => {
        setOpen(false);
        props.settheme(props.themes[i]);
        localStorage.setItem('theme', props.themes[i]);
    }
    return (
        <div>
            <AppBar title={props.title} open={props.open} logout={props.logout} className={classes.appbar}>
                <Typography
                    variant="h6"
                    color="inherit"
                    className={classes.title}
                    id="react-admin-title"
                />
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className={classes.root}>
                        <IconButton className={classes.button} onClick={handleClick}>
                            <BrushIcon/>
                        </IconButton>
                        {open ? (
                            <div className={classes.dropdown}>
                                <Typography variant="body2" className={classes.text}>Выбор темы</Typography>
                                <div className={classes.themes}>
                                    {props.colors.map((c, i) => (
                                        <div className={classes.theme} onClick={() => changeTheme(i)} key={i} style={{backgroundColor: c}}>
                                            {props.colors[props.themes.indexOf(props.theme)] === c && <CheckIcon/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </ClickAwayListener>
            </AppBar>
        </div>
    );
};

export default CustomAppBar;