// @ts-ignore
import React from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { useWindowResize } from "../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../security/ERules'
import { useTranslation } from 'react-i18next';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { NewUser } from './NewUser';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'moment';

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
    const classes = useStyles();
    const { height } = useWindowResize();
    const history = useHistory();
    const { roles } = props;
    const roleAccess: boolean = roles.includes(ROLES.ADMIN || ROLES.MODERATOR);
    const roleAccessAdmin: boolean = roles.includes(ROLES.ADMIN );
    const roleAccessModerator: boolean = roles.includes(ROLES.MODERATOR );
    const { t } = useTranslation();

    const [open, setOpen] = React.useState(false);
    const [openMsg, setOpenMsg] = React.useState(false);
    const [newUser, setNewUser] = React.useState<NewUser>();
    const [qquery, setQuery] = React.useState(true);

    const [alertMSG,setAlertMSG] = React.useState<AlertMSG>( {
        text:"",
        typeSeverity:"error",
        openMsg:false,
    })

    const [queryPage, setQueryPage] = React.useState<QueryPage>({
        page: 1,
        pageSize: 20,
    });

    const [role, setRole] = React.useState(ROLES.USER);
    const [form, setFormState] = React.useState({
        password: '',
        passwordConf: ''
    });

    const updateField = (e: any) => {
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

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setRole(event.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOK = () => {
        const arr: Array<string> = [];
        arr.push(role);
        setNewUser(
            {
                roles: arr,
                password: form.password,
                email: newUser?.email,
                firstName: newUser?.firstName,
                lastName: newUser?.lastName,
                username: newUser?.username
            }
        );
        setOpen(false);
    };

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

                    { title: t("Таблица.1"), field: 'username' },
                    { title: t("Таблица.2"), field: 'firstName' },
                    { title: t("Таблица.3"), field: 'lastName' },
                    { title: t("Таблица.4"), field: 'email' },

                    {
                        title: t("Таблица.5"),
                        field: 'roles',
                        editable: "never",
                        render: rowData => {
                            let stringRole: string = "";
                            if (rowData !== null && rowData !== undefined) {

                                const { roles } = rowData;
                                roles.forEach(role => {
                                    const { name } = role;
                                    stringRole = stringRole !== "" ? +", /n" + name : name;
                                })
                            }
                            return (
                                stringRole
                            )
                        },
                    },
                ],

                data: [],
            }
            :
            {
                columns: [
                    { title: t("Таблица.0"), field: 'creationDate' },
                    { title: t("Таблица.1"), field: 'username' },
                    { title: t("Таблица.2"), field: 'firstName' },
                    { title: t("Таблица.3"), field: 'lastName' },
                    { title: t("Таблица.4"), field: 'email' },

                ],
                data: [],
            }

    );

    const dataPost = () => {
        //  console.log("dataPost")
        new Promise((resolve, reject) => {
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            const url = proxy + '/users?'
            const req = {
                perpage: queryPage.pageSize,
                page: queryPage.page
            }
            console.log("dataPost req", req)
            axios.post(url, req, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve();
                    setState((prevState) => {
                        const data = res.data.users;
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
        if (newUser !== null && newUser !== undefined && newUser?.password !== "") {
            signUp()
        }
    }, [newUser]);
    React.useEffect(() => {
        if (alertMSG.text!=="")
         setOpenMsg(alertMSG.openMsg)
      
    }, [alertMSG]);
    
    React.useEffect(() => {
        if (qquery) dataPost()
    }, [qquery]);

    const signUp = () => {
        new Promise((resolve) => {
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/api/auth/signup', newUser, { headers: headers, withCredentials: true })
                .then(res => {
                   
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
    }

    const deleteUser = (id: string) => {
        //console.log("deleteUser",id)
        new Promise((resolve) => {
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/users/delete/' + id, null, { headers: headers, withCredentials: true })
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
            console.log("editUser")
            const { proxy } = props;
            const headers = {
                'Content-Type': 'application/json; charset=UTF-8',
            }
            axios.post(proxy + '/users/edit/' + id, updateUser, { headers: headers, withCredentials: true })
                .then(res => {
                    resolve()
            
                    console.log("user edit success")
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
                title={t("Таблица.6")}
                tableRef={tableRef}
                columns={state.columns}
                data={state.data}
                isLoading={qquery}
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
                            if (newData) {
                                const arr: Array<string> = [];
                                arr.push(ROLES.USER);
                                const newData1: NewUser = {
                                    username: newData.username,
                                    firstName: newData.firstName,
                                    lastName: newData.lastName,
                                    email: newData.email,
                                    roles: arr,
                                    password: "",
                                }
                                resolve();
                                setNewUser(newData1)
                                setOpen(true);
                               
                            }
                        })
                    ,
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            if (newData) {
                                const uu: NewUser = {
                                    username: newData.username,
                                    firstName: newData.firstName,
                                    lastName: newData.lastName,
                                    email: newData.email,
                                    roles: [],
                                    password: "",
                                }
                                const id: any = oldData?.id;
                                editUser(id, uu)
                                setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        setState((prevState) => {

                                            const data = [...prevState.data];
                                            data[data.indexOf(oldData)] = newData;

                                            return { ...prevState, data };
                                        });
                                    }

                                }, 600);
                            }

                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            const { roles } = oldData;
                            let a = false;
                            roles.forEach(role => {
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
                <DialogTitle id="responsive-dialog-title">{"Укажите Роль и пароль!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Выберите роль для пользователя и укажите пароль для пользователя:
                        {" " + newUser?.username}
                    </DialogContentText>

                    <form className={classes.form} >
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-native">Роль</InputLabel>
                            <Select
                                autoFocus
                                value={role}
                                onChange={handleChange}
                                inputProps={{
                                    name: 'role',
                                    id: 'age-native',
                                }}
                            >

                                <MenuItem value={ROLES.USER}>USER</MenuItem>
                                <MenuItem value={ROLES.MODERATOR}>MODERATOR</MenuItem>
                                <MenuItem value={ROLES.ADMIN}>ADMIN</MenuItem>

                            </Select>
                        </FormControl>
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
        roles: state.currentUser.user.roles
    }
}
export default connect(mapStateToProps)(MaterialTableStruct);