import React, { useState, useEffect } from "react";
import './pedidosList.css';
import { Stack, Box, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridToolbar, GridCellModes } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'
import {dateFromString, stringFromDate, formatDateString} from '../../utils/utils.js'
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import Modal from '@mui/material/Modal';
import { ItemDetails } from "../itemDetails/itemDetails";
import Button from '@mui/material/Button';


function PedidosList({ loading, error, muebles, estados, pedidos, clientes }) {
    
    const deleteUser = (id_estado) => {}
    const duplicateUser = () => {}


    const processRowUpdate = async (newValues, oldValues) => {
        console.log("newValues ", newValues)
        const id_estado = newValues.id_estado
        console.log("id_estado ", {id_estado})
        let _newRow
        let _error
        try {
            console.log(`/api/muebles/${newValues.id}`)
            const response = await fetch(`/api/muebles/${newValues.id}`, {
                method: 'PATCH', 
                body: JSON.stringify({id_estado}),
                headers: {"Content-Type": "application/json"}
            })
            console.log("response ", response)
            if(response.ok) {
                _newRow = response.json()
                return _newRow
            }
            else {
               throw new Error(`error ${response.status}, ${response.statusText}`) 
            }
        }
        catch(error) {
            throw error
        }

           
    }

    const handleProcessRowUpdateError = (error) => {
        console.log('error guardando datos en el servidor ', error.message)
      }



    const _fieldsEstados = [] 
    estados.forEach(estado => {
        const _newField = { 
            field: `${estado.nombre}`, 
            headerName: `${estado.nombre}`,
            hide: true,
            valueGetter: (params) => {
                const _fecha = params.row.estadosHistorico.map(elem => {
                    if(elem.id_estado === estado.id) {
                        return formatDateString(elem.fecha)
                    }
                })
                const _value = _fecha.join(' ')
                return _value
            }         
        }
        _fieldsEstados.push(_newField)
    })


    const columns = [
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            disableColumnMenu: false,
            width: 100,
            hideable: false,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteUser(params.id)}
                />,
                <GridActionsCellItem
                    icon={<InsertChartOutlinedIcon />}
                    label="Ver detalles"
                    onClick={() => handleViewDetail(params.row)}
                />,
                <GridActionsCellItem
                    icon={<FileCopyIcon />}
                    label="Duplicate User"
                    onClick={duplicateUser(params.id)}
                    showInMenu
                />
            ]
        },
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
                return formatDateString(params.row.pedido.fecha_entrada)
            } 
        },
        { 
            field: 'fecha_entrega', 
            headerName: 'Fecha entrega',
            disableColumnMenu: true,
            valueGetter: (params) => {
                return formatDateString(params.row.pedido.fecha_entrega)
            } 
        },
        { 
            field: 'fecha_limite_taller', 
            headerName: 'Fecha límite taller',
            disableColumnMenu: true,
            valueGetter: (params) => {
                return (params.row.pedido.fecha_entrega - 28) 
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
                // console.log("params => ", params)
                const _parsedValue = estados.find(elem => elem.id === params.value)?.nombre
                // console.log("_parsedValue => ", _parsedValue)
                return _parsedValue
            },
            editable: true,
            disableColumnMenu: true,
        },
        ..._fieldsEstados        
    ];


    const rows = muebles;
    const [pageSize, setPageSize] = useState(100);


    // MODAL itemDetails //
    const [open, setOpen] = useState(false);
    const handleViewDetail = (item) => {
        setItem(item)
        setOpen(true)
    }
    const handleOpen = () => setOpen(true);
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false)
          }
    };
    const [item, setItem] = useState()


    return (
        <div>
            <div style={{ height: 500, width: '100%' }}>
                {
                    rows.length > 0 
                        ?
                        <DataGrid
                            sx={{ m: 2,
                                '.MuiDataGrid-cell': { py: '2px', px: '4px' },
                                // '.rowGridPedidos': {minHeight: '52px !important'}
                                '.rowGridPedidosEven': {bgcolor: '#F7F7F7'},
                                '.rowGridPedidosOdd': {bgcolor: '#E8E8E8'},
                                '.rowGridPedidosOdd:hover': {bgcolor: '#D5ECEB'},
                                '.rowGridPedidosEven:hover': {bgcolor: '#D5ECEB'},
                            }}
                            style={{height: '100%'}}
                            getRowHeight={() => 'auto'}
                            getRowClassName={(params) => {
                                return params.indexRelativeToCurrentPage % 2 === 0 ? 'rowGridPedidosEven' : ' rowGridPedidosOdd'
                            }}                        
                            rows={rows}
                            columns={columns}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            rowsPerPageOptions={[5, 10, 15, 20, 50, 100]}
                            pagination
                            checkboxSelection={false}
                            components={{Toolbar: GridToolbar}}
                            experimentalFeatures={{ newEditingApi: true }}
                            processRowUpdate={processRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                        />
                        : 
                        error
                            ?
                            <div> {error} </div>
                            :
                            <div> Loading </div>
                }
            </div>

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <div id='modalContainer'>
                    <ItemDetails item={item} pedidos={pedidos} mueblesList={muebles} setItem={setItem} handleClose={handleClose}/>                
                </div>

            </Modal>

        </div>

    )
}

export { PedidosList }