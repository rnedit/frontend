import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from '@material-ui/core/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
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
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 800,
        marginTop:8,
        backgroundColor: theme.palette.background.paper,
    },
}));
export default function TabsTopMenu(props) {
    const { value } = props;
    const { callback } = props;

    const classes = useStyles();
    const [valueOut, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
     setValue(newValue);
     callback(newValue);
    };
    return (
        <>
            <TabPanel value={value} index={0}>
                Внутренние документы
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
                                value={valueOut}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab label="Пользователи" {...a11yProps(0)} />
                                <Tab label="Профайлы" {...a11yProps(1)} />
                                <Tab label="Организационная единица" {...a11yProps(2)} />
                                <Tab label="Структура" {...a11yProps(3)} />

                            </Tabs>
                        </AppBar>
                  

                </div>
            </TabPanel>
            <TabPanel value={value} index={5}>
                Справочник
            </TabPanel>
        </>

    )
}
