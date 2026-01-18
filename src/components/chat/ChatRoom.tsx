

// ChatView.tsx (presentational)
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatHeader from '@components/chat/ChatHeader';
import ChatBody from '@components/chat/ChatBody';
import ChatForm from '@components/chat/ChatForm';
import { useChat } from '@/hooks/chat';


export default function ChatRoom(){
    const params = useParams<{chatId: string}>();
    console.log("ChatRoom params:", params);

    const chat = useChat({ initialContacts: [], currentUserId: 1 });
    const messagesEndRef = chat.messagesEndRef as React.RefObject<HTMLDivElement>;
    const { selectedContact, messages, message, setMessage,
        sendMessage
    } = chat;
    return (
        <div className="flex flex-col w-full h-full p-2 sm:p-4 border border-muted/15 bg-surface rounded-xl">
        <ChatHeader selected={selectedContact}
            // rightActions={renderRightHeaderActions ? renderRightHeaderActions({ selectedContact }) : null}
        />
        <ChatBody messages={messages} messagesEndRef={messagesEndRef} />
        <ChatForm
            message={message}
            setMessage={(v: string) => setMessage(v)}
            onSend={sendMessage}
        />
        </div>
    )
}
