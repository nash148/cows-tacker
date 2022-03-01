import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import EventsTable from './EventsTable/EventsTable';
import { GpsEvent } from '../../../common/interfaces/gps-event.interface';

interface Props {
  cowId: string;
  events: GpsEvent[];
  onClose: () => void;
}

const HistorySidebar = (props: Props) => {
  const { events, onClose, cowId } = props;


  return (
    <div>
        <>
          <Drawer
            anchor={'right'}
            open={true}
            onClose={() => onClose()}
          >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={() => onClose()}
                onKeyDown={() => onClose()}
            >

            </Box>
            <EventsTable cowId={cowId} rows={events} />
          </Drawer>
        </>
    </div>
  )
}

export default HistorySidebar;