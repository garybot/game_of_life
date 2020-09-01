import React, { useState } from 'react';
import {presets} from '../presets.js';

const ControlPanel = (props) => {
  const [nextGeneration, setNextGeneration] = useState(1);
  const themes = ["red", "green", "blue", "yellow", "magenta", "cyan"];
  function handlePresetChange(e) {
    props.setGeneration(0);
    props.setGrid(presets[e.target.value]);
  }

  function handleGenChange(e) {
    setNextGeneration(Number(e.target.value));
  }

  function handleThemeChange(e) {
    props.setTheme(e.target.value)
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

  function addGlider() {
    const x = Math.floor(Math.random() * 21);
    const y = Math.floor(Math.random() * 21);
    // console.log(x,y)
    // const newGrid = Array(25).fill(Array(25).fill(false));
    // console.log("arrayGrid", arrayGrid)
    const newGrid = JSON.parse(JSON.stringify(props.grid));
    // console.log("JSONgrid", JSONgrid)
    // console.log(JSON.stringify(arrayGrid) == JSON.stringify(JSONgrid))
    // console.log(newGrid[14])
    // newGrid[14][5] = true;
    newGrid[x][y] = true;
    newGrid[x][y+1] = true;
    newGrid[x][y+2] = true;
    newGrid[x+1][y+2] = true;
    newGrid[x+2][y+1] = true;
    props.setGrid(newGrid);
  }

  return (
    <div className="ctrl">
      <div>
        <label labelfor="delay">Speed:</label>
        <input id="delay" value={props.delay} onChange={props.handleDelayChange}/>
        <button onClick={props.play}>{props.isRunning ? "pause" : "play"}</button>
        <button onClick={() => {
          props.setGrid(props.nextGen(props.grid));
        }}>next</button>
        <button onClick={clearGrid}>clear</button>
      </div>
      <div>
        <select onChange={handlePresetChange}>
          <option key="label">Presets</option>
          {
            Object.keys(presets).map(key => {
              return <option key={key} value={key}>{key}</option>
            })
          }
        </select>
        <button onClick={addGlider}>glider</button>
        <button onClick={randomize}>randomize</button>
        <select onChange={handleThemeChange}>
        {
          themes.map(color => {
            return <option key={color} value={color}>{color}</option>
          })
        }
        </select>
      </div>
      <div>
        <span>Generation: {props.generation}</span>
        <label labelfor="generation">Jump:</label>
        <input id="generation" value={nextGeneration} onChange={handleGenChange} />
        <button onClick={jumpToGen}>jump</button>
      </div>
    </div>
  )
}

export default ControlPanel;
