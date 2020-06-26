import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from '@material-ui/core/styles';
import { NavTab } from "react-router-tabs";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-top-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-top-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
    return {
      id: `scrollable-auto-top-tab-${index}`,
      'aria-controls': `scrollable-auto-top-tabpanel-${index}`,
    };
  }
 
  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        marginTop:8,
        backgroundColor: theme.palette.background.paper,
    },
}));
function TabsTopMenu(props) {
    
    console.log("Render TabsTopMenu")
    const { value, stab } = props;
    const { callback } = props;

    const classes = useStyles();
    const [valueOut, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
     setValue(newValue);
     callback(newValue);
    };

    const NavTabRef = React.forwardRef((props, ref) =><NavTab {...props} innerRef={ref} />)
    return (
        <>
            <TabPanel value={value} index={0}>
                Внутренние документы top
            </TabPanel>
            <TabPanel value={value} index={1}>
                Приказы и распоряжения
            </TabPanel>
            <TabPanel value={value} index={2}>
                Входящие докменты
            </TabPanel>
            <TabPanel value={value} index={3}>
                Исходящие докменты
            </TabPanel>
            <TabPanel value={value} index={4} >

                <div className={classes.root}>

                        <AppBar position="static" color="default">
                            <Tabs
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs"
                                value={stab?Number(stab):valueOut} 
                            >
                                <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=0"} label="Пользователи" {...a11yProps(0)} />
                                <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=1"} label="Группы" {...a11yProps(1)} />
                                <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=2"} label="Должности" {...a11yProps(2)} />
                                <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=3"} label="Организационная единица" {...a11yProps(3)} />
                                <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=4"} label="Структура" {...a11yProps(4)} />

                            </Tabs>
                        </AppBar>
                  

                </div>
            </TabPanel>
            <TabPanel value={value} index={5}>
                Справочник
            </TabPanel>
        </>

    )
};
export default TabsTopMenu
