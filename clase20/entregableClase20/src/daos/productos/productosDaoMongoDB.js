import {ContenedorMongoDB} from '../../contenedores/contenedorMongoDB.js';
import mongoose from "mongoose";
const Types = mongoose.Types



class ProductosDaoMongoDB extends ContenedorMongoDB {
    
    constructor(model) {
      super(model);
      this.connect()
    }

    getAllProductos(req, res) {
        this.getAll()
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }

    saveProducto(req, res) {
        let producto = req.body
        this.save(producto)
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error.message))
    }

    getProductoById(req, res) {
        let id = req.params.id
        try{
            id = Types.ObjectId(id)
            this.getById(id)
            .then(data => res.json(data))
            .catch(error => res.status(400).json(error.message))
        }
        catch(error){
            res.status(400).json(error.message) 
        }


    }

    updateProductoById(req, res) {
        let id = req.params.id
        let newObject = req.body
        
        try{
            id = Types.ObjectId(id)            
            this.updateById(newObject, id)
            .then(data => res.json(data))
            .catch(error => res.status(400).json(error.message))            
        }
        catch(error){
            res.status(400).json(error.message) 
        }


    }

    deleteProductoById(req, res) {
        let id = req.params.id
     
        try {
            id = Types.ObjectId(id)
            this.deleteById(id)
            .then(data => res.json(data))
            .catch(error => res.status(400).json(error))                
        }
        catch (error) {
            res.status(400).json(error.message)
        }
    }

    deleteAllProductos(req, res) {
        this.deleteAll()
        .then(data => res.json(data))
        .catch(error => res.status(400).json(error))
    }
}

export { ProductosDaoMongoDB}