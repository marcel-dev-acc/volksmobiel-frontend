import React from 'react'

import {useState} from 'react'
import './Explorer.css'
import ExplorerList from './List/List'
import ExplorerOptions from './Options/Options'
import type {ExploredItem} from '../../context/types'

export type State = 'list' | 'options'

interface ExplorerProps {
  setActiveVideo: (filePathArray?: Array<string>) => void
}

const Explorer = ({setActiveVideo}: ExplorerProps): JSX.Element => {
  const [state, setState] = useState<State>('list')
  const [type, setType] = useState<'file' | 'folder'>('file')
  const [item, setItem] = useState<ExploredItem | undefined>()

  return (
    <div className="explorer">
      {state === 'list' && (
        <ExplorerList
          setActiveVideo={setActiveVideo}
          setState={setState}
          setType={setType}
          setItem={setItem}
        />
      )}
      {state === 'options' && (
        <ExplorerOptions item={item} type={type} setState={setState} />
      )}
    </div>
  )
}

export default Explorer
