import React from 'react';

const ControlPanel = (props) => {
  return (
    <div className="ctrl">
    <button onClick={props.randomize}>randomize</button>
    <button onClick={props.nextGen}>next</button>
    <button onClick={props.play}>{props.isRunning ? "pause" : "play"}</button>
    <input value={props.delay} onChange={props.handleDelayChange}/>
    <select onChange={props.handlePresetChange}>
      {
        Object.keys(props.presets).map(key => {
          return <option key={key} value={key}>{key}</option>
        })
      }
    </select>
    {
      <button onClick={props.clearGrid}>clear</button>
    }
    </div>
  )
}

export default ControlPanel;
