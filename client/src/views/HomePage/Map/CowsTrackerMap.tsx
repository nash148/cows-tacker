import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import Typography from '@mui/material/Typography';
import 'leaflet/dist/leaflet.css';
import icon from '../../../assets/cow.png';
import defaultIcon from '../../../assets/marker-icon.png';
import { GpsEvent } from '../../../common/interfaces/gps-event.interface';

import CowHistoryRoute from './CowHistoryRoute/CowHistoryRoute';
import FarmPlygon from './FarmPlygon/FarmPolygon';

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

interface IProps {
  gpsEvents: { [cowId: string]: GpsEvent },
  showEventsHistory: (cowId: string) => void; 
  tmpPoint: LatLngExpression | undefined;
  timeout: number;
  cowHistoryRoute?: LatLngExpression[];
  removeHistoryRoute: () => void;
}

const CowsTrackerMap = (props: IProps) => {
  const { gpsEvents, showEventsHistory, tmpPoint, timeout, cowHistoryRoute, removeHistoryRoute } = props;
  const [center, setCenter] = useState<LatLngExpression>([31.63072930365132, 34.91472244262696]);
  // TODO Get the polygon from the server, and update on change
  const [farmPolygon, setFarmPolygon] = useState<LatLngExpression[]>([
    [31.660687350060968, 34.869918823242195],
    [31.650897245684263, 34.92038726806641],
    [31.63072930365132, 34.91472244262696],
    [31.620789868536235, 34.86511230468751],
    [31.620789868536235, 34.86511230468751],
    [31.64592873854548, 34.85979080200196],
    [31.657326684219576,34.84811782836915]
  ])
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
      <MapContainer style={{ height: "100vh", width: "100%" }} center={center} zoom={12}>

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

        {
          cowHistoryRoute &&
          <CowHistoryRoute 
            cowHistoryRoute={cowHistoryRoute}
            removeHistoryRoute={removeHistoryRoute}
            icon={DefaultIcon}
          />
        }

        <FarmPlygon 
          polygon={farmPolygon}
          setPolygon={setFarmPolygon}
        />
      </MapContainer>
    </>
  )

}

export default CowsTrackerMap;