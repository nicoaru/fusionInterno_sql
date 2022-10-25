import React, {useState, useEffect} from "react";
import './pedidosListContainer.css'
import {Layout} from '../../components/layout/layout'
import { PedidosList } from "../../components/pedidosList/pedidosList"
import { DataConsumer } from '../../context/DataProvider.jsx'

function PedidosListContainer() {


    const {muebles, estados} = DataConsumer()

    return(
        <Layout>

            {/* <PedidosList loading={loading} muebles={items} error={error} estados={estados}/> */}
            <PedidosList muebles={muebles} estados={estados}/>

        </Layout>

    )
}

export { PedidosListContainer }