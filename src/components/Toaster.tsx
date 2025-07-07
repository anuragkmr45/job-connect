// // src/components/Toaster.tsx
// import React, { useEffect } from 'react';
// import { message } from 'antd';
// import type { MessageType } from 'antd/es/message';

// // 1️⃣ Keep a reference to the MessageApi
// let messageApi: ReturnType<typeof message.useMessage>[0] | null = null;

// // 2️⃣ Expose a container component that “plugs in” to AntD’s context
// export const ToasterContainer: React.FC = () => {
//     const [api, contextHolder] = message.useMessage();

//     useEffect(() => {
//         messageApi = api;
//     }, [api]);

//     return <>{contextHolder}</>;
// };

// // 3️⃣ Export a singleton “Toaster” with a .show() method
// export type ToasterType = {
//     show: (opts: {
//         type: MessageType;
//         toastmsg: string;
//         /** optional: override default duration (seconds) */
//         duration?: number;
//     }) => void;
// };

// export const Toaster: ToasterType = {
//     show({ type, toastmsg, duration = 3 }) {
//         if (!messageApi) {
//             // if someone calls Toaster.show before the container mounted
//             console.warn('[Toaster] not yet initialized');
//             return;
//         }
//         messageApi.open({ type, content: toastmsg, duration });
//     }
// };
