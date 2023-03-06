const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class InsumosDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readInsumos(req, res, queryObject) {
    console.log("query dao => ", queryObject)
    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readInsumoById(req, res, id) {
    try{
      const _resultado = await this.readOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao readInsumoById => ", error)
    }
  }

  
  async deleteInsumoById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao deleteInsumoById => ", error)
    }
  }

  async deleteInsumos(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Insumos by id => ", error)
    }
  }

  async createInsumo(req, res, newInsumo) {
    try{
      const _resultado = await this.create(newInsumo)
      console.log("dao createInsumo ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createInsumo => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }

  async createInsumos(req, res, insumosList) {
    console.log("Entro en createInsumos")
    // console.log("insumosList => ", insumosList)
    let _resultados = []

    try{
      for(let _insumo of insumosList) {
        try{
          // console.log("insumo iterando => ", _insumo)
          const index = insumosList.indexOf(_insumo)
          const _resultado = await this.create(_insumo, {id: true})
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
      console.log("Error en Dao createInsumos => ", error.message)
      res.status(200).json({erro: error.message})
    }
  }



  async updateInsumo(req, res, id, _updated) {     // hacer manejo de errore si no existe el mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {InsumosDaoSqlite}