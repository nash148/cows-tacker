import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import CowsTrackerMap from './Map/CowsTrackerMap';
import { GpsEvent } from '../../common/interfaces/gps-event.interface';

// TODO Save domain
const socket = io('http://127.0.0.1:3344/', { transports : ['websocket'] })
socket.connect()

function HomePage() {
  const [gpsEvents, setGpsEvents] = useState<{ [cowId: string]: GpsEvent }>({
    '002': {
      cowId: "002",
      timestamp: "2022-03-05T23:49:22",
      latLong: "31.778345, 35.225079",
      wt: "3S",
      battery: "399V",
      counter: 23
    },
    '001': {
      cowId: "001",
      timestamp: "2022-03-05T23:49:22",
      latLong: "31.788345, 35.225079",
      wt: "3S",
      battery: "399V",
      counter: 23
    },
  });

  const startListenToGpsEvents = () => {
    socket.on('gps-event', (event: GpsEvent) => {
      setGpsEvents({ ...gpsEvents, [event.cowId]: event })
    })
  }

  useEffect(() => {
    startListenToGpsEvents();
  }, [])

  return (
    <>
      <CowsTrackerMap 
        gpsEvents={gpsEvents}
      />
    </>
  )
};

export default HomePage
