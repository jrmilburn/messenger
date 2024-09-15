import { AuthContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import styles from './ChatPage.module.css';

import Users from "../components/Users/Users";
import ChatMessages from "../components/Chat/ChatMessages";

export default function ChatPage() {

    const handleUserClick = (user) => {
        console.log(user);
        setSelectedChat(user);
    }

    const handleLogout = () => {
        logout();
    }

    const { currentUser, logout } = useContext(AuthContext);
    const [selectedChat, setSelectedChat] = useState(null);

    return (
        <div className={styles["dashboard"]}>
            <div className={styles["nav"]}>
                <Users currentUser={currentUser} onUserClick={handleUserClick}/>
                <button className={styles["logout"]} onClick={handleLogout}>Logout</button>
            </div>
            <div className={styles["chat"]}>
                {selectedChat ? (
                    <ChatMessages currentUser={currentUser} selectedUser={selectedChat}/>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
        </div>
    )
}