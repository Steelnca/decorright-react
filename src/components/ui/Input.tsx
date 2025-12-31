
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { ICONS } from "../../icons";

export function Input({className='', ...props}:any) {
    return (
        <>
            <input className={`text-sm h-10 w-full px-2 py-1.5 md:py-2 border border-muted/15 outline-0 bg-emphasis rounded-lg focus:border-primary/45 ${className}`} {...props} />
        </>
    )
}

export function EmailInput({ id = 'email_field', label = 'Email', ...props }) {
  return (
    <div className="relative flex items-center">
      <Input id={id} type={'email'} placeholder="email@example.com" className="px-9 sm:px-10 md:pr-12" {...props} />

      {/* Password Icon Placeholder */}
      <span className="absolute px-2 left-1 sm:left-1.5"> {ICONS.envelope({className:'size-4 text-muted/75'})} </span>

    </div>
  );
}

export function PasswordInput({ id = 'password_field', label = 'Password', ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex items-center">
      <Input id={id} type={show ? 'text' : 'password'} placeholder={label} className="px-9 sm:px-10 md:pr-12" {...props} />

      {/* Password Icon Placeholder */}
      <span className="absolute px-2 left-1 sm:left-1.5"> {ICONS.key({className:'size-4 text-muted/75'})} </span>

      {/* Show/Hide Icon Placeholder */}
      <button type="button" onClick={() => setShow(s => !s)}
        aria-pressed={show} aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute px-2 right-1 sm:right-1.5 border-l border-muted/15"
      >
        {show ? ICONS.eyeSlash({className:'size-5 text-muted/75'}) : ICONS.eye({className:'size-5 text-muted/75'})}
      </button>
    </div>
  );
}

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  minRows?: number; // default 1
  maxRows?: number; // default 5
  // optional: pass other textarea props via ...rest if you want
};

export function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
  className = "",
  minRows = 1,
  maxRows = 5,
}: Props) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);

  // Resize function: set height based on scrollHeight but cap to maxRows
  const resize = () => {
    const ta = taRef.current;
    if (!ta) return;

    // reset height so scrollHeight is correct for current content
    ta.style.height = "auto";

    // try to read computed line-height, fallback to 20px if not available
    const cs = getComputedStyle(ta);
    let lineHeight = parseFloat(cs.lineHeight);
    if (!Number.isFinite(lineHeight) || lineHeight === 0) lineHeight = 20;

    // compute max height allowed
    const maxHeight = lineHeight * maxRows;

    // determine new height (scrollHeight includes padding)
    const newHeight = Math.min(ta.scrollHeight, maxHeight);

    ta.style.height = `${newHeight}px`;
    // show vertical scroll only if content exceeds max height
    ta.style.overflowY = ta.scrollHeight > maxHeight ? "auto" : "hidden";
  };

  // Resize on mount and whenever value changes
  useLayoutEffect(() => {
    resize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, maxRows]);

  return (
    <textarea
      ref={taRef}
      rows={minRows} // initial visible rows
      value={value}
      onChange={onChange}
      onInput={resize} // safe to call again while typing
      placeholder={placeholder}
      className={className}
      aria-label={placeholder ?? "input"}
    />
  );
}
