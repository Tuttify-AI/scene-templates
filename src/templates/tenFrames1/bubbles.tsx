import React, { useCallback, useState } from 'react';
import { clsx } from '../shared/utils';
import Bubble from './bubble';
import styles from './styles.module.css';

type BubbleItem = {
  index: number;
  color: string;
  count: string[];
};

type Props = {
  arrLength: number;
  isPreview?: boolean;
};

const COUNT_ARRAY: BubbleItem[] = [
  {
    index: 0,
    color: 'yellow',
    count: [],
  },
  {
    index: 1,
    color: 'red',
    count: [],
  },
  {
    index: 2,
    color: 'blue',
    count: [],
  },
  {
    index: 3,
    color: 'green',
    count: [],
  },
];

const Bubbles: React.FC<Props> = ({ arrLength = 4, isPreview }) => {
  const arr: BubbleItem[] = COUNT_ARRAY.slice(0, arrLength);
  const [stateArr, setStateArr] = useState<BubbleItem[]>(arr as BubbleItem[]);
  const handleBubbleClick = useCallback(
    (i: number, isAdd?: boolean) => () => {
      if (isPreview) {
        const current = stateArr.find((a: BubbleItem) => a.index === i);
        if (isAdd && current) {
          if (current.count.length < 10)
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
    [isPreview, stateArr]
  );
  return (
    <div className={clsx(styles.bubbleContainer, isPreview)}>
      <div className={styles.mainBubble}>
        {arr?.map(item => (
          <div key={item.index} className={styles.bubbleWrapper}>
            <Bubble color={item.color} onClick={handleBubbleClick(item.index, true)} />
          </div>
        ))}
      </div>
      <div className={styles.countBubble}>
        {stateArr?.map((item: BubbleItem) => (
          <div key={item.index} className={styles.countContainer}>
            {item?.count.length ? (
              item?.count.map((c, index) => (
                <div key={index + c} className={styles.bubbleWrapper} style={{ borderRight: 'none' }}>
                  <Bubble color={item.color} onClick={handleBubbleClick(item.index)} />
                </div>
              ))
            ) : (
              <div className={styles.bubbleWrapper} style={{ borderRight: 'none', minHeight: '74px' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bubbles;
