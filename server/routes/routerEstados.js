const { Estados } = require("../daos/daos.js")
const { Router } = require("express")
const routerEstados = Router()


// devuelve todos los muebles si no se pasan query
// o filtrados por querys si se le pasan
routerEstados.get("/", (req, res) => {
    let query = req.query.queryObject 
        ? JSON.parse(req.query.queryObject)
        : {}
    const _queryObject = {where: query}
    Estados.readEstados(req, res, _queryObject)        
})

// devuelve un mueble por id
routerEstados.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const _queryObject = {
        where: {id: id},
        include: {
            pedido: {
                include: {cliente: true}
            },
            estado: true,
            estadosHistorico: {
                include: {estado: true}
            }
        }
    }

    Estados.readMuebleById(req, res, _queryObject)
})

// elimina un mueble por id // devuelve el registro eliminado en formato objeto
routerEstados.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    Estados.deleteMuebleById(req, res, id)
})

// elimina los muebles que coinciden con la query // devuelve un count con la cantidad de eliminados 
routerEstados.delete("/", (req, res) => {
    console.log("query => ", req.query)
    const queryObject = JSON.parse(req.query.queryObject)
    Estados.deleteMuebles(req, res, queryObject)
})


// crea un mueble nuevo y devuelve el registro creado en formato objeto
// o crea varios muebles nuevos y devuelve una lista de objetos confirmando o rechazando cada operacion
routerEstados.post("/", (req, res) => {
    console.log("req.body => ", req.body)

    if(Array.isArray(req.body)) {
        console.log("Entró en 'Crear varios muebles")
        Estados.createMuebles(req, res, req.body)
    }
    else if(Object.keys(req.body).length > 0) {
        console.log("Entró en 'Crear un mueble")
        Estados.createMueble(req, res, req.body)
    }
    else {
        console.log("Entró en POST api/muebles sin contenido para crear nuevo mueble")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})

// actualiza mueble por Id modificando los campos pasados en 'updatedFields'
routerEstados.patch("/:id", (req, res) => {
    const updatedFields = req.body
    const id = Number(req.params.id)
    console.log("updatedFields => ", updatedFields)
    Estados.updateMueble(req, res, id, updatedFields)
})




module.exports = {routerEstados}