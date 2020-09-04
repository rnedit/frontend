import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from "@material-ui/core/Tabs";
import { makeStyles } from '@material-ui/core/styles';
import { NavTab } from "react-router-tabs";
import { connect } from 'react-redux';

function TabPanel(props:any) {
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
function TabsTopMenu(props:any) {
    
    console.log("Render TabsTopMenu")
    const { value, stab } = props;
    const { callback } = props;
    const classes = useStyles();
    const [valueOut, setValue] = React.useState(0);
    const {dataAccessProfile} = props;
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
     setValue(newValue);
     callback(newValue);
    };

    const NavTabRef = React.forwardRef((props:any, ref:any) =><NavTab {...props} innerRef={ref} />)

    const topMenuUserGen = () => {

        let arr:any = []

        dataAccessProfile.map((p:any) => {
            switch (p.name) {
                case "ACCESS_SZ": {
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                    Внутренние документы top
                    </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_ORD":{
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                    Приказы и распоряжения
                        </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_INDOC":{
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                    Входящие докменты
                </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_OUTDOC":{
                    let d = <TabPanel key={p.count} value={value} index={p.count}>
                    Исходящие докменты
                        </TabPanel>
                arr.push(d)
                break;
                }
                    
                case "ACCESS_STRUCT":{
                    let d = <TabPanel key={p.count} value={value} index={p.count}>

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
                                    {/* <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=1"} label="Группы" {...a11yProps(1)} /> */}
                                    <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=1"} label="Должности" {...a11yProps(1)} />
                                    <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=2"} label="Организационная единица" {...a11yProps(2)} />
                                    <Tab component={NavTabRef} to={"/workflow?tab="+value+"&stab=3"} label="Структура" {...a11yProps(3)} />
    
                                </Tabs>
                            </AppBar>
                    </div>
                </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_SPRAV":{
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                    Справочник
                </TabPanel>
                arr.push(d)
                break;
                }
                   
                default:
                    break;
            }

        })
        return arr
    }
   
    return (
        <>
        {topMenuUserGen()}
        </>

    )
};
const mapStateToProps = function (state:any) {
    return {
        accessProfile: state.accessProfile.data,
        roles: state.currentUser.user.roles,
    }
}
export default connect(mapStateToProps)(TabsTopMenu);
