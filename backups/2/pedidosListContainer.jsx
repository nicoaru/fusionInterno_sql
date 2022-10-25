import React, {useState, useEffect} from "react";
import './pedidosListContainer.css'
import {Layout} from '../../components/layout/layout'
import { PedidosList } from "../../components/pedidosList/pedidosList"
import { DataConsumer } from '../../context/DataProvider.jsx'

function PedidosListContainer() {

    // const [loading, setLoading] = useState(false)
    // const [items, setItems] = useState([])
    // const [estados, setEstados] = useState([])
    // const [error, setError] = useState()


    // useEffect(() => {
    //     setLoading(true)
    //     // const getEstados = (itemsList) => {
    //     //     const _estados = []
    //     //      itemsList.forEach(item => {
    //     //         item.estadosHistorico.forEach(estadoHist => {
    //     //             if(!(_estados.some(elem => elem.id === estadoHist.estado.id))) {
    //     //                 _estados.push(estadoHist.estado)
    //     //             }
    //     //         })
    //     //     })
    //     //     console.log("_estados pLC l. 27 => ", _estados)
    //     //     return _estados
    //     // }
    //     const getItems = async() => {
    //         try{
    //             const _queryObject = {
    //                 // id_estado: {notIn: [7]}
    //             }
    //             console.log("queryObject stringifiado => ", JSON.stringify(_queryObject))
    //             const response = await fetch('/api/muebles?'+ new URLSearchParams({queryObject: JSON.stringify(_queryObject)}), {
    //                 method:'GET'
    //             })
    //             if(response.ok){
    //                 const _items = await response.json()
    //                 _items.length > 0 
    //                     ? console.log(`Hay ${_items.length} pedidos en curso`)
    //                     : console.log(`No hay pedidos en curso`)
    //                 setItems(_items)
    //                 console.log("_items => ", _items)
    //             }
    //             else{
    //                 console.log('Respuesta fetch get', response.status, ' ', response.statusText)
    //                 setError(response.statusText)
    //             }
    //         }
    //         catch(error){
    //             console.log('Error fetching data', error.message)
    //             setError(error.message)
    //         }
    //     }

    //     const getEstados = async() => {
    //         try{
    //             const response = await fetch('/api/estados', {
    //                 method:'GET'})

    //             if(response.ok){
    //                 const _estados = await response.json()
    //                 setEstados(_estados)
    //                 console.log("_estados => ", _estados)
    //             }
    //             else{
    //                 console.log('Respuesta fetch get estados', response.status, ' ', response.statusText)
    //                 setError(response.statusText)
    //             }
    //         }
    //         catch(error){
    //             console.log('Error fetching data de Estados', error.message)
    //             setError(error.message)
    //         }
    //     }

    //     getItems()
    //     getEstados()
    //     setLoading(false)
    // }, [])  

    const {muebles, estados} = DataConsumer()

    return(
        <Layout>
            <h1>
                Ver Pedidos
            </h1>
            {/* <PedidosList loading={loading} muebles={items} error={error} estados={estados}/> */}
            <PedidosList muebles={muebles} estados={estados}/>

        </Layout>

    )
}

export { PedidosListContainer }