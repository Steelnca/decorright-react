

// ChatView.tsx (presentational)
import ChatHeader from '@components/chat/ChatHeader';
import ChatBody from '@components/chat/ChatBody';
import ChatForm from '@components/chat/ChatForm';



export default function ChatRoom() {

    return (
        <div className="flex flex-col h-full">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto min-scrollbar">
                <ChatBody />
            </div>
            <div className="shrink-0">
                <ChatForm />
            </div>
        </div>

    )
}
