
import { ChatLayout } from "@components/layout/Chat"

export function ChatPage() {
  return (
    <main>
      <ChatLayout />
    </main>
  )
}



import ChatView from '@components/chat/ChatView';
import { useAdminChat } from '@/hooks/useAdminChat';
import useAuth from '@/hooks/useAuth';

export default function AdminChatPage() {
  const { user } = useAuth();
  const {
    rooms,
    selectedRoom,
    setSelectedRoom,
    messages,
    messageText,
    setMessageText,
    sendMessage,
    sendMedia,
    messagesEndRef,
    filter,
    setFilter,
    loading
  } = useAdminChat();

  const commonProps = {
    contacts: rooms,
    selectedContact: selectedRoom,
    messages: messages,
    messageText: messageText,
    onMessageChange: setMessageText,
    onSend: sendMessage,
    onSendMedia: sendMedia,
    onSelectContact: setSelectedRoom,
    messagesEndRef: messagesEndRef as React.RefObject<HTMLDivElement>,
    isAdmin: true,
    currentUserId: user?.id,
    filter,
    setFilter,
  };

  if (loading && rooms.length === 0) {
    return <div className="p-10 text-center text-muted">Loading conversations...</div>;
  }

  return (
    <main className="h-full">
      <ChatView
        {...commonProps}
      />
    </main>
  );
}
