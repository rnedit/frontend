// @ts-ignore
import React from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { useWindowResize } from "../../../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../../../security/ERules'
import { useTranslation } from 'react-i18next';
import { NewProfile } from './NewProfile';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';
import SelectAccessMultiple from './SelectAccessMultiple'

import { setProfiles } from '../../../../../reduxactions/actions';
import { store } from "../../../../../init";

import AsyncUserSelect from "./AsyncUserSelect"
import TextField from '@material-ui/core/TextField';

import { setUserToProfile } from '../../../../../reduxactions/actions';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const setAP = (data:string | null) => store.dispatch(
    setUserToProfile(data)
);

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
    const roles:string[] = props0.roles;
    const roleAccess: boolean = roles.includes(ROLES.ADMIN || ROLES.MODERATOR);
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN);
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR);
    const { t } = useTranslation();

    // const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    const [newProfile, setNewProfile] = React.useState<NewProfile>();
    const [qquery, setQuery] = React.useState(false);

    const [userSelect,setUserSelect] = React.useState<string>();
    const [multipleSelectAccess,setMultipleSelectAccess] = React.useState<string[]>();

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

    const callBackSetUser = (user:string) => {
        setUserSelect(user);
    };

    const callBackSetMultipleSelectAccess = (arr:string[]) => {
        setMultipleSelectAccess(arr);
    };
    
    const setStoreProfiles = (data: any) => store.dispatch(
        setProfiles(data)
    );

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
                                stringDate = Moment(creationDate).format('hh:mm DD/MM/YYYY')
                            }
                            return (
                                stringDate
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
                    },
                    {
                        title: 'Орг. единица'+' *',
                        field: 'parentId',
                        editComponent: props => (
                            <TextField required id="parentId" label="Орг. единица" defaultValue={props.value} 
                            onChange={(event => {
                                props.onChange(event.target.value)
                            })}
                            />
                        ),
                    },
                    {
                        title: 'Пользователь'+' *',
                        field: 'userId',
                        editComponent: props => (

                            <AsyncUserSelect proxy={props0.proxy} callBackSetUser={callBackSetUser}/>
                          
                            
                        ),
                        
                        render: rowData => {
                            let user = null;
                            if (rowData !== null && rowData !== undefined) {
                                const data: any = rowData;
                                user = data.user;
                                
                            }
                            return (
                                user?.username
                            )
                        },
                        
                    },

                    {
                        title: 'Доступ'+' *',
                        field: 'access',
                        editComponent: props => (
                            <SelectAccessMultiple callBackSetMultipleSelectAccess={callBackSetMultipleSelectAccess}/>
                        ),
                        
                        render: rowData => {
                            let stringAccess: string = "";
                            if (rowData !== null && rowData !== undefined) {

                                const { access } = rowData;
                                access.forEach(a => {
                                    const { name } = a;
                                    stringAccess += name + ", ";
                                })
                            }
                            return (
                                stringAccess
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
                                stringDate = Moment(creationDate).format('hh:mm DD/MM/YYYY')
                            }
                            return (
                                stringDate
                            )
                        },
                    },

                    {
                        title: t("ТаблицаПрофайлы.0") + ' *',
                        field: 'name',
                        editComponent: props => (
                            <TextField required id="name-required" label={t("ТаблицаПрофайлы.0")} defaultValue={props.value} />
                        ),
                    },
                    {
                        title: 'Орг. единица'+' *', 
                        field: 'parentId',
                        editComponent: props => (
                            <TextField id="parentId" label="parentId" defaultValue={props.value} 
                            onChange={(event => {
                                props.onChange(event.target.value)
                            })}
                            />
                        ),
                    },
                    {
                        title: 'Пользователь'+' *',
                         field: 'userId',
                        editComponent: props => (
                            <AsyncUserSelect proxy={props0.proxy}/>
                        ),
                        render: rowData => {
                            let user = null;
                            if (rowData !== null && rowData !== undefined) {
                                const data: any = rowData;
                                user = data.user;

                            }
                            return (
                                user?.username
                            )
                        },
                    },

                ],
                data: [],
            }

    );

    React.useEffect(() => {
        if (props0.storeProfiles !== null && props0.storeProfiles !== undefined) {
            const ud: Array<any> = props0.storeProfiles;
            const sd: Array<any> = state.data;
            if (JSON.stringify(ud) !== JSON.stringify(sd)) {
                setStoreProfiles(sd);
            }
        }
    }, [state,props0]);

    const dataPost = () => {
        //  console.log("dataPost")
        new Promise((resolve, reject) => {
            const { proxy } = props0;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            const url = proxy + '/api/profiles?'
            const req = {
                perpage: queryPage.pageSize,
                page: queryPage.page
            }
            //console.log("dataPostProfile req", req)
            axios.post(url, req, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve();
                    setState((prevState) => {
                        const data = res.data.profiles;
                        return { ...prevState, data };

                    });
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
    }

    React.useEffect(() => {
        console.log('Profile mount it!');
        setTimeout(() => {
            setQuery(true);
        }, 1000);
        setQuery(true);
    }, []);

    React.useEffect(() => {
        if (newProfile !== null && newProfile !== undefined
            && newProfile?.name !== ""
            && newProfile?.access !== null && newProfile?.access !== undefined && newProfile?.access.length > 0) {
            addProfile()
        }
    }, [newProfile]);

    React.useEffect(() => {
        if (alertMSG.text !== "")
            setOpenMsg(alertMSG.openMsg)

    }, [alertMSG]);

    React.useEffect(() => {
        if (qquery) dataPost()
    }, [qquery]);

    const addProfile = () => {
        new Promise((resolve) => {
            const { proxy } = props0;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
           // console.log("addProfile", newProfile)
            axios.post(proxy + '/api/profiles/add', newProfile, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
                   // console.log(res.data)
                    setAlertMSG((prevState) => {
                        return {
                            ...prevState,
                            text: t("СообщенияРегистрация.0"),
                            typeSeverity: "success"
                        }
                    })

                    setState((prevState) => {
                        const data = [...prevState.data];
                        const ae: any = {
                            name: newProfile?.name,
                            parentId: newProfile?.parentId,
                            userId: newProfile?.userId,
                            access: newProfile?.access,
                        }
                        data.push(ae);
                        return { ...prevState, data };
                    })
                    setQuery(true);
                })
                .catch(error => {
                    if (error.response !== undefined) {
                        if (Number(error.response.data.code) === 0) {
                            setAlertMSG((prevState) => {
                                return {
                                    ...prevState,
                                    text: newProfile?.name + t("СообщенияРегистрация.2")
                                }
                            })
                        }
                        else
                            if (Number(error.response.data.code) === 1) {
                                setAlertMSG((prevState) => {
                                    return {
                                        ...prevState,
                                        text: newProfile?.name + t("СообщенияРегистрация.3")
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

    const deleteProfile = (id: string) => {
        new Promise((resolve) => {
            const { proxy } = props0;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/profiles/delete/' + id, null, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
                    console.log("deleteProfile success")
                })
                .catch(error => {
                    console.log(error)
                })
        })

    }

    const editProfile = (id: string, updateProfile: NewProfile) => {
        new Promise((resolve) => {
            //console.log("editProfile",updateProfile)
            const { proxy } = props0;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/profiles/edit/' + id, updateProfile, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
                    setQuery(true) //<----
                    console.log("editProfile edit success")
                })
                .catch(error => {
                    console.log(error)
                })
        })

    }

    const tableRef: any = React.createRef();

    return (
        <>
            <MaterialTable
                title={t("ТаблицаПрофайлы.1")}
                tableRef={tableRef}
                columns={state.columns}
                data={state.data}
                isLoading={state.data.length===0}
                onChangeRowsPerPage={(pageSize: number) => {
                    setQueryPage((prevState) => {
                        return { ...prevState, pageSize };
                    });

                }}
                detailPanel={[
                    {
                        icon: 'account_circle',
                        tooltip: 'Show Surname',
                        render: rowData => {
                            return (
                                <div
                                    style={{
                                        fontSize: 100,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#e53935',
                                    }}
                                >
                                    {"asd"}
                                </div>
                            );
                        },
                    },
                    rowData => ({

                        icon: 'favorite_border',
                        openIcon: 'favorite',
                        tooltip: 'Show Both',
                        render: rowData => {
                            return (
                                <div
                                    style={{
                                        fontSize: 100,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#FDD835',
                                    }}
                                >
                                    {"rowData.name"} {"rowData.surname"}
                                </div>
                            );
                        },
                    }),
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
                                    const newData1: NewProfile = {
                                    
                                        name: newData.name,
                                        parentId: newData.parentId,
                                        userId: userSelect,
                                        oldUserId:"",
                                        access: multipleSelectAccess,
                                    }
                                    resolve();
                                    setNewProfile(newData1)
                                  //  console.log(newData1)
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
                                        const idProfile: any = oldData?.id;
                                        const oldUser:any = oldData?.user; 
                                        const oldUserId:string = oldUser?oldUser.id:undefined;

                                        const uu: NewProfile = {
                                       
                                        name: newData.name,
                                        parentId: newData.parentId,
                                        userId: userSelect,
                                        oldUserId:oldUserId,
                                        access: multipleSelectAccess,
                                    }

                                        editProfile(idProfile, uu)
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                       
                                       
                                    }
                                   
                                }
                            }, 600);

                        }),

                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
    
                          if (!roleAccessAdmin){
                              alert("Role Admin or Moderator not Deleted!")
                              setTimeout(() => {
                                resolve();
                            }, 100);
                          }else{
                           
                            setTimeout(() => {
                                resolve();
                                deleteProfile(oldData.id)
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
        storeUsers: state.users.data,
        accessProfile: state.accessProfile.data,
        setUserToProfile: state.profiles.setUserToProfile
    }
}
export default connect(mapStateToProps)(MaterialTableStruct);