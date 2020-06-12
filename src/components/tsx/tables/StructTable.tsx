// @ts-ignore
import React from 'react';
import MaterialTable from 'material-table';
import { TableState } from './ITableState';
import axios from "axios";
import { Row } from "./Row";
import { useWindowResize } from "../UseWindowResize";

export default function MaterialTableDemo(props: any) {
  const { width, height } = useWindowResize();
  React.useEffect(() => {

    const getPostData = () => {
      const { proxy } = props;
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      }
      axios.post(proxy + '/users', null, { headers: headers, withCredentials: true })
        .then(res => {
          //console.log(res)
          setData(res.data)
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
        })
    }

    getPostData();

  }, [props]);


  const defaultData: Row[] = [];

  const [data, setData] = React.useState(defaultData);
  const [selectedRow, setSelectedRow] = React.useState("null");
  const [state, setState] = React.useState<TableState>({
    

    columns: [
      { title: 'Логин', field: 'username' },
      { title: 'Имя', field: 'firstName' },
      { title: 'Фамилия', field: 'lastName' },
      { title: 'Email', field: 'email' },
      {
        title: 'Роль',
        field: 'roles',
        editable: "never",
        render: rowData => {

          let stringRole:string="";
          if (rowData!==null && rowData!==undefined) {
            const{roles} = rowData;
            roles.forEach(role => {
              const { name } = role;
              stringRole = stringRole!==""?+", /n"+name:name;
            
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
  });

 

  return (

<MaterialTable
      title="Пользователи"
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
          tooltip: 'Refresh Data',
          isFreeAction: true,
          onClick: () => alert("Refresh"),
        }
      ]}
      /*
      https://material-table.com/#/docs/features/tree-data
      
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      
      https://material-table.com/#/docs/features/localization
      */
      localization={{
        pagination: {
          labelDisplayedRows: '{from}-{to} of {count}'
        },
        toolbar: {
          nRowsSelected: '{0} row(s) selected'
        },
        header: {
          actions: 'Actions'
        },
        body: {
          emptyDataSourceMessage: 'No records to display',
          addTooltip: 'Добавить',
          filterRow: {
            filterTooltip: 'Filter'
          }
        }
      }}
      options={{
        headerStyle: { position: 'sticky', top: 0 },
         maxBodyHeight: height - 48,
        actionsColumnIndex: -1,
        exportButton: true,
        pageSize:10,
        pageSizeOptions:[10,20,30],
        rowStyle: rowData => ({
          backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
        })
      }}
      onRowClick={((event, selectedRow:any) => setSelectedRow(selectedRow.tableData.id))}

      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
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
   

  );
}