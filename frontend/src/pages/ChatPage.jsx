import { AuthContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import styles from './ChatPage.module.css';

import Users from "../components/Users/Users";

export default function ChatPage() {

    const handleUserClick = (user) => {
        console.log(user);
        setSelectedChat(user);
    }

    const { currentUser } = useContext(AuthContext);
    const [selectedChat, setSelectedChat] = useState(null);
    console.log(selectedChat);

    return (
        <div className={styles["dashboard"]}>
            <div className={styles["nav"]}>
                <Users currentUser={currentUser} onUserClick={handleUserClick}/>
            </div>
            <div className="chat">
                {selectedChat ? (
                    <div>
                        <h2>{selectedChat.username}</h2>
                        <ul>
                            {selectedChat.messages.map(message => (
                                <li key={message.id}>
                                    <p>{message.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
        </div>
    )
}