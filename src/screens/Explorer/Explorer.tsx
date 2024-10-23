import React from 'react';

import { useState } from 'react';
import './Explorer.css';
import ExplorerList from './List/List';
import ExplorerOptions from './Options/Options';

export type State = 'list' | 'options';

interface ExplorerProps {
  setActiveVideo: (filePathArray?: Array<string>) => void;
}

const Explorer = ({ setActiveVideo }: ExplorerProps): JSX.Element => {
  const [state, setState] = useState<State>('list');

  return (
    <div className="explorer">
      {state === 'list' && (
        <ExplorerList setActiveVideo={setActiveVideo} setState={setState} />
      )}
      {state === 'options' && <ExplorerOptions setState={setState} />}
    </div>
  );
};

export default Explorer;
