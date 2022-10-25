import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext();

export const DataConsumer = () => useContext(DataContext);

const DataProvider = ({ children }) => {

const [muebles, setMuebles] = useState([])
const [estados, setEstados] = useState([])
const [pedidos, setPedidos] = useState([])
const [clientes, setClientes] = useState([])
const [insumos, setInsumos] = useState([])
const [insumosXmueble, setInsumosXmueble] = useState([])
const [estadosXmueble, setEstadosXmueble] = useState([])


// get muebles
const getMuebles = async () => {
    fetch('/api/muebles', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setMuebles(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setMuebles(_error)
        }
    })
    .catch(error => {
        const _error = {error: {status: 500, message: error.message}}
        setMuebles(_error)
    })        
}

// get estados
const getEstados = async () => {
    fetch('/api/estados', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _estados = await response.json()
            setEstados(_estados)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setEstados(_error)
        }
    })
    .catch(error => {
        const _error = {error: {status: 500, message: error.message}}
        setEstados(_error)
    })
}


useEffect(() => {   
    getMuebles()
    getEstados()
}, [])





    return (
        <DataContext.Provider value={{ estados, muebles, getMuebles, getEstados }}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider}