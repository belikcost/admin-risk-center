import * as React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import bg1 from '../../img/1.jpg';
import bg2 from '../../img/2.jpg';
import bg3 from '../../img/3.jpg';
import bg4 from '../../img/4.jpg';
import bg5 from '../../img/5.jpg';
import bg6 from '../../img/6.jpg';
import bg7 from '../../img/7.jpg';
import bg8 from '../../img/8.jpg';
import bg9 from '../../img/9.jpg';
import bg10 from '../../img/10.jpg';
import {Notification, setSidebarVisibility, Sidebar,} from 'react-admin';
import {createMuiTheme, useMediaQuery} from "@material-ui/core";
import CustomAppBar from "./CustomAppBar";
import CustomMenu from "./CustomMenu";

const MyLayout = ({logout, children, dashboard, title}) => {
    const isSmall = useMediaQuery('(max-width: 600px)');
    const themes = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];
    const colors = ['#772036', '#273C5B', '#174042','#383844', '#49423F', '#5e3d22', '#234d6d', '#3b5e5e', '#0a4c3e', '#7b3d54'];
    const [thisTheme, setThisTheme] = useState(bg1);
    useEffect(() => {
        let theme = localStorage.getItem('theme');
        theme && setThisTheme(theme);
    }, []);
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            height: '100vh',
            transition: 'all .3s',
            backgroundImage: 'url(' + thisTheme + ')',
            backgroundSize: '100% 100%',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            position: 'relative',
        },
        appFrame: {
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
            height: '100%'
        },
        contentWithSidebar: {
            display: 'flex',
            flexGrow: 1,
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 2,
            padding: isSmall ? 0 : theme.spacing(3),
            marginTop: '4em',
            paddingLeft: isSmall ? 0 : 5,
        },
        sidebar: {
            background: 'rgba(0,0,0,.125)',
            color: '#fff',
            padding: '15px'
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const windowWidth = window.innerWidth;
    const open = useSelector(state => state.admin.ui.sidebarOpen);
    const theme = createMuiTheme({
        typography: {
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 400
        },
        overrides: {
            RaSidebar: {
                drawerPaper: isSmall && {
                    backgroundColor: '#000 !important'
                }
            },
            MuiListItem: {
                button: {
                    transition: 'all .3s',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                    }
                }
            },
            RaDeleteWithUndoButton: {
                deleteButton: {
                    color: '#f44336 !important'
                }
            },
            MuiButton: {
                textPrimary: {
                    color: 'rgba(255,255,255,.7) !important',
                    transition: 'all .3s',
                    '&:hover': {
                        color: '#fff !important'
                    },
                    marginTop: '0 !important'
                },
                textSizeSmall: {
                    color: '#fff',
                    marginTop: '1rem'
                },
                containedPrimary: {
                    backgroundColor: '#000',
                    '&:hover': {
                        backgroundColor: '#000',
                    }
                },
                label: isSmall && {
                    flexDirection: 'column'
                },
                contained: {
                    '&:disabled': {
                        color: 'rgba(255, 255, 255, 0.26)',
                    }
                }
            },
            RaAppBar: {
                toolbar: isSmall && {
                    paddingRight: 0
                }
            },
            RaAutocompleteSuggestionList: {
                suggestionsPaper: {
                    backgroundColor: '#000'
                }
            },
            MuiSvgIcon: {
                root: {
                    width: '20px',
                    height: '20px',
                }
            },
            RaListToolbar: {
                toolbar: {
                    background: 'none !important'
                },
            },
            RaTopToolbar: {
                root: {
                    background: 'none !important'
                }
            },
            RaButton: {
                button: {
                    marginLeft: '0 !important'
                }
            },
            MuiIconButton: {
                root: {
                    transition: 'all .3s',
                    color: 'rgba(255, 255, 255, 0.54)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)'
                    },
                    '&:disabled': {
                        color: 'rgba(255, 255, 255, 0.26)'
                    }
                },
                colorPrimary: {
                    color: 'rgba(255,255,255,.7)',
                    marginLeft: '0 !important'
                }
            },
            MuiSelect: {
                icon: {
                    color: 'rgba(255, 255, 255, 0.54)'
                }
            },
            MuiList: {
                root: {
                    background: 'rgba(0,0,0,.96)',
                    boxShadow: '0 4px 18px rgba(0,0,0,.5)',
                }
            },
            MuiTable: {
                root: {
                    borderCollapse: 'inherit'
                }
            },
            MuiInputLabel: {
                root: {
                    color: '#fff !important'
                }
            },
            RaToolbar: {
                toolbar: {
                    backgroundColor: '#000',
                    boxShadow: '0 0 13px rgba(0,0,0,.22)',
                    padding: '0 1rem'
                },
                defaultToolbar: {
                    alignItems: 'center'
                }
            },
            MuiSwitch: {
                colorPrimary: {
                    color: '#fff !important'
                },
                track: {
                    backgroundColor: '#000 !important',
                    opacity: '1 !important'
                }
            },
            MuiTableSortLabel: {
                root: {
                    color: '#fff !important'
                },
                icon: {
                    color: 'rgba(255,255,255,.5) !important'
                }
            },
            MuiTablePagination: {
                root: {
                    color: '#fff'
                }
            },
            MuiPaper: {
                elevation1: {
                    boxShadow: 'none',
                },
                root: {
                    color: '#fff',
                    backgroundColor: 'rgba(0,0,0,0)'
                }
            },
            MuiTableRow: {
                root: {
                    transition: 'all .3s',
                    '&:hover': {
                        background: 'rgba(255,255,255,.06) !important'
                    }
                }
            },
            MuiTableCell: {
                head: {
                    color: '#fff',
                    background: 'none !important',
                    borderBottom: '2px solid rgba(255,255,255,.125)'
                },
                root: {
                    borderBottom: '1px solid rgba(255,255,255,.125)'
                },
                body: {
                    color: '#fff'
                }
            },
            MuiFilledInput: {
                root: {
                    color: '#fff',
                    backgroundColor: 'inherit !important',
                    '&:hover': {
                        backgroundColor: 'inherit'
                    }
                },
                underline: {
                    '&:hover': {
                        '&:before': {
                            borderBottom: '1px solid rgba(255,255,255,.2)'
                        }
                    },
                    '&:before': {
                        borderBottom: '1px solid rgba(255,255,255,.2)'
                    },
                    '&:after': {
                        borderBottom: '1px solid #fff'
                    }
                }
            },
            RaBulkActionsToolbar: {
                toolbar: {
                    color: '#fff',
                    backgroundColor: '#000'
                },
                title: {
                    alignItems: 'center'
                }
            },
            MuiCheckbox: {
                colorPrimary: {
                    color: '#fff !important'
                }
            },
            RaCreate: {
                main: {
                    background: 'rgba(0,0,0,.2)',
                    margin: !isSmall && '0 1rem 1rem',
                    padding: isSmall ? '.5rem 1rem' : '2.2rem',
                    boxShadow: '0 1px 5px rgb(0 0 0 / 10%)'
                },
                card: {
                    boxShadow: 'none'
                }
            },
            RaEdit: {
                main: {
                    background: 'rgba(0,0,0,.2)',
                    margin: !isSmall && '0 1rem 1rem',
                    padding: isSmall ? '.5rem 1rem' : '2.2rem',
                    boxShadow: '0 1px 5px rgb(0 0 0 / 10%)'
                },
                card: {
                    boxShadow: 'none'
                }
            },
            RaShow: {
                main: {
                    background: 'rgba(0,0,0,.2)',
                    margin: !isSmall && '0 1rem 1rem',
                    padding: isSmall ? '.5rem 1rem' : '2.2rem',
                    boxShadow: '0 1px 5px rgb(0 0 0 / 10%)'
                },
                card: {
                    boxShadow: 'none'
                }
            },
            MuiFormLabel: {
                root: {
                    color: '#fff'
                }
            },
            MuiFab: {
                primary: {
                    backgroundColor: '#000',
                    '&:hover': {
                        backgroundColor: '#4d4d4d'
                    }
                }
            },
            RaList: {
                root: {
                    color: '#fff',
                    margin: !isSmall && '0 1rem 1rem',
                    background: 'rgba(0,0,0,.2)',
                    borderRadius: '2px',
                    padding: isSmall ? '.5rem 1rem' : '2.2rem',
                    boxShadow: '0 1px 5px rgb(0 0 0 / 10%)'
                },
                content: {
                    background: 'none',
                    boxShadow: 'none'
                }
            },
            RaMenuItemLink: {
                active: {
                    color: '#fff !important',
                    background: 'rgba(255,255,255,.06)'
                },
                root: {
                    padding: '.5rem 1rem',
                    borderRadius: '2px',
                    color: 'rgba(255,255,255,.7)',
                    '&:hover': {
                        color: '#fff',
                        background: 'rgba(255,255,255,.06)'
                    }
                },
                icon: {
                    color: 'inherit'
                }
            },
        },
    });


    useEffect(() => {
        dispatch(setSidebarVisibility(windowWidth >= 800));
    }, [setSidebarVisibility]);

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <CustomAppBar theme={thisTheme} themes={themes} colors={colors} settheme={setThisTheme} title={title} open={open} logout={logout}/>
                    <main className={classes.contentWithSidebar}>
                        <Sidebar className={classes.sidebar}>
                            <CustomMenu hasDashboard={!!dashboard}/>
                        </Sidebar>
                        <div className={classes.content}>
                            {children}
                        </div>
                    </main>
                    <Notification/>
                </div>
            </div>
        </ThemeProvider>
    );
};

MyLayout.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    dashboard: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    title: PropTypes.string.isRequired,
};

export default MyLayout;