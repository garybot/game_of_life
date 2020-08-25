import React, { useState } from 'react';
import {presets} from '../presets.js';

const ControlPanel = (props) => {
  const [nextGeneration, setNextGeneration] = useState(1);

  function handlePresetChange(e) {
    props.setGeneration(0);
    props.setGrid(presets[e.target.value]);
  }

  function handleGenChange(e) {
    setNextGeneration(Number(e.target.value));
  }

  function jumpToGen() {
    let newGrid = props.nextGen(props.grid);
    for (let i = 0; i < nextGeneration - 1; i++) {
      newGrid = props.nextGen(newGrid);
    }
    props.setGeneration(nextGeneration + props.generation);
    props.setGrid(newGrid);
  }

  function randomize() {
    const randomGrid = []
    for (let i = 0; i < 25; i++) {
      randomGrid.push([]);
      for (let j = 0; j < 25; j++) {
        const rand = Math.floor(Math.random() * 5);
        const val = rand === 1 ? true : false;
        randomGrid[i].push(val);
      }
    }
    props.setGeneration(0);
    props.setGrid(randomGrid);
  }

  function clearGrid() {
    props.setIsRunning(false);
    props.setGrid(Array(25).fill(Array(25).fill(false)));
    props.setGeneration(0);
  }

  return (
    <div className="ctrl">
    <button onClick={() => {
      props.setGrid(props.nextGen(props.grid));
    }}>next</button>
    <button onClick={props.play}>{props.isRunning ? "pause" : "play"}</button>
    <input value={props.delay} onChange={props.handleDelayChange}/>
    <select onChange={handlePresetChange}>
      {
        Object.keys(presets).map(key => {
          return <option key={key} value={key}>{key}</option>
        })
      }
    </select>
    {
      <button onClick={clearGrid}>clear</button>
    }
    <input value={nextGeneration} onChange={handleGenChange} />
    <button onClick={jumpToGen}>jump</button>
    <button onClick={randomize}>randomize</button>
    </div>
  )
}

export default ControlPanel;
