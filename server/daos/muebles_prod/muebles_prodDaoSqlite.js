const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class MueblesProdDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readMuebles(req, res, queryObject) {

    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readMuebleById(req, res, queryObject) {
    try{
      const _resultado = await this.readOne(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao mueble by id => ", error)
    }
  }

  
  async deleteMuebleById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete mueble by id => ", error)
    }
  }


  async deleteMuebles(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete mueble by id => ", error)
    }
  }


  async createMueble(req, res, newMueble) {
    try{
      const _resultado = await this.create(newMueble)
      console.log("dao createCliente ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createMueble => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }


  async createMuebles(req, res, mueblesList) {
    console.log("Entro en createMuebles")
    // console.log("mueblesList => ", mueblesList)
    let _resultados = []
    try{
      for(let _mueble of mueblesList) {
        try{
          // console.log("mueble iterando => ", _mueble)
          const index = mueblesList.indexOf(_mueble)
          const _resultado = await this.create(_mueble, {id: true})
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
      console.log("Error en Dao createMuebles => ", error.message)
      res.status(200).json({erro: error.message})
    }
  }



  async updateMueble(req, res, id, _updated) {     // hacer manejo de errore si no existe el mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {MueblesProdDaoSqlite}