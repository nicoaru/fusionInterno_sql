const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class InsumosXMuebleDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readInsumosXMueble(req, res, queryObject) {
    console.log("query dao readInsumosXMueble => ", queryObject)
    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readInsumoXMuebleById(req, res, id) {
    try{
      const _resultado = await this.readOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao readInsumoXMuebleById => ", error)
    }
  }

  
  async deleteInsumoXMuebleById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao deleteInsumoXMuebleById => ", error)
    }
  }

  async deleteInsumosXMueble(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao deleteInsumosXMueble => ", error)
    }
  }

  async createInsumoXMueble(req, res, insumoXMueble) {
    try{
      const _resultado = await this.create(insumoXMueble)
      console.log("dao createInsumoXMueble ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createInsumoXMueble => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }

  async createInsumosXMueble(req, res, insumosXMuebleList) {
    console.log("Entro en createInsumosXMueble")
    // console.log("insumosXMuebleList => ", insumosXMuebleList)
    let _resultados = []

    try{
      for(let _insumosXMueble of insumosXMuebleList) {
        try{
          // console.log("insumosXMueble iterando => ", _insumosXMueble)
          const index = insumosXMuebleList.indexOf(_insumosXMueble)
          const _resultado = await this.create(_insumosXMueble, {id: true})
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
      console.log("Error en Dao createInsumosXMueble => ", error.message)
      res.status(200).json({erro: error.message})
    }
  }



  async updateInsumoXMueble(req, res, id, _updated) {     // hacer manejo de errore si no existe el mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {InsumosXMuebleDaoSqlite}