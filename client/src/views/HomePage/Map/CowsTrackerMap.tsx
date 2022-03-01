import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import Typography from '@mui/material/Typography';
import 'leaflet/dist/leaflet.css';
import icon from '../../../assets/cow.png';
import { GpsEvent } from '../../../common/interfaces/gps-event.interface';

let CowIcon = L.icon({
  iconUrl: icon,
  iconSize: [24, 30],
  iconAnchor: [7, 10]
});

interface Props {
  gpsEvents: { [cowId: string]: GpsEvent },
  showEventsHistory: (cowId: string) => void; 
}

const CowsTrackerMap = (props: Props) => {
  const { gpsEvents, showEventsHistory } = props;
  const [center, setCenter] = useState<LatLngExpression>([31.778345, 35.225079]);
  
  return (
    <>
      <MapContainer style={{ height: "100vh", width: "100%" }} center={center} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {
          Object.values(gpsEvents).map((event, key) => {
            return (
              <>
              {
                event.latLong && 
                  <>
                    <Marker 
                      key={key} 
                      icon={ CowIcon } 
                      position={event.latLong.split(',').map(tt => +tt) as LatLngExpression}
                      riseOnHover={true}
                      eventHandlers={{
                        click: () => showEventsHistory(event.cowId)
                      }}
                    >
                      <Tooltip
                        permanent
                        key={key}
                      >
                        <Typography key={key} fontWeight="bold" variant="caption" display="block" gutterBottom>
                          {event.cowId} | {event.timestamp}
                        </Typography>
                      </Tooltip>
                    </Marker>
                  </>
              }
              </>
            )
          })
        }
      </MapContainer>
    </>
  )

}

export default CowsTrackerMap;