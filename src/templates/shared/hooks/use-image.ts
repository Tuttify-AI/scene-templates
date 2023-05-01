import { useState } from 'react';

export default function useImage() {
  const [hiddenImageList, setHideImage] = useState<{ [key: string]: boolean | Record<string, never> }>({});

  const onImageLoad = (name: string) => {
    setHideImage({
      ...hiddenImageList,
      [name]: false,
    });
  };

  const onImageError = (name: string) => {
    setHideImage({
      ...hiddenImageList,
      [name]: true,
    });
  };

  return {
    hiddenImageList,
    onImageLoad,
    onImageError,
  };
}
