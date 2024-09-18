import { AuthContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import styles from './ChatPage.module.css';
import { NavLink } from "react-router-dom";

import Users from "../components/Users/Users";
import ChatMessages from "../components/Chat/ChatMessages";
import AddFriends from "../components/Users/AddFriends";

export default function ChatPage() {

    const { currentUser, logout } = useContext(AuthContext);
    const [selectedChat, setSelectedChat] = useState(null);
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);

    const handleUserClick = (user) => {
        console.log(user);
        setSelectedChat(user);
    }

    const handleLogout = () => {
        logout();
    }

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <div className={styles["dashboard"]}>
            <div className={styles["nav"]}>
                <Users currentUser={currentUser} onUserClick={handleUserClick}/>
                <div className={styles["buttons"]}>
                    <button onClick={handleOpenDialog}>Add Friends</button>
                    <button onClick={handleLogout}>Logout</button>
                    <NavLink to="/profile"><button>Profile</button></NavLink>
                </div>
            </div>
            <div className={styles["chat"]}>
                {selectedChat ? (
                    <ChatMessages currentUser={currentUser} selectedUser={selectedChat}/>
                ) : (
                    <p>Select a user to start chatting</p>
                )}
            </div>
            <AddFriends isOpen={isDialogOpen} onClose={handleCloseDialog} currentUser={currentUser}/>
        </div>
    )
}