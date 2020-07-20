import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classNames from 'classnames'
import LoginLogout from "./loginLogout/LoginLogout";
import { connect } from 'react-redux';
import LetterAvatars from "./LetterAvatars/la";
import { useLocation } from "react-router-dom";
import ButtonSignUp from "./ButtonSignUp";

import TabPanelTabs from '../components/Tabs/TabPanelTabs'
import TabPanelTabsOnTopMenu from '../components/Tabs/TabPanelTabsOnTopMenu'

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { NavTab } from "react-router-tabs";
import { useTranslation } from 'react-i18next';
import { ROLES } from '../components/security/ERules'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },

    appBar2: {

        marginBottom: theme.spacing(5),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    indicator: {
        backgroundColor: "white"
    },
    wrapper: {
        width: "100%",
        display: "inline-flex",
        alignItems: "first baseline",
        flexDirection: "row",
        justifyContent: "left",
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,

    };
}

function TopAppBarAndLeftMenu(props) {
    console.log("Render TopAppBarAndLeftMenu")
    const { t } = useTranslation();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const roleAccess = props.roles.includes(ROLES.ADMIN || ROLES.MODERATOR);
    const [countTab, setCountTab] = React.useState(0);
    const [showStruct, setShowStruct] = React.useState(false);
    const [cStruct, setCStruct] = React.useState(0);
    const [showSZ, setShowSZ] = React.useState(false);
    const [cSZ, setCSZ] = React.useState(0);
    const [showORD, setShowORD] = React.useState(false);
    const [cORD, setCORD] = React.useState(0);
    const [showINDOC, setShowINDOC] = React.useState(false);
    const [cINDOC, setCINDOC] = React.useState(0);
    const [showOUTDOC, setShowOUTDOC] = React.useState(false);
    const [cOUTDOC, setCOUTDOC] = React.useState(0);
    const [showSprav, setShowSprav] = React.useState(false);
    const [cSprav, setCSprav] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [valueTopMenu, setValueTopMenu] = React.useState(0);

    const handleChange = useCallback(
        (event, newValue) => {
            setValue(newValue);
        },
        [],
    )


    const handleDrawerToggle = useCallback(
        () => {
            setMobileOpen(!mobileOpen);
        },
        [mobileOpen],
    )

    const myCallback = useCallback(
        (dataFromChild) => {
            setValueTopMenu(dataFromChild);
        },
        [],
    )

    const AppBar1 = classNames(classes.appBar, classes.appBar2);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const tab = query.get('tab')
    const stab = query.get('stab')
    const NavTabRef = React.forwardRef((props, ref) => <NavTab {...props} innerRef={ref} />)
    const [arrTabDrawer, setArrTabDrawer] = React.useState([]);

    const tabDrawer = (name, show) => {
        let tab
        
            switch (name) {
                
                case "ACCESS_SZ": {
                    setShowSZ(show)
                    setCSZ(countTab)
                    
                    break;
                }
                case "ACCESS_ORD": {
                    setShowORD(show)
        
                    if (showSZ) {
                        setCountTab(countTab+1)
                        setCORD(countTab)
                    }
                    break;
                }
                case "ACCESS_INDOC": {
                    setShowINDOC(show)
        
                    if (showORD) {
                        setCountTab(countTab+1)
                        setCINDOC(countTab)
                    }
                    break;
                }
                case "ACCESS_OUTDOC": {
                    setShowOUTDOC(show)
        
                    if (showORD) {
                        setCountTab(countTab+1)
                        setCOUTDOC(countTab)
                    }
                    break;
                }
                case "ACCESS_STRUCT": {
                    setShowStruct(show)
        
                    if (showOUTDOC) {
                        setCountTab(countTab+1)
                        setCStruct(countTab)
                    }
                    break;
                }

                    case "ACCESS_SPRAV": {
                        setShowSprav(show)
                        if (showStruct) {
                            setCountTab(countTab+1)
                            setCSprav(countTab)
                        }
                        break;
                    }
                        
                default:
                    break;
            }
           
           // tab = <Tab component={NavTabRef} to={"/workflow?tab=" + countTab}
          //  classes={{ wrapper: classes.wrapper }} label={label} {...a11yProps(countTab)} />
           
           
        
        return tab
    }


    useEffect(() => {
        setCountTab(0)
     tabDrawer("ACCESS_SZ", props.accessProfile.some(e => e.name === "ACCESS_SZ"))
    tabDrawer("ACCESS_ORD", props.accessProfile.some(e => e.name === "ACCESS_ORD"))
     tabDrawer("ACCESS_INDOC", props.accessProfile.some(e => e.name === "ACCESS_INDOC"))
      tabDrawer("ACCESS_OUTDOC", props.accessProfile.some(e => e.name === "ACCESS_OUTDOC"))
      tabDrawer("ACCESS_STRUCT",props.accessProfile.some(e => e.name === "ACCESS_STRUCT"))
    tabDrawer("ACCESS_SPRAV", props.accessProfile.some(e => e.name === "ACCESS_SPRAV"))
        return () => {

        }
    }, [props.accessProfile,showSZ,showSprav,showStruct])

//    useEffect(() => {
//     //drawer(arrTabDrawer)
//        return () => {
          
//        }
//    }, [])

const leftGen =()=> {
    let arr = []
    if (showSZ) {
            let d = <Tab key="0" component={NavTabRef} to={"/workflow?tab=" + cSZ}
            classes={{ wrapper: classes.wrapper }} label={"Внутренние документы"} {...a11yProps(cSZ)} />
            arr.push(d)
    }
    if (showORD) {
            let d =  <Tab key="1" component={NavTabRef} to={"/workflow?tab=" + cORD}
            classes={{ wrapper: classes.wrapper }} label={"Приказы и ОРД"} {...a11yProps(cORD)} />
            arr.push(d)
    }
    if (showINDOC) {
        let d = <Tab key="2" component={NavTabRef} to={"/workflow?tab=" + cINDOC}
        classes={{ wrapper: classes.wrapper }} label={"Входящие документы"} {...a11yProps(cINDOC)} />
        arr.push(d)
}
if (showOUTDOC) {
    let d = <Tab key="3" component={NavTabRef} to={"/workflow?tab=" + cOUTDOC}
    classes={{ wrapper: classes.wrapper }} label={"Исходящие документы"} {...a11yProps(cOUTDOC)} />
    arr.push(d)
}
if (showStruct) {
    let d =  <Tab key="4" component={NavTabRef} to={"/workflow?tab=" + cStruct}
    classes={{ wrapper: classes.wrapper }} label={"Структура"} {...a11yProps(cStruct)} />
    arr.push(d)
}
if (showSprav) {
    let d = <Tab key="5" component={NavTabRef} to={"/workflow?tab=" + cSprav}
    classes={{ wrapper: classes.wrapper }} label={"Справочник"} {...a11yProps(cSprav)} />
    arr.push(d)
}
    setArrTabDrawer((prevState)=> {
        return [...prevState, arr]
    })
} 

const leftDefaultAdminModer = () =>  {
    return [
                    <Tab key="0" component={NavTabRef} to="/workflow?tab=0"
                      classes={{ wrapper: classes.wrapper }} label="Внутренние документы" {...a11yProps(0)} />,
                     <Tab key="1" component={NavTabRef} to="/workflow?tab=1"
                      classes={{ wrapper: classes.wrapper }} label="Приказы и ОРД" {...a11yProps(1)} />,
                     <Tab key="2" component={NavTabRef} to="/workflow?tab=2"
                      classes={{ wrapper: classes.wrapper }} label="Входящие документы" {...a11yProps(2)} />,
                     <Tab key="3" component={NavTabRef} to="/workflow?tab=3"
                      classes={{ wrapper: classes.wrapper }} label="Исходящие документы" {...a11yProps(3)} />,
                     <Tab key="4" component={NavTabRef} to="/workflow?tab=4"
                      classes={{ wrapper: classes.wrapper }} label="Структура" {...a11yProps(4)} />,
                     <Tab key="5" component={NavTabRef} to="/workflow?tab=5"
                      classes={{ wrapper: classes.wrapper }} label="Справочник" {...a11yProps(5)} />,
    ]
}
 

    const drawer = (
      
        <div>

            <div className={classes.toolbar}>
                <div style={{ width: '100%' }}>
                    <Box display="flex" justifyContent="center" mx={1.5} px={1.5} >
                        <Box flexGrow={1} >
                            <LetterAvatars username={props.username} />
                        </Box>
                        <Box mt={1.5} >
                            {/*
                            <Fab size="small" variant="extended"  color="primary"
                                 onClick={() => {
                                     history.push('/workflow/createmaindocument')
                                 }}>
                                <AddIcon className={classes.extendedIcon} />
                                Создать
                            </Fab>
                                */}
                        </Box>
                    </Box>

                </div>
            </div>
            <Divider />
            <AppBar position="static" color="default">
                <Tabs
                    orientation="vertical"
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    value={tab ? Number(tab) : value}
                    aria-label="scrollable auto tabs"
                >
                    { !roleAccess ? leftGen 
                    : leftDefaultAdminModer() }


                </Tabs>
            </AppBar>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>



        </div>
    );

    const signupButton = (
        <Box >
            <ButtonSignUp />
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <div className={classes.root}>

            <CssBaseline />

            <AppBar position="fixed" color="default" className={AppBar1}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>


                    <div style={{ width: '100%' }}>
                        <Box display="flex" >
                            <Box flexGrow={1} >
                                <TabPanelTabsOnTopMenu value={tab ? Number(tab) : value} stab={stab ? Number(stab) : "0"} callback={myCallback} />
                            </Box>
                            <Box >
                                <LoginLogout />
                            </Box>
                            {!props.loggedIn ? signupButton : ''}
                        </Box>
                    </div>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            <main className={classes.content}>

                <div className={classes.toolbar} />

                {/* props.children */}

                <TabPanelTabs t={t} value={tab ? Number(tab) : value} valueTopMenu={stab ? Number(stab) : valueTopMenu} />

            </main>

        </div>
    );
}

TopAppBarAndLeftMenu.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const mapStateToProps = function (state) {
    return {
        username: state.currentUser.user.username,
        loggedIn: state.currentUser.user.loggedIn,
        accessProfile: state.accessProfile.data,
        roles: state.currentUser.user.roles,
    }
}
export default connect(mapStateToProps)(TopAppBarAndLeftMenu);
