const { Estados } = require("../daos/daos.js")
const { Router } = require("express")
const routerEstados = Router()

//
// devuelve todos los estados si no se pasan query, o filtrados por querys si se le pasan
routerEstados.get("/", (req, res) => {
    const queryObject = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}
    const findParams = {... queryObject, ...customResult}

    console.log('findParams api/muebles => ', findParams)

    Estados.readEstados(req, res, findParams)        
})
//
// devuelve un estado por id
routerEstados.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const queryObject = {where: {id: id}}
    const customResult = req.query.customResult
        ? JSON.parse(req.query.customResult)
        : {}

    const findParams = {...queryObject, ...customResult}

    console.log('findParams api/estados/:id => ', findParams)


    Estados.readEstadoById(req, res, findParams)
})
//
// elimina un estado por id // devuelve el registro eliminado en formato objeto
routerEstados.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    Estados.deleteMuebleById(req, res, id)
})
//
// elimina los estados que coinciden con la query // devuelve un count con la cantidad de eliminados 
routerEstados.delete("/", (req, res) => {
    const deleteParams = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}

    Estados.deleteEstados(req, res, deleteParams)
})
// crea un estado nuevo y devuelve el registro creado en formato objeto, o crea varios estados nuevos y devuelve una lista de objetos confirmando o rechazando cada operacion
routerEstados.post("/", (req, res) => {
    console.log("req.body => ", req.body)

    const data = req.body.data
        ? req.body.data
        : {}
    const customResult = req.body.customResult
        ? req.body.customResult
        : {}
    const createParams = {data: data, ...customResult}

    if(Array.isArray(createParams.data)) {
        console.log("Entró en 'Crear varios estados")
        Estados.createEstados(req, res, createParams)
    }
    else if(Object.keys(createParams.data).length > 0) {
        console.log("Entró en Crear un Estado")
        Estados.createEstado(req, res, createParams)
    }
    else {
        console.log("Entró en POST api/estados sin contenido para crear nuevo estado")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})





// actualiza estado por Id modificando los campos pasados en 'updatedFields'
routerEstados.patch("/:id", (req, res) => {
    const updatedFields = req.body
    const id = Number(req.params.id)
    console.log("updatedFields => ", updatedFields)
    Estados.updateEstado(req, res, id, updatedFields)
})




module.exports = {routerEstados}