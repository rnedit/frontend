import React from 'react';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import StructTabs from './StructTabs'
import { proxy } from "../../Conf";
import { connect } from 'react-redux';
import TableInternal from '../tables/Internal'

function TabPanel(props:any) {
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

function Tabs(props:any) {
    const { value, t } = props;
    const { valueTopMenu } = props;
    const {dataAccessProfile} = props;

    const bodyMenuUserGen = () => {

        let arr:any = []

        dataAccessProfile.map((p:any) => {
            switch (p.name) {
                case "ACCESS_SZ": {
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                        <TableInternal t={t}/>
                    </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_ORD":{
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                    Приказы и распоряжения body
                        </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_INDOC":{
                    let d =  <TabPanel key={p.count} value={value} index={p.count}>
                    Входящие докменты body
                </TabPanel>
                arr.push(d)
                break;
                }
                   
                case "ACCESS_OUTDOC":{
                    let d = <TabPanel key={p.count} value={value} index={p.count}>
                    Исходящие докменты body
                        </TabPanel>
                arr.push(d)
                break;
                }
                    
                case "ACCESS_STRUCT":{
                    let d = <TabPanel key={p.count} value={value} index={p.count}>
               
                    <div style={{ width: '100%' }}>
   
                           <Box >
                               <StructTabs t={t} proxy={proxy} value={valueTopMenu} />
                           </Box>
   
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
      {bodyMenuUserGen()}
        </>

    )
}
const mapStateToProps = function (state:any) {
    return {
        accessProfile: state.accessProfile.data,
        roles: state.currentUser.user.roles,
    }
}
export default connect(mapStateToProps)(Tabs);