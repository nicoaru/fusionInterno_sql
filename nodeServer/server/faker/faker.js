const {faker} = require('@faker-js/faker')


const createRandomClientes = (n = 10) => {
    let fakeClientes = []
    for (let i = 0; i < n; i++) {
        fakeClientes.push({
            // nombre: 'STOCK',
            // apellido: undefined,
            // telefono: undefined,
            // email: undefined,
            // direccion: undefined,
            // tipo_cliente: 'STOCK',
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            telefono: faker.phone.number('+54 9 11 ########'),
            email: faker.internet.email(),
            direccion: faker.address.streetAddress(false),
            tipo_cliente: faker.helpers.arrayElement([null, 'Estudio', 'Particular']),
        })
    }
    return fakeClientes
}

const createRandomPedidos = (n = 10) => {
    let fakePedidos = []
    for (let i = 0; i < n; i++) {
        fakePedidos.push({
            id_cliente: faker.helpers.arrayElement([1,35,36,37,38,39,40]),
            fecha_entrada: undefined,
            // fecha_entrada: faker.date.recent(10),
            // fecha_entrega: faker.date.between('2022-11-20T00:00:00.000Z', '2022-12-15T00:00:00.000Z'),
            direccion_entrega: faker.address.streetAddress(false),
            notas: faker.lorem.lines()
        })
    }
    return fakePedidos
}


const createRandomMuebles = (n = 10) => {
    let fakeMuebles = []
    for (let i = 0; i < n; i++) {
        fakeMuebles.push({
            linea: faker.helpers.arrayElement(['Praga', 'Frank', 'Visby', 'Buet', 'Gota']),
            modelo: faker.helpers.arrayElement(['Consola', 'Mesa de luz', 'Comoda', 'Bar', 'Mesa', 'Recibidor', 'Vajillero']),
            largo: faker.helpers.arrayElement([60, 70, 160, 180, 200, 220, 240, 260]),
            alto_total: faker.helpers.arrayElement([35, 50, 60, 70, 90]),
            profundidad: faker.helpers.arrayElement([35, 40, 45]),
            terminacion: faker.helpers.arrayElement([null, 'Laca', 'Poro abierto']),
            color: faker.helpers.arrayElement([null, 'SW7056', 'SW6545', 'SW1205', 'SW1246', 'SW1269']),
            terminacion_frentes: faker.helpers.arrayElement([null, 'Ranurado color', 'Liso color', 'Ranurado madera', 'Liso madera']),
            n_puertas: faker.datatype.number(6),
            n_cajones: faker.datatype.number(3),
            n_cajones_internos: faker.datatype.number(2),
            patas_altura: faker.helpers.arrayElement([0, 10, 15]),
            patas_modelo: faker.helpers.arrayElement(['Cilindricas', 'Praga']),
            patas_color: faker.helpers.arrayElement(['Negro', 'Bronce', 'Niquel', 'Platil']),
            estado: faker.helpers.arrayElement(['Para arrancar', 'En proceso', 'Para laqueador', 'En laqueador', 'Terminacion', 'Para entregar', 'Entregado']),
            notas: faker.lorem.lines(),
            cantidad: faker.datatype.number(3),
            id_pedido: null
        })
    }
    return fakeMuebles
}


module.exports = {createRandomMuebles, createRandomClientes, createRandomPedidos}