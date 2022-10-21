import React from 'react';
import './listaOpcionesDespiece.css'
import { Container, Grid, Box } from '@mui/material'; 
import { CardOpcionesDespiece } from '../cardOpcionesDespiece/cardOpcionesDespiece';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


function ListaOpcionesDespiece({opcionesDespiece}) {
  
  let opcionesCardsJsx = opcionesDespiece.map((obj, index)=> {
    return <Grid item container xs={'auto'} justifyContent="center"> <CardOpcionesDespiece key={index} modeloDespiece={obj}/> </Grid>
  })
  let opcionesCardsCarousel = opcionesDespiece.map((obj, index)=> {
    return <Box display='flex' justifyContent='center'><CardOpcionesDespiece key={index} modeloDespiece={obj}/></Box>
  })


  return (
    <div>
      <Container fixed>
        <Grid display={{xs: 'none', md: 'flex'}} container spacing={2} justifyContent="center">
          {opcionesCardsJsx}
        </Grid>
        <Box display={{md: 'none'}}>
          <Carousel 
            responsive={{xs: {breakpoint: { max: 599, min: 0 }, items: 1, slidesToSlide: 1}, sm: {breakpoint: { max: 899, min: 600 }, items: 2, slidesToSlide: 2}}}
            swipeable={true}
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            arrows={true}
            transitionDuration={300}
            containerClass="carousel-container">
                {opcionesCardsCarousel}
          </Carousel>

        </Box>
      </Container>
    </div>
  );
};

export { ListaOpcionesDespiece }

 