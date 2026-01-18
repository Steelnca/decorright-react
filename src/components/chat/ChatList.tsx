
// ChatList.tsx (small presentational)

import type { ChatRoom } from "@/types/chat";

export default function ChatList({
  contacts,
  onSelect,
  selectedId
}: {
  contacts: ChatRoom[],
  onSelect: (c: ChatRoom) => void,
  selectedId?: string
}) {
  return (
    <ul className="space-y-2 overflow-y-auto min-scrollbar">
      {contacts.map(c => {
        const profile = c.service_requests?.profiles;
        const lastMsg = c.last_message;
        const time = lastMsg ? new Date(lastMsg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';

        return (
          <li
            key={c.id}
            onClick={() => onSelect(c)}
            className={`w-full rounded-lg cursor-pointer transition-colors p-3 ${selectedId === c.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-emphasis'}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative shrink-0 w-12 aspect-square rounded-full overflow-hidden border border-muted/15">
                <img
                  src="/user.png"
                  alt=""
                  className="w-full h-full object-cover"
                />
                {c.unread_count && c.unread_count > 0 ? (
                  <span className="absolute top-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-surface"></span>
                ) : null}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-semibold text-sm truncate">{profile?.full_name || 'Anonymous User'}</h3>
                  <span className="text-3xs text-muted shrink-0">{time}</span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-xs text-muted truncate">
                    {lastMsg ? lastMsg.content : 'No messages yet'}
                  </p>
                  {c.unread_count && c.unread_count > 0 ? (
                    <span className="bg-primary text-white text-3xs font-bold px-1.5 py-0.5 rounded-full">
                      {c.unread_count}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
