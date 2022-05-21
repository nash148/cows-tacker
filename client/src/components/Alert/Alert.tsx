import React, { useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';

interface IProps {
    content: string;
}

const ActionAlert = (props: IProps) => {
  const { content } = props;
  const [open, setOpen] = useState(true)

  return (
    <>
    
      <Collapse in={open}>
        <Alert 
          sx={{
            zIndex: 1000,
            position: 'absolute',
            bottom: 50,
          }}
          severity="error"
          onClose={() => setOpen(false)}

        >
          <AlertTitle> Note! </AlertTitle>
          {content}
        </Alert>
      </Collapse>
    </>
  );
}


export default ActionAlert