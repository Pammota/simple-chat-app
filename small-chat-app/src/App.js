import './App.css';
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { useState } from 'react';

const DUMMY_DATA = [
    {
      senderId: "perborgen",
      text: "who'll win?"
    },
    {
      senderId: "janedoe",
      text: "who'll win?"
    }
  ]

const App = () => {

    const [messages, setMessages] = useState([]);

    setMessages(DUMMY_DATA);
    
    return ( 
        <div className = "App" >
        
        <Navbar />
        
        <MessageList messages={messages} />
        
        <MessageInput />
        </div>
    );
}

export default App;