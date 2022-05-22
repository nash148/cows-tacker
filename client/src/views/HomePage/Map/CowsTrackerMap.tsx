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
  const [center, setCenter] = useState<LatLngExpression>([31.374231, 34.594746]);
  // TODO Get the polygon from the server, and update on change
  const [farmPolygon, setFarmPolygon] = useState<LatLngExpression[]>([
    [31.37562347455115, 34.543075561523445],
    [31.36125952201294, 34.761772155761726],
    [31.293807563940845, 34.77172851562501],
    [31.272388797564815, 34.74014282226563],
    [31.273855991548853, 34.65534210205079],
    [31.27004123972693, 34.50531005859376],
    [31.305835148208434, 34.55783843994141]
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