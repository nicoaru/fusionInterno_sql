import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from './pages/home/home';
import {CargaPedidosContainer} from './pages/cargaPedidosContainer/cargaPedidosContainer';
import {PageNotFound} from './pages/pageNotFound/pageNotFound'
import { GenerarDespieceContainer } from './pages/generarDespieceContainer/generarDespieceContainer';
import { PedidosListContainer } from './pages/pedidosListContainer/pedidosListContainer'
// import { FalladoGenerarDespieceContainer } from './pages/FALLADOgenerarDespieceContainer/FALLADOgenerarDespieceContainer';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/carga-pedido" element={<CargaPedidosContainer/>}/>
        <Route path="/generar-despiece" element={<GenerarDespieceContainer/>}/>
        <Route path="/pedidos" element={<PedidosListContainer/>}/>
        <Route path="*" element={<PageNotFound/>}/>
        {/* <Route path="fallado-generar-despiece" element={<FalladoGenerarDespieceContainer/>}/> */}
      </Routes>
    </BrowserRouter>

    
  );
}

export default Router;
