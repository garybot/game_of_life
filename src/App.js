import React, { useState } from 'react';
import useInterval from './utils/useInterval.js';
import './App.css';

import Grid from './components/Grid.js';
import Header from './components/Header.js';
import About from './components/About.js';
import Rules from './components/Rules.js';
import ControlPanel from './components/ControlPanel.js';

import {checkNeighbors} from './utils/helperFunctions.js';
import {presets} from './presets.js';

function App() {
  const [grid, setGrid] = useState(Array(25).fill(Array(25).fill(false)));
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [delay, setDelay] = useState(100);

  useInterval(() => {
    nextGen();
  }, isRunning ? delay : null)

  // console.log(JSON.stringify(grid));

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  function handlePresetChange(e) {
    // setIsRunning(false);
    setGeneration(0);
    setGrid(presets[e.target.value]);
  }

  function clearGrid() {
    setIsRunning(false);
    setGrid(Array(25).fill(Array(25).fill(false)));
    setGeneration(0);
  }
  function randomize() {
    const randomGrid = []
    for (let i = 0; i < 25; i++) {
      randomGrid.push([]);
      for (let j = 0; j < 25; j++) {
        const rand = Math.round(Math.random());
        const val = rand === 1 ? true : false;
        randomGrid[i].push(val);
      }
    }
    setGeneration(0);
    setGrid(randomGrid);
  }

  function play() {
    setIsRunning(!isRunning);
  }

  function toggleCell(x, y) {
    const newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[x][y] = !newGrid[x][y];
    setGrid(newGrid);
  }

  function nextGen() {
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
  }

  return (
    <div className="App">
      <Header/>
      <main>
        <About/>
        <div className="game">
        <Grid grid={grid} toggleCell={toggleCell}/>
        <ControlPanel
          nextGen={nextGen} play={play} isRunning={isRunning}
          delay={delay} handleDelayChange={handleDelayChange}
          presets={presets} handlePresetChange={handlePresetChange}
          randomize={randomize} clearGrid={clearGrid}/>
        <span>Gen: {generation}</span>
        </div>
        <Rules/>
      </main>
    </div>
  );
}

export default App;
