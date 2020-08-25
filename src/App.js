import React, { useState } from 'react';
import useInterval from './utils/useInterval.js';
import './App.css';

import Grid from './components/Grid.js';
import Header from './components/Header.js';
import About from './components/About.js';
import Rules from './components/Rules.js';
import ControlPanel from './components/ControlPanel.js';

import {checkNeighbors} from './utils/helperFunctions.js';

function App() {
  const [grid, setGrid] = useState(Array(25).fill(Array(25).fill(false)));
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(100);

  useInterval(() => {
    const newGrid = nextGen(grid);
    setGrid(newGrid);
  }, isRunning ? delay : null)

  // console.log(JSON.stringify(grid));

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function play() {
    setIsRunning(!isRunning);
  }

  function nextGen(grid) {
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
    // setGrid(newGrid);
    return newGrid;
  }

  return (
    <div className="App">
      <Header/>
      <main>
        <About/>
        <div className="game">
        <Grid grid={grid} setGrid={setGrid} />
        <ControlPanel
          nextGen={nextGen} play={play} isRunning={isRunning}
          delay={delay} handleDelayChange={handleDelayChange}
          setGrid={setGrid} grid={grid} setIsRunning={setIsRunning}
          generation={generation} setGeneration={setGeneration}/>
        <span>Gen: {generation}</span>
        </div>
        <Rules/>
      </main>
    </div>
  );
}

export default App;
