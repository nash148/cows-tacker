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
  tmpPoint: LatLngExpression | undefined;
  timeout: number;
}

const CowsTrackerMap = (props: Props) => {
  const { gpsEvents, showEventsHistory, tmpPoint, timeout } = props;
  const [center, setCenter] = useState<LatLngExpression>([32.062725, 34.806061]);
  const [warnMapping, setWarnMapping] = useState<{ [cowId: string]: Boolean }>({})
  const [currDate, setCurrDate] = useState(Date.now());

  const initCenter = () => {
    if (Object.values(gpsEvents).length > 0 && Object.values(gpsEvents)[0].latLong) {
      const tmpCenter = Object.values(gpsEvents)[0].latLong as LatLngExpression
      setCenter(tmpCenter)
    }
  }

  const initIsWarn = () => {
    Object.values(gpsEvents).map(event => {
      setWarnMapping(prevState => ({
        ...prevState,
        [event.cowId]: (currDate - event.timestamp) > (timeout * 60000)
      }))
    })
  }

  
  useEffect(() => {
    initCenter();

    setInterval(() => {
      setCurrDate(Date.now());
    }, 2000)
  }, [])

  useEffect(() => {
    initIsWarn();
  }, [currDate])
  
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
                        {
                          <Typography 
                            key={key} 
                            fontWeight="bold" 
                            variant="caption"
                            color={warnMapping[event.cowId] ? 'red' : 'black'}
                            display="block" 
                            gutterBottom>
                            {event.cowId}
                          </Typography>
                        }
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