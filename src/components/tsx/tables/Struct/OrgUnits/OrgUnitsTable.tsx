// @ts-ignore
import React, { useCallback } from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { useWindowResize } from "../../../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../../../security/ERules'
import { NewOrgUnit } from './NewOrgUnit';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';
import DialogListAddProfile from '../../../dialog/DialogListAddProfile'
import DialogListAddOrgUnit from '../../../dialog/DialogListAddOrgUnit'
import TextField from '@material-ui/core/TextField';
import ListProfiles from '../../../dialog/ListProfiles';
import ListOrgUnits from '../../../dialog/ListOrgUnits';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SwitcheHomeOrgUnit from './SwitcheHomeOrgUnit'

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

function MaterialTableStruct(props0: any) {

    const { height } = useWindowResize();
    const history = useHistory();
    const roles: string[] = props0.roles;
    const adminModerRoles = [ROLES.MODERATOR , ROLES.ADMIN]
    const roleAccess: boolean = roles.some((r:any) => adminModerRoles.includes(r) );
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN);
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR);
    const {t}=props0;

    //const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    const [newOrgUnit, setNewOrgUnit] = React.useState<NewOrgUnit>();
    const [qquery, setQuery] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
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

        roleAccess ?
            {
                columns: [
                    {
                        title: "id",
                        hidden: true,
                        field: 'id',
                        editable: "never",
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

                    {
                        title: t("ТаблицаПрофайлы.0") + ' *',
                        field: 'name',
                        editComponent: props => (
                            <TextField required id="name-required" label={t("ТаблицаПрофайлы.0")} defaultValue={props.value}
                                onChange={(event => {
                                    props.onChange(event.target.value)
                                })}
                            />
                        ),
                        render: rowData => {
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                        {rowData.name}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },

                    {
                        title: t("ТаблицаОргЕдиница.4") + ' *',
                        field: 'suffix',
                        editComponent: props => (
                            <TextField required id="suffix-required" label={t("ТаблицаОргЕдиница.4")} defaultValue={props.value}
                                onChange={(event => {
                                    props.onChange(event.target.value)
                                })}
                            />
                        ),
                        render: rowData => {
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                        {rowData.suffix}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    
                    {
                        title: t("ТаблицаОргЕдиница.2"),
                        field: 'parentName',
                        editable: 'never',
                        hidden: true,
                        editComponent: props => (
                            <>
                            </>
                        ),
                        render: rowData => {

                            return (
                                rowData.parentName
                            )

                        },

                    },

                    {
                        title: "",
                        field: 'profiles',
                        editComponent: props => (
                            <>
                            </>
                        ),
                        render: rowData => {

                            return (
                                <Box display="flex" justifyContent="right">
                                    <DialogListAddProfile type="Struct" id={rowData.id} />
                                    <DialogListAddOrgUnit type="Struct" id={rowData.id} />
                                </Box>
                            )

                        },

                    },

                ],

                data: [],
            }
            :
            {
                columns: [
                    {
                        title: "id",
                        hidden: true,
                        field: 'id',
                        editable: "never",
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

                    {
                        title: t("ТаблицаПрофайлы.0") + ' *',
                        field: 'name',
                        editComponent: props => (
                            <TextField required id="name-required" label={t("ТаблицаПрофайлы.0")} defaultValue={props.value}
                                onChange={(event => {
                                    props.onChange(event.target.value)
                                })}
                            />
                        ),
                        render: rowData => {
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                        {rowData.name}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    {
                        title: t("ТаблицаОргЕдиница.4") + ' *',
                        field: 'suffix',
                        editComponent: props => (
                            <TextField required id="suffix-required" label={t("ТаблицаОргЕдиница.4")} defaultValue={props.value}
                                onChange={(event => {
                                    props.onChange(event.target.value)
                                })}
                            />
                        ),
                        render: rowData => {
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                        {rowData.suffix}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    {
                        title: t("ТаблицаОргЕдиница.2"),
                        field: 'parentName',
                        editable: 'never',
                        hidden: true,
                        editComponent: props => (
                            <>
                            </>
                        ),
                        render: rowData => {

                            return (
                                rowData.parentName
                            )

                        },

                    },

                ],
                data: [],
            }

    );

    const dataPost = useCallback(
        () => {
            // console.log("dataPost")
            new Promise((resolve, reject) => {
                const { proxy } = props0;
                const headers = {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
                const url = proxy + '/api/orgunits?'
                const req = {
                    perpage: queryPage.pageSize,
                    page: queryPage.page
                }
                //console.log("dataPostProfile req", req)
                axios.post(url, req, { headers: headers, withCredentials: true })
                    .then(res => {
                        resolve();
                        setState((prevState) => {
                            const data = res.data.orgunits;
                            return { ...prevState, data };

                        });
                        setLoading(false)
                    })
                    .catch(error => {
                        console.log(error)
                        if (error.response !== undefined) {
                            if (Number(error.response.status) === 401) {
                                history.push("/signin")
                            } else {
                                console.log("Another error")
                            }
                        } else console.log("Network error")

                    })
                setQuery(false);
            })
        },
        [props0, queryPage, history],
    )

    React.useEffect(() => {
        //console.log('OrgUnit mount it!');
        setTimeout(() => {
            setQuery(true);
        }, 500);
    }, []);


    React.useEffect(() => {
        if (alertMSG.text !== "")
            setOpenMsg(alertMSG.openMsg)

    }, [alertMSG]);

    React.useEffect(() => {
        if (qquery) dataPost()
    }, [qquery, dataPost]);

    const add = (n: NewOrgUnit) => {
            new Promise((resolve) => {
                const { proxy } = props0;
                const headers = {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
                
                axios.post(proxy + '/api/orgunits/add', n, { headers: headers, withCredentials: true })
                    .then(res => {
                        resolve()
                        
                        setState((prevState) => {
                            const data = [...prevState.data];
                            const ae: any = {
                                id: res.data?.id,
                                name: res.data?.name,
                            }
                            data.push(ae);
                            return { ...prevState, data };
                        })
                        setAlertMSG((prevState) => {
                            return {
                                ...prevState,
                                text: t("СообщенияПрофайл.0"),
                                typeSeverity: "success"
                            }
                        })

                    })
                    .catch(error => {
                        if (error.response !== undefined) {
                            if (Number(error.response.data.code) === 0) {
                                setAlertMSG((prevState) => {
                                    return {
                                        ...prevState,
                                        text: newOrgUnit?.name + t("СообщенияРегистрация.2")
                                    }
                                })
                            }
                            else
                                if (Number(error.response.data.code) === 1) {
                                    setAlertMSG((prevState) => {
                                        return {
                                            ...prevState,
                                            text: newOrgUnit?.name + t("СообщенияРегистрация.3")
                                        }
                                    })
                                }
                                else
                                    if (Number(error.response.data.code) === 2) {
                                        setAlertMSG((prevState) => {
                                            return {
                                                ...prevState,
                                                text: t("СообщенияРегистрация.8")
                                            }
                                        })
                                    }

                            console.log(error)
                            console.log(error.response.data)
                        } else {
                            setAlertMSG((prevState) => {
                                return {
                                    ...prevState,
                                    text: t("СообщенияРегистрация.4")
                                }
                            })
                        }
                        setAlertMSG((prevState) => {
                            return {
                                ...prevState,
                                typeSeverity: "error"
                            }
                        })

                    })
                setAlertMSG((prevState) => {
                    return {
                        ...prevState,
                        openMsg: true
                    }
                })
                setTimeout(() => {

                    setAlertMSG((prevState) => {
                        return {
                            ...prevState,
                            openMsg: false
                        }
                    })
                }, 3000);
            })
        }

 //   React.useEffect(() => {
//        if (newOrgUnit !== null && newOrgUnit !== undefined
 //           && newOrgUnit?.name !== ""
 //       ) {
 //           add()
 //       }
  //  }, [newOrgUnit, add]);


    const del = (id: string) => {
        new Promise((resolve) => {
            const { proxy } = props0;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/orgunits/delete/' + id, null, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
                    console.log("delete orgunit success")
                })
                .catch(error => {
                    console.log(error)
                })
        })

    }

    const edit = (id: string, update: NewOrgUnit) => {
        new Promise((resolve) => {
            //console.log("editProfile",updateProfile)
            const { proxy } = props0;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/orgunits/edit/' + id, update, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
                    //setQuery(true) //<----
                    console.log("orgunit edit success")
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response)
                })
        })

    }

    const tableRef: any = React.createRef();

    return (
        <>
            <MaterialTable
                title={t("ТаблицаПрофайлы.2")}
                tableRef={tableRef}
                columns={state.columns}
                data={state.data}
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

                detailPanel={[
                    {
                        icon: 'add',
                        openIcon: 'remove',
                        tooltip: 'Развернуть/Свернуть',
                        render: rowData => {
                            return (
                                <Box>
                                    <Box display="flex" justifyContent="left" m={1} p={1} bgcolor="background.paper">
                                    <Grid container spacing={3}>
                                            <Grid item xs={3}>
                                                Является Главной:
                                        </Grid>
                                            <Grid item xs={9}>
                                                {roleAccess? <SwitcheHomeOrgUnit proxy={props0.proxy} id={rowData.id}
                                                homeOrgUnit={rowData.homeOrgUnit} />
                                                :
                                                (rowData.homeOrgUnit===true?"+":"-")
                                                }
                                              
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box display="flex" justifyContent="left" m={1} p={1} bgcolor="background.paper">
                                        <Grid container spacing={3}>
                                            <Grid item xs={3}>
                                                Список прикрепленных должностей:
                                        </Grid>
                                            <Grid item xs={9}>
                                                <ListProfiles proxy={props0.proxy} id={rowData.id} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box display="flex" justifyContent="left" m={1} p={1} bgcolor="background.paper">
                                        <Grid container spacing={3}>
                                            <Grid item xs={3}>
                                                Список прикрепленных Орг. единиц:
                                        </Grid>
                                            <Grid item xs={9}>
                                                <ListOrgUnits proxy={props0.proxy} id={rowData.id} />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>

                            );
                        },
                    },

                ]}

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
                    pageSize: 20,
                    pageSizeOptions: [5, 10, 20, 100, 200, 500],
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
                onRowClick={((event, selectedRow: any) => setSelectedRow(selectedRow.tableData.id))}

                editable={roleAccess ? {
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                if (newData) {
                                    const newData1: NewOrgUnit = {
                                        id: newData.id,
                                        name: newData.name,
                                    }
                                    resolve();
                                    setNewOrgUnit({ id: newData1.id, name: newData1.name })
                                    add(newData1)
                                }
                            }, 600);

                        })
                    ,
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                if (newData) {
                                    resolve();
                                    if (oldData) {
                                        const id: any = oldData?.id;

                                        const uu: NewOrgUnit = {
                                            id: newData.id,
                                            name: newData.name,
                                        }
                                        edit(id, uu)
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = uu as any;
                                            return { ...prevState, data };
                                        });


                                    }

                                }
                            }, 600);

                        }),

                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {

                            if (!roleAccessAdmin) {
                                alert("Role Admin or Moderator not Deleted!")
                                setTimeout(() => {
                                    resolve();
                                }, 100);
                            } else {

                                setTimeout(() => {
                                    resolve();
                                    del(oldData.id)
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });


                                }, 600);
                            }
                        }),
                } : {

                    }}

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
    }
}
export default connect(mapStateToProps)(MaterialTableStruct);