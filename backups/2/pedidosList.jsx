import React, { useState, useEffect } from "react";
import './pedidosList.css';
import { Stack, Box, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem  } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'
import {dateStringFromDataObject, dateObjectFromDateString} from '../../utils/utils.js'
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';


function PedidosList({ loading, muebles, error, estados }) {
    
    // const [columns, setColumns] = useState([])

    // const deleteUser = () => {}
    // const toggleAdmin = () => {}
    // const duplicateUser = () => {}


    // useEffect( () => {
    //     const getEstados = (itemsList) => {
    //         const _estados = []
    //          itemsList.forEach(item => {
    //             item.estadosHistorico.forEach(estadoHist => {
    //                 if(!(_estados.some(elem => elem.id === estadoHist.estado.id))) {
    //                     _estados.push(estadoHist.estado)
    //                 }
    //             })
    //         })
    //         _estados.sort((a,b) => a.id - b.id)
    //         console.log("_estados pL l. 27 => ", _estados)
    //         return _estados
    //     }
    //     const _estadosList = getEstados(muebles)

    //     const _fieldsEstados = [] 
    //     _estadosList.forEach(estado => {
    //         const _newField = { 
    //             field: `${estado.nombre}`, 
    //             headerName: `${estado.nombre}`,
    //             hide: true,
    //             valueGetter: (params) => {
    //                 const _fecha = params.row.estadosHistorico.map(elem => {
    //                     if(elem.id_estado === estado.id) {
    //                         return dateStringFromDataObject(dateObjectFromDateString(elem.fecha))
    //                     }
    //                 })
    //                 const _value = _fecha.join(' ')
    //                 return _value
    //             }         
    //         }
    //         _fieldsEstados.push(_newField)
    //     })

    //     console.log('fieldsEstados : ', _fieldsEstados)

    //     const _columns = [
    //         {
    //             field: 'cliente', 
    //             headerName: 'Cliente',
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 const nombre = params.row.pedido.cliente.nombre
    //                 const apellido = params.row.pedido.cliente.apellido
    //                 return `${nombre ? nombre : ''} ${apellido ? apellido : ''}`
    //             } 
    //         },
    //         { 
    //             field: 'linea', 
    //             headerName: 'Línea',
    //             disableColumnMenu: true
    //         },
    //         { 
    //             field: 'modelo', 
    //             headerName: 'Modelo', 
    //             width: 150,
    //             disableColumnMenu: true
    //         },        
    //         {
    //             field: 'largo', 
    //             headerName: 'Largo', 
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 return params.row.largo
    //             } 
    //         },
    //         {
    //             field: 'alto', 
    //             headerName: 'Alto', 
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 return params.row.alto_total
    //             } 
    //         },        {
    //             field: 'profundidad', 
    //             headerName: 'Prof.', 
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 return params.row.profundidad
    //             } 
    //         },
    //         { 
    //             field: 'fecha_ingreso', 
    //             headerName: 'Fecha ingreso',
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 return dateStringFromDataObject(dateObjectFromDateString(params.row.pedido.fecha_entrada))
    //             } 
    //         },
    //         { 
    //             field: 'fecha_entrega', 
    //             headerName: 'Fecha entrega',
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 return dateStringFromDataObject(dateObjectFromDateString(params.row.pedido.fecha_entrega)) 
    //             } 
    //         },
    //         { 
    //             field: 'Estado', 
    //             headerName: 'Estado',
    //             type: 'singleSelect',
    //             valueOptions: () => {const _opciones = estados.map(elem => {return {value: elem.id, label: elem.nombre}})
    //                 console.log("opciones => ", _opciones)
    //                 return _opciones
    //             },
    //             editable: true,
    //             disableColumnMenu: true,
    //             valueGetter: (params) => {
    //                 console.log("params.row => ", params.row)
    //                 return params.row.estado.id
    //             },
    //             valueSetter: (params) => {
    //                 console.log("params => ", params)
    //                 return {...params.row, estado: {id: params.value}}
    //             }
    //         },
    //         ..._fieldsEstados,
    //         {
    //             field: 'actions',
    //             type: 'actions',
    //             headerName: 'Actions',
    //             width: 100,
    //             getActions: (params) => [
    //                 <GridActionsCellItem
    //                     icon={<DeleteIcon />}
    //                     label="Delete"
    //                     onClick={deleteUser(params.id)}
    //                 />,
    //                 <GridActionsCellItem
    //                     icon={<SecurityIcon />}
    //                     label="Toggle Admin"
    //                     onClick={toggleAdmin(params.id)}
    //                     showInMenu
    //                 />,
    //                 <GridActionsCellItem
    //                     icon={<FileCopyIcon />}
    //                     label="Duplicate User"
    //                     onClick={duplicateUser(params.id)}
    //                     showInMenu
    //                 />
    //             ]
    //         }
    
    
    //     ];
    //     setColumns(_columns)

    // }, [muebles, estados])
    

    // console.log('rows => ', rows)
    // console.log("estados : ", estados)    


//         valueFormatter: (params) => {
    // return dateStringFromTimestamp(params.value)}
//         renderCell: (params) => {
    // return params.row.estado.actual}


    const deleteUser = () => {}
    const toggleAdmin = () => {}
    const duplicateUser = () => {}


    const _fieldsEstados = [] 
    estados.forEach(estado => {
        const _newField = { 
            field: `${estado.nombre}`, 
            headerName: `${estado.nombre}`,
            hide: true,
            valueGetter: (params) => {
                const _fecha = params.row.estadosHistorico.map(elem => {
                    if(elem.id_estado === estado.id) {
                        return dateStringFromDataObject(dateObjectFromDateString(elem.fecha))
                    }
                })
                const _value = _fecha.join(' ')
                return _value
            }         
        }
        _fieldsEstados.push(_newField)
    })
    console.log('fieldsEstados : ', _fieldsEstados)

    const columns = [
        {
            field: 'cliente', 
            headerName: 'Cliente',
            disableColumnMenu: true,
            valueGetter: (params) => {
                const nombre = params.row.pedido.cliente.nombre
                const apellido = params.row.pedido.cliente.apellido
                return `${nombre ? nombre : ''} ${apellido ? apellido : ''}`
            } 
        },
        { 
            field: 'linea', 
            headerName: 'Línea',
            disableColumnMenu: true
        },
        { 
            field: 'modelo', 
            headerName: 'Modelo', 
            width: 150,
            disableColumnMenu: true
        },        
        {
            field: 'largo', 
            headerName: 'Largo', 
            disableColumnMenu: true,
            valueGetter: (params) => {
                return params.row.largo
            } 
        },
        {
            field: 'alto', 
            headerName: 'Alto', 
            disableColumnMenu: true,
            valueGetter: (params) => {
                return params.row.alto_total
            } 
        },        {
            field: 'profundidad', 
            headerName: 'Prof.', 
            disableColumnMenu: true,
            valueGetter: (params) => {
                return params.row.profundidad
            } 
        },
        { 
            field: 'fecha_ingreso', 
            headerName: 'Fecha ingreso',
            disableColumnMenu: true,
            valueGetter: (params) => {
                return dateStringFromDataObject(dateObjectFromDateString(params.row.pedido.fecha_entrada))
            } 
        },
        { 
            field: 'fecha_entrega', 
            headerName: 'Fecha entrega',
            disableColumnMenu: true,
            valueGetter: (params) => {
                return dateStringFromDataObject(dateObjectFromDateString(params.row.pedido.fecha_entrega)) 
            } 
        },
        { 
            field: 'id_estado', 
            headerName: 'Estado',
            type: 'singleSelect',
            valueOptions: () => {
                const _opciones = estados.map(elem => {return {value: elem.id, label: elem.nombre}})
                console.log("opciones => ", _opciones)
                return _opciones
            },
            valueFormatter:(params, GridCellParams) => {
                console.log("params => ", params)
                const _parsedValue = estados.find(elem => elem.id === params.value).nombre
                console.log("_parsedValue => ", _parsedValue)
                return _parsedValue
            },
            editable: true,
            disableColumnMenu: true,
            // valueSetter: (params) => {
            //     console.log("params => ", params)
            //     return {...params.row, estado: {id: params.value}}
            // }
        },
        ..._fieldsEstados,
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteUser(params.id)}
                />,
                <GridActionsCellItem
                    icon={<SecurityIcon />}
                    label="Toggle Admin"
                    onClick={toggleAdmin(params.id)}
                    showInMenu
                />,
                <GridActionsCellItem
                    icon={<FileCopyIcon />}
                    label="Duplicate User"
                    onClick={duplicateUser(params.id)}
                    showInMenu
                />
            ]
        }
    ];


    const rows = muebles;
    const [pageSize, setPageSize] = useState(5);

    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                {
                    rows.length > 0 
                        ?
                        <DataGrid
                            sx={{ m: 2,
                                '.MuiDataGrid-cell': { py: '8px', px: '4px' },
                                '.rowGridPedidos': {minHeight: '52px !important'}
                            }}
                            getRowHeight={() => 'auto'}
                            getRowClassName={(params) => 'rowGridPedidos'}                        
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
                            pagination
                            checkboxSelection={false}
                        />
                        : 
                        error
                            ?
                            <div> {error} </div>
                            :
                            <div> Loading </div>
                }
            </div>

        </div>



    )


}

export { PedidosList }