import React from 'react';

const Grid = (props) => {

  function toggleCell(x, y) {
    const newGrid = JSON.parse(JSON.stringify(props.grid));
    newGrid[x][y] = !newGrid[x][y];
    props.setGrid(newGrid);
  }

  return (
    <div className="grid">
    {props.grid.map((row, i) => {
      return (
        <div key={`${i}`} className="row">
        {
          row.map((cell, j) => {
            return (<div key={`()${i},${j})`} className={`cell ${cell && "live"} ${props.theme}`} onClick={()=>{toggleCell(i, j)}}></div>)
          })
        }
      </div>
    )
    })}
    </div>
  );
}

export default Grid;
