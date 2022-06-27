import React from 'react';

type Props = {
  selectedLetter: string | null;
  setSelectedLetter: (l: string | null) => void;
  answerArray: string[];
};
const useLetterAction = ({ selectedLetter, setSelectedLetter, answerArray }: Props) => {
  const handleLetterClick = (letter: string) => () => {
    if (letter === selectedLetter) {
      setSelectedLetter(null);
    } else setSelectedLetter(letter);
  };

  const handleSetAnswer = (index: number) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (selectedLetter) {
      answerArray.splice(index, 1, selectedLetter);
      setSelectedLetter(null);
    }
    return;
  };

  return {
    handleLetterClick,
    handleSetAnswer,
  };
};

export default useLetterAction;
