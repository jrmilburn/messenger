import { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [currentChat, setCurrentChat] = useState(null);

    const selectChat = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <ChatContext.Provider value={{ currentChat, selectChat}}>
            {children}
        </ChatContext.Provider>
    );
}