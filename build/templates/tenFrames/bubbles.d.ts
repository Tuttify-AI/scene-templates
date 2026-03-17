import React from 'react';
import { SceneValue } from '../shared/types';
import { TenFramesElements } from './types';
import useParams from './hooks/use-params';
type Props = {
    values?: TenFramesElements<SceneValue>;
    editMode?: boolean;
    showBubbles?: boolean;
    operationNumbersArray: ReturnType<typeof useParams>['operationNumbersArray'];
};
declare const Bubbles: React.FC<Props>;
export default Bubbles;
