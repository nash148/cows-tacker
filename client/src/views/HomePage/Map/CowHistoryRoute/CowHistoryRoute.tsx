import React, { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';
import { Marker, Polyline } from 'react-leaflet';
import { Button } from '@mui/material';


interface IProps {
  cowHistoryRoute: LatLngExpression[];
  removeHistoryRoute: () => void;
  icon: L.Icon<L.IconOptions>;
}


const CowHistoryRoute = (props: IProps) => {
  const { cowHistoryRoute, removeHistoryRoute, icon } = props;
  
  return (
    <>
    {
      cowHistoryRoute &&
      <>
        <Polyline 
          pathOptions={{ color: 'blue' }}
          positions={cowHistoryRoute}
        />

      <Button
        size="small"
        variant="contained"
        style={{position: "absolute", zIndex: 1000}}
        onClick={removeHistoryRoute}
      >Remove Route</Button>
        {
          cowHistoryRoute.map((coordinate, i) => {
            return (
              <Marker 
              key={i} 
              icon={ icon } 
              position={coordinate}
              />
            )
          })
        }
      </>
    }
    </>
  )
}

export default CowHistoryRoute;