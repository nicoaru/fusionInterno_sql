import React, {useState} from "react";
import './cargaPedidos.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack, Box, Typography, Button } from '@mui/material';
import { DataGrid,  GridEditSingleSelectCell, useGridApiContext, GridActionsCellItem, GridPrintExportOptions } from '@mui/x-data-grid';
import check from '../../recursos/check.png'
import cross from '../../recursos/cross.png'
import { MuebleEncargado } from "../../clases/clases"





function CargaPedidos({cargarPedidosHandler}) {
    

// Funcion processRowUpdate y auxiliares
    // fn aux1
    const alreadyExists = (newValuesRow) => {
        console.log("alreadyExists? => ", (rows[rows.length-1].id !== newValuesRow.id))
        return (rows[rows.length-1].id !== newValuesRow.id)
    }
    //fn aux2
    const updateRow = (newValuesRow, rowsArray) => {
        return rowsArray.map(row => row.id === newValuesRow.id ? newValuesRow : row)
    }
    //fn aux3
    const addEmptyRow = (rowsArray) => {
        const emptyRow = { id: idGenerator(),
            fechaPedido: " ",
            fechaEntrega: '', 
            estado: '',
            linea: '',
            modelo: '', 
            largo: '', 
            alto: '',
            profundidad: '',
            codigoColor: '',
            referenciaColor: "", 
            colorCorrederas: "",
            nPuertas: '', 
            nCajones: '', 
            tipoFrentes: '', 
            estandar: '', 
            tipoPata: '',
            alturaPata: '',
            colorPata: '',
            notas: ''
            }

        return [...rowsArray, emptyRow]
    }
    // fn processUpdate es llamada en DataGrid -> processRowUpdate
    function processUpdate(newValuesRow, param2, param3) {
        // console.log("processRowUpdateParams => ", newValuesRow, param2, param3)
        let rowsTemp = rows
        rowsTemp = updateRow(newValuesRow, rowsTemp);
        if (alreadyExists(newValuesRow) === false) {
            rowsTemp = addEmptyRow(rowsTemp)
        }     
        setRows(rowsTemp)
        return newValuesRow
    }
//

// fn deleteRow
    const deleteRow = (id) => {
        rows[rows.length-1].id !== id && setRows(rows.filter((row) => row.id !== id));
        };

// State idCount & idGenerator son usados para generar un nuevo id para cada row que se agrega
    const [idCount, setIdCount] = useState(1)

    const idGenerator = () => {
        const newId = idCount+1
        setIdCount(newId)
        console.log('newId => ', newId)
        return newId
    }
//

// State rows y la row inicial vacía para empezar a cargar datos
    const initialRows = [{ id: idCount,
        fechaPedido: " ",
        fechaEntrega: '', 
        estado: '',
        linea: '',
        modelo: '', 
        largo: '', 
        alto: '',
        profundidad: '',
        codigoColor: '',
        referenciaColor: "", 
        colorCorrederas: "",
        nPuertas: '', 
        nCajones: '', 
        tipoFrentes: '', 
        estandar: '', 
        tipoPata: '',
        alturaPata: '',
        colorPata: '',
        notas: ''
    }];

    const [rows, setRows] = useState(initialRows)
//

// componente para editar el campo Linea, llamado en Columns -> Linea -> renderEditCell
    const CustomEditComponent_Linea = (props) => {
        const apiRef = useGridApiContext();

        const handleValueChange = async () => {
        await apiRef.current.setEditCellValue({
            id: props.id,
            field: 'modelo',
            value: '',
        });
        };
        return <GridEditSingleSelectCell onValueChange={handleValueChange} {...props} />
    };
  
//

    console.log('rows => ', rows)

// Columns definition
    const columns = [
        { 
            field: 'actionButtons', 
            headerName: '', 
            type: "actions", 
            getActions: (params) => [
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => deleteRow(params.id)}
                />,
            ],
            width: 50,
            headerAlign: "center", 
            align: "center", 
        },
        { 
            field: 'fechaPedido', 
            headerName: 'Fecha Pedido', 
            type: "date", 
            width: 125,
            headerAlign: "center", 
            align: "center", 
            editable: true 
        },
        {
            field: 'fechaEntrega', 
            headerName: 'Entrega', 
            type: "date", 
            width: 125, 
            headerAlign: "center", 
            align: "center", 
            editable: true 
        },
        { 
            field: 'estado', 
            headerName: 'Estado',  
            type: "singleSelect", 
            valueOptions: ["En cola", "Cortado", "Armando", "Listo para laquear", "En laqueador", "Volvio del laqueador", "Listo para entregar", "Entregado", "Otro"],
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'estandar', 
            headerName: 'Estandar', 
            type: "singleSelect", 
            valueOptions: [{value:true, label: "SI"}, {value: false, label: "NO"}], 
            align: "center", 
            renderCell: (params) => {
                if (params.value === true) { 
                    return <img src={check} alt="tick-icon"/> } 
                else if (params.value === false) {
                    return <img src={cross} alt="cross-icon"/>  }
                else return " "
            },
            // valueGetter: (params) => {
            //     if (params.value === true) { 
            //         return "SISISI" } 
            //     else if (params.value === false) {
            //         return "NONONO"  }
            //     else return false
            // },
            // valueFormatter: (params) => {
            //     if (params.value === true) { 
            //         return "SISISI" } 
            //     else if (params.value === false) {
            //         return "NONONO"  }
            //     else return " "
            // },
            align: "center",
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'linea', 
            headerName: 'Linea', 
            type: "singleSelect", 
            valueOptions: ["Praga", "Niza", "Frank", "Buet", "Visby", "Otro"],    
            renderEditCell: (params) => <CustomEditComponent_Linea {...params} />,
            headerAlign: "center", 
            align: "center",
            editable: true 
        },
        { 
            field: 'modelo', 
            headerName: 'Modelo', 
            type: "singleSelect", 
            valueOptions: (params) => {
                console.log("param de ValueOptions => ", params);
                switch (params.row.linea) {
                    case "Praga":
                        return ["Consola", "Mesa de luz", "Comoda"]
                        break;
                    case "Niza":
                        return ["Consola", "Mesa de luz", "Vajillero", "Mesa alta Niza", "Mesa alta Menton", "Recibidor", "Escritorio"]
                        break;
                    case "Frank":
                        return ["Consola", "Mesa de luz"]
                        break;
                    case "Visby":
                        return ["Bar", "Consola", "Mesa de luz"]
                        break;       
                    case "Buet":
                        return ["Mesa ratona"]
                        break;       
                    case "Otro":
                        return ["Bar", "Comoda", "Consola", "Escritorio", "Mesa", "Mesa de luz", "Mesa ratona", "Recibidor", "Vajillero", "Otro"]
                        break;       
                    default:
                        return [{value: "", label: "Seleccionar Línea"}]
                    break;
                }
            },
            width: 150, 
            align: "center",
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'largo', 
            headerName: 'Largo', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true
        },
        { 
            field: 'alto', 
            headerName: 'Alto', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true
            // valueSetter: (params) => {
            //     console.log("valueSetterParams => ", params)
            //     let altura = params.row.largo/2
            //     return {...params.row, alto: altura }
            // }, 
        },
        { 
            field: 'profundidad', 
            headerName: 'Profundidad', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'codigoColor', 
            headerName: 'Codigo Color', 
            type: "string", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'referenciaColor', 
            headerName: 'Referencia Color',
            type: "string",
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'colorCorrederas', 
            headerName: 'Color Correderas', 
            // valueGetter: (params) => {
            //     if (params.row.referenciaColor === "claro") {
            //         return "Zincada"
            //     }
            //     else if (params.row.referenciaColor === "oscuro") {
            //         return "Negra"
            //     }
            // },
            // valueSetter: ({row, value}) => {
            //     console.log("valueSetter params: row => ", row, " value => ", value)
            //     let color
            //     if (row.referenciaColor === "claro") {
            //             color = "Zincada"
            //         }
            //     else if (row.referenciaColor === "oscuro") {
            //         color = "Negra"
            //     }
            //     console.log("color => ", color)
            //     const updatedRow = {...row, colorCorrederas: color}
            //     return updatedRow
            // },
            type: "singleSelect", 
            valueOptions: [{value: "Zincada", label: "Zincada"}, {value: "Negra", label: "Negra"}],                 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true
        },
        { 
            field: 'nPuertas', 
            headerName: 'Puertas', 
            type: "number", 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'nCajones', 
            headerName: 'Cajones', 
            type: "number", 
            align: "center",
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'tipoFrentes', 
            headerName: 'Tipo de puerta o frente', 
            type: "string", 
            width: 150, 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'tipoPata', 
            headerName: 'Tipo de pata', 
            type: "string", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'alturaPata', 
            headerName: 'Altura de pata', 
            type: "number", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'colorPata', 
            headerName: 'Color de pata', 
            type: "string", 
            width: 150, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        },
        { 
            field: 'notas', 
            headerName: 'Notas', 
            type: "string", 
            minWidth: 150, 
            flex: 1, 
            align: "center", 
            headerAlign: "center", 
            editable: true 
        }
    ];
//


    return (
        <div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    sx={{ m: 2,
                        '.MuiDataGrid-cell': { py: '8px', px: '4px' },
                        '.MuiDataGrid-cell.MuiDataGrid-cell--editing': { py: '8px', px: '4px' },
                        '.rowGridCarga': {minHeight: '52px !important'}
                      }}
                    getRowHeight={() => 'auto'}
                    getRowClassName={(params) => 'rowGridCarga'}
                    rows={rows}
                    columns={columns}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    editMode='row'
                    processRowUpdate={processUpdate}
                />
                
            </div>
            <Button color="primary"  onClick={() => {
                cargarPedidosHandler(rows.filter(obj => rows.indexOf(obj) !== rows.length-1))}}>
                CARGAR LOS PEDIDOS
            </Button>
        </div>



    )


}

export { CargaPedidos }