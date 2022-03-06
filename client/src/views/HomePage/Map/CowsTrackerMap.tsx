import React, { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap, useMapEvent } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import Typography from '@mui/material/Typography';
import 'leaflet/dist/leaflet.css';
import icon from '../../../assets/cow.png';
import defaultIcon from '../../../assets/marker-icon.png';
import { GpsEvent } from '../../../common/interfaces/gps-event.interface';

const CowIcon = L.icon({
  iconUrl: icon,
  iconSize: [24, 30],
  iconAnchor: [7, 10]
});

const DefaultIcon = L.icon({
  iconUrl: defaultIcon,
  iconSize: [24, 30],
  iconAnchor: [7, 10]
});

interface Props {
  gpsEvents: { [cowId: string]: GpsEvent },
  showEventsHistory: (cowId: string) => void; 
  tmpPoint: LatLngExpression | undefined
}

const CowsTrackerMap = (props: Props) => {
  const { gpsEvents, showEventsHistory, tmpPoint } = props;
  const [center, setCenter] = useState<LatLngExpression>([35.225079, 31.778345]);

  const initCenter = () => {
    if (Object.values(gpsEvents).length > 0 && Object.values(gpsEvents)[0].latLong) {
      const tmpCenter = Object.values(gpsEvents)[0].latLong as LatLngExpression
      setCenter(tmpCenter)
    }
  }
  
  useEffect(() => {
    initCenter();
  }, [])
  
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
                event.latLong && event.latLong.length > 0 && 
                  <>
                    <Marker 
                      key={key} 
                      icon={ CowIcon } 
                      position={event.latLong as LatLngExpression}
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

        {
          tmpPoint &&
          <Marker
            icon={ DefaultIcon } 
            position={tmpPoint}
          />
        }
      </MapContainer>
    </>
  )

}

export default CowsTrackerMap;