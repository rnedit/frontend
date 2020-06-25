// @ts-ignore
import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios, { AxiosRequestConfig } from "axios";
import { useWindowResize } from "../../../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../../../security/ERules'
import { useTranslation } from 'react-i18next';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';

import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface QueryPage {
    page: number,
    pageSize: number,
}

interface AlertMSG {
    text: String,
    typeSeverity: String,
    openMsg: boolean,
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const MaterialTableStruct = React.memo(function MaterialTableStruct(props0: any) {

    const { height } = useWindowResize();
    const history = useHistory();
    const roles: string[] = props0.roles;
    const roleAccess: boolean = roles.includes(ROLES.ADMIN || ROLES.MODERATOR);
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN);
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR);
    const { t } = useTranslation();

    //const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    //const [newOrgUnit, setNewOrgUnit] = React.useState<NewOrgUnit>();
    const [qquery, setQuery] = React.useState(false);

    const [alertMSG, setAlertMSG] = React.useState<AlertMSG>({
        text: "",
        typeSeverity: "error",
        openMsg: false,
    })

    const [queryPage, setQueryPage] = React.useState<QueryPage>({
        page: 1,
        pageSize: 20,
    });

    const handleClose = () => {
        // setOpen(false);
    };

    //   const setStoreProfiles = (data: any) => store.dispatch(
    //       setProfiles(data)
    //   );

    
    const [selectedRow, setSelectedRow] = React.useState("null");
    const [state, setState] = React.useState<TableState>(

            {
                columns: [
                   
                    {
                        title: t("ТаблицаПрофайлы.0") ,
                        field: 'name',
                        editable:'never',
                        
                        render: rowData => {
                            return (
                                <Typography component="div">
                                <Box
                                 fontWeight={rowData.homeOrgUnit===true?"fontWeightMedium":"fontWeightRegular"}
                                 fontSize="fontSize"
                                 >
                                    {
                                    rowData.type==="profile"?rowData.name+" ("+ rowData.user.username+")":rowData.name
                                    }
                                </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    
 
                ],

                data: [],
            
            }

    );

    React.useEffect(() => {
        if (alertMSG.text !== "")
            setOpenMsg(alertMSG.openMsg)

    }, [alertMSG]);



const post=useCallback(
    () => {
    console.log("post")
    const axiosOption: AxiosRequestConfig = {
        method: 'post',
        url: props0.proxy + '/api/structuretree',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        withCredentials: true,

    };

    (async () => {
        const response = await axios(axiosOption)
        await sleep(1e3);
        const res = await response;
       // console.log(res)
        const p: any = res.data;
        setState((prevState) => {
            return { ...prevState, data: p };

    });
    setQuery(false)
    })();

},
[props0],
    )
React.useEffect(() => {
    if (qquery)  post()
}, [qquery, post]);

React.useEffect(() => {
   
    post()
    
}, [post]);


function onlyUnique(value:any, index:any, self:any) {
    return self.indexOf(value) === index;
  }

    return (
        <>
            <MaterialTable
                title={t("ТаблицаПрофайлы.2")}
                columns={state.columns}
                data={state.data}
                isLoading={state.data.length === 0}
                
                onChangeRowsPerPage={(pageSize: number) => {
                    setQueryPage((prevState) => {
                        return { ...prevState, pageSize };
                    });

                }}
                onChangePage={(page: number) => {
                    setQueryPage((prevState) => {
                        return { ...prevState, page };
                    });

                }}

                actions={[
                    {
                        icon: 'refresh',
                        tooltip: t("Таблица.7"),
                        isFreeAction: true,
                        onClick: () => setQuery(true)
                    },

                ]}

                localization={{
                    pagination: {
                        labelDisplayedRows: t("Таблица.8"),
                        labelRowsSelect: t("Таблица.9"),
                        labelRowsPerPage: t("Таблица.10"),
                        firstAriaLabel: t("Таблица.11"),
                        firstTooltip: t("Таблица.12"),
                        previousAriaLabel: t("Таблица.13"),
                        previousTooltip: t("Таблица.14"),
                        nextAriaLabel: t("Таблица.15"),
                        nextTooltip: t("Таблица.16"),
                        lastAriaLabel: t("Таблица.17"),
                        lastTooltip: t("Таблица.18"),
                    },
                    toolbar: {
                        nRowsSelected: t("Таблица.19"),
                        searchTooltip: t("Таблица.20"),
                        searchPlaceholder: t("Таблица.21"),
                        exportTitle: t("Таблица.22"),
                        exportAriaLabel: t("Таблица.23"),
                        exportName: t("Таблица.24"),
                        showColumnsAriaLabel: t("Таблица.25"),
                        showColumnsTitle: t("Таблица.26"),
                        addRemoveColumns: t("Таблица.27"),
                    },
                    header: {
                        actions: t("Таблица.28"),
                    },
                    grouping: {
                        placeholder: t("Таблица.29"),
                        groupedBy: t("Таблица.30"),
                    },
                    body: {
                        emptyDataSourceMessage: t("Таблица.31"),
                        addTooltip: t("Таблица.32"),
                        deleteTooltip: t("Таблица.33"),
                        editTooltip: t("Таблица.34"),
                        filterRow: {
                            filterTooltip: t("Таблица.35"),
                        },
                        editRow: {
                            deleteText: t("Таблица.36"),
                            cancelTooltip: t("Таблица.37"),
                            saveTooltip: t("Таблица.38"),
                        }
                    },

                }}
                parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                
                options={{
                    
                    defaultExpanded: true,
                    sorting: true,
                    search: true,
                    selection: true,
                    headerStyle: { position: 'sticky', top: 0 },
                    maxBodyHeight: height - 48,
                    pageSize: 500,
                    pageSizeOptions: [5, 10, 20, 100, 200, 500],
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    }),
                   
                }}
                onRowClick={((event, selectedRow: any) => setSelectedRow(selectedRow.tableData.id))}

                
            />

            <Snackbar open={openMsg} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertMSG.typeSeverity}>
                    {alertMSG.text}
                </Alert>
            </Snackbar>
        </>

    );
})
const mapStateToProps = function (state: any) {
    return {
        roles: state.currentUser.user.roles,
    }
}
export default connect(mapStateToProps)(MaterialTableStruct);