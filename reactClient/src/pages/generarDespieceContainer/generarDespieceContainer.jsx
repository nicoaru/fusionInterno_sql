import React, {useState, useEffect} from 'react';
import './generarDespieceContainer.css';
import {Layout} from '../../components/layout/layout';
import { ListaOpcionesDespiece } from '../../components/listaOpcionesDespiece/listaOpcionesDespiece';
import {ref, getDownloadURL} from "firebase/storage";
import { storage } from "../../components/firebase/firebase";



function GenerarDespieceContainer() {

    //DEFINO EL STATE donde voy a guardar la lista de opciones con url de imagen
    const [opcionesConUrl, setOpcionesConUrl] = useState([])
    console.log("Opciones con url al principio: ", opcionesConUrl)

    //array con los datos que tengo inicialmente (las opciones sin url)
    const opcionesInit = [
      {modelo: 'Consola Praga', imgPath: 'imagenes/despiece/praga_despiece.PNG', imgUrl:''},
      {modelo: 'Mesa de luz Praga', imgPath: 'imagenes/despiece/praga_luz_despiece.PNG', imgUrl:''},
      {modelo: 'Consola Niza', imgPath: 'imagenes/despiece/niza_despiece.PNG', imgUrl:''},
      {modelo: 'Consola Frank', imgPath: 'imagenes/despiece/frank_despiece.PNG', imgUrl:''},
      {modelo: 'Vajillero Niza', imgPath: 'imagenes/despiece/niza_vajillero_despiece.jpg', imgUrl:''}
    ];

    //efecto que se dispara solo al montar el componente, para descargar las url de las imagenes
    //y almacenarlas con los otros datos en el state "opcionesConUrl"
  
    useEffect(() => {
      const traerUrls = async () => {
        let opcionesTemp = [...opcionesInit]
        for (const obj of opcionesTemp) {
          var imgRef = ref(storage, obj.imgPath)
          const url = await getDownloadURL(imgRef)
          obj.imgUrl = url;
        }
        setOpcionesConUrl(opcionesTemp)
      }
      traerUrls()
      console.log("Se ejecutó el useEffect")
    }, []);

  
    console.log("opcionesInit: ", opcionesInit)
    console.log("opcionesConUrl: ", opcionesConUrl)
  
  
    return (
        <Layout>
            <div>
                <ListaOpcionesDespiece opcionesDespiece={opcionesConUrl}/>
            </div>
        </Layout>
    )

};

export {GenerarDespieceContainer};