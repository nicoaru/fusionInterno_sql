import React, {useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import {dateStringFromDataObject, dateObjectFromDateString} from '../../utils/utils.js';
import './itemDetails.css'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxHeight: '90%',
    overflow: 'scroll'
  };


function ItemDetails({item}) {
    console.log('item =>', item)
    const [isEditable, setIsEditable] = useState(true)
    
    const enableEdit = () => {
        setIsEditable(true)
    }
    const disableEdit = () => {
        setIsEditable(false)
    }
  
    return (
        <Box sx={style}>
            <Box

            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <div>
            <TextField
                id="nombreMueble"
                label="Mueble"
                defaultValue={`${item.modelo} - ${item.linea}`}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />
            <TextField
                id="fechaEntrada"
                label="Fecha de entrada"
                defaultValue={item.fecha_entrada}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />
            <TextField
                id="fechaEntrega"
                label="Fecha de entrega"
                defaultValue={item.fecha_entrega}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />            
            <TextField
                id="estado"
                label="Estado"
                defaultValue={item.estado.nombre}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                    ['data-id-estado']: `${item.estado.id}`
            }}
                
            />    
            <TextField
                id="largo"
                label="Largo"
                defaultValue={item.largo}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="alto_total"
                label="Alto"
                defaultValue={item.alto_total}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />                
            <TextField
                id="profundidad"
                label="Profundidad"
                defaultValue={item.profundidad}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />                
            <TextField
                id="terminacion"
                label="Terminación"
                defaultValue={item.terminacion}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="color"
                label="Color"
                defaultValue={item.color}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
                <TextField
                id="terminacion_frentes"
                label="Terminación de frentes"
                defaultValue={item.terminacion_frentes}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="n_puertas"
                label="Cantidad puertas"
                defaultValue={item.n_puertas}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="n_cajones"
                label="Cantidad cajones"
                defaultValue={item.n_cajones}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="interior_cajones"
                label="Interior cajones"
                defaultValue=''
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="n_cajones_internos"
                label="Cantiad cajones internos"
                defaultValue={item.terminacion}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="patas_altura"
                label="Altura patas"
                defaultValue={item.patas_altura}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="patas_modelo"
                label="Modelo patas"
                defaultValue={item.patas_modelo}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="patas_color"
                label="Color patas"
                defaultValue={item.terminacion}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="notas"
                label="Notas"
                defaultValue={item.terminacion}
                multiline
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="cantidad"
                label="Cantidad"
                defaultValue={item.cantidad}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />    
            <TextField
                id="estandar"
                label="Estandar"
                defaultValue={item.estandar}
                onDoubleClick={enableEdit}
                onBlur={disableEdit}
                InputProps={{
                    readOnly: !isEditable,
                }}
            />  

            <TextField
                id="id_pedido"
                label="Pertenece al pedido"
                defaultValue={item.id_pedido}
                InputProps={
                    {readOnly: true}
                }
            />
            <Button>Ver pedido</Button>
            <TextField
                id="cliente"
                label="Cliente"
                defaultValue={`${item.pedido.cliente.nombre} ${item.pedido.cliente.apellido}`}
                InputProps={
                    {readOnly: true}
                }
            />
            <TextField
                id="direccion_entrega"
                label="Dirección de entrega"
                defaultValue={`${item.pedido.direccion_entrega}`}
                InputProps={
                    {readOnly: true}
                }
            />
            
            <div>Insumos</div>
            {item.insumos.forEach(elem => { return <div><input data-id-insumo={`${elem.id_insumo}`} value={elem.insumo.nombre}/> <input value={elem.cantidad}/></div> })}
       
            <div>Estados - histórico</div>
            {item.estadosHistorico.map(elem => 
                <div key={elem.id}>
                    <TextField
                        id={elem.id}
                        label={dateStringFromDataObject(dateObjectFromDateString(elem.fecha))}
                        defaultValue={elem.estado.nombre}
                        InputProps={
                            {readOnly: true}
                        }
                    />
                </div>
            )}
                
        
  estadosHistorico    
            
            
            
                                </div>
            </Box>
        </Box>


    );



}

export { ItemDetails }