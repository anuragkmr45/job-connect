// hooks/useChat.ts
import { useSendChatMessageMutation } from '../services/chatService';

export const useChat = () => {
    const [
        sendChatMessage,
        { data: chatResponse, isLoading, isError, error }
    ] = useSendChatMessageMutation();

    /**
     * send() will POST { message } and return the parsed ChatResponse
     */
    const send = async (message: string) => {
        return await sendChatMessage({ message }).unwrap();
    };

    return {
        send,
        chatResponse,
        isLoading,
        isError,
        error,
    };
};
