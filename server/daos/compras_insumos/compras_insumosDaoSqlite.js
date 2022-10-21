const {ContenedorSqlite} = require('../../contenedores/contenedorSqlite.js')


class ComprasInsumosDaoSqlite extends ContenedorSqlite {
  constructor(model) {
    super(model);
  }

  async readCompras_Insumos(req, res, queryObject) {
    console.log("query dao => ", queryObject)
    const _resultado = await this.readMany(queryObject)
    // console.log("resultado => ", _resultado)
    res.json(_resultado)
  }

  async readCompra_InsumoById(req, res, id) {
    try{
      const _resultado = await this.readOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao Compra_Insumo by id => ", error)
    }
  }

  
  async deleteCompra_InsumoById(req, res, id) {    // manejar el error cuando el registro no existe
    try{
      const _resultado = await this.deleteOne({id})
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Compra_Insumo by id => ", error)
    }
  }

  async deleteCompras_Insumos(req, res, queryObject) {
    try{
      const _resultado = await this.deleteMany(queryObject)
      res.status(200).json(_resultado)
    }
    catch(error){
      console.log("Error dao delete Compras_Insumo by id => ", error)
    }
  }

  async createCompra_Insumo(req, res, newCompra_Insumo) {
    try{
      const _resultado = await this.create(newCompra_Insumo)
      console.log("dao createCompra_Insumo ok => ", _resultado)
      res.json(_resultado)
    }
    catch(error){
      console.log("Error en Dao createCompra_Insumo => ", error.message)
      res.status(400).json({erro: error.message})
    }
  }

  async createCompras_Insumos(req, res, Compras_InsumosList) {
    console.log("Entro en dao createCompra_Insumos")
    // console.log("Compras_InsumosList => ", Compras_InsumosList)
    let _resultados = []

    try{
      for(let _Compra_Insumo of Compras_InsumosList) {
        try{
          // console.log("Compra_Insumo iterando => ", _Compra_Insumo)
          const index = Compras_InsumosList.indexOf(_Compra_Insumo)
          const _resultado = await this.create(_Compra_Insumo, {id: true})
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
      console.log("Error en Dao createCompras_Insumos => ", error.message)
      res.status(200).json({erro: error.message})
    }
  }



  async updateCompra_Insumo(req, res, id, _updated) {     // hacer manejo de errore si no existe el Compra_Insumo
    console.log("ID => ", id)
    console.log("_updated => ", _updated)
    const _resultado = await this.updateOne({id}, _updated)
    res.status(400).json(_resultado)
  }
  

}

module.exports = {ComprasInsumosDaoSqlite}