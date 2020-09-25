// @ts-ignore
import React,{useCallback} from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { useWindowResize } from "../../../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../../../security/ERules'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NewUser } from './NewUser';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';
import { setUsers } from '../../../../../reduxactions/actions';
import { store } from "../../../../../init";

import SelectRole from "./SelectRole"

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        form: {
            display: 'flex',
            flexDirection: 'column',
            margin: 'auto',
            width: 'fit-content',
        },
        formControl: {
            marginTop: theme.spacing(2),
            minWidth: 120,
        },
        formControlLabel: {
            marginTop: theme.spacing(1),
        },
        progress: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

interface QueryPage {
    page: number,
    pageSize: number,
}

interface AlertMSG {
    text:String,
    typeSeverity:String,
    openMsg:boolean,
}
function MaterialTableStruct(props: any) {
    const {t}=props;
    //console.log("Render MaterialTableStruct")
    const classes = useStyles();
    const { height } = useWindowResize();
    const history = useHistory();
    const { roles } = props;
    const adminModerRoles = [ROLES.MODERATOR , ROLES.ADMIN]
    const roleAccess: boolean = roles.some((r:any) => adminModerRoles.includes(r) );
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN );
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR );
    

    const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    const [newUser, setNewUser] = React.useState<NewUser>();
    const [qquery, setQuery] = React.useState(true);
    const [loading, setLoading] = React.useState(true);
    const [alertMSG,setAlertMSG] = React.useState<AlertMSG>( {
        text:"",
        typeSeverity:"error",
        openMsg:false,
    })

    const [queryPage, setQueryPage] = React.useState<QueryPage>({
        page: 1,
        pageSize: 15,
    });

    const [role, setRole] = React.useState(ROLES.USER);
    const [form, setFormState] = React.useState({
        password: '',
        passwordConf: ''
    });
    const updateField = (e: React.ChangeEvent<{ name:string , value: unknown }>) => {
        setFormState({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const errorText = !validarePassword();
    function validarePassword() {
        if (form.passwordConf === form.password && form.password !== "")
            return true
        else
            return false
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOK = () => {
        setNewUser(
            {
                roles: newUser?.roles,
                password: form.password,
                email: newUser?.email,
                firstName: newUser?.firstName,
                lastName: newUser?.lastName,
                username: newUser?.username,
                id: newUser?.id,
            }
        );
        setOpen(false);
    };

    const setStoreUsers = (data:any) => store.dispatch(
        setUsers(data)
    );
/*
    const [formNewUser, setFormNewUser] = React.useState({
        id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        roles: '',
        password: '',
    });

    const updateField = (e: React.ChangeEvent<{ name:string , value: unknown }>) => {
       
        setFormNewUser({
            ...formNewUser,
            [e.target.name]: e.target.value
        });
        console.log(formNewUser)
    };
*/

    const [selectedRow, setSelectedRow] = React.useState("null");
    const [state, setState] = React.useState<TableState>(

        roleAccess ?
            {
                columns: [
                    {
                        title: "id",
                        hidden: true,
                        searchable:false,
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

                    { title: t("Таблица.1")+" *", 
                    field: 'username',
                    editComponent: props => (
                        <TextField required name="username" id="username-required" label={t("Таблица.1")}
                        defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })} />
                      ),
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                    {rowData.username}
                                </Box>
                            </Typography> 
                           
                           
                        )
                    }, 
                    },
                    { title: t("Таблица.2")+" *",
                     field: 'firstName',
                    editComponent: props => (
                        <TextField required id="firstName-required" label={t("Таблица.2")}
                        name="firstName" defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                        />
                      ),
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {rowData.firstName}
                                </Box>
                            </Typography> 
                           
                           
                        )
                    } 
                },
                    { title: t("Таблица.3")+" *",
                     field: 'lastName',
                    editComponent: props => (
                        <TextField required id="lastName-required" label={t("Таблица.3")}
                        name="lastName" defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                         />
                      ),  
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {rowData.lastName}
                                </Box>
                            </Typography> 
                           
                           
                        ) 
                      }
                    },
                    { title: t("Таблица.4")+" *", field: 'email',
                    editComponent: props => (
                        <TextField required id="email-required" label={t("Таблица.4")} 
                        name="email" defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                         />
                      ),
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {rowData.email}
                                </Box>
                            </Typography> 
                           
                           
                        ) 
                      }
                },

                    {
                        title: t("Таблица.5")+" *",
                        field: 'roles',

                          editComponent: props => (

                            <SelectRole value={props.value}
                                onChange={props.onChange} 
                                Roles={ROLES}
                                />

                         ),

                        render: rowData => {
                            let stringRole: string = "";
                            if (rowData !== null && rowData !== undefined) {

                                const { roles } = rowData;
                                roles.forEach(role => {
                                    const { name } = role;
                                    stringRole +=  name +", " ;
                                })
                            }
                            return (
                                <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {stringRole}
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
                    { title: t("Таблица.0"),
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
                     }, },
                    { title: t("Таблица.1")+" *", field: 'username',
                    editComponent: props => (
                        <TextField required id="username-required" label={t("Таблица.1")} defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                        />
                      ), 
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightMedium" fontSize="fontSize">
                                    {rowData.username}
                                </Box>
                            </Typography> 
                           
                           
                        ) 
                      } 
                    },
                    { title: t("Таблица.2")+" *", field: 'firstName',
                    editComponent: props => (
                        <TextField required id="firstName-required" label={t("Таблица.2")} defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                        />
                      ),
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {rowData.firstName}
                                </Box>
                            </Typography> 
                           
                           
                        ) 
                      }  
                },
                    { title: t("Таблица.3")+" *", field: 'lastName',
                    editComponent: props => (
                        <TextField required id="lastName-required" label={t("Таблица.3")} defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                        />
                      ), 
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {rowData.lastName}
                                </Box>
                            </Typography> 
                           
                           
                        ) 
                      }  
                    },
                    { title: t("Таблица.4")+" *", field: 'email',
                    editComponent: props => (
                        <TextField required id="email-required" label={t("Таблица.4")} defaultValue={props.value} 
                        onChange={(event => {
                            props.onChange(event.target.value)
                        })}
                        />
                      ),
                      render: rowData => {
                        return (
                            <Typography component="div">
                                <Box fontWeight="fontWeightRegular" fontSize="fontSize">
                                    {rowData.email}
                                </Box>
                            </Typography> 
                           
                           
                        ) 
                      } 
                },

                ],
                data: [],
            }

    );

    const dataPost = useCallback(
        () => {
             // console.log("dataPost")
        new Promise((resolve, reject) => {
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            const url = proxy + '/api/users?'
            const req = {
                perpage: queryPage.pageSize,
                page: queryPage.page
            }
           // console.log("dataPost req", req)
            axios.post(url, req, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve();
                    setState((prevState) => {
                        const data = res.data.users;
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
        [history,props,queryPage],
    )
   /*    
    React.useEffect(() => {
        
        console.log('Users mount it!');
        setTimeout(() => {
            setQuery(true);
        }, 500);
       
    }, []);
*/
   
    React.useEffect(() => {
        if (alertMSG.text!=="")
         setOpenMsg(alertMSG.openMsg)
      
    }, [alertMSG]);
    
    React.useEffect(() => {
        if (qquery) dataPost()
    }, [qquery,dataPost]);

    React.useEffect(() => {
        if (props.storeUsers!==null && props.storeUsers!==undefined) {
            const ud:Array<any> = props.storeUsers;
            const sd:Array<any> = state.data;
            if (JSON.stringify(ud)!==JSON.stringify(sd)) {
                setStoreUsers(sd);
            }
        }   
    }, [state,props]);    

    const signUp = useCallback(
        () => {
            new Promise((resolve) => {
                const { proxy } = props;
                const headers = {
                    'Content-Type': 'application/json; charset=UTF-8',
                }
                axios.post(proxy + '/api/auth/signup', newUser, { headers: headers, withCredentials: true })
                    .then(res => {
                        resolve()
                            setAlertMSG((prevState)=>{
                                return{
                                    ...prevState,
                                    text:t("СообщенияРегистрация.0"),
                                    typeSeverity:"success"
                                }   
                            })
          
                        setState((prevState) => {
                            const data = [...prevState.data];
                            const ae: any = {
                                username: newUser?.username,
                                firstName: newUser?.firstName,
                                lastName: newUser?.lastName,
                                email: newUser?.email,
                                roles: newUser?.roles
                            }
                            data.push(ae);
                            return { ...prevState, data };
                        })
                        setQuery(true);
                    })
                    .catch(error => {
                        if (error.response !== undefined) {
                            if (Number(error.response.data.code) === 0) {
                                setAlertMSG((prevState)=>{
                                    return{
                                        ...prevState,
                                        text: newUser?.email + t("СообщенияРегистрация.2")
                                    }   
                                })
                            }
                            else
                                if (Number(error.response.data.code) === 1) {
                                    setAlertMSG((prevState)=>{
                                        return{
                                            ...prevState,
                                            text: newUser?.email + t("СообщенияРегистрация.3")
                                        }   
                                    })
                                }
                            else
                                if (Number(error.response.data.code) === 2) {
                                    setAlertMSG((prevState)=>{
                                        return{
                                            ...prevState,
                                            text: t("СообщенияРегистрация.8")
                                        }   
                                    })
                                }
                            
                            console.log(error)
                            console.log(error.response.data)
                        } else {
                            setAlertMSG((prevState)=>{
                                return{
                                    ...prevState,
                                    text:t("СообщенияРегистрация.4")
                                }   
                            })
                        }
                        setAlertMSG((prevState)=>{
                            return{
                                ...prevState,
                                typeSeverity:"error"
                            }   
                        })
    
                    })
                    setAlertMSG((prevState)=>{
                        return{
                            ...prevState,
                            openMsg:true
                        }   
                    })
                setTimeout(() => {
    
                    setAlertMSG((prevState)=>{
                        return{
                            ...prevState,
                            openMsg:false
                        }   
                    })
                }, 3000);
            })
        },
        [newUser,props,t],
    )

    React.useEffect(() => {
        if (newUser !== null && newUser !== undefined && newUser?.password !== "") {
            signUp()
        }
    }, [newUser]);

    const deleteUser = (id: string) => {
        //console.log("deleteUser",id)
        new Promise((resolve) => {
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/users/delete/' + id, null, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
                    console.log("deleteUser success")     
                })
                .catch(error => {
                    console.log(error)
                })
        })

    }

    const editUser = (id: string, updateUser: NewUser) => {
        new Promise((resolve) => {
            console.log("editUser",id,updateUser)
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/users/edit/' + id, updateUser, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
            
                    console.log("user edit success")
                })
                .catch(error => {
                    console.log(error)
                    console.log(error.response.data)
                })
        })

    }

    const tableRef: any = React.createRef();

    return (
        <>
            <MaterialTable
               
                title={t("Таблица.6")}
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
                    pageSize: 15,
                    pageSizeOptions: [5, 10, 15, 20, 100, 200, 500],
                    rowStyle: rowData => ({
                        backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}
                onRowClick={((event, selectedRow: any) => setSelectedRow(selectedRow.tableData.id))}

                editable={roleAccess ? {
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            if (newData) {
                                                           
                                const newData1: NewUser = {
                                    id: newData.id,
                                    username: newData.username,
                                    firstName: newData.firstName,
                                    lastName: newData.lastName,
                                    email: newData.email,
                                    roles: newData.roles,
                                    password: "",
                                }

                                setNewUser(newData1)
                                setOpen(true);
                                resolve();
                               
                            }
                        })
                    ,
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            if (newData) {
                               
                                const uu: NewUser = {
                                    id: newData.id,
                                    username: newData.username,
                                    firstName: newData.firstName,
                                    lastName: newData.lastName,
                                    email: newData.email,
                                    roles: newData.roles,
                                    password: "",
                                }

                                    if (oldData) {
                                        const id: any = oldData?.id;
                                        editUser(id, uu)
                                        setState((prevState) => {
                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;
                                            return { ...prevState, data };
                                        });
                                    }
                                    resolve();
                              
                            }
                        }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            const { roles } = oldData;
                            let a = false;
                            roles.forEach((role: any) => {
                                const { name } = role;
                                if ( name===ROLES.ADMIN || name===ROLES.MODERATOR) {
                                    a = true;
                                }
                            })
                              
                          if (a && !roleAccessAdmin){
                              alert("Role Admin or Moderator not Deleted!")
                              setTimeout(() => {
                                resolve();
                            }, 100);
                          }else{
                            deleteUser(oldData.id)
                            setTimeout(() => {
                                resolve();

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

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Укажите пароль!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Укажите пароль для пользователя:
                        {" " + newUser?.username}
                    </DialogContentText>

                    <form className={classes.form} >
                    
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            onChange={updateField}
                            required
                            value={form.password}
                        />
                        <TextField
                            error={errorText}
                            helperText={errorText ? t("СообщенияРегистрация.7") : t("СообщенияРегистрация.6")}
                            margin="dense"
                            id="passwordConf"
                            name="passwordConf"
                            label="Password Conferm"
                            type="password"
                            onChange={updateField}
                            required
                            value={form.passwordConf}

                        />
                    </form>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleOK}
                        color="primary"
                        autoFocus
                        disabled={validarePassword() ? false : true}

                    >
                        Ок
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    );
}
const mapStateToProps = function (state: any) {
    return {
        roles: state.currentUser.user.roles,
        storeUsers: state.users.data
    }
}
export default connect(mapStateToProps)(MaterialTableStruct);