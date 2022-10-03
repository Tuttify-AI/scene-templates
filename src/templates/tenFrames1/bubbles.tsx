import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { SceneValue } from '../shared/types';
import { clsx, getElementValue } from '../shared/utils';
import Bubble from './bubble';
import styles from './styles.module.css';
import { CountingElements } from './types';

type BubbleItem = {
  index: number;
  color: string;
  count: string[];
};

type Props = {
  values?: CountingElements<SceneValue>;
  arrLength: number;
  editMode?: boolean;
};

const Bubbles: React.FC<Props> = ({ values, arrLength = 4, editMode }) => {
  const getValue = useMemo(() => getElementValue<CountingElements>(values), [values]);
  const COUNT_ARRAY: BubbleItem[] = useMemo(
    () => [
      {
        index: 0,
        color: `bubble_1_background`,
        count: [],
      },
      {
        index: 1,
        color: 'bubble_2_background',
        count: [],
      },
      {
        index: 2,
        color: 'bubble_3_background',
        count: [],
      },
      {
        index: 3,
        color: 'bubble_4_background',
        count: [],
      },
    ],
    []
  );

  const totalBubbles = useMemo(() => Array.from(Array(10).keys()), []);
  const arr = useMemo(() => COUNT_ARRAY.slice(0, arrLength), [COUNT_ARRAY, arrLength]);
  const [stateArr, setStateArr] = useState<BubbleItem[]>(arr as BubbleItem[]);

  useEffect(() => {
    if (editMode) {
      setStateArr(arr);
    }
  }, [editMode, arr]);

  const handleBubbleClick = useCallback(
    (i: number, isAdd?: boolean) => () => {
      if (!editMode) {
        const current = stateArr.find((a: BubbleItem) => a.index === i);
        if (isAdd && current) {
          if (current.count.length < totalBubbles.length)
            setStateArr(stateArr.map((a: BubbleItem) => (a.index === i ? { ...a, count: [...a.count, '+'] } : a)));
          else return;
        } else {
          current && current.count.pop();
          if (current && current?.count.length > 0)
            setStateArr(stateArr.map((a: BubbleItem) => (a.index === i ? { ...current } : a)));
          else return;
        }
      } else return;
    },
    [editMode, stateArr, totalBubbles]
  );

  return (
    <div className={clsx(styles.bubbleContainer, editMode)}>
      <div className={styles.mainBubble}>
        {arr?.map(item => (
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
