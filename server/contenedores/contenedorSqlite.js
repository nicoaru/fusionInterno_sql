const {prisma} = require('../../prisma/prismaClient.js')


class ContenedorSqlite {
    constructor(modelName) {
        this.modelName = modelName;
    }


    // Devuelve la lista de registros almacenados, en formato objeto
    readAll() {
        console.log("ReadAll()")
        const model = this.modelName
        return prisma[model].findMany()
    }

    /// Devuelve un sólo registro que matchea con la query, en formato objeto
    readOne( queryObject) {
        const model = this.modelName
        return prisma[model].findUnique(queryObject)  
    }

    /// Devuelve todos los registros que matchean con la query
    readMany(queryObject) {
        const model = this.modelName
        console.log("queryObject => ", queryObject)
        return prisma[model].findMany(queryObject)
    }
     
    

    // Crea un nuevo registro // devuelve el registro creado en formato objeto
    create(object, selectObject) {
        const model = this.modelName
        return prisma[model].create({
            data: object,
            select: selectObject
        })  
    }

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


    // elimina un sólo objeto que matchea con la query
    deleteOne(queryObject) {
        console.log("queryObject => ", queryObject)
        const model = this.modelName
        return prisma[model].delete({
            where: queryObject
        })  
    }

    // elimina todos los objetos que matchean con la query
    deleteMany(queryObject) {
        console.log("queryObject => ", queryObject)
        const model = this.modelName
        return prisma[model].deleteMany({
            where: queryObject
        }
        ) 
    }


    // actualiza el registro que cumple con el 'queryObject' modificando los campos pasados en 'updatedFieldsObject'
    updateOne(queryObject, updatedFieldsObject) {
        const model = this.modelName
        return prisma[model].update({
            where: queryObject,
            data: updatedFieldsObject
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