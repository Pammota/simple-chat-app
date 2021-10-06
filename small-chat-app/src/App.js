import './App.css';
import Navbar from './components/Navbar';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import { useState } from 'react';
import { useEffect } from 'react';


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

    useEffect(() => {
        setMessages(DUMMY_DATA)
    }, []);

    return ( 
        <div className = "App" >
        
        <Navbar />
        
        <MessageList messageList={messages} />
        
        <MessageInput />
        </div>
    );
}

export default App;