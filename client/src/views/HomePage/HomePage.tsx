import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { GpsEvent } from '../../common/interfaces/gps-event.interface';
import * as GpsEventsApi from '../../services/gps-events.api';
import * as CowsApi from '../../services/cows.api';
import CowsTrackerMap from './Map/CowsTrackerMap';
import HistorySidebar from './EventsSidebar/HistorySidebar';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const socket = io(SERVER_URL, { transports : ['websocket'] })
socket.connect()

function HomePage() {
  const [eventsHistory, setEventsHistory] = useState<GpsEvent[] | undefined>();
  const [historyCowId, setHistoryCowId] = useState<string | undefined>();
  const [gpsEvents, setGpsEvents] = useState<{ [cowId: string]: GpsEvent }>({
    // '002': {
    //   cowId: "002",
    //   timestamp: "2022-03-05T23:49:22",
    //   latLong: "31.778345, 35.225079",
    //   wt: "3S",
    //   battery: "399V",
    //   counter: 23
    // },
    // '001': {
    //   cowId: "001",
    //   timestamp: "2022-03-05T23:49:22",
    //   latLong: "31.788345, 35.225079",
    //   wt: "3S",
    //   battery: "399V",
    //   counter: 23
    // },
  });

  const updateLastEvents = async () => {
    const cows = await CowsApi.getAll();

    cows.map(async cow => {
      const event = await GpsEventsApi.getOneByCowId(cow.cowId);
      console.log('event', event)
      setGpsEvents(prevState => ({
        ...prevState,
        [event.cowId]: event
      }))
    })
  }

  const startListenToGpsEvents = () => {
    socket.on('gps-event', (event: GpsEvent) => {
      setGpsEvents(prevState => ({
        ...prevState,
        [event.cowId]: event
      }))
    })
  }

  const showEventsHistory = async (cowId: string) => {
    const res = await GpsEventsApi.getByCowId(cowId);
    setEventsHistory(res);
    setHistoryCowId(cowId);
  }

  const onCloseHistory = () => {
    setEventsHistory(undefined);
    setHistoryCowId(undefined);
  }

  useEffect(() => {
    updateLastEvents();
    startListenToGpsEvents();
  }, [])

  return (
    <>
      <CowsTrackerMap 
        gpsEvents={gpsEvents}
        showEventsHistory={showEventsHistory}
      />

      {
        eventsHistory && historyCowId &&
        <HistorySidebar 
          events={eventsHistory} 
          onClose={onCloseHistory} 
          cowId={historyCowId}
        />
      }
    </>
  )
};

export default HomePage
