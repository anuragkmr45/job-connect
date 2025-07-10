// hooks/useHelp.ts
import {
    useGetFaqQuery,
    useSubmitFeedbackMutation,
} from '../services/helpService';
import type { FeedbackRequest } from '../types/help';

export const useHelp = () => {
    // FAQs
    const faqResult = useGetFaqQuery();

    // Feedback
    const [submitFeedback, submitResult] = useSubmitFeedbackMutation();

    const sendFeedback = async (data: FeedbackRequest) => {
        return submitFeedback(data).unwrap();
    };

    return {
        faqResult,
        sendFeedback,
        submitResult,
    };
};
