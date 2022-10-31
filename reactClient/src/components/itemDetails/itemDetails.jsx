import React, {useState, useEffect} from "react";
import { Button, Typography, TextField, Box, Stack, Accordion, AccordionSummary, AccordionDetails, Input, List, ListItem, ListItemButton, ListItemText, Collapse  } from "@mui/material";
import { ConnectingAirportsOutlined, ExpandLess, ExpandMore } from "@mui/icons-material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {dateFromString, stringFromDate, formatDateString} from '../../utils/utils.js'
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





function ItemDetails({item, mueblesList, pedidos, setItem, handleClose}) {
    
    console.log('item =>', item)
    console.log('pedidos => ', pedidos)

    useEffect(() => {
        setItemCopy({...item})
    }, [item])

    const [itemCopy, setItemCopy] = useState({ ...item})
    console.log('itemCopy =>', itemCopy)

    const pedido = pedidos.find(elem => elem.id === item.id_pedido)
    console.log('pedido ', pedido)

    const otrosMuebles = pedido.muebles_prod.map(elem => mueblesList.find(mueble => mueble.id === elem.id)).filter(elem => elem !== item)
    console.log('otrosMuebles', otrosMuebles)
    

    const changeItemToShow = (itemCopy) => {

    }



    // useStates
    const [showMuebles, setShowMuebles] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    
    // handler
    const enableEdit = () => {
        setIsEditable(true)
    }
    const disableEdit = () => {
        setIsEditable(false)
    }
    const handleShowMuebles = () => {
        setShowMuebles(!showMuebles)
    }
    const handlevalueChange = (event, modifiedField) => {

        const _itemCopy = {...itemCopy, [modifiedField]: event.target.value}
        console.log('_itemCopy => ', _itemCopy)
        setItemCopy(_itemCopy)
        setTimeout(() => console.log('item => ', item), 7000)
    };

    


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
                                    label="Cliente"
                                    value={`${itemCopy.pedido.cliente.nombre || ' '} ${itemCopy.pedido.cliente.apellido || ' '}`}
                                    size={'small'}
                                    margin={'dense'}
                                    inputProps={
                                        {readOnly: true,
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
                                    label="Dirección de entrega"
                                    value={`${itemCopy.pedido.direccion_entrega || ' '}`}
                                    size={'small'}
                                    margin={'dense'}
                                    inputProps={
                                        {readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }
                                />                                
                                <TextField
                                    id="fechaEntrada"
                                    label="Fecha de entrada"
                                    value={formatDateString(pedido.fecha_entrada || ' ')}
                                    size={'small'}
                                    inputProps={
                                        {readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }
                                />
                                <TextField
                                    id="fechaEntrega"
                                    label="Fecha de entrega"
                                    value={formatDateString(pedido.fecha_entrega) || ' '}
                                    size={'small'}
                                    inputProps={
                                        {readOnly: true,
                                            sx: {
                                                fontSize: 14,
                                                px: 1, 
                                                py: 0.75
                                            }
                                        }
                                    }
                                />
                                <TextField
                                    id="fechaLimiteTaller"
                                    label="Fecha límite taller"
                                    value={ pedido.fechaLimiteTaller || ' '}
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
                                    <ListItemButton onClick={handleShowMuebles}>
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
                                id="nombreMueble"
                                label="Mueble"
                                value={`${itemCopy.modelo || ' '} - ${itemCopy.linea || ' '}`}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
            
                            <TextField
                                id="estado"
                                label="Estado"
                                value={itemCopy.estado.nombre || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
                                size={'small'}
                                inputProps={{
                                    readOnly: !isEditable,
                                    ['data-estado']: `${itemCopy.estado.id}`,
                                    sx: {
                                        fontSize: 14,
                                        px: 1, 
                                        py: 0.75
                                    }
                                
                            }}
                                
                            />    
                            <TextField
                                id="largo"
                                label="Largo"
                                value={itemCopy.largo || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
                                size={'small'}
                                onChange={(e)=> handlevalueChange(e, 'largo')}
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
                                id="alto_total"
                                label="Alto"
                                value={itemCopy.alto_total || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="profundidad"
                                label="Profundidad"
                                value={itemCopy.profundidad || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="terminacion"
                                label="Terminación"
                                value={itemCopy.terminacion || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="color"
                                label="Color"
                                value={itemCopy.color || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                                <TextField
                                id="terminacion_frentes"
                                label="Terminación de frentes"
                                value={itemCopy.terminacion_frentes || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="n_puertas"
                                label="Cantidad puertas"
                                value={itemCopy.n_puertas || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="n_cajones"
                                label="Cantidad cajones"
                                value={itemCopy.n_cajones || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="interior_cajones"
                                label="Interior cajones"
                                value={`${itemCopy.interior_cajones || ' '}`}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="n_cajones_internos"
                                label="Cantiad cajones internos"
                                value={itemCopy.n_cajones_internos || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="patas_altura"
                                label="Altura patas"
                                value={itemCopy.patas_altura || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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

                            <TextField
                                id="patas_modelo"
                                label="Modelo patas"
                                value={itemCopy.patas_modelo || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="patas_color"
                                label="Color patas"
                                value={itemCopy.patas_color || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="notas"
                                label="Notas"
                                value={itemCopy.notas || ' '}
                                multiline
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
                                size={'small'}
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
                                label="Cantidad"
                                value={itemCopy.cantidad || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <TextField
                                id="estandar"
                                label="Estandar"
                                value={itemCopy.estandar || ' '}
                                onDoubleClick={enableEdit}
                                onBlur={disableEdit}
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
                            <Box>
                                {itemCopy.insumos.map(elem => { 
                                    console.log('#insumo => ', elem.id_insumo, elem.cantidad)
                                    return <div key={elem.id}>
                                            <input value={elem.insumo.nombre}/> 
                                            <input value={elem.cantidad}/>
                                        </div> 
                                })}                                
                            </Box>

            
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
                                <div key={elem.id}>
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
                                </div>
                            )} 
                        </AccordionDetails>
                    </Accordion>
                      
                </Stack>
            </Box>
        </Box>


    );



}

export { ItemDetails }