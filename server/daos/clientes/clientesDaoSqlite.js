const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class ClientesDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readClientes(req, res, queryObject) {
    console.log("query dao => ", queryObject)
    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readClienteById(req, res, id) {
    try{
      const _resultado = await this.readOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao readClientebyid => ", error)
    }
  }

  
  async deleteClienteById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Cliente by id => ", error)
    }
  }

  async deleteClientes(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Clientes by id => ", error)
    }
  }

  async createCliente(req, res, newCliente) {
    try{
      const _resultado = await this.create(newCliente)
      console.log("dao createCliente ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createCliente => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }

  async createClientes(req, res, ClientesList) {
    console.log("Entro en createClientes")
    // console.log("ClientesList => ", ClientesList)
    let _resultados = []

    try{
      for(let _Cliente of ClientesList) {
        try{
          // console.log("cliente iterando => ", _Cliente)
          const index = ClientesList.indexOf(_Cliente)
          const _resultado = await this.create(_Cliente, {id: true})
          _resultados.push({created: true, ..._resultado})
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
      res.status(200).json({erro: error.message})
    }
  }



  async updateCliente(req, res, id, _updated) {     // hacer manejo de errore si no existe el mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  
}

module.exports = {ClientesDaoSqlite}