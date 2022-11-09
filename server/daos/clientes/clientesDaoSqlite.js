const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class ClientesDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

//
async readClientes(req, res, findParams) {
  const resultado = await this.readMany(findParams)
  // console.log("resultado => ", _resultado)
  res.json(resultado)
}
//
async readClienteById(req, res, findParams) {
  try{
    const _resultado = await this.readOne(findParams)
    res.status(200).json(_resultado)
  }
  catch(error){
    console.log("Error dao Cliente by id => ", error)
  }
}
//
async deleteClienteById(req, res, id) {    // manejar el error cuando el registro no existe
  try{
    const _resultado = await this.deleteOne(id)
    res.status(200).json(_resultado)
  }
  catch(error){
    console.log("Error dao delete Cliente by id => ", error)
  }
}
//
async deleteClientes(req, res, deleteParams) {
  try{
    const _resultado = await this.deleteMany(deleteParams)
    res.status(200).json(_resultado)
  }
  catch(error){
    console.log("Error dao delete Cliente by id => ", error)
  }
}
//
async createCliente(req, res, createParams) {
  try{
    const _resultado = await this.create(createParams)
    console.log("dao createCliente ok => ", _resultado)
    res.json(_resultado)
  }
  catch(error){
    console.log("Error en Dao createCliente => ", error.message)
    res.status(400).json({error: {status: 400, message: error.message}})
  }
}
//
async createClientes(req, res, createParams) {
  console.log("Entro en createClientes")
  // console.log("ClientesList => ", ClientesList)
  let _resultados = []
  try{
    for(let _cliente of createParams.data) {
      try{
        // console.log("Cliente iterando => ", _cliente)
        const index = createParams.data.indexOf(_cliente)
        const _resultado = await this.create({...createParams, data: _cliente})
        _resultados.push({created: true, data: _resultado})
      }
      catch(error){
        console.log(error.message)
        _resultados.push({created: false, message: error.message})
      }
    }
  res.status(200).json({_resultados})
  }
  catch(error){
    console.log("Error en Dao createClientes => ", error.message)
    res.status(400).json({error: {message: error.message, status: 400}})
  }
}



  async updateCliente(req, res, id, _updated) {     // hacer manejo de errore si no existe el Cliente
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  
}

module.exports = {ClientesDaoSqlite}