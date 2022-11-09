import React from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DialogMultipleValueChange({isEditable, itemCopy, enableEdit, disableEdit, handleValueChange, setOpenDialog}) {
  



  return (

    <Box>
      <DialogContent>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>

          <TextField
            id="linea"
            name="linea"
            label="Linea"
            value={itemCopy.linea || ''}
            onDoubleClick={(e) => enableEdit(e, e.target.id)}
            onBlur={(e) => disableEdit(e)}
            onChange={(e) => handleValueChange(e, e.target.name)}
            size={'small'}
            inputProps={{
              readOnly: !isEditable,
              sx: {
                  fontSize: 14,
                  px: 1, 
                  py: 0.75
              }
            }}
          />

          <TextField
            id="modelo"
            name="modelo"
            label="Modelo"
            value={itemCopy.modelo || ''}
            onDoubleClick={(e) => enableEdit(e, e.target.id)}
            onBlur={(e) => disableEdit(e)}
            onChange={(e) => handleValueChange(e, e.target.name)}
            size={'small'}
            inputProps={{
              readOnly: !isEditable,
              sx: {
                  fontSize: 14,
                  px: 1, 
                  py: 0.75
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Listo</Button>
      </DialogActions>
    </Box>

  );
}

export {DialogMultipleValueChange}