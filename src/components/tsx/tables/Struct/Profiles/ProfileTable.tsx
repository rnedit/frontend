// @ts-ignore
import React,{useCallback} from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { useWindowResize } from "../../../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../../../security/ERules'
import { NewProfile } from './NewProfile';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';
import SelectAccessMultiple from './SelectAccessMultiple'

import { setProfiles } from '../../../../../reduxactions/actions';
import { store } from "../../../../../init";

import AsyncUserSelect from "./AsyncUserSelect"
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { setUserToProfile } from '../../../../../reduxactions/actions';

import {User} from "./InterfaceUser"

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

function ProfileTable(props0: any) {

    const { height } = useWindowResize();
    const history = useHistory();
    const roles:string[] = props0.roles;
    const adminModerRoles = [ROLES.MODERATOR , ROLES.ADMIN]
    const roleAccess: boolean = roles.some((r:any) => adminModerRoles.includes(r) );
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN);
 
    const {t, username}=props0;

    const [openMsg, setOpenMsg] = React.useState(false);
    const [newProfile, setNewProfile] = React.useState<NewProfile>();
    const [qquery, setQuery] = React.useState(true);
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
                        searchable:false,
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
                        title: t("ТаблицаПрофайлы.2")+' *',
                        field: 'parentName',
                        editable: 'never',
                        editComponent: props => (
                            <TextField required id="parentName" label="Орг. единица" defaultValue={props.value} 
                            onChange={(event => {
                                props.onChange(event.target.value)
                            })}
                            />
                        ),
                        render: rowData => {
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        {rowData?.parentName}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    {
                        title: t("ТаблицаПрофайлы.3")+' *',
                        field: 'userId',
                        editComponent: props => (

                            <AsyncUserSelect proxy={props0.proxy} 
                                defValue={props.rowData.user?props.rowData.user.username:username} 
                                onChange={props.onChange} 
                            />  
                        ),
                        
                        render: rowData => {
                            if (rowData.userId !== null && rowData.userId !== undefined) {
                                return (
                                    <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        {rowData.userId}
                                    </Box>
                                </Typography> 
                                    
                                    )
                            } else {
                                let user = null;
                                if (rowData.user !== null && rowData.user !== undefined) {
                                    const data: any = rowData;
                                    user = data.user;
                                
                                return (
                                    <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        { user?.username}
                                    </Box>
                                </Typography> 
                                   
                                )
                                } else {
                                    return (
                                    "null"
                                    )
                                }
                            }                       

                        },
                        
                    },

                    {
                        title: t("ТаблицаПрофайлы.4")+' *',
                        field: 'access',
                        editComponent: props => (
                            <SelectAccessMultiple
                                value={props.value} 
                                onChange={props.onChange}
                            />
                        ),
                        
                        render: rowData => {
                           
                            let stringAccess: string = "";
                            if (rowData !== null && rowData !== undefined) {

                                const { access } = rowData;
                                access.forEach(a => {
                                    const { info } = a;
                                    stringAccess += info + ", ";
                                })
                            }
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        { stringAccess}
                                    </Box>
                                </Typography> 
                                
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
                            <TextField required id="name-required" label={t("ТаблицаПрофайлы.0")} defaultValue={props.value} />
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
                        title: t("ТаблицаПрофайлы.2")+' *',
                        field: 'parentName',
                        editable: 'never',
                        editComponent: props => (
                            <TextField required id="parentName" label="Орг. единица" defaultValue={props.value} 
                            onChange={(event => {
                                props.onChange(event.target.value)
                            })}
                            />
                        ),
                        render: rowData => {
                            return (
                                <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        {rowData?.parentName}
                                    </Box>
                                </Typography> 
                               
                               
                            )
                        },
                    },
                    {
                        title: t("ТаблицаПрофайлы.3")+' *',
                         field: 'userId',
                         editComponent: props => (

                            <AsyncUserSelect proxy={props0.proxy} 
                                defValue={props.rowData.user?props.rowData.user.username:undefined} 
                                onChange={props.onChange} 
                            />  
                        ),
                        
                        render: rowData => {
                            if (rowData.userId !== null && rowData.userId !== undefined) {
                                return (
                                    <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        {rowData.userId}
                                    </Box>
                                </Typography> 
                                    )
                            } else {
                                let user = null;
                                if (rowData.user !== null && rowData.user !== undefined) {
                                    const data: any = rowData;
                                    user = data.user;
                                
                                return (
                                    <Typography component="div">
                                    <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                        { user?.username}
                                    </Box>
                                </Typography> 
                                )
                                } else {
                                    return (
                                    "null"
                                    )
                                }
                            }                       

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

    
    const dataPost = useCallback(
        () => {
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
        [props0,queryPage,history],
    )
/*
    React.useEffect(() => {
        console.log('Profile mount it!');
        setTimeout(() => {
            setQuery(true);
        }, 500);
    }, []);
*/
  
    React.useEffect(() => {
        if (alertMSG.text !== "")
            setOpenMsg(alertMSG.openMsg)

    }, [alertMSG]);

    React.useEffect(() => {
        if (qquery) dataPost()
    }, [qquery,dataPost]);

    const addProfile = useCallback(
        () => {
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
        },
        [newProfile,props0,t],
    )

    React.useEffect(() => {
        if (newProfile !== null && newProfile !== undefined
            && newProfile?.name !== ""
            && newProfile?.access !== null && newProfile?.access !== undefined && newProfile?.access.length > 0) {
            addProfile()
        }
    }, [newProfile,addProfile]);


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
                    //setQuery(true) //<----
                    console.log("editProfile edit success")
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
                title={t("ТаблицаПрофайлы.1")}
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
                        // exportCSVName: t("Таблица.24"),
                        // exportPDFName: t("Таблица.41"),
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
                                   
                                    let arrAccess:string[] = [];
                                    if (newData.access!==null && newData.access!==undefined)
                                        newData.access.forEach((element: any)=>{
                                               arrAccess.push(element.name)
                                        })
                                    const user:User = {
                                        username:newData.userId,
                                    }    
                                     
                                    const newData1: NewProfile = {
                                    
                                        name: newData.name,
                                        parentName: newData.parentName,
                                        user: user,
                                        userId: newData.userId,
                                        oldUserId:"",
                                        access: arrAccess,
                                    }
                                    //console.log(newData1,"newData1 add")
                                    resolve();
                                    setNewProfile(newData1)

                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        const ae: any = {
                                            name: newData1?.name,
                                            parentName: newData1?.parentName,
                                            userId: newData1?.userId,
                                            user: newData1?.user,
                                            access: newData.access,
                                        }
                                        data.push(ae);
                                        return { ...prevState, data };
                                    })
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
                                        const userId = newData.userId!==undefined?newData.userId:newData.user.username
                                        const user: User = {
                                            username: userId,
                                        }   
                                        let access:string[] = [];
                                        const tmp = newData.access;
                                        tmp.forEach((element: any)=>{
                                            access.push(element.name);
                                         })
                                        const uu: NewProfile = {
                                        name: newData.name,
                                        parentName: newData.parentName,
                                        user: user,
                                        userId: userId,
                                        oldUserId: oldUserId,
                                        access: access,
                                    }
                                    const dataUpdate: NewProfile = {
                                        name: newData.name,
                                        parentName: newData.parentName,
                                        user: user,
                                        userId: userId,
                                        oldUserId: oldUserId,
                                        access: newData.access,
                                    }                                 
                                       
                                        editProfile(idProfile, uu)
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = dataUpdate as any;
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
        username: state.currentUser.user.username,
        storeUsers: state.users.data,
        accessProfile: state.accessProfile.data,
        setUserToProfile: state.profiles.setUserToProfile
    }
}
export default connect(mapStateToProps)(ProfileTable);