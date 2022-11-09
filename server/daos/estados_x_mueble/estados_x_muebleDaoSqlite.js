const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class EstadosXMuebleDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readEstadosXMueble(req, res, findParams) {
    const resultado = await this.readMany(findParams)
    // console.log("resultado => ", _resultado)
    res.json(resultado)
  }
//
  async readEstadoXMuebleById(req, res, findParams) {
    try{
      const _resultado = await this.readOne(findParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao Estado_x_mueble by id => ", error)
    }
  }
//
  async deleteEstadoXMuebleById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne(id)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Estado_x_mueble by id => ", error)
    }
  }
//
  async deleteEstadosXMueble(req, res, deleteParams) {
    try{
      const _resultado = await this.deleteMany(deleteParams)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Estados_x_mueble => ", error)
    }
  }
//
  async createEstadoXMueble(req, res, createParams) {
    try{
      const _resultado = await this.create(createParams)
      console.log("dao createEstado_x_mueble ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createEstado_x_mueble => ", error.message)
      res.status(400).json({error: {status: 400, message: error.message}})
    }
  }
//
  async createEstadosXMueble(req, res, createParams) {
    console.log("Entro en createEstados_x_mueble")
    // console.log("Estado_x_mueblesList => ", Estado_x_mueblesList)
    let _resultados = []
    try{
      for(let _Estado_x_mueble of createParams.data) {
        try{
          // console.log("Estado_x_mueble iterando => ", _Estado_x_mueble)
          const index = createParams.data.indexOf(_Estado_x_mueble)
          const _resultado = await this.create({...createParams, data: _Estado_x_mueble})
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
      console.log("Error en Dao createEstados_x_mueble => ", error.message)
      res.status(400).json({error: {message: error.message, status: 400}})
    }
  }



  async updateEstadoXMueble(req, res, id, _updated, _includeOptions) {     // hacer manejo de errore si no existe el Estado_x_mueble
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    console.log("_include => ", _includeOptions)
    const _resultado = await this.updateOne({id}, _updated, _includeOptions)
    res.status(200).json(_resultado)
  }



  

}

module.exports = {EstadosXMuebleDaoSqlite}




  // async readEstados_x_Estado_x_mueble(req, res, queryObject) {
  //   console.log("query dao => ", queryObject)
  //   const _resultado = await this.readMany(queryObject)
  //   // console.log("resultado => ", _resultado)
  //   res.json(_resultado)
  // }

  // async readEstado_x_Estado_x_muebleById(req, res, id) {
  //   try{
  //     const _resultado = await this.readOne({id})
  //     res.status(200).json(_resultado)
  //   }
  //   catch(error){
  //     console.log("Error dao readEstado_x_Estado_x_mueble by id => ", error)
  //   }
  // }

  
  // async deleteEstado_x_Estado_x_muebleById(req, res, id) {    // manejar el error cuando el registro no existe
  //   try{
  //     const _resultado = await this.deleteOne({id})
  //     res.status(200).json(_resultado)
  //   }
  //   catch(error){
  //     console.log("Error dao delete Estado_x_Estado_x_mueble by id => ", error)
  //   }
  // }

  // async deleteEstados_x_Estado_x_mueble(req, res, queryObject) {
  //   try{
  //     const _resultado = await this.deleteMany(queryObject)
  //     res.status(200).json(_resultado)
  //   }
  //   catch(error){
  //     console.log("Error dao delete Estados_x_Estado_x_mueble => ", error)
  //   }
  // }

  // async createEstado_x_Estado_x_mueble(req, res, newEstado_x_Estado_x_mueble) {
  //   try{
  //     const _resultado = await this.create(newEstado_x_Estado_x_mueble)
  //     console.log("dao createEstado_x_Estado_x_mueble ok => ", _resultado)
  //     res.json(_resultado)
  //   }
  //   catch(error){
  //     console.log("Error en Dao createEstado_x_Estado_x_mueble => ", error.message)
  //     res.status(400).json({erro: error.message})
  //   }
  // }

  // async createEstados_x_Estado_x_mueble(req, res, estados_x_Estado_x_muebleList) {
  //   console.log("Entro en createEstados_x_Estado_x_mueble")
  //   // console.log("estados_x_Estado_x_muebleList => ", estados_x_Estado_x_muebleList)
  //   let _resultados = []

  //   try{
  //     for(let _estado_x_Estado_x_mueble of estados_x_Estado_x_muebleList) {
  //       try{
  //         // console.log("Estado_x_mueble iterando => ", _Estado_x_mueble)
  //         const index = estados_x_Estado_x_muebleList.indexOf(_estado_x_Estado_x_mueble)
  //         const _resultado = await this.create(_estado_x_Estado_x_mueble, {id: true})
  //         _resultados.push({created: true, ..._resultado})
  //       }
  //       catch(error){
  //         console.log(error.message)
  //         _resultados.push({created: false, message: error.message})
  //       }
  //     }
  //   res.status(200).json({_resultados})
  //   }
  //   catch(error){
  //     console.log("Error en Dao createEstados_x_Estado_x_mueble => ", error.message)
  //     res.status(200).json({erro: error.message})
  //   }
  // }



  // async updateEstado_x_Estado_x_mueble(req, res, id, _updated) {     // hacer manejo de errore si no existe el Estado_x_mueble
  //   console.log("ID => ", id)
  //   console.log("_updated => ", _updated)
  //   const _resultado = await this.updateOne({id}, _updated)
  //   res.status(400).json(_resultado)
  // }
