const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class PedidosDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  //
  async readPedidos(req, res, findParams) {
    const resultado = await this.readMany(findParams)
    // console.log("resultado => ", _resultado)
    res.json(resultado)
  }
//
  async readPedidoById(req, res, findParams) {
    try{
      const _resultado = await this.readOne(findParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao Pedido by id => ", error)
    }
  }
//
  async deletePedidoById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne(id)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Pedido by id => ", error)
    }
  }
//
  async deletePedidos(req, res, deleteParams) {
    try{
      const _resultado = await this.deleteMany(deleteParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Pedido by id => ", error)
    }
  }
//
  async createPedido(req, res, createParams) {
    try{
      const _resultado = await this.create(createParams)
      console.log("dao createPedido ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createPedido => ", error.message)
      res.status(400).json({error: {status: 400, message: error.message}})
    }
  }
//
  async createPedidos(req, res, createParams) {
    console.log("Entro en createPedidos")
    // console.log("PedidosList => ", PedidosList)
    let _resultados = []
    try{
      for(let _pedido of createParams.data) {
        try{
          // console.log("Pedido iterando => ", _pedido)
          const index = createParams.data.indexOf(_pedido)
          const _resultado = await this.create({...createParams, data: _pedido})
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
      console.log("Error en Dao createPedidos => ", error.message)
      res.status(400).json({error: {message: error.message, status: 400}})
    }
  }



  async updatePedido(req, res, id, _updated) {     // hacer manejo de error si no existe el Pedido
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {PedidosDaoSqlite}