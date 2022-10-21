import React, { useState, useEffect } from "react";
import './pedidosList.css';
import { Stack, Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'
import {dateStringFromDataObject, dateObjectFromDateString} from '../../utils/utils.js'

function PedidosList({ loading, muebles, error, estados }) {
    
    const [columns, setColumns] = useState([])

    let fieldsEstados = []
    useEffect( () => {
        const _fieldsEstados = [] 
        estados.forEach(estado => {
            const _newField = { 
                field: `${estado.nombre}`, 
                headerName: `${estado.nombre}`,
                valueGetter: (params) => {
                    const _fecha = params.row.estadosHistorico.map(elem => {
                        if(elem.id_estado === estado.id) {
                            return dateStringFromDataObject(dateObjectFromDateString(elem.fecha))
                            // return elem.fecha.toLocaleDateString()
                        }
                    })
                    const _value = _fecha.join(' /n ')
                    return _value
                }         
            }
            _fieldsEstados.push(_newField)
        })
        fieldsEstados = _fieldsEstados
                console.log('fieldsEstados : ', fieldsEstados)

        const _columns = [
            {
                field: 'cliente', 
                headerName: 'Cliente',
                valueGetter: (params) => {
                    const nombre = params.row.pedido.cliente.nombre
                    const apellido = params.row.pedido.cliente.apellido
                    return `${nombre ? nombre : ''} ${apellido ? apellido : ''}`
                } 
            },
            { 
                field: 'linea', 
                headerName: 'Línea'
            },
            { 
                field: 'modelo', 
                headerName: 'Modelo', 
                width: 150
            },        
            {
                field: 'largo', 
                headerName: 'Largo', 
                valueGetter: (params) => {
                    return params.row.largo
                } 
            },
            {
                field: 'alto', 
                headerName: 'Alto', 
                valueGetter: (params) => {
                    return params.row.alto_total
                } 
            },        {
                field: 'profundidad', 
                headerName: 'Prof.', 
                valueGetter: (params) => {
                    return params.row.profundidad
                } 
            },
            { 
                field: 'fecha_ingreso', 
                headerName: 'Fecha ingreso',
                valueGetter: (params) => {
                    return dateStringFromDataObject(dateObjectFromDateString(params.row.pedido.fecha_entrada))
                } 
            },
            { 
                field: 'fecha_entrega', 
                headerName: 'Fecha entrega',
                valueGetter: (params) => {
                    return dateStringFromDataObject(dateObjectFromDateString(params.row.pedido.fecha_entrega)) 
                } 
            },
            { 
                field: 'estado', 
                headerName: 'Estado',
                valueGetter: (params) => {
                    return params.value.nombre
                }         
            },
            ...fieldsEstados
    
    
        ];
        setColumns(_columns)

    }, [muebles])
    
    const rows = muebles;
    // console.log('rows => ', rows)
    console.log("estados : ", estados)    


//         valueFormatter: (params) => {
    // return dateStringFromTimestamp(params.value)}
//         renderCell: (params) => {
    // return params.row.estado.actual}

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
                            checkboxSelection
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