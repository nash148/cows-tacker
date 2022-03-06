import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import { GpsEvent } from '../../common/interfaces/gps-event.interface';
import * as GpsEventsApi from '../../services/gps-events.api';
import * as CowsApi from '../../services/cows.api';
import CowsTrackerMap from './Map/CowsTrackerMap';
import HistorySidebar from './EventsSidebar/HistorySidebar';
import { LatLngExpression } from 'leaflet';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const socket = io(SERVER_URL, { transports : ['websocket'] })
socket.connect()

function HomePage() {
  const [eventsHistory, setEventsHistory] = useState<GpsEvent[] | undefined>();
  const [historyCowId, setHistoryCowId] = useState<string | undefined>();
  const [tmpPoint, setTmpPoint] = useState<LatLngExpression | undefined>();
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
      let event = await GpsEventsApi.getOneByCowId(cow.cowId);

      // If the last event has no gps, search for the last event with gps by cow id
      if (!event.latLong || event.latLong.length === 0) {
        const lastGpsEvent = await searchForLastGpsForCow(event.cowId);
        if (lastGpsEvent) {
          event = lastGpsEvent
        }
      }

      setGpsEvents(prevState => ({
        ...prevState,
        [event.cowId]: event
      }))
    })
  }

  const searchForLastGpsForCow = async (cowId: string): Promise<undefined | GpsEvent> => {
    const events  = await GpsEventsApi.getByCowId(cowId);
    const lastGps = events.find(event => event.latLong && event.latLong.length > 0);
    return lastGps;
  }

  const startListenToGpsEvents = () => {
    socket.on('gps-event', (event: GpsEvent) => {
      // Update only of there is gps 
      if (event.latLong && event.latLong.length > 0) {
        setGpsEvents(prevState => ({
          ...prevState,
          [event.cowId]: event
        }))
      }
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
        tmpPoint={tmpPoint}
      />

      {
        eventsHistory && historyCowId &&
        <HistorySidebar 
          events={eventsHistory} 
          onClose={onCloseHistory} 
          cowId={historyCowId}
          setTmpPoint={setTmpPoint}
        />
      }
    </>
  )
};

export default HomePage
