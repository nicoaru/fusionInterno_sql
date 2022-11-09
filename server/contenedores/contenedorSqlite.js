const {prisma} = require('../../prisma/prismaClient.js')


class ContenedorSqlite {
    constructor(modelName) {
        this.modelName = modelName;
    }


//
    // Devuelve un sólo registro que matchea con la query, en formato objeto
    readOne( findParams) {
        const model = this.modelName
        return prisma[model].findUnique(findParams)  
    }
//
    // Devuelve todos los registros que matchean con la query
    readMany(findParams) {
        const model = this.modelName
        console.log("queryObject => ", findParams)
        return prisma[model].findMany(findParams)
    }
//    
    // elimina un sólo objeto que matchea con la query
    deleteOne(id) {
        console.log("queryObject => ", id)
        const model = this.modelName
        return prisma[model].delete({
            where: {id: id}
        })  
    }
//
    // elimina todos los objetos que matchean con la query
    deleteMany(findParams) {
        console.log("queryObject => ", findParams)
        const model = this.modelName
        return prisma[model].deleteMany(findParams) 
    }
     



    // Crea un nuevo registro // devuelve el registro creado en formato objeto
    create(createParams) {
        const model = this.modelName
        return prisma[model].create(createParams)  
    }


    // actualiza el registro que cumple con el 'queryObject' modificando los campos pasados en 'updatedFieldsObject'
    updateOne(queryObject, updatedFieldsObject, includeObject) {
        const model = this.modelName
        return prisma[model].update({
            where: queryObject,
            data: updatedFieldsObject,
            include: includeObject
        })  
    }

    // actualiza los registros que cumplen con los parametros pasados en 'queryObject' modificando los campos pasados en 'updatedFieldsObject'
    updateMany(queryObject, updatedFieldsObject) {
        const model = this.modelName
        return prisma[model].updateMany({
            where: {queryObject},
            data: {updatedFieldsObject}
        })  
    }

    // actualiza el registro que cumple con el 'queryObject' y si no existe crea un nuevo registro
    upsert(queryObject, updatedFieldsObject, newObject) {
        const model = this.modelName
        return prisma[model].upsert({
            where: {queryObject},
            data: {updatedFieldsObject},
            create: {newObject}
        })
    }
}

module.exports = {ContenedorSqlite}








    // NO SIRVE PARA SQLITE
    // Crea múltiples nuevos registros // devuelve la cantidad de registros creados // 
    // createMany(objectsList) {
    //     const model = this.modelName
    //     console.log("Entro en createMany")
    //     return prisma[model].createMany({
    //         data: objectsList,
    //         skipDuplicates: true
    //     })
    // }