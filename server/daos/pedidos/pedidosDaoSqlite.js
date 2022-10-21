const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class PedidosDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readPedidos(req, res, queryObject) {
    console.log("query dao readPedidos=> ", queryObject)
    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readPedidoById(req, res, id) {
    try{
      const _resultado = await this.readOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao pedido by id => ", error)
    }
  }

  
  async deletePedidoById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete pedido by id => ", error)
    }
  }

  async deletePedidos(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete pedido by id => ", error)
    }
  }

  async createPedido(req, res, newPedido) {
    try{
      const _resultado = await this.create(newPedido)
      console.log("dao createPedido ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createPedido => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }

  async createPedidos(req, res, pedidosList) {
    console.log("Entro en createPedidos")
    // console.log("pedidosList => ", pedidosList)
    let _resultados = []

    try{
      for(let _pedido of pedidosList) {
        try{
          // console.log("pedido iterando => ", _pedido)
          const index = pedidosList.indexOf(_pedido)
          const _resultado = await this.create(_pedido, {id: true})
          _resultados.push({objeto: index+1, created: true, ..._resultado})
        }
        catch(error){
          console.log("Error en createPedidos => ", error.message)
          _resultados.push({created: false, message: error.message})
        }
      }
    res.status(200).json({_resultados})
    }
    catch(error){
      console.log("Error en Dao createPedidos => ", error.message)
      res.status(400).json({error: error.message})
    }
  }



  async updatePedido(req, res, id, _updated) {     // hacer manejo de error si no existe el mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {PedidosDaoSqlite}