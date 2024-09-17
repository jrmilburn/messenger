import { useEffect, useState, useRef } from "react";
import io from 'socket.io-client';
import styles from './ChatMessages.module.css';
import ChatInput from "./ChatInput";
import Message from "./Message";

const socket = io('http://localhost:3000');

export default function ChatMessages({ currentUser, selectedUser }) {

    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:3000', {
          query: { userId: currentUser.user.id },
        });
    
        // Listen for new messages
        socketRef.current.on("newMessage", (message) => {
          if (
            (message.senderId === selectedUser.id && message.receiverId === currentUser.user.id) ||
            (message.senderId === currentUser.user.id && message.receiverId === selectedUser.id)
          ) {
            setMessages((prevMessages) => [...prevMessages, message]);
          }
        });
    
        // Clean up on unmount
        return () => {
          socketRef.current.disconnect();
        };
      }, [currentUser.user.id, selectedUser.id]);

    useEffect(() => {
        fetch(`http://localhost:3000/user/${currentUser.user.id}/message/${selectedUser.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.token}`,
        }})
        .then(response => response.json())
        .then(data => {
            setMessages(data);
            console.log('Messages: ', data);
        })
        .catch(error => console.error('Error:', error));
    }, [currentUser.user.id, selectedUser.id, currentUser.token]);

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>{selectedUser.username}</h2>
            <ul className={styles.messageList}>
                {messages.map((message, index) => (
                    <Message key={index} message={message} sender={message.senderId === currentUser.user.id} currentUsername={currentUser.user.username} otherUsername={selectedUser.username}/>
                ))}
            </ul>
            <ChatInput currentUser={currentUser} selectedUser={selectedUser}/>
        </div>
    );
}