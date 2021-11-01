import { useState } from 'react';
import io from 'socket.io-client';

import './App.css';
import { LOCALHOST } from "./constants/contants";

const socket = io(LOCALHOST, { transports : ['websocket'] });

function App() {
  const [auction, setAuction] = useState();

  socket.on('update auction rate', (auction) => {
    setAuction(auction);
  });
  console.log(auction);

  return (
    <div className="App">
    </div>
  );
}

export default App;
