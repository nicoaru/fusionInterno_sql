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
        const _error = {error: {message: error.message}}
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
        const _error = {error: {message: error.message}}
        setEstados(_error)
    })
}

// get pedidos
const getPedidos = async () => {
    fetch('/api/pedidos', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setPedidos(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setPedidos(_error)
        }
    })
    .catch(error => {
        const _error = {error: {message: error.message}}
        setMuebles(_error)
    })        
}

// get clientes
const getClientes = async () => {
    fetch('/api/clientes', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setClientes(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setClientes(_error)
        }
    })
    .catch(error => {
        const _error = {error: {message: error.message}}
        setClientes(_error)
    })        
}

// get insumos
const getInsumos = async () => {
    fetch('/api/insumos', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setInsumos(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setInsumos(_error)
        }
    })
    .catch(error => {
        const _error = {error: {message: error.message}}
        setInsumos(_error)
    })        
}

// get insumosXmueble
const getInsumosXmueble = async () => {
    fetch('/api/insumosXmueble', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setInsumosXmueble(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setInsumosXmueble(_error)
        }
    })
    .catch(error => {
        const _error = {error: {message: error.message}}
        setInsumosXmueble(_error)
    })        
}

// get estadosXmueble
const getEstadosXmueble = async () => {
    fetch('/api/estadosXmueble', {method:'GET'})
    .then(async response => {
        if(response.ok) {
            const _muebles = await response.json()
            setEstadosXmueble(_muebles)
        }
        else {
            const _error = {error: {status: response.status, message: response.statusText}}
            setEstadosXmueble(_error)
        }
    })
    .catch(error => {
        const _error = {error: {message: error.message}}
        setEstadosXmueble(_error)
    })        
}


useEffect(() => {   
    getMuebles()
    getEstados()
    getPedidos()
    getClientes()
    getInsumos()
}, [])

console.log('muebles', muebles)
console.log('estados', estados)
console.log('pedidos', pedidos)
console.log('clientes', clientes)
console.log('insumos', insumos)



    return (
        <DataContext.Provider value={{ estados, muebles, pedidos, clientes, insumos, insumosXmueble, estadosXmueble, getMuebles, getEstados, getPedidos, getClientes, getInsumos, getInsumosXmueble, getEstadosXmueble }}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider}