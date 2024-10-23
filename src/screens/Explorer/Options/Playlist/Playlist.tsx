import React from 'react';

import type { OptionsState } from '../Options';
import './Playlist.css';

interface ExplorerOptionsProps {
  setOptionsState: React.Dispatch<React.SetStateAction<OptionsState>>;
}

const ExplorerOptionsPlaylist = ({
  setOptionsState,
}: ExplorerOptionsProps): JSX.Element => {
  return (
    <div className="explorer__options__playlist">
      <div className="explorer__options__playlist__navigation">
        <button
          className="explorer__options__playlist__navigation-btn"
          onClick={() => setOptionsState('menu')}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ExplorerOptionsPlaylist;
