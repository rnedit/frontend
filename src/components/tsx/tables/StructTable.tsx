// @ts-ignore
import React from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { Row } from "./Row";
import { useWindowResize } from "../UseWindowResize";
import { connect } from 'react-redux';
import { ROLES } from '../../security/ERules'
import { useTranslation } from 'react-i18next';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
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
import  Linner from '../progress/progress';
import {NewUser} from './NewUser';

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
  }),
);

function MaterialTableStruct(props: any) {
  const classes = useStyles();
  const { height } = useWindowResize();
  const history = useHistory();
  const { roles } = props;
  const roleAccess: boolean = roles.includes(ROLES.ADMIN || ROLES.MODERATOR);
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const [newUser, setNewUser] = React.useState<NewUser>();

  const theme = useTheme();


  const [role, setRole] = React.useState(ROLES.USER);
  const [form, setFormState] = React.useState({
    password: '',
    passwordConf: ''
  });

  const updateField = (e:any) => {
    setFormState({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const errorText =  !validarePassword();
  function validarePassword(){
    if (form.passwordConf===form.password && form.password!=="")
      return true
    else
      return false
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRole(event.target.value as string);
  };

  const handleClickOpen = (props:NewUser) => {

    setNewUser(props)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOK = () => {

    setNewUser(
        {
          roles:role,
          password:form.password,
          email: newUser?.email,
          firstName: newUser?.firstName,
          lastName: newUser?.lastName,
          username: newUser?.username
        }
    );
    setOpen(false);
    
   
  };

  const dataPost = React.useCallback(() => {
    console.log("dataPost")
    const { proxy } = props;
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    }
    axios.post(proxy + '/users', null, { headers: headers, withCredentials: true })
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log(error)
        console.log(error.response)
        if (Number(error.response.status) === 401) {
          history.push("/signin")

        } else {
          console.log("Another error")
        }
      })
  },
    [],
  )
  React.useEffect(() => {
    new Promise((resolve) => {
        setTimeout(() => {
           resolve();
          dataPost();
      }, 600);
    })

  }, [dataPost]);

  React.useEffect(() => {
    console.log("state",newUser)
  }, [newUser]);

  const defaultData: Row[] = [];

  const [data, setData] = React.useState(defaultData);
  const [selectedRow, setSelectedRow] = React.useState("null");
  const [state, setState] = React.useState<TableState>(

    roleAccess ?
      {
        columns: [
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
        data: [

        ],
      }
      :
      {
        columns: [
          { title: t("Таблица.1"), field: 'username' },
          { title: t("Таблица.2"), field: 'firstName' },
          { title: t("Таблица.3"), field: 'lastName' },
          { title: t("Таблица.4"), field: 'email' },

        ],
        data: [

        ],
      }

  );

  return (
    <>
      {!(data!==undefined && data.length>0)? <Linner/> :
          <MaterialTable
              title={t("Таблица.6")}
              columns={state.columns}
              data={data}
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
                              backgroundColor: '#E53935',
                            }}
                        >
                          {"asd"}
                        </div>
                    );
                  },
                },
                rowData => ({
                  // disabled: rowData.name === "ax",
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
                  onClick: () => dataPost(),
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
                headerStyle: { position: 'sticky', top: 0 },
                maxBodyHeight: height - 48,
                actionsColumnIndex: -1,
                exportButton: true,
                pageSize: 10,
                pageSizeOptions: [10, 20, 30],
                rowStyle: rowData => ({
                  backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
              }}
              onRowClick={((event, selectedRow: any) => setSelectedRow(selectedRow.tableData.id))}



              editable={roleAccess ? {
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      //   setTimeout(() => {
                      resolve();
                      const newData1:NewUser = {
                        username:newData.username,
                        firstName: newData.firstName,
                        lastName: newData.lastName,
                        email: newData.email,
                        roles: ROLES.USER,
                        password: "",
                      }
                      handleClickOpen(newData1)
                      /* setState((prevState) => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      }); */
                      //}, 600);
                    })

                ,

                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
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
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
              } : {
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
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
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      setTimeout(() => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data.splice(data.indexOf(oldData), 1);
                          return { ...prevState, data };
                        });
                      }, 600);
                    }),
              }}

          />
      }

      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Укажите Роль и пароль!"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Выберите роль для пользователя и укажите пароль для пользователя:
          {" "+newUser?.username}
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
                disabled={validarePassword()?false:true}

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