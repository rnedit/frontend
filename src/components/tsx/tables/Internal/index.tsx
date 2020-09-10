// @ts-ignore
import React, { useCallback } from 'react';
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { ROLES } from '../../../security/ERules'
import { useWindowResize } from "../../UseWindowResize";
import { internalsApi } from "../../../../api/Internals"
import RequestInternal from "./RequestInternal"
import {setInternal} from "../../../../reducers/internal";
import InternalDocument from "../../workflowForm/Internal/MainDocument"

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

function MaterialTableStruct(props: any) {

    const { height } = useWindowResize();
    const roles: string[] = props.roles;
    const userId: string = props.userId;
    const adminModerRoles = [ROLES.MODERATOR , ROLES.ADMIN]
    const roleAccess: boolean = roles.some((r:any) => adminModerRoles.includes(r) );
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN);
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR);
    const {t}=props;

    const [query, setQuery] = React.useState(false);

    const [openInternal, setOpenInternal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    const handleCallBackClose = () => {
        setOpenInternal(false)
      }

    //const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    
    const [alertMSG, setAlertMSG] = React.useState<AlertMSG>({
        text: "",
        typeSeverity: "error",
        openMsg: false,
    })

    const [queryPage, setQueryPage] = React.useState<QueryPage>({
        page: 1,
        pageSize: 15,
    });

    const [selectedRow, setSelectedRow] = React.useState("null");

    const handleClose = () => {
        // setOpen(false);
    };

    const handleOnClickRow = (event: any, rowData: any) => {
        setSelectedRow(rowData.tableData.id);
        props.setInternal(rowData.id);
        setOpenInternal(true);
    }

    const [state, setState] = React.useState<TableState>(

            {
                columns: [
                    {
                        title: "id",
                        hidden: true,
                        field: 'id',
                        editable: "never",
                    },

                    {
                        title: t("Таблица.40"),
                        field: 'number',
                        
                        render: rowData => {
                            const { number } = rowData;
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                        {number}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    
                    {
                        title: t("Таблица.39"),
                        field: 'name',
                        render: rowData => {
                            const { subject } = rowData;
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightNormal" fontSize="fontSize">
                                        {subject}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    {
                        title: t("Таблица.0"),
                        field: 'creationDate',
                        editable: "never",
                        defaultSort: "desc",
                        sorting: true,
                        render: rowData => {
                            let stringDate: string = "";
                            if (rowData !== null && rowData !== undefined) {
                                const { creationDate } = rowData;
                                Moment.locale('ru');
                                stringDate = Moment(creationDate).format('HH:mm DD/MM/YYYY')
                            }
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        {stringDate}
                                    </Box>
                                </Typography> 
                                
                            )
                        },
                    },

                ],

                data: [],
            }
    );

    const dataPost = useCallback(
        () => {
            const data: RequestInternal = {
                userId,
                page:queryPage.page,
                perPage:queryPage.pageSize,
            }
            internalsApi.getInternals(data)
            .then((r:any)=>{
                if (r!==undefined && Number(r.status)===200) {
                    //console.log(r)
                    setState((prevState) => {
                        const data = r.data.internals;
                        return { ...prevState, data };
    
                    });
                    setLoading(false)
                }
               
            })
            setQuery(false)
        },
        [userId, queryPage],
    )

    React.useEffect(() => {
        setTimeout(() => {
            setQuery(true);
        }, 500);
    }, []);

    React.useEffect(() => {
        if (alertMSG.text !== "")
            setOpenMsg(alertMSG.openMsg)

    }, [alertMSG]);

    React.useEffect(() => {
        if (query) dataPost()
    }, [query, dataPost]);
  
    const tableRef: any = React.createRef();

    const drawer = (
    
        <div>
            <InternalDocument propsOpen={openInternal} callBackClose={handleCallBackClose}/>
        </div>
        
        );

    return (
        <>
        {drawer}
            <MaterialTable
                title={t("ТаблицаВнутренниеДокументы.0")}
                tableRef={tableRef}
                columns={state.columns}
                data={state.data}
                //isLoading={state.data.length === 0}.
                isLoading={loading}
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
                /*
                https://material-table.com/#/docs/features/tree-data

                parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}

                https://material-table.com/#/docs/features/localization
                */
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

                options={{
                    addRowPosition: 'first',
                    headerStyle: { position: 'sticky', top: 0 },
                    maxBodyHeight: height - 48,
                    actionsColumnIndex: -1,
                    exportButton: true,
                    pageSize: 15,
                    pageSizeOptions: [5, 10, 15, 20, 100, 200, 500],
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
                onRowClick={((event, selectedRow: any) => handleOnClickRow(event, selectedRow))}

            />

            <Snackbar open={openMsg} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertMSG.typeSeverity}>
                    {alertMSG.text}
                </Alert>
            </Snackbar>
        </>

    );
}
const mapStateToProps = function (state: any) {
    return {
        roles: state.currentUser.user.roles,
        userId: state.currentUser.user.id
    }
}
export default connect(mapStateToProps,{setInternal})(MaterialTableStruct);