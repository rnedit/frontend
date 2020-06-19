import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import StructTabs from '../tsx/tabs/StructTabs'
import { proxy } from "../Conf";

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

export default function Tabs(props) {
    const { value } = props;
    const { valueTopMenu } = props;

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
     
                <TabPanel value={value} index={4}>
               
                 <div style={{ width: '100%' }}>

                        <Box >
                            <StructTabs proxy={proxy} value={valueTopMenu} />
                        </Box>

                    </div>
            
                   
                </TabPanel>

           

            <TabPanel value={value} index={5}>
                Справочник
            </TabPanel>
        </>

    )
}
