// 'use client';

// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '@/components/layouts/DashboardLayout';
// import CustomCarousel from '@/components/CustomCarousel';
// import { Input, Button } from 'antd';
// import {
//   HiSearch,
//   HiOutlineUserCircle,
//   HiClipboardList,
//   HiCalendar,
//   HiOutlineDownload,
//   HiChat,
// } from 'react-icons/hi';
// import CardLayout from '@/components/layouts/CardLayout';
// import { useChat } from '@/hooks/useChat';

// type Message = {
//   from: 'bot' | 'user';
//   text: string;
//   time: string;
// };

// export default function ChatAssistant() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       from: 'bot',
//       text: `Welcome to your AI Career Assistant! I’m standing by to help with your mission objectives. How can I assist you today?`,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//     },
//   ]);
//   const [input, setInput] = useState('');
//   const { send, chatResponse, isLoading, isError } = useChat();

//   // When a new chatResponse arrives, append it as a bot message
//   useEffect(() => {
//     if (!chatResponse) return;
//     const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     setMessages((msgs) => [
//       ...msgs,
//       { from: 'bot', text: chatResponse.reply, time },
//       // if jobs are returned, render them as additional text
//       ...(chatResponse.jobs?.length
//         ? chatResponse.jobs.map((job) => ({
//           from: 'bot' as const,
//           text: `• ${job.title} at ${job.company.display_name} (${job.location.display_name})`,
//           time,
//         }))
//         : []),
//     ]);
//   }, [chatResponse]);

//   const handleSend = async () => {
//     const text = input.trim();
//     if (!text) return;
//     const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     // append user message
//     setMessages((msgs) => [...msgs, { from: 'user', text, time }]);
//     setInput('');

//     try {
//       await send(text);
//     } catch {
//       // on error, append an error message
//       setMessages((msgs) => [
//         ...msgs,
//         {
//           from: 'bot',
//           text: 'Sorry, something went wrong. Please try again.',
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//         },
//       ]);
//     }
//   };

//   const { Search } = Input;

//   const quickActions = [
//     'Find jobs near me',
//     'Show saved jobs',
//     'Update my profile',
//     'Download applications',
//     'Show interview schedule',
//     'Check application status',
//     'Career guidance',
//   ].map((label) => ({ label }));

//   const helpItems = [
//     { icon: HiSearch, text: 'Job Recommendations' },
//     { icon: HiOutlineUserCircle, text: 'Profile Analysis' },
//     { icon: HiClipboardList, text: 'Application Status' },
//     { icon: HiCalendar, text: 'Interview Scheduling' },
//     { icon: HiOutlineDownload, text: 'Document Export' },
//     { icon: HiChat, text: 'Career Guidance' },
//   ];

//   return (
//     <DashboardLayout>
//       <div className="bg-gray-100 grid grid-cols-6 gap-4">
//         {/* ── Chat Column ─────────────────────────────────────────── */}
//         <div className="flex-1 flex flex-col col-span-4">
//           <CardLayout bordered className="flex-1 flex flex-col justify-between h-full">
//             {/* Chat messages */}
//             <div className="flex-1 overflow-auto space-y-4 px-6 py-4">
//               {messages.map((m, i) => (
//                 <div
//                   key={i}
//                   className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
//                 >
//                   <div
//                     className={`max-w-xs px-4 py-2 rounded-lg ${m.from === 'bot'
//                       ? 'bg-gray-200 text-gray-800'
//                       : 'bg-blue-600 text-white'
//                       }`}
//                   >
//                     <p>{m.text}</p>
//                     <p className="text-xs text-gray-500 mt-1 text-right">{m.time}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Quick-action carousel */}
//             <div className="px-6">
//               <CustomCarousel
//                 slidesToShow={4}
//                 arrows
//                 arrowPosition="center-right"
//                 className="py-2"
//               >
//                 {quickActions.map((act) => (
//                   <button
//                     key={act.label}
//                     onClick={() => {
//                       setInput(act.label);
//                       void handleSend();
//                     }}
//                     className="mx-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50 text-xs whitespace-nowrap"
//                   >
//                     <span className="text-xs">{act.label}</span>
//                   </button>
//                 ))}
//               </CustomCarousel>
//             </div>

//             {/* Chat input */}
//             <div className="px-6 py-4 border-t border-gray-200">
//               <Search
//                 placeholder="Type a message or ask for help…"
//                 enterButton={<Button loading={isLoading}>Send</Button>}
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onSearch={handleSend}
//                 disabled={isLoading}
//               />
//               {isError && (
//                 <p className="text-red-500 text-sm mt-2">Failed to send message.</p>
//               )}
//             </div>
//           </CardLayout>
//         </div>

