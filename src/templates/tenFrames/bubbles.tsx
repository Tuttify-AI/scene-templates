import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { DefaultType, SceneValue } from '../shared/types';
import { clsx, getElementValue } from '../shared/utils';
import Bubble from './bubble';
import styles from './styles.module.css';
import { TenFramesElements } from './types';

type BubbleItem = {
  index: number;
  color: string;
  count: string[];
};

type Props = {
  values?: TenFramesElements<SceneValue>;
  arrLength: number;
  editMode?: boolean;
  showBubbles?: boolean;
  operationNumbersArray: DefaultType[];
};

const Bubbles: React.FC<Props> = ({ values, arrLength = 4, editMode, showBubbles, operationNumbersArray }) => {
  const getValue = useMemo(() => getElementValue<TenFramesElements>(values), [values]);
  const arr1 = useMemo(
    () => (operationNumbersArray[0] ? new Array(Number(operationNumbersArray[0])).fill('+') : []),
    [operationNumbersArray]
  );
  const arr2 = useMemo(
    () => (operationNumbersArray[1] ? new Array(Number(operationNumbersArray[1])).fill('+') : []),
    [operationNumbersArray]
  );
  const arr3 = useMemo(
    () => (operationNumbersArray[2] ? new Array(Number(operationNumbersArray[2])).fill('+') : []),
    [operationNumbersArray]
  );
  const arr4 = useMemo(
    () => (operationNumbersArray[3] ? new Array(Number(operationNumbersArray[3])).fill('+') : []),
    [operationNumbersArray]
  );
  const COUNT_ARRAY: BubbleItem[] = useMemo(
    () => [
      {
        index: 0,
        color: `bubble_1_background`,
        count: showBubbles ? arr1 : [],
      },
      {
        index: 1,
        color: 'bubble_2_background',
        count: showBubbles ? arr2 : [],
      },
      {
        index: 2,
        color: 'bubble_3_background',
        count: showBubbles ? arr3 : [],
      },
      {
        index: 3,
        color: 'bubble_4_background',
        count: showBubbles ? arr4 : [],
      },
    ],
    [arr1, arr2, arr3, arr4, showBubbles]
  );

  const totalBubbles = useMemo(() => Array.from(Array(10).keys()), []);
  const arr = useMemo(() => Array.from(COUNT_ARRAY.slice(0, arrLength)), [COUNT_ARRAY, arrLength]);
  const [stateArr, setStateArr] = useState<BubbleItem[]>(arr as BubbleItem[]);

  useEffect(() => {
    if (editMode) {
      setStateArr(arr);
    }
  }, [editMode, COUNT_ARRAY, arrLength, arr]);

  const handleBubbleClick = useCallback(
    (i: number, isAdd?: boolean) => () => {
      if (!editMode && !showBubbles) {
        const current = stateArr.find((a: BubbleItem) => a.index === i);
        if (isAdd && current) {
          if (current.count.length < totalBubbles.length)
            setStateArr(stateArr.map((a: BubbleItem) => (a.index === i ? { ...a, count: [...a.count, '+'] } : a)));
          else return;
        } else {
          current && current.count.shift();
          if (current && current?.count.length > 0)
            setStateArr(stateArr.map((a: BubbleItem) => (a.index === i ? { ...current } : a)));
          else return;
        }
      } else return;
    },
    [editMode, showBubbles, stateArr, totalBubbles.length]
  );

  return (
    <div className={clsx(styles.bubbleContainer, editMode)}>
      <div className={styles.mainBubble}>
        {stateArr?.map(item => (
          <div key={item.index} className={styles.bubbleWrapper}>
            <Bubble getValue={getValue} color={item.color} onClick={handleBubbleClick(item.index, true)} />
          </div>
        ))}
      </div>
      <div className={styles.countBubble}>
        {stateArr?.map((item: BubbleItem) => (
          <div key={item.index} className={styles.countContainer}>
            {totalBubbles.map((c, index) => (
              <div key={index + c} className={styles.bubbleWrapper} style={{ borderRight: 'none' }}>
                <Bubble
                  getValue={getValue}
                  color={item.color}
                  onClick={handleBubbleClick(item.index)}
                  hidden={!item.count[index]}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bubbles;
