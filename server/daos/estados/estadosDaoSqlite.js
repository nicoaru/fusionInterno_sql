const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class EstadosDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readEstados(req, res, queryObject) {
    console.log("query dao => ", queryObject)
    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readEstadoById(req, res, id) {
    try{
      const _resultado = await this.readOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao readEstadobyid => ", error)
    }
  }

  
  async deleteEstadoById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Estado by id => ", error)
    }
  }

  async deleteEstados(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Estados by id => ", error)
    }
  }

  async createEstado(req, res, newEstado) {
    try{
      const _resultado = await this.create(newEstado)
      console.log("dao createEstado ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createEstado => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }

  async createEstados(req, res, estadosList) {
    console.log("Entro en createEstados")
    // console.log("estadosList => ", estadosList)
    let _resultados = []

    try{
      for(let _estado of estadosList) {
        try{
          // console.log("estado iterando => ", _estado)
          const index = estadosList.indexOf(_estado)
          const _resultado = await this.create(_estado, {id: true})
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
      console.log("Error en Dao createEstados => ", error.message)
      res.status(200).json({erro: error.message})
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