import * as React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface IProps {
    content: string;
}

const ActionAlert = (props: IProps) => {
  const { content } = props;

  return (
    <div
    >
      <Alert 
        style={{
          zIndex: 99,
          position: 'absolute',
        }}
        severity="error"
        onClose={() => {}}
      >
        <AlertTitle> Error </AlertTitle>
        This is a success alert — check it out!

      </Alert>
    </div>
  );
}


export default ActionAlert