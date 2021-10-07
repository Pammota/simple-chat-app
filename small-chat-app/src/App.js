import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD8PTtR2Ye_ffd0SDLqRNMPVvRbyagrc1c",
  authDomain: "simple-chat-app-fe1fc.firebaseapp.com",
  projectId: "simple-chat-app-fe1fc",
  storageBucket: "simple-chat-app-fe1fc.appspot.com",
  messagingSenderId: "529345656015",
  appId: "1:529345656015:web:7820f9900438a47f6473ba",
  measurementId: "G-H82GRHREM5"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState();//if not signed in, user = null, else, object with attributes

const App = () => {

    
    return ( 
        <div className = "App" >
          <header>

          </header>

          <section>
              {user ? <ChatRoom /> : <SignIn />}
          </section>

        </div>
    );
}

const SignIn = () => {

    const signInWithGoogle = () =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    } 

    return(
        <button onClick={signInWithGoogle}>Sign in with Google</button>
    );
}

const SignOut = () => {
    return auth.currentUser && (
        <button onClick={()=>auth.signOut()}> Sign Out </button>
    );
}

const ChatRoom = () =>{
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(25);

    const [messages] = useCollectionData(query,{idField:'id'});

    const [formValue,setFormValue] = useState('');

    return (
        <>
        <div>
            {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg}/>)}
        </div>

        <form>
            <input />
            <button type="submit">SEND</button>
        </form>
        </>
    );
}

const ChatMessage = (props) =>{

    const {text, uid} = props.message;

    const messageClass = uid === auth.currentUser.uid? 'sent': 'recieved';

    return(
    <div className={`message ${messageClass}`}>
        <img src={photoURL} />
        <p>{text}</p>
    </div>
    );
}

export default App;