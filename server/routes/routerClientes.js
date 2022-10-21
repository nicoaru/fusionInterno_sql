const { Clientes} = require("../daos/daos.js")
const { Router } = require("express")
const routerClientes = Router()



// devuelve todos los Clientes si no se pasan query
// o filtrados por querys si se le pasan
routerClientes.get("/", (req, res) => {
    let queryObject
    req.query.queryObject 
        ? queryObject = JSON.parse(req.query.queryObject)
        : queryObject = {}
    // console.log("queryObject => ", queryObject)
    Clientes.readClientes(req, res, queryObject)        
})

// devuelve un Cliente por id
routerClientes.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    Clientes.readClienteById(req, res, id)
})

// elimina un Cliente por id // devuelve el registro eliminado en formato objeto
routerClientes.delete("/:id", (req, res) => {
    const id = Number(req.params.id)
    Clientes.deleteClienteById(req, res, id)
})

// elimina los Clientes que coinciden con la query // devuelve un count con la cantidad de eliminados 
routerClientes.delete("/", (req, res) => {
    console.log("query => ", req.query)
    const queryObject = JSON.parse(req.query.queryObject)
    Clientes.deleteClientes(req, res, queryObject)
})


// crea un Cliente nuevo y devuelve el registro creado en formato objeto
// o crea varios Clientes nuevos y devuelve una lista de objetos confirmando o rechazando cada operacion
routerClientes.post("/", (req, res) => {
    console.log("req.body => ", req.body)

    if(Array.isArray(req.body)) {
        console.log("Entró en 'Crear varios Clientes")
        Clientes.createClientes(req, res, req.body)
    }
    else if(Object.keys(req.body).length > 0) {
        console.log("Entró en 'Crear un Cliente")
        Clientes.createCliente(req, res, req.body)
    }
    else {
        console.log("Entró en POST api/Clientes sin contenido para crear nuevo Cliente")
        res.status(400).json({message: 'No se recibio objeto para crear nuevo registro en DB'})
    }
})

// actualiza Cliente por Id modificando los campos pasados en 'updatedFields'
routerClientes.patch("/:id", (req, res) => {
    const updatedFields = req.body
    const id = Number(req.params.id)
    console.log("updatedFields => ", updatedFields)
    Clientes.updateCliente(req, res, id, updatedFields)
})







module.exports = {routerClientes}