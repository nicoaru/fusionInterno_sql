const { MueblesProd, EstadosXMueble } = require("../daos/daos.js")
const { Router } = require("express")
const routerMueblesProd = Router()

//
// devuelve todos los muebles si no se pasan query, o filtrados por querys si se le pasan
routerMueblesProd.get("/", (req, res) => {
    const queryObject = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}
    const findParams = {... queryObject, ...customResult}

    console.log('findParams api/muebles => ', findParams)

    MueblesProd.readMuebles(req, res, findParams)        
})
//
// devuelve un mueble por id
routerMueblesProd.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const queryObject = {where: {id: id}}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}

    const findParams = {...queryObject, ...customResult}

    console.log('findParams api/muebles/:id => ', findParams)

    MueblesProd.readMuebleById(req, res, findParams)
})
//
// elimina un mueble por id // devuelve el registro eliminado en formato objeto
routerMueblesProd.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    MueblesProd.deleteMuebleById(req, res, id)
})
//
// elimina los muebles que coinciden con la query // devuelve un count con la cantidad de eliminados 
routerMueblesProd.delete("/", (req, res) => {
    const deleteParams = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    MueblesProd.deleteMuebles(req, res, deleteParams)
})
//
// crea un mueble nuevo y devuelve el registro creado en formato objeto, o crea varios muebles nuevos y devuelve una lista de objetos confirmando o rechazando cada operacion
routerMueblesProd.post("/", (req, res) => {
    console.log("req.body => ", req.body)

    const data = req.body.data
        ? req.body.data
        : {}
    const customResult = req.body.customResult
        ? req.body.customResult
        : {}
    const createParams = {data: data, ...customResult}

    if(Array.isArray(createParams.data)) {
        console.log("Entró en 'Crear varios muebles")
        MueblesProd.createMuebles(req, res, createParams)
    }
    else if(Object.keys(createParams.data).length > 0) {
        console.log("Entró en 'Crear un mueble")
        MueblesProd.createMueble(req, res, createParams)
    }
    else {
        console.log("Entró en POST api/muebles sin contenido para crear nuevo mueble")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})

//
// actualiza mueble por Id modificando los campos pasados en 'updatedFields'
routerMueblesProd.patch("/:id", (req, res) => {
    console.log("req.body ", req.body)
    const _updatedFields = req.body
    const _includeOptions = {
        pedido: {
            include: {cliente: true}
        },
        estado: true,
        estadosHistorico: {
            include: {estado: true}
        },
        insumos: {
            include: {insumo: true}
        }
    }
    const id = Number(req.params.id)
    console.log("updatedFields => ", _updatedFields)
    MueblesProd.updateMueble(req, res, id, _updatedFields, _includeOptions)
})

//
routerMueblesProd.get('/:id/estados', (req, res) => {
    const id_mueble = Number(req.params.id)
    const queryObject = {where: {id_mueble: id_mueble}}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}

    const findParams = {...queryObject, ...customResult}

    console.log('findParams api/muebles/:id/estados => ', findParams)

    EstadosXMueble.readEstadosXMueble(req, res, findParams)
})

//
routerMueblesProd.post('/:id/estados', (req, res) => {
    console.log("req.body => ", req.body)

    const data = req.body.data
        ? req.body.data
        : {}
    const customResult = req.body.customResult
        ? req.body.customResult
        : {}
    const createParams = {data: data, ...customResult}

    if(Array.isArray(createParams.data)) {
        console.log("Entró en 'Crear varios muebles")
        EstadosXMueble.createEstadosXMueble(req, res, createParams)
    }
    else if(Object.keys(createParams.data).length > 0) {
        console.log("Entró en 'Crear un mueble")
        EstadosXMueble.createEstadoXMueble(req, res, createParams)
    }
    else {
        console.log("Entró en POST api/muebles sin contenido para crear nuevo mueble")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})

//
// elimina un mueble por id // devuelve el registro eliminado en formato objeto
routerMueblesProd.delete("/:id/estados/:idEstadoXMueble", (req, res) => {
    //- agregar validación que el estado corresponda a ese mueble -> cambiar DAO
    const id_mueble = Number(req.params.id)
    const id_estadoXMueble = Number(req.params.idEstadoXMueble)

    EstadosXMueble.deleteEstadoXMuebleById(req, res, id_estadoXMueble)
})

//


module.exports = {routerMueblesProd}