import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { SceneValue } from '../shared/types';
import { clsx, getElementValue, getNumber } from '../shared/utils';
import Bubble from './bubble';
import styles from './styles.module.css';
import { TenFramesElements } from './types';
import useParams from './hooks/use-params';

type BubbleItem = {
  index: number;
  color: string;
  count: number;
};

type Props = {
  values?: TenFramesElements<SceneValue>;
  editMode?: boolean;
  showBubbles?: boolean;
  operationNumbersArray: ReturnType<typeof useParams>['operationNumbersArray'];
};

const Bubbles: React.FC<Props> = ({ values, editMode, showBubbles, operationNumbersArray }) => {
  const getValue = useMemo(() => getElementValue<TenFramesElements>(values), [values]);

  const countArray: BubbleItem[] = useMemo(
    () =>
      operationNumbersArray.map((value, index) => ({
        index: index,
        color: `bubble_${index + 1}_background`,
        count: showBubbles ? getNumber(value, 0) : 0,
      })),
    [operationNumbersArray, showBubbles]
  );

  const totalBubbles = useMemo(() => Array.from(Array(10).keys()), []);
  const [stateArr, setStateArr] = useState<BubbleItem[]>(countArray);

  useEffect(() => {
    if (editMode) {
      setStateArr(countArray);
    }
  }, [editMode, countArray]);

  const handleBubbleClick = useCallback(
    (i: number, isAdd?: boolean) => () => {
      if (!editMode && !showBubbles) {
        const current = stateArr.find((a: BubbleItem) => a.index === i);
        if (current) {
          if (isAdd && current.count < totalBubbles.length)
            setStateArr(stateArr.map((a: BubbleItem) => (a.index === i ? { ...a, count: a.count + 1 } : a)));
          else if (current?.count > 0) {
            setStateArr(stateArr.map((a: BubbleItem) => (a.index === i ? { ...current, count: a.count - 1 } : a)));
          } else return;
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
                  hidden={item.count <= index}
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
