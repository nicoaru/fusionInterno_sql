const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class EstadosDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

//
  async readEstados(req, res, findParams) {
    console.log("query dao => ", findParams)
    const _resultado = await this.readMany(findParams)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }
//
  async readEstadoById(req, res, findParams) {
    try{
      const _resultado = await this.readOne(findParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao readEstadoByid => ", error)
    }
  }
//  
  async deleteEstadoById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Estado by id => ", error)
    }
  }
//
  async deleteEstados(req, res, deleteParams) {
    try{
      const _resultado = await this.deleteMany(deleteParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Estados by id => ", error)
    }
  }
//
  async createEstado(req, res, createParams) {
    try{
      const _resultado = await this.create(createParams)
      console.log("dao createEstado ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createEstado => ", error.message)
      res.status(400).json({error: {status: 400, message: error.message}})
    }
  }
//
  async createEstados(req, res, createParams) {
    console.log("Entro en createEstados")

    let _resultados = []

    try{
      for(let _estado of createParams.data) {
        try{
          const index = createParams.data.indexOf(_estado)
          const _resultado = await this.create({...createParams, data: _estado})
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
      console.log("Error en Dao createEstados => ", error.message)
      res.status(400).json({error: {message: error.message, status: 400}})
    }
  }



  async updateEstado(req, res, id, _updated) {     // hacer manejo de errore si no existe el registro
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {EstadosDaoSqlite}