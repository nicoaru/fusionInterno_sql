const { Insumos } = require("../daos/daos.js")
const { Router } = require("express")
const routerInsumos = Router()


// devuelve todos los Insumos si no se pasan query
// o filtrados por querys si se le pasan
routerInsumos.get("/", (req, res) => {
    let query = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    
        const _queryObject = {
            where: query,
        }
    
    // console.log("queryObject => ", queryObject)
    Insumos.readInsumos(req, res, _queryObject)        
})

// devuelve un Insumo por id
routerInsumos.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const _queryObject = {
        where: {id: id}
    }

    Insumos.readInsumoById(req, res, _queryObject)
})

// elimina un Insumo por id // devuelve el registro eliminado en formato objeto
routerInsumos.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    Insumos.deleteInsumoById(req, res, id)
})

// elimina los Insumos que coinciden con la query // devuelve un count con la cantidad de eliminados 
routerInsumos.delete("/", (req, res) => {
    console.log("query => ", req.query)
    const queryObject = JSON.parse(req.query.queryObject)
    Insumos.deleteInsumos(req, res, queryObject)
})


// crea un Insumo nuevo y devuelve el registro creado en formato objeto
// o crea varios Insumos nuevos y devuelve una lista de objetos confirmando o rechazando cada operacion
routerInsumos.post("/", (req, res) => {
    console.log("req.body => ", req.body)

    if(Array.isArray(req.body)) {
        console.log("Entró en 'Crear varios Insumos")
        Insumos.createInsumos(req, res, req.body)
    }
    else if(Object.keys(req.body).length > 0) {
        console.log("Entró en 'Crear un Insumo")
        Insumos.createInsumo(req, res, req.body)
    }
    else {
        console.log("Entró en POST api/Insumos sin contenido para crear nuevo Insumo")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})

// actualiza Insumo por Id modificando los campos pasados en 'updatedFields'
routerInsumos.patch("/:id", (req, res) => {
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
    Insumos.updateInsumo(req, res, id, _updatedFields, _includeOptions)
})




module.exports = {routerInsumos}