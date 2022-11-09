import React, {useState, useEffect} from "react";
import { Button, Typography, TextField, Box, Dialog, Stack, Accordion, AccordionSummary, AccordionDetails, InputLabel, Input, List, ListItem, ListItemButton, ListItemText, Collapse, Select, MenuItem, FormControl } from "@mui/material";
import { CommentsDisabledOutlined, ConnectingAirportsOutlined, ExpandLess, ExpandMore } from "@mui/icons-material"
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {dateFromString, stringFromDate, formatDateString} from '../../utils/utils.js'
import { DialogMultipleValueChange } from "./dialogMultipleValueChange/dialogMultipleValueChange.jsx";
import { DataConsumer } from '../../context/DataProvider.jsx'
import './itemDetails.css'




// style
const mainBoxStyle = {
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





function ItemDetails({item, setItem}) {

    // context
    const {muebles, estados, pedidos, clientes, getMuebles} = DataConsumer()
    
    // useEffect
    useEffect(() => {
        setItemCopy({...item})
    }, [item])
    // states
    const [showMuebles, setShowMuebles] = useState(false) //booleano para mostrar los otros muebles
    const [isEditable, setIsEditable] = useState(false)   //boleano para habilitar/deshabilitar edicion onDoubleClick/onBlur
    const [itemCopy, setItemCopy] = useState({ ...item})  // trabajo sobre itemCopy
    const [oldValue, setOldValue] = useState()

    //- probar hacer un llamado nuevo cada vez. No laburar con la lista guardada en el estado del context. Para que actualice los otros muebles del pedido
    // Pedido al que pertenece el mueble
    const pedido = pedidos.find(elem => elem.id === item.id_pedido)
    // Lista de otros muebles del mismo pedido
    const otrosMuebles = pedido.muebles_prod.map(elem => muebles.find(mueble => mueble.id === elem.id)).filter(elem => elem.id !== item.id)

    console.log("itemCopy => ", itemCopy)

//- punto de backup

    // handlers
    const enableEdit = (e, field) => {
        console.log("se disparo enable edit", e)

        const _oldValue = itemCopy[field]
        setOldValue(_oldValue)
        setIsEditable(true)

        // console.log("event enableEdit => ", e)
        // console.log('enableEdt field => ', field)
        console.log("oldValue => ", _oldValue)          
    }

    const handleValueChange = (e, field) => {
        // console.log("onChange target => ", e.target)
        // console.log("modifiedField en handleValueChange => ", e.target.name)
        // console.log("dataset => ", e.target.dataset?.type)
        
        const _newValue = e.target.dataset?.type === 'number'
            ? Number(e.target.value)
            : (e.target.value == 'true' || e.target.value == 'false')
                ? JSON.parse(e.target.value)
                : e.target.value

        const _fieldValue = {[field]: _newValue}
        const _itemCopy = {...itemCopy, ..._fieldValue}       
        setItemCopy(_itemCopy)

        // console.log('onChange _newValue => ', _newValue)
        console.log("onChange _fieldValue => ", _fieldValue)
        // console.log('_itemCopy => ', _itemCopy)

    };

    const disableEdit = async (e) => {
        // console.log("event disable edit => ", e)
        // console.log("disableEdit target value => ", e.target.value)
        if(isEditable === true) {
            const field = e.target.name
            const _newValue = itemCopy[field]

            console.log("Hay cambios?", !(oldValue === _newValue))

            const _field_value = {[field]: _newValue}
            if(!(oldValue === _newValue)) {
                console.log("Hay cambios, vamos a grabarlos!")
                const result = await saveValue(itemCopy.id, _field_value)
                console.log("result => ", result)
                if(result.error) {
                    console.log("Falló el grabarlo en la DB, dejemos el valor que estaba antes, mejor...")
                    setItemCopy({...itemCopy, [e.target.name]: oldValue})
                }
                else { setItem(result) } // setear de nuevo el item
            }
            else { console.log("No hay cambios, dejemos todo como esta!") }
            setIsEditable(false)
        }

        // console.log("disableEdit _newValue => ", _newValue)        
    }

    

    // saveValue
    const saveValue = async (itemId, newValue) => {
        console.log("saveValue newValue ", newValue)
        try {
            console.log(`/api/muebles/${itemId}`)
            const response = await fetch(`/api/muebles/${itemId}`, {
                method: 'PATCH', 
                body: JSON.stringify(newValue),
                headers: {"Content-Type": "application/json"}
            })
            console.log("response ", response)
            if(response.ok) {
                const _updatedOk = await response.json()
                return _updatedOk

            }
            else {
                const error = {status: response.status, message: response.statusText}
                console.log(`Error ${error.status} - ${error.message}`)
                return {error}
            }
        }
        catch(e) {
            const error = {status: 0, message: 'Algo salió mal. No se pudieron guardar los cambios'}
            console.log(`Error ${error.status} - ${error.message}`)
            return {error}
        }        
    }


    const toggleShowMuebles = () => {
        setShowMuebles(!showMuebles)
    }

    
    //dialog nombreMueble
    const [openDialog, setOpenDialog] = useState(false);






    return (
        <Box sx={mainBoxStyle}>
            <Typography variant='h6' >{itemCopy.modelo} {itemCopy.linea} - {itemCopy.pedido.cliente.nombre} {itemCopy.pedido.cliente.apellido} </Typography>
            <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
            noValidate
            autoComplete="off"
            >
                <Stack>
                    <Accordion defaultExpanded={true} disableGutters elevation={0} sx={{p:0, m:0}}>
                        <AccordionSummary
                        sx={{m:0}}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                            <Typography>Datos del pedido</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <TextField
                                    id="cliente"
                                    name="cliente"
                                    label="Cliente"
                                    value={`${itemCopy.pedido.cliente.nombre || ' '} ${itemCopy.pedido.cliente.apellido || ' '}`}
                                    size={'small'}
                                    margin={'dense'}
                                    inputProps={
                                        {
                                        disabled: true,
                                        readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }

                                />
                                <TextField
                                    id="direccion_entrega"
                                    name="direccion_entrega"
                                    label="Dirección de entrega"
                                    value={`${itemCopy.pedido.direccion_entrega || ' '}`}
                                    size={'small'}
                                    margin={'dense'}
                                    inputProps={
                                        {disabled: true,
                                            readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }
                                />                                
                                <TextField
                                    id="fecha_entrada"
                                    name="fecha_entrada"
                                    label="Fecha de entrada"
                                    value={formatDateString(pedido.fecha_entrada || ' ')}
                                    size={'small'}
                                    inputProps={
                                        {disabled: true,
                                            readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }
                                />
                                <TextField
                                    id="fecha_entrega"
                                    name="fecha_entrega"
                                    label="Fecha de entrega"
                                    value={formatDateString(pedido.fecha_entrega) || ' '}
                                    size={'small'}
                                    inputProps={
                                        {disabled: true,
                                            readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }
                                />
                                <TextField
                                    id="fecha_limite_taller"
                                    name="largo"
                                    label="Fecha límite taller"
                                    value={ pedido.fecha_limite_taller || ' '}
                                    size={'small'}
                                    inputProps={{
                                        readOnly: true,
                                        sx: {
                                            fontSize: 14,
                                            px: 1, 
                                            py: 0.75
                                        }
                                    }}
                                /> 
                                
                                <List dense>
                                    <ListItemButton onClick={toggleShowMuebles}>
                                        <Typography>Muebles del mismo pedido</Typography>
                                        {showMuebles ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={showMuebles}>
                                        {
                                            otrosMuebles.map(mueble => {
                                                return <ListItem  key={mueble.id} disablePadding sx={{pl: 2}}>
                                                            <ListItemButton onClick={() => setItem(mueble)}>
                                                                <ListItemText primary={`${mueble.modelo} ${mueble.linea} - ${mueble.largo} x ${mueble.alto_total} x ${mueble.profundidad} - ${mueble.estado.nombre}`}/>
                                                            </ListItemButton>
                                                        </ListItem>
                                            })
                                        }
                                    </Collapse>
                                    
                                </List>
                                    
                                <Button>Ver pedido completo</Button>


                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <hr/>
   
                    <Accordion defaultExpanded={true} 
                    disableGutters elevation={0} 
                    sx={{p:0, mx: 0}}
                    >
                        <AccordionSummary
                        sx={{m:0}}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                        >
                            <Typography>Datos del mueble</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                id="nombre_mueble"
                                name="nombre_mueble"
                                label="Mueble"
                                value={`${itemCopy.modelo || ' '} - ${itemCopy.linea || ' '}`}
                                onDoubleClick={() => setOpenDialog(true)}
                                onBlur={(e) => disableEdit(e)}
                                size={'small'}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                }}
                            />
                            <Dialog disableEscapeKeyDown open={openDialog} >
                                <DialogMultipleValueChange setOpenDialog={setOpenDialog} itemCopy={itemCopy} isEditable={isEditable} enableEdit={enableEdit} disableEdit={disableEdit} handleValueChange={handleValueChange}/>
                            </Dialog>
                            


                            <TextField
                                id="id_estado"
                                name="id_estado"
                                label="Estado"
                                select
                                value={itemCopy.id_estado || ''}
                                onDoubleClick={(e) => enableEdit(e, e.target.id)}
                                onBlur={(e) => disableEdit(e)}
                                onChange={(e) => handleValueChange(e, e.target.name)}
                                size={'small'}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                }}
                            >
                                <MenuItem value='' disabled>Estado</MenuItem>
                                {estados.map(elem => <MenuItem key={elem.id} value={elem.id}>{elem.nombre}</MenuItem>)}
                            </TextField>

                            <Box>
                                <TextField
                                    id="largo"
                                    name="largo"
                                    label="Largo"
                                    value={itemCopy.largo || ' '}
                                    onDoubleClick={(e) => enableEdit(e, e.target.name)}
                                    onBlur={(e) => disableEdit(e)}
                                    size={'small'}
                                    onChange={(e) => handleValueChange(e, e.target.name)}
                                    inputProps={{
                                        readOnly: !isEditable,
                                        "data-type": 'number',
                                        sx: {
                                            fontSize: 14,
                                            px: 1, 
                                            py: 0.75
                                        }
                                    
                                    }}
                                />    
                                <TextField
                                    id="alto_total"
                                    name="alto_total"
                                    label="Alto"
                                    value={itemCopy.alto_total || ' '}
                                    onDoubleClick={(e) => enableEdit(e, e.target.name)}
                                    onBlur={(e) => disableEdit(e)}
                                    onChange={(e)=> handleValueChange(e)}                                    
                                    size={'small'}
                                    inputProps={{
                                        readOnly: !isEditable,
                                        "data-type": 'number',
                                        sx: {
                                            fontSize: 14,
                                            px: 1, 
                                            py: 0.75
                                        }
                                    
                                    }}
                                />                
                                <TextField
                                    id="profundidad"
                                    name="profundidad"
                                    label="Profundidad"
                                    value={itemCopy.profundidad || ' '}
                                    onDoubleClick={(e) => enableEdit(e, e.target.name)}
                                    onBlur={(e) => disableEdit(e)}
                                    onChange={(e)=> handleValueChange(e)}                                    
                                    size={'small'}
                                    inputProps={{
                                        readOnly: !isEditable,
                                        "data-type": 'number',
                                        sx: {
                                            fontSize: 14,
                                            px: 1, 
                                            py: 0.75
                                        }
                                    
                                    }}
                                />                
                            </Box>

                            <TextField
                                id="terminacion"
                                name="terminacion"
                                label="Terminación"
                                value={itemCopy.terminacion || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="color"
                                name="color"
                                label="Color"
                                value={itemCopy.color || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                                <TextField
                                id="terminacion_frentes"
                                name="terminacion_frentes"
                                label="Terminación de frentes"
                                value={itemCopy.terminacion_frentes || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="n_puertas"
                                name="n_puertas"
                                label="Cantidad puertas"
                                value={itemCopy.n_puertas || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    "data-type": 'number',
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="n_cajones"
                                name="n_cajones"
                                label="Cantidad cajones"
                                value={itemCopy.n_cajones || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    "data-type": 'number',
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="interior_cajones"
                                name="interior_cajones"
                                label="Interior cajones"
                                value={`${itemCopy.interior_cajones || ' '}`}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="n_cajones_internos"
                                name="n_cajones_internos"
                                label="Cantiad cajones internos"
                                value={itemCopy.n_cajones_internos || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    "data-type": 'number',
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="patas_altura"
                                name="patas_altura"
                                label="Altura patas"
                                value={itemCopy.patas_altura || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    "data-type": 'number',
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    

                            <TextField
                                id="patas_modelo"
                                name="patas_modelo"
                                label="Modelo patas"
                                value={itemCopy.patas_modelo || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="patas_color"
                                name="patas_color"
                                label="Color patas"
                                value={itemCopy.patas_color || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                }}
                            />    
                            <TextField
                                id="notas"
                                name="notas"
                                label="Notas"
                                value={itemCopy.notas || ' '}
                                multiline
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                InputProps={{
                                    sx: {
                                        fontSize: 14,
                                        px: 0, 
                                        py: 0
                                    } 
                                }}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    } 
                                }}
                            />    
                            <TextField
                                id="cantidad"
                                name="cantidad"
                                label="Cantidad"
                                value={itemCopy.cantidad || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={(e) => disableEdit(e, 'id_estado')}
                                size={'small'}
                                onChange={(e)=> handleValueChange(e, e.target.id)}
                                inputProps={{
                                    readOnly: !isEditable,
                                    "data-type": 'number',
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                                }}
                            />    
                            <TextField
                                id="estandar"
                                name="estandar"
                                label="Estandar"
                                select
                                value={JSON.stringify(itemCopy.estandar) || ' ' }
                                onDoubleClick={(e) => enableEdit(e, e.target.name)}
                                onBlur={(e) => disableEdit(e)}
                                onChange={(e) => handleValueChange(e, e.target.name)}
                                size={'small'}
                                inputProps={{
                                    readOnly: !isEditable,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                }}
                            >
                                <MenuItem value=' ' disabled>Estandar</MenuItem>
                                <MenuItem value='true'>Si</MenuItem>
                                <MenuItem value='false'>No</MenuItem>
                            </TextField> 


                        </AccordionDetails>
                    </Accordion>

                    <hr/>

                    <Accordion defaultExpanded={false} disableGutters elevation={0} sx={{p:0, mx: 0}}>
                        <AccordionSummary
                        sx={{m:0}}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                        >
                            <Typography>Insumos</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{
                                display: 'flex',
                                flexDirection: {xs: 'column', md: 'row-reverse'},
                                justifyContent: {md: 'space-between'}

                            }}
                        >
                            <Box>
                                <Button>Agregar insumo</Button>
                            </Box>
                            <Stack>
                                {/* cambiar input a Input */}
                                {itemCopy.insumos.map(elem => { 
                                    console.log('#insumo => ', elem.id_insumo, elem.cantidad)
                                    return <Box key={elem.id} sx={{display: 'inline-flex', border: 1}}>
                                            <Input value={elem.cantidad} inputProps={{size: 3}}/>
                                            <Input value={elem.insumo.nombre}/> 
                                        </Box> 
                                })}                                
                            </Stack>

            
                        </AccordionDetails>
                    </Accordion>

                    <hr/>

                    <Accordion defaultExpanded={false} disableGutters elevation={0} sx={{p:0, mx: 0}}>
                        <AccordionSummary
                        sx={{m:0}}
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel5a-content"
                        id="panel5a-header"
                        >
                            <Typography>Histórico de estados</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {itemCopy.estadosHistorico.map((elem, index) => 
                                <Box key={elem.id} sx={{display:'flex', alignItems: 'center'}}>
                                    <TextField
                                        id={`estado_${index+1}`}
                                        label={formatDateString(elem.fecha)}
                                        value={elem.estado.nombre || ' '} 
                                        size={'small'}
                                        inputProps={
                                            {readOnly: true,                                   
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }}
                                        }
                                    />
                                    <RemoveCircleTwoToneIcon/>
                                </Box>
                            )} 
                        </AccordionDetails>
                    </Accordion>
                      
                </Stack>
            </Box>
        </Box>


    );



}

export { ItemDetails }