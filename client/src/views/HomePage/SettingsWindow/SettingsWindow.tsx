import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button } from '@mui/material';
import { useState } from 'react';


interface IProps {
  timeout: number;
  setTimeout: (time: number) => void;
}

export default function FormDialog(props: IProps) {
  const { timeout, setTimeout } = props;
  const [open, setOpen] = React.useState(false);
  const [tmpTime, setTmpTime] = useState(timeout);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTmpTime(Number(event.target.value));
  };

  return (
    <div>
      <IconButton 
        onClick={handleClickOpen}
        style={{
          position: 'absolute',
          zIndex: 1000,
          right: 0
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Timeout in minutes"
            type="number"
            fullWidth
            defaultValue={tmpTime}
            onChange={handleChange}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            setTimeout(tmpTime)
            handleClose()
          }}>Set</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
