
// ChatView.tsx (presentational)
import ChatList from '@components/chat/ChatList';
import { Outlet } from 'react-router-dom';
import { useChat } from '@/hooks/chat';


export default function ChatView() {

  const chat = useChat({ initialContacts: [], currentUserId: 1 });
  const { contacts, selectContact: onSelectContact } = chat;

  return (
    <section className="h-hero content-container w-full px-3 sm:px-6 md:px-8">
      <div className="content-container w-full h-full">
        <div className="flex gap-4 w-full h-full">

          <div className="max-md:hidden flex flex-col gap-2 md:gap-4 w-full lg:w-2/3 xl:w-1/3 h-full p-2 md:p-4 border border-muted/15 bg-surface rounded-xl">
            <h3 className="font-medium text-sm p-2.5 border border-muted/15 rounded-lg"> Requests & Chats </h3>
            <ChatList contacts={contacts} onSelect={onSelectContact} />
          </div>

          {/* Chat Room Outlet */}
          <Outlet />

        </div>
      </div>
    </section>
  );
}
