import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import EventsTable from './EventsTable/EventsTable';
import { GpsEvent } from '../../../common/interfaces/gps-event.interface';
import { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

interface Props {
  cowId: string;
  events: GpsEvent[];
  onClose: () => void;
  setTmpPoint: (point: LatLngExpression) => void;
  showHistoryRoute: (events: GpsEvent[]) => void;
}

const HistorySidebar = (props: Props) => {
  const { events, onClose, cowId, setTmpPoint, showHistoryRoute } = props;


  const onClickShowRoute = () => {
    showHistoryRoute(events)
    onClose()
  }

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
            <EventsTable onClickShowRoute={onClickShowRoute} setTmpPoint={setTmpPoint} cowId={cowId} rows={events} onClose={onClose} />
          </Drawer>
        </>
    </div>
  )
}

export default HistorySidebar;