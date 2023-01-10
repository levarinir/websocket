import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { API } from './config';

const socket = io.connect(API);

function App() {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState(0);

  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <button className="counter-btn" onClick={sendMessage}>
        {' '}
        +1
      </button>
      <h1 className="counter-title">Counter</h1>
      <p className="counter-result">{messageReceived}</p>
    </div>
  );
}

export default App;
