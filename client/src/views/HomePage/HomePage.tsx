import React, { useEffect } from 'react'
import io from 'socket.io-client';

// Import components
import Map from './Map/Map';

const socket = io('localhost:3344/api')
socket.connect()

function HomePage() {
  useEffect(() => {
    console.log(44)
  }, [])

  return (
    <>
      <Map />
    </>
  )
};

export default HomePage
