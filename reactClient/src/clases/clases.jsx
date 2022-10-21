import {Timestamp} from "firebase/firestore"



const generarObjetoMuebleEncargado = (codo0 = 0, codo9 = 0, codo18 = 0, cantCajones = 0, codigoColor = "", referenciaColor = "", tipoCorredera = "", colorCorredera = "", estado = "", estandar = "", fechaPedido, fechaEntrega, tipoFrentes = "", idPedido = "", largo = 0, alto = 0, profundidad = 0, linea = "", modelo = "", notas = "", tipoPata = "", alturaPata = 0, colorPata = "", puertas = 0) =>  {
    return {
    timeStampCreationDoc: Timestamp.now(),
    bisagras: { 
        codo0: codo0,
        codo9: codo9,
        codo18: codo18              
    },
    cajones: cantCajones,
    color: {
        codigo: codigoColor,
        referencia: referenciaColor
    },
    correderas : {
        tipo: tipoCorredera,
        color: colorCorredera,
        cantidad: cantCajones,
    },
    estado : {
        actual: estado,
        historicos: [
            {estado: estado, fecha: Timestamp.now()}
        ]
    },
    estandar : estandar,
    fechaPedido : Timestamp.fromDate(fechaPedido),
    fechaEntrega : Timestamp.fromDate(fechaEntrega),
    tipoFrentes : tipoFrentes,
    idPedido : idPedido,
    medidaTotal : {
        largo: largo,
        alto: alto, 
        profundidad: profundidad
    },
    linea : linea,
    modelo : modelo,
    notas : notas,
    pata : {
        tipo: tipoPata,
        altura: alturaPata,
        color: colorPata
    },
    puertas : puertas
    }};

export { generarObjetoMuebleEncargado }