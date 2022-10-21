const path = require('path')
const express = require('express')
const {routerFaker} = require('./routes/routerFaker.js')
const {routerClientes} = require('./routes/routerClientes.js')
const {routerPedidos} = require('./routes/routerPedidos.js')
const {routerMueblesProd} = require('./routes/routerMueblesProd.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/clientes", routerClientes)
app.use("/api/faker", routerFaker)
app.use("/api/muebles", routerMueblesProd)
app.use("/api/pedidos", routerPedidos)
// app.use("/api/pedidos", routerPedidos)
// app.use("/api/complementos", routerComplementos)
// app.use(express.static(path.resolve(__dirname, '..', 'reactClient/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'public/index.html'))
})

app.get('/api/message', (req, res) => {
    console.log(`Request entró a /api/message en puerto ${PORT}`)
    const response = {message: 'hola'}
    console.log(response)
    res.send(response)
})


const PORT = process.env.PORT || 3001
const server = app.listen(PORT, ()=>{console.log(`Servidor escuchando en puerto ${server.address().port}`)})