

// pages/client/ChatPage.tsx
import ChatView from '@components/chat/ChatView';
import { useChat } from '@/hooks/chat';

export default function ChatPage() {
    return (
        <main>
            <ChatView
                // Initialize chat with empty contacts and current user ID 1
                // {...useChat({ initialContacts: [], currentUserId: 1 })}
                />

        </main>
    );
}

// import { ChatLayout } from "@components/layout/Chat"

// export function ClientChatPage() {
//     return (
//         <main>
//             <ChatLayout/>
//         </main>
//     )
// }