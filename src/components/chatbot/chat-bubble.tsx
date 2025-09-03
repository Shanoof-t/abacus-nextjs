"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

function ChatBubble({
  text,
  defaultClassName,
  isUser = false,
}: {
  text: string;
  defaultClassName: string;
  isUser?: boolean;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    if (bubbleRef.current) {
      const el = bubbleRef.current;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const lines = Math.round(el.scrollHeight / lineHeight);
      setIsMultiLine(lines > 1);
    }
  }, [text]);

  return (
    <div
      ref={bubbleRef}
      className={`${defaultClassName} ${
        isMultiLine ? "rounded-3xl" : "rounded-2xl"
      }`}
    >
      <div
        className={`text-xs lg:text-sm font-medium font-sans ${
          isUser ? "text-neutral-800" : "text-white"
        }`}
      >
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatBubble;
