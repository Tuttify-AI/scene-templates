export default function useImage(): {
    hiddenImageList: {
        [key: string]: boolean | Record<string, never>;
    };
    onImageLoad: (name: string) => void;
    onImageError: (name: string) => void;
};
