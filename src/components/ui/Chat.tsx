

/** ---- Types ---- */
export type BaseMessage = {
  id: string;
  from: "me" | "them";
  time: string; // ISO or human string
};

export type TextMsg = BaseMessage & {
  kind: "text";
  text: string;
};

export type VoiceMsg = BaseMessage & {
  kind: "voice";
  url: string;       // audio file URL
  duration?: number; // seconds (optional)
};

export type FileMsg = BaseMessage & {
  kind: "file";
  url: string;       // file URL
  filename: string;
  size?: number;     // bytes (optional)
};

export type Message = TextMsg | VoiceMsg | FileMsg;

/** ---- Text message component ---- */
export function TextMessage({ message, ...props }: { message: TextMsg, props:any }) {
  return (
    <div className={`message message--${message.from} flex flex-col gap-0.5 max-w-10/12`} data-kind="text" data-id={message.id} {...props}>
      <div className="message__bubble">
        <div className={`message__text message--text--${message.from} w-fit px-3 py-2 text-sm rounded-lg`}>{message.text}</div>
      </div>
      <div className={`message--time--${message.from} text-3xs md:text-2xs text-muted px-1`}>{message.time}</div>
    </div>
  );
}

/** ---- Voice message component ----
 *  Using a native <audio> control keeps it tiny and functional.
 */
export function VoiceMessage({ message, ...props }: { message: VoiceMsg, props:any }) {
  return (
    <div className={`message message--${message.from}`} data-kind="voice" data-id={message.id} {...props}>
      <div className="message__bubble">
        {/* native audio controls — you can replace with custom UI later */}
        <audio controls src={message.url}>
          Your browser does not support the <code>audio</code> element.
        </audio>

        {/* optional duration display if provided
        {typeof message.duration === "number" && (
          <div className="message__duration text-2xs md:text-xs text-muted">{Math.round(message.duration)}s</div>
        )}*/}
      </div>
      <div className="text-2xs md:text-xs text-muted px-1">{message.time}</div>
    </div>
  );
}

/** ---- File / upload message component ---- */
export function FileMessage({ message, ...props }: { message: FileMsg, props:any }) {
  const humanSize = (n?: number) =>
    !n ? "" : n > 1_000_000 ? `${Math.round(n / 1_000_000)} MB` : `${Math.round(n / 1000)} KB`;

  return (
    <div className={`message message--${message.from}`} data-kind="file" data-id={message.id} {...props}>
      <div className="message__bubble">
        <a href={message.url} target="_blank" rel="noreferrer noopener" className="message__filelink">
          <div className="message__filename">{message.filename}</div>
          {/* <div className="message__filesize">{humanSize(message.size)}</div> */}
        </a>
      </div>
      <div className="text-2xs md:text-xs text-muted px-1">{message.time}</div>
    </div>
  );
}

/** ---- MessageItem: choose which component to render ---- */
export function MessageItem({ message, ...props}:any) {
  switch (message.kind) {
    case "text":
      return <TextMessage message={message} {...props} />;
    case "voice":
      return <VoiceMessage message={message} {...props} />;
    case "file":
      return <FileMessage message={message} {...props} />;
    default:
      return null;
  }
}


