import React from 'react';  
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import './carouselOpcionesDespiece.css'
import { CardOpcionesDespiece } from '../cardOpcionesDespiece/cardOpcionesDespiece';


function CarouselOpcionesDespiece({opcionesDespiece}) {
    

    let opcionesCardsJsx = opcionesDespiece.map((obj, index)=> {
        return <CardOpcionesDespiece key={index} modeloDespiece={obj}/>})
    

    return (  
        <div className='carouselOpcionesDespieceContainer'>  
                <OwlCarousel items={3} className="" autoplay="true" autoplayTimeout="2000" loop nav margin={8}>  
                    
                    {opcionesCardsJsx}
                    
                </OwlCarousel>  
        </div>  
    )  
}  

export {CarouselOpcionesDespiece}