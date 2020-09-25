// @ts-ignore
import React from 'react';
import { Redirect } from 'react-router-dom';
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
import RequestInternal from "./RequestInternal"
//import { setInternal, setInternalApollo } from "../../../../reducers/internal";
import OpenDocument from "../../workflowForm/Internal/OpenDocument"
import { useGetInternalsQuery, useSearchInternalsQuery} from "../../generated/graphql"
import { Row } from './Row';


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
    const adminModerRoles = [ROLES.MODERATOR, ROLES.ADMIN]
    const roleAccess: boolean = roles.some((r: any) => adminModerRoles.includes(r));
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN);
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR);
    const { t } = props;

    const [dataRequest, setDataRequest] = React.useState<RequestInternal>({
        userId,
        searchText: "",
        page: 0,
        pageSize: 15,
        countExec: 0
    })

    const [openInternal, setOpenInternal] = React.useState(false);

    const handleCallBackClose = () => {
        setOpenInternal(false)
    }
    const [openMsg, setOpenMsg] = React.useState(false);

    const [alertMSG, setAlertMSG] = React.useState<AlertMSG>({
        text: "",
        typeSeverity: "error",
        openMsg: false,
    })

    const [selectedRow, setSelectedRow] = React.useState("0");

    const [selectedDocument, setSelectedDocument] = React.useState("");

    const handleClose = () => {
        // setOpen(false);
    };

    const handleOnClickRow = (event: any, rowData: any) => {
        setSelectedRow(rowData.tableData.id);
        setSelectedDocument(rowData.id);
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
                    title: "version",
                    hidden: true,
                    field: 'version',
                    editable: "never",
                },

                {
                    title: t("Таблица.40"),
                    field: 'number',
                    width: 50,
                   customFilterAndSearch : (value, rowData)=>{
                    return true;
                },
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
                    title: t("ТаблицаВнутренниеДокументы.1"),
                    field: 'recipientName',
                    width: 300,
                   customFilterAndSearch : (value, rowData)=>{
                    return true;
                },
                    render: rowData => {
                        const { recipientName } = rowData;
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                    {recipientName}
                                </Box>
                            </Typography>


                        )
                    },
                },
                {
                    title: t("Таблица.39"),
                    field: 'subject',
                  customFilterAndSearch : (value, rowData)=>{
                    return true;
                },
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

    const { data, loading, error, networkStatus } = useSearchInternalsQuery({
        variables: {
            query: dataRequest
        },
    });

    React.useEffect(() => {
        if (loading === false) {
            const rows: Row[] | undefined = data?.searchInternals?.internalList?.map(o=>({...o} as Row));
            if (rows !== undefined) {
                if (rows.length > 0) {
                    setState((prevState) => {
                        return { ...prevState, data: rows };
                    });
                }
            }
        }
    }, [data, loading]);

    React.useEffect(() => {
        if (alertMSG.text !== "")
            setOpenMsg(alertMSG.openMsg)

    }, [alertMSG]);

    const tableRef: any = React.createRef();

    const Drawer = (props:any) => {
    const {id} = props;
        return (
            <div>
                <OpenDocument idDocument={id} propsOpen={openInternal} callBackClose={handleCallBackClose} />
            </div>
        )
    }
    //Apollo error connection useGetInternalsQuery
    if (error) {
        console.log("Apollo Error", error)
        console.log("Apollo NetworkStatus", networkStatus)
        return <Redirect to='/signin' />;
    }
    let timeoutOnSearchChange: any = null;
    return (
        <>
            {(selectedDocument.length > 0)?
                <Drawer id={selectedDocument}/> : ""
            }
            <MaterialTable
                title={t("ТаблицаВнутренниеДокументы.0")}
                tableRef={tableRef}
                columns={state.columns}
                data={state.data}
                isLoading={loading}
                totalCount={data?.searchInternals?.totalCount?data?.searchInternals?.totalCount:undefined}
                page={dataRequest.page}
                onSearchChange={(searchText: string) => {
                    clearTimeout(timeoutOnSearchChange);
                    timeoutOnSearchChange = setTimeout(function () {
                        setDataRequest((prevState) => {
                            return { 
                                ...prevState,
                                page: 0,
                                searchText, 
                                countExec: dataRequest.countExec + 1 }
                        })
                    }, 1000);
                }}
                onChangeRowsPerPage={(pageSize: number) => {
                    setDataRequest((prevState) => {
                        return { ...prevState, pageSize };
                    });

                }}
                onChangePage={(page: number) => {
                    setDataRequest((prevState) => {
                        return { ...prevState, page };
                    });

                }}

                actions={[
                    {
                        icon: 'refresh',
                        tooltip: t("Таблица.7"),
                        isFreeAction: true,
                        onClick: () => setDataRequest((prevState) => {
                            return { ...prevState, countExec: dataRequest.countExec + 1 }
                        })
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
                       // exportCSVName: t("Таблица.24"),
                      //  exportPDFName: t("Таблица.41"),
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
                    filtering:false,
                    //search:false,
                    addRowPosition: 'first',
                    headerStyle: { position: 'sticky', top: 0 },
                    maxBodyHeight: height - 48,
                    actionsColumnIndex: -1,
                    exportButton: true,
                    pageSize: dataRequest.pageSize,
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
export default connect(mapStateToProps)(MaterialTableStruct);