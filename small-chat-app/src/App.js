import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import 'tachyons';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

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
const analytics = firebase.analytics();

const App = () => {

    const [user] = useAuthState(auth);//if not signed in, user = null, else, object with attributes

    return ( 
        <div className = "App" >
          <header>

           <div className="f2 f1-l fw2 white-90 mb0 lh-title">
                <div className="logo-banner-pair">
                    <img alt="logo" className="logo-img" src="https://img.icons8.com/color/48/000000/chat--v1.png"/>
                    <div className="app-banner">BogdanChat Lite</div>
                </div>
            </div>
            <SignOut />
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
        <>
        <button className="f2 f1-l fw2 white-90 mb0 lh-title sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
        <p className="p2 center">Do not violate the guidelines or you will be banned!</p>
        </>
    );
}

const SignOut = () => {
    return auth.currentUser && (
       <div className="button-margin"> <button className="sign-out" onClick={()=>auth.signOut()}> Sign Out </button></div>
    );
}

const ChatRoom = () =>{

    const dummy = useRef();
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(10000);

    const [messages] = useCollectionData(query,{idField:'id'});

    const [formValue,setFormValue] = useState('');

    const sendMessage = async(event) => {
        event.preventDefault();

        const {uid, photoURL} = auth.currentUser;


        if(!formValue || /^\s*$/.test(formValue))
            setFormValue('');
        else
            await messageRef.add({
                text:formValue,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                photoURL
            });

        setFormValue('');

        dummy.current.scrollIntoView({behaviour:'smooth'});
    }

   useEffect( ()=>{
    dummy.current.scrollIntoView({behaviour:'smooth'});
   }
   ,[messages]);


    return (
        <>
        <main>
        <div>
            {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg}/>)}
        </div>
        <div ref={dummy}></div>
        </main>

        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(event)=>setFormValue(event.target.value)} placeholder=". . ."/>
            <button type="submit" className="send-button">Send</button>
        </form>
        
        </>
    );
}

const ChatMessage = (props) =>{

    const {text, uid, photoURL,createdAt} = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return(
    <div className={`message ${messageClass}`}>
        <img alt="profilePic" src={photoURL ? photoURL :'https://robohash.org/'+uid}/>
        <div className="message-pair">
            <p>{text}</p>
            <p className="p3">{createdAt ? createdAt.toDate().toDateString() : 'loading...'}</p>
        </div>
    </div>
    );
}

export default App;