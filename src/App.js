import React, { useState } from 'react';
import useInterval from './useInterval.js';
import './App.css';
import Grid from './Grid.js';
import {checkNeighbors} from './helperFunctions.js';
import {presets} from './presets.js';

function App() {
  const [grid, setGrid] = useState(Array(25).fill(Array(25).fill(false)));
  const [next, setNext] = useState(Array(25).fill(Array(25).fill(false)));
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(500);

  useInterval(() => {
    nextGen();
  }, isRunning ? delay : null)

  // console.log(JSON.stringify(grid));

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function handlePresetChange(e) {
    setIsRunning(false);
    setGeneration(0);
    setGrid(presets[e.target.value]);
    setNext(presets[e.target.value]);
  }

  function clearGrid() {
    setIsRunning(false);
    setGrid(Array(25).fill(Array(25).fill(false)));
    setGeneration(0);
  }

  function play() {
    setIsRunning(!isRunning);
  }

  function toggleCell(x, y) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y] = !newGrid[x][y];
    setGrid(newGrid);
    setNext(newGrid);
  }

  function nextGen() {
    // setGrid(next);
    const newGrid = grid.map((row, i) => {
      return row.map((cell, j) => {
        const neighbors = checkNeighbors(grid, i, j);
        if (cell) {
          return neighbors === 2 || neighbors === 3;
        } else {
          return neighbors === 3;
        }
      })
    })
    setGeneration(generation + 1);
    setGrid(newGrid);
    // setNext(newGrid);
    // return newGrid;
  }

  return (
    <div className="App">
      <Grid grid={grid} toggleCell={toggleCell}/>
      <button onClick={clearGrid}>clear</button>
      <button onClick={nextGen}>next</button>
      <button onClick={play}>play</button>
      <input value={delay} onChange={handleDelayChange}/>
      <select onChange={handlePresetChange}>
        {
          Object.keys(presets).map(key => {
            return <option key={key} value={key}>{key}</option>
          })
        }
      </select>
      <div>Gen: {generation}</div>
    </div>
  );
}

export default App;
