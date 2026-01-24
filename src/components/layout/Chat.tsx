import { Link, NavLink, useParams } from "react-router-dom";
import { images } from "@/constants";
import { ICONS } from "@/icons";
import { AutoResizeTextarea } from "@components/ui/Input";
import React, { useState, useEffect, useRef } from "react";
import { MessageItem } from "../ui/Chat";
import { useAuth } from "@/contexts/AuthProvider";
import { RequestService } from "@/services/request.service";
import { ChatService } from "@/services/chat.service";

import type { Message } from "@/types/chat";
import { PATHS } from "@/routers/Paths";

export function ChatLayout() {
  const { user } = useAuth();
  const { id: requestIdFromUrl } = useParams<{ id: string }>();

  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all requests for the current user
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await RequestService.getMyRequests();
        setRequests(data);

        // If there's an ID in the URL, set it as selected
        if (requestIdFromUrl) {
          const found = data.find(r => r.id === requestIdFromUrl);
          if (found) setSelectedRequest(found);
        }
      } catch (err) {
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRequests();
    }
  }, [user, requestIdFromUrl]);

  // Fetch messages for the selected request
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedRequest) return;

      try {
        const data = await ChatService.getMessages(selectedRequest.id);
        const formattedMessages = data.map((m: any) => ({
          id: m.id,
          kind: m.message_type.toLowerCase() === 'text' ? 'text' :
            m.message_type.toLowerCase() === 'image' ? 'file' :
              m.message_type.toLowerCase() === 'audio' ? 'voice' : 'text',
          uid: m.sender_id,
          timestamp: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: m.content,
          url: m.media_url,
          filename: m.content || 'attachment',
        }));
        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    // Subscribe to real-time updates
    let subscription: any;
    if (selectedRequest) {
      subscription = ChatService.subscribeToRequestChat(selectedRequest.id, (newMessage: any) => {
        const formattedMsg = {
          id: newMessage.id,
          kind: newMessage.message_type.toLowerCase() === 'text' ? 'text' :
            newMessage.message_type.toLowerCase() === 'image' ? 'file' :
              newMessage.message_type.toLowerCase() === 'audio' ? 'voice' : 'text',
          uid: newMessage.sender_id,
          timestamp: new Date(newMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: newMessage.content,
          url: newMessage.media_url,
          filename: newMessage.content || 'attachment',
        };
        setMessages(prev => {
          // Avoid duplicate messages if already present (e.g. from optimistic update or fetch)
          if (prev.find(m => m.id === formattedMsg.id)) return prev;
          return [...prev, formattedMsg];
        });
      });
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [selectedRequest]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedRequest && user) {
      const content = message.trim();
      setMessage(''); // Clear input early for better UX

      try {
        await ChatService.sendMessage({
          requestId: selectedRequest.id,
          content: content,
          messageType: 'TEXT'
        });
        // Real-time subscription will handle adding the message to the list
      } catch (err) {
        console.error("Error sending message:", err);
        // Optionally restore the message to the input if it fails
        setMessage(content);
      }
    }
  };

  return (
    <section className="h-hero w-full px-3 sm:px-6 md:px-8">
      <div className="content-container w-full h-full">
        <div className="flex gap-4 w-full h-full">
          {/* Chat List */}
          <div className="max-md:hidden flex flex-col gap-2 md:gap-4 w-full lg:w-2/3 xl:w-1/3 h-full p-2 md:p-4 border border-muted/25 bg-surface/25 rounded-2xl">
            <h3 className="font-medium text-sm p-2.5 border border-muted/15 rounded-lg"> My Requests & Chats </h3>
            <ul className="space-y-2 overflow-y-auto min-scrollbar">
              {loading ? (
                <li className="p-4 text-center text-xs">Loading requests...</li>
              ) : requests.length > 0 ? (
                requests.map((request: any) => (
                  <li key={request.id} className={`w-full rounded-lg hover:bg-surface border border-muted/10 hover:border-muted/15 overflow-hidden ${selectedRequest?.id === request.id ? 'bg-surface ring-1 ring-primary/20' : 'bg-surface/45'}`}>
                    <NavLink to={PATHS.CLIENT.chatRoom(request.id)} className="flex items-center gap-2 w-full h-fit p-2">
                      {/* Avatar */}
                      <div className="h-fit w-12 aspect-square rounded-full border border-muted/45 overflow-hidden bg-emphasis flex items-center justify-center">
                        {ICONS.pencilSquare({ className: "size-6 text-muted" })}
                      </div>

                      {/* Context */}
                      <div className="flex flex-col w-full h-fit">
                        <h3 className="font-medium text-sm"> {request.request_code} </h3>
                        <p className="text-2xs text-muted"> {(request.service_types?.display_name_en || 'Unknown').replace(/_/g, ' ')} </p>
                        <span className="text-2xs text-muted"> {new Date(request.created_at).toLocaleDateString()} </span>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-2xs ${request.status === 'Completed' ? 'bg-success/10 text-success' :
                          request.status === 'Cancelled' ? 'bg-danger/10 text-danger' : 'bg-primary/10 text-primary'
                          }`}>
                          {request.status}
                        </span>
                      </div>
                    </NavLink>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-xs text-muted">No requests found</li>
              )}
            </ul>
          </div>

          {/* Chat DM */}
          <div className="flex flex-col w-full h-full p-2 sm:p-4 border border-muted/25 bg-surface/25 rounded-2xl">
            {selectedRequest ? (
              <>
                {/* Chat Header & Details */}
                <div className="flex items-center gap-3 w-full p-2 pb-4 border-b border-muted/15">
                  <nav className="w-fit h-fit md:hidden">
                    <Link to={PATHS.CLIENT.CHAT} className="flex p-2 border border-muted/15 bg-surface/25 rounded-full"> {ICONS.arrowLeft({})} </Link>
                  </nav>

                  <div className="flex items-center gap-2 w-full h-full">
                    {/* Avatar */}
                    <div className="w-12 aspect-square rounded-full border border-muted/45 overflow-hidden bg-primary/10 flex items-center justify-center">
                      {ICONS.userCircle({ className: "size-8 text-primary" })}
                    </div>

                    {/* Context */}
                    <div className="flex flex-col w-full h-fit">
                      <h3 className="font-medium text-sm"> {selectedRequest.request_code} </h3>
                      <span className="text-2xs text-muted"> {selectedRequest.status} • {(selectedRequest.space_type || 'Unknown').replace(/_/g, ' ')} </span>
                    </div>
                  </div>
                </div>

                {/* Chat Body & Content */}
                <div className="relative flex flex-col gap-8 w-full h-full py-4 px-2 overflow-y-scroll min-scrollbar" role="list">
                  {messages.length > 0 ? (
                    messages.map((m) => (
                      <div role="listitem" key={m.id}>
                        <MessageItem message={m} currentUserId={user?.id || ''} />
                      </div>
                    ))
                  ) : (
                    <div className="relative flex flex-col items-center justify-center w-full h-full opacity-50">
                      {ICONS.chatBubbleOvalLeftEllipsis({ className: "size-12 mb-4 text-muted" })}
                      <h4 className="font-semibold text-lg mb-1"> No messages yet </h4>
                      <p className="text-sm"> Send a message to start the conversation for this request </p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Form */}
                <form action={'.'} method="post" onSubmit={handleSendMessage} className="flex items-center gap-4 w-full h-fit p-2 border border-muted/25 rounded-xl bg-surface/50">
                  <AutoResizeTextarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                    minRows={1}
                    maxRows={5}
                    className="resize-none w-full h-fit px-2 outline-0 bg-transparent text-sm"
                  />

                  {/* Options */}
                  <div className="flex items-end gap-2 h-full">
                    <div className={`${message && 'hidden'} flex gap-2`}>
                      <button type="button" className="p-2 bg-emphasis rounded-lg ring-1 ring-muted/25 hover:bg-muted/10 transition-colors">
                        {ICONS.photo({ className: 'size-5 text-foreground' })}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={!message.trim()}
                      className={`${!message.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} p-2 h-fit bg-primary rounded-lg transition-all`}
                    >
                      {ICONS.paperAirplane({ className: 'size-5 text-white' })}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-center">
                <div className="p-6 rounded-full bg-primary/5 mb-6">
                  {ICONS.chatBubbleOvalLeftEllipsis({ className: "size-16 text-primary/40" })}
                </div>
                <h3 className="text-xl font-semibold mb-2"> Select a Request </h3>
                <p className="text-muted text-sm max-w-xs"> Choose one of your service requests from the list to view its chat history and send messages. </p>
                <div className="md:hidden mt-8">
                  <Link to={PATHS.CLIENT.CHAT} className="text-primary font-medium flex items-center gap-2">
                    {ICONS.arrowLeft({ className: "size-4" })} Go back to list
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}