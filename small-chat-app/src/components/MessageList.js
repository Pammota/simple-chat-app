import React from 'react';

const MessageList = ({messageList}) => {
    return (
        <ul className="message-list flex flex-col flex-start flex-initial gap-2">                 
            {
            messageList.map(message => {
              return (
               <li className="" key={message.id}>
                 <div className="inline-flex items-left justify-left px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                   {message.senderId}
                 </div>
                 <div className="inline-flex items-left justify-left h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800">
                   {message.text}
                 </div>
               </li>
             )
           })
           }
         </ul>
    );
}

export default MessageList;