const { MueblesProd, Clientes, Pedidos } = require("../daos/daos.js")
const { createRandomMuebles, createRandomClientes, createRandomPedidos} = require("../faker/faker.js")
const { Router } = require("express")
const routerFaker = Router()


// crea un cliente nuevo // devuelve el cliente creado en formato objeto
routerFaker.post("/muebles/", (req, res) => {
    console.log("Entro en api/faker/muebles/")
    const n = req.query.n
    const fakeMuebles = createRandomMuebles(n)
    MueblesProd.createMuebles(req, res, fakeMuebles)
})

routerFaker.post("/clientes/", (req, res) => {
    console.log("Entro en api/faker/clientes/")
    const n = req.query.n
    const fakeClientes = createRandomClientes(n)
    Clientes.createClientes(req, res, fakeClientes)
})

routerFaker.post("/pedidos/", (req, res) => {
    console.log("Entro en api/faker/pedidos/")
    const n = req.query.n
    const fakePedidos = createRandomPedidos(n)
    Pedidos.createPedidos(req, res, fakePedidos)
})

module.exports = {routerFaker}