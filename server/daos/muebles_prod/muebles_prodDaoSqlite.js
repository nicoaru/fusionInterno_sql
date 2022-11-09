const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class MueblesProdDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

//
  async readMuebles(req, res, findParams) {
    const resultado = await this.readMany(findParams)
    // console.log("resultado => ", _resultado)
    res.json(resultado)
  }
//
  async readMuebleById(req, res, findParams) {
    try{
      const _resultado = await this.readOne(findParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao mueble by id => ", error)
    }
  }
//
  async deleteMuebleById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne(id)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete mueble by id => ", error)
    }
  }
//
  async deleteMuebles(req, res, deleteParams) {
    try{
      const _resultado = await this.deleteMany(deleteParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete mueble by id => ", error)
    }
  }
//
  async createMueble(req, res, createParams) {
    try{
      const _resultado = await this.create(createParams)
      console.log("dao createMueble ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createMueble => ", error.message)
      res.status(400).json({error: {status: 400, message: error.message}})
    }
  }
//
  async createMuebles(req, res, createParams) {
    console.log("Entro en createMuebles")
    // console.log("mueblesList => ", mueblesList)
    let _resultados = []
    try{
      for(let _mueble of createParams.data) {
        try{
          // console.log("mueble iterando => ", _mueble)
          const index = createParams.data.indexOf(_mueble)
          const _resultado = await this.create({...createParams, data: _mueble})
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
      console.log("Error en Dao createMuebles => ", error.message)
      res.status(400).json({error: {message: error.message, status: 400}})
    }
  }



  async updateMueble(req, res, id, _updated, _includeOptions) {     // hacer manejo de errore si no existe el mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    console.log("_include => ", _includeOptions)
    const _resultado = await this.updateOne({id}, _updated, _includeOptions)
    res.status(200).json(_resultado)
  }
  

}

module.exports = {MueblesProdDaoSqlite}