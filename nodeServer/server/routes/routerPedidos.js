const { Pedidos } = require("../daos/daos.js")
const { Router } = require("express")
const routerPedidos = Router()


//
// devuelve todos los Pedidos si no se pasan query, o filtrados por querys si se le pasan
routerPedidos.get("/", (req, res) => {
    const queryObject = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}
    const findParams = {... queryObject, ...customResult}

    console.log('findParams api/Pedidos => ', findParams)

    Pedidos.readPedidos(req, res, findParams)        
})
//
// devuelve un Pedido por id
routerPedidos.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const queryObject = {where: {id: id}}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}

    const findParams = {...queryObject, ...customResult}

    console.log('findParams api/Pedidos/:id => ', findParams)

    Pedidos.readPedidoById(req, res, findParams)
})
//
// elimina un Pedido por id // devuelve el registro eliminado en formato objeto
routerPedidos.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    Pedidos.deletePedidoById(req, res, id)
})
//
// elimina los Pedidos que coinciden con la query // devuelve un count con la cantidad de eliminados 
routerPedidos.delete("/", (req, res) => {
    const deleteParams = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    Pedidos.deletePedidos(req, res, deleteParams)
})
//
// crea un Pedido nuevo y devuelve el registro creado en formato objeto, o crea varios Pedidos nuevos y devuelve una lista de objetos confirmando o rechazando cada operacion
routerPedidos.post("/", (req, res) => {
    console.log("req.body => ", req.body)

    const data = req.body.data
        ? req.body.data
        : {}
    const customResult = req.body.customResult
        ? req.body.customResult
        : {}
    const createParams = {data: data, ...customResult}

    if(Array.isArray(createParams.data)) {
        console.log("Entró en 'Crear varios Pedidos")
        Pedidos.createPedidos(req, res, createParams)
    }
    else if(Object.keys(createParams.data).length > 0) {
        console.log("Entró en 'Crear un Pedido")
        Pedidos.createPedido(req, res, createParams)
    }
    else {
        console.log("Entró en POST api/Pedidos sin contenido para crear nuevo Pedido")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})




// actualiza Pedido por Id modificando los campos pasados en 'updatedFields'
routerPedidos.patch("/:id", (req, res) => {
    const updatedFields = req.body
    const id = Number(req.params.id)
    console.log("updatedFields => ", updatedFields)
    Pedidos.updatePedido(req, res, id, updatedFields)
})







module.exports = {routerPedidos}