//         {/* ── Sidebar ─────────────────────────────────────────────── */}
//         <div className="w-80 p-4 flex flex-col space-y-4 col-span-2">
//           <CardLayout
//             header={<h3 className="text-lg font-semibold">What I Can Help You With</h3>}
//             bordered
//           >
//             <div className="space-y-2">
//               {helpItems.map((it) => (
//                 <div
//                   key={it.text}
//                   className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
//                 >
//                   <it.icon className="h-5 w-5 text-gray-600" />
//                   <span>{it.text}</span>
//                 </div>
//               ))}
//             </div>
//           </CardLayout>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import CustomCarousel from '@/components/CustomCarousel';
import { Input, Button } from 'antd';
import {
  HiSearch,
  HiOutlineUserCircle,
  HiClipboardList,
  HiCalendar,
  HiOutlineDownload,
  HiChat,
} from 'react-icons/hi';
import CardLayout from '@/components/layouts/CardLayout';
import { useChat } from '@/hooks/useChat';
import JobListingCard from '@/components/cards/JobListingCard';
import type { Job } from '@/types/job';

// Updated Message type to accept string or JSX
type Message = {
  from: 'bot' | 'user';
  content: string | ReactNode;
  time: string;
};

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      from: 'bot',
      content: `Welcome to your AI Career Assistant! I’m standing by to help with your mission objectives. How can I assist you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const { send, chatResponse, isLoading, isError } = useChat();

  useEffect(() => {
    if (!chatResponse) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsgs: Message[] = [
      { from: 'bot', content: chatResponse.reply, time },
    ];

    if (chatResponse.jobs?.length) {
      chatResponse.jobs.forEach((job: Job) => {
        newMsgs.push({
          from: 'bot',
          content: <JobListingCard key={job.id} data={job} />,
          time,
        });
      });
    }

    setMessages((msgs) => [...msgs, ...newMsgs]);
  }, [chatResponse]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((msgs) => [...msgs, { from: 'user', content: text, time }]);
    setInput('');

    try {
      await send(text);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          from: 'bot',
          content: 'Sorry, something went wrong. Please try again.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const { Search } = Input;

  const quickActions = [
    'Find jobs near me',
    'Show saved jobs',
    'Update my profile',
    'Download applications',
    'Show interview schedule',
    'Check application status',
    'Career guidance',
  ].map((label) => ({ label }));

  const helpItems = [
    { icon: HiSearch, text: 'Job Recommendations' },
    { icon: HiOutlineUserCircle, text: 'Profile Analysis' },
    { icon: HiClipboardList, text: 'Application Status' },
    { icon: HiCalendar, text: 'Interview Scheduling' },
    { icon: HiOutlineDownload, text: 'Document Export' },
    { icon: HiChat, text: 'Career Guidance' },
  ];

  return (
    <DashboardLayout>
      <div className="bg-gray-100 grid grid-cols-6 gap-4">
        {/* Chat Column */}
        <div className="flex-1 flex flex-col col-span-4">
          <CardLayout bordered className="flex-1 flex flex-col justify-between h-full">
            {/* Chat messages */}
            <div className="flex-1 overflow-auto space-y-4 px-6 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${m.from === 'bot' ? 'bg-gray-200 text-gray-800' : 'bg-blue-600 text-white'
                      }`}
                  >
                    {typeof m.content === 'string' ? (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{m.content}</p>
                    ) : (
                      m.content
                    )}
                    <p className="text-xs text-gray-500 mt-1 text-right">{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick-action carousel */}
            <div className="px-6">
              <CustomCarousel
                slidesToShow={4}
                arrows
                arrowPosition="center-right"
                className="py-2"
              >
                {quickActions.map((act) => (
                  <button
                    key={act.label}
                    onClick={() => {
                      setInput(act.label);
                      void handleSend();
                    }}
                    className="mx-2 px-4 py-2 bg-white border rounded-full hover:bg-gray-50 text-xs whitespace-nowrap"
                  >
                    <span className="text-xs">{act.label}</span>
                  </button>
                ))}
              </CustomCarousel>
            </div>

            {/* Chat input */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Search
                placeholder="Type a message or ask for help…"
                enterButton={<Button loading={isLoading}>Send</Button>}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onSearch={handleSend}
                disabled={isLoading}
              />
              {isError && (
                <p className="text-red-500 text-sm mt-2">Failed to send message.</p>
              )}
            </div>
          </CardLayout>
        </div>

        {/* Sidebar */}
        <div className="w-80 p-4 flex flex-col space-y-4 col-span-2">
          <CardLayout
            header={<h3 className="text-lg font-semibold">What I Can Help You With</h3>}
            bordered
          >
            <div className="space-y-2">
              {helpItems.map((it) => (
                <div
                  key={it.text}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                >
                  <it.icon className="h-5 w-5 text-gray-600" />
                  <span>{it.text}</span>
                </div>
              ))}
            </div>
          </CardLayout>
        </div>
      </div>
    </DashboardLayout>
  );
}
