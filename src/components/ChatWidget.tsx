// src/components/ChatWidget.tsx
'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { Button, Input } from 'antd';
import { FaRegCommentDots, FaTimes, FaPaperPlane, FaExpand, FaCompress } from 'react-icons/fa';
import { useChat } from '@/hooks/useChat';
import CustomCarousel from '@/components/CustomCarousel';
import JobListingCard from '@/components/cards/JobListingCard';
import type { Job } from '@/types/job';

type Message = {
  from: 'bot' | 'user';
  content: string | ReactNode;
  time: string;
};

const quickActions = [
  'Find jobs near me',
  'Show saved jobs',
  'Update my profile',
  'Download applications',
  'Show interview schedule',
  'Check application status',
  'Career guidance',
];

export default function ChatWidget() {
  /* ─────────── state & hooks ─────────── */
  const [open, setOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      content:
        'Welcome to your AI Career Buddy!\nHow can I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const { send, chatResponse, isLoading, isError } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { Search } = Input;

  /* ───── add incoming messages to thread ───── */
  useEffect(() => {
    if (!chatResponse) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const next: Message[] = [{ from: 'bot', content: chatResponse.reply, time }];

    if (chatResponse.jobs?.length) {
      chatResponse.jobs.forEach((j: Job) =>
        next.push({ from: 'bot', content: <JobListingCard key={j.id} data={j} />, time }),
      );
    }
    setMessages((m) => [...m, ...next]);
  }, [chatResponse]);

  /* ───── always scroll to the newest message ───── */
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  /* ────────── helper to send a message ─────────── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((m) => [...m, { from: 'user', content: text, time }]);
    setInput('');

    try {
      await send(text);
    } catch {
      setMessages((m) => [
        ...m,
        {
          from: 'bot',
          content: 'Sorry, something went wrong. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  /* ────────── toggle fullscreen ─────────── */
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  /* ───────────────────── UI ───────────────────── */
  return (
    <>
      {/* ▾▾▾  POP-UP PANEL  ▾▾▾ */}
      <div
        className={`fixed z-50 bg-white rounded-lg shadow-2xl flex flex-col
  transition-all duration-300 ease-out
  ${open ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'}
  ${isFullscreen
            ? 'top-4 right-4 bottom-4 left-[calc(256px+1rem)] w-auto h-auto lg:left-[calc(256px+1rem)] max-lg:left-4'
            : 'bottom-28 right-6 w-80 max-w-[90vw] h-[28rem]'}`}
      >
        {/* header */}
        <div className="flex items-center justify-between p-3 border-b">
          <span className="font-semibold">Career Buddy</span>
          <div className="flex items-center gap-2">
            <button
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              onClick={toggleFullscreen}
              className="text-gray-500 hover:text-gray-700"
            >
              {isFullscreen ? (
                <FaCompress className="h-4 w-4" />
              ) : (
                <FaExpand className="h-4 w-4" />
              )}
            </button>
            <button
              aria-label="Close chat"
              onClick={() => {
                setOpen(false);
                setIsFullscreen(false);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* messages */}
        <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`${isFullscreen ? 'max-w-2xl' : 'max-w-xs'} px-3 py-2 rounded-lg text-sm
                  ${m.from === 'bot'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-blue-600 text-white'}`}
              >
                {typeof m.content === 'string' ? (
                  <p style={{ whiteSpace: 'pre-wrap' }}>{m.content}</p>
                ) : (
                  m.content
                )}
                <p className="text-[10px] text-gray-500 mt-1 text-right">{m.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* quick-action chips */}
        <div className="px-4">
          <CustomCarousel slidesToShow={2} arrows arrowPosition="center-right" className="py-2">
            {quickActions.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  void handleSend();
                }}
                className="mx-1 px-3 py-1 bg-white border rounded-full hover:bg-gray-50 text-[11px] whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </CustomCarousel>
        </div>

        {/* composer */}
        <div className="border-t px-4 py-3">
          <Search
            placeholder="Type a message…"
            enterButton={
              <Button loading={isLoading} icon={<FaPaperPlane className="-rotate-45" />}>
                Send
              </Button>
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onSearch={handleSend}
            disabled={isLoading}
          />
          {isError && (
            <p className="mt-1 text-xs text-red-500">Failed to send message.</p>
          )}
        </div>
      </div>

      {/* ▾▾▾  FLOATING ICON  ▾▾▾ */}
      <Button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        shape="circle"
        type="primary"
        size="large"
        icon={<FaRegCommentDots className="h-5 w-5" />}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    </>
  );
}
