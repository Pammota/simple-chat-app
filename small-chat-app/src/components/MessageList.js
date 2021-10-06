import React from 'react';

const MessageList = (messages) => {
    return (
        <ul className="message-list">                 
            {messages.map(message => {
              return (
               <li key={message.id}>
                 <div>
                   {message.senderId}
                 </div>
                 <div>
                   {message.text}
                 </div>
               </li>
             )
           })}
         </ul>
    );
}

export default MessageList;