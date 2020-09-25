// @ts-ignore
import React from "react";
import MaterialTable from 'material-table';
import {TableState} from "./ITableState";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {useWindowResize} from "../../../UseWindowResize";
//import { useTranslation } from 'react-i18next';

const TreeTableSearch = (props: any) => {
    const {dataC, t, postUpdate} = props;
    const { height } = useWindowResize();
    //const { t } = useTranslation();
   
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
        setState((prevState) => {
            return {
                ...prevState,
                data: dataC
            }
        })
    }, [dataC]);


     
    const isLeaf = (rowData : any) =>
    state.data.find(el => el.parentId === rowData.id) === undefined;

    const [qquery, setQuery] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState("null");
   
    React.useEffect(() => {
        postUpdate()
    }, [qquery]);

    return (
        <>
        <MaterialTable
            title={t("ТаблицаСтруктура.0")}
            data={state.data}
            isLoading={state.data.length === 0}
            columns={state.columns}
            parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
           
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
                    // exportCSVName: t("Таблица.24"),
                    //     exportPDFName: t("Таблица.41"),
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
                defaultExpanded: true,
                sorting: true,
                selection: true,
                paging: false,
                search: false,
                showSelectAllCheckbox: false,
                headerStyle: { position: 'sticky', top: 0 },
                maxBodyHeight: height - 48,
                rowStyle: rowData => ({
                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                }),
                selectionProps: (rowData:any) => ({
                    disabled: !isLeaf(rowData),
                    color: "primary"
                })

            }}
            onRowClick={((event, selectedRow: any) => setSelectedRow(selectedRow.tableData.id))}
        />
        </>
    );
}

export default TreeTableSearch;
