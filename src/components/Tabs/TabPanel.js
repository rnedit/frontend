import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >

            <AppBar position="static" color="default">

                <Tabs
                    value={value}
                    orientation="vertical"
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="Приказы и распоряжения" {...a11yProps(0)} />
                    <Tab label="Внутренние документы" {...a11yProps(1)} />
                    <Tab label="Входящие докменты" {...a11yProps(2)} />
                    <Tab label="Исходящие докменты" {...a11yProps(3)} />
                    <Tab label="Структура" {...a11yProps(4)} />
                    <Tab label="Справочник" {...a11yProps(5)} />
                </Tabs>
            </AppBar>

        </div>
    );
}
