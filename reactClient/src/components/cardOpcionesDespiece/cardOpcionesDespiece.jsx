import React from 'react';
import './cardOpcionesDespiece.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function CardOpcionesDespiece({modeloDespiece}) {
  return (
    <Card sx={{ width: 245, height:315, padding: '10px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          // height="240"
          width='100%'
          image={modeloDespiece.imgUrl}
          alt={modeloDespiece.modelo}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {modeloDespiece.modelo}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}; 

export { CardOpcionesDespiece };


