import mongoose from 'mongoose';
const {Schema, model} = mongoose


const CarritoSchema = new Schema({
    productos: {type: Array, required: true, default: []},
}, {timestamps: true});
  
  
const Carrito = model('carritos', CarritoSchema);


export {Carrito, CarritoSchema}