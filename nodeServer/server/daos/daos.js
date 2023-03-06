const {ClientesDaoSqlite} = require('./clientes/clientesDaoSqlite.js')
const {ComprasInsumosDaoSqlite} = require('./compras_insumos/compras_insumosDaoSqlite.js')
const {EstadosDaoSqlite} = require('./estados/estadosDaoSqlite.js')
const {EstadosXMuebleDaoSqlite} = require('./estados_x_mueble/estados_x_muebleDaoSqlite.js')
const {InsumosDaoSqlite} = require('./insumos/insumosDaoSqlite.js')
const {InsumosXMuebleDaoSqlite} = require('./insumos_x_mueble/insumos_x_muebleDaoSqlite.js')
const {MueblesProdDaoSqlite} = require('./muebles_prod/muebles_prodDaoSqlite.js')
const {PedidosDaoSqlite} = require('./pedidos/pedidosDaoSqlite.js')




const dbType = 'MySql'


let Clientes
let Compras_Insumos
let Estados
let EstadosXMueble
let Insumos
let InsumosXMueble
let MueblesProd
let Pedidos

switch (dbType) {
    case "MySql":
    Clientes = new ClientesDaoSqlite('clientes');
    Compras_Insumos = new ComprasInsumosDaoSqlite('compras_insumos');
    Estados = new EstadosDaoSqlite('estados');
    EstadosXMueble = new EstadosXMuebleDaoSqlite('estados_x_mueble');
    Insumos = new InsumosDaoSqlite('insumos');
    InsumosXMueble = new InsumosXMuebleDaoSqlite('insumos_x_mueble');
    MueblesProd = new MueblesProdDaoSqlite('muebles_prod');
    Pedidos = new PedidosDaoSqlite('pedidos');

    break;

}


module.exports = { 
    Clientes,
    Compras_Insumos,
    Estados,
    EstadosXMueble,
    Insumos,
    InsumosXMueble,
    MueblesProd,
    Pedidos 
}