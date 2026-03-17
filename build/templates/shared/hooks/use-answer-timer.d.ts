export default function useAnswerTimer(disable?: boolean): {
    userAnswerTime: number;
    clearTimer: () => void;
    getUserAnswerTime: () => {
        time: number;
        total: number;
    };
};
