import React, {useState, useEffect} from 'react';
import './generarDespieceContainer.css';
import {Layout} from '../../components/layout/layout';
import {ref, getDownloadURL} from "firebase/storage";
import { storage } from "../../components/firebase/firebase";
import { CarouselOpcionesDespiece } from '../../components/carouselOpcionesDespiece/carouselOpcionesDespiece';


function GenerarDespieceContainer() {


      const opcionesModelosDespiece = [
        {modelo: 'Consola Praga', imgPath: 'imagenes/PragaConsola3.PNG', imgUrl:"https://firebasestorage.googleapis.com/v0/b/fusion-interno.appspot.com/o/imagenes%2FPragaConsola3.PNG?alt=media&token=e85493cd-4e3e-47a7-8538-9406cf8e476e"},
        {modelo: 'Mesa de luz Praga', imgPath: 'imagenes/PragaLuzGris4.PNG', imgUrl:"https://firebasestorage.googleapis.com/v0/b/fusion-interno.appspot.com/o/imagenes%2FPragaLuzGris4.PNG?alt=media&token=b2604699-3556-4ea6-99fd-dd44d7de7d68"},
        {modelo: 'Consola Niza', imgPath: 'imagenes/NizaConsolaNegra.PNG', imgUrl:"https://firebasestorage.googleapis.com/v0/b/fusion-interno.appspot.com/o/imagenes%2FNizaConsolaNegra.PNG?alt=media&token=655f40c6-c29a-437f-9d7f-f614e4f0c527"},
        {modelo: 'Consola Frank', imgPath: 'imagenes/FrankNegra.PNG', imgUrl:"https://firebasestorage.googleapis.com/v0/b/fusion-interno.appspot.com/o/imagenes%2FFrankNegra.PNG?alt=media&token=e817f335-7838-4ce9-acf0-46652c53bbf9"},
        {modelo: 'Vajillero Niza', imgPath: 'imagenes/vajillero niza 4.jpg', imgUrl:"https://firebasestorage.googleapis.com/v0/b/fusion-interno.appspot.com/o/imagenes%2Fvajillero%20niza%204.jpg?alt=media&token=b297f965-0d7b-4dc9-a534-ff06c3dbe4a9"}
      ];


    return (
        <Layout>
            <div>
                <h1>Página de generación de despieces</h1>

                <CarouselOpcionesDespiece opcionesDespiece={opcionesModelosDespiece}/>
            </div>
        </Layout>
    )

};

export {GenerarDespieceContainer};