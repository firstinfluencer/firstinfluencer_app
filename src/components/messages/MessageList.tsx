import React, { useRef, useEffect } from 'react';
import { Message } from '@/types/messages';
import { BrandMessage } from './BrandMessage';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <BrandMessage
          key={message.id}
          message={message}
          isApplication={message.content.includes('Application for')}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}