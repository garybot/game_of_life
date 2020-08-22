import React from 'react';

const Grid = (props) => {

return (
  <div className="grid">
  {props.grid.map((row, i) => {
    return (<div key={`${i}`} className="row">
      {
        row.map((cell, j) => {
          return (<div key={`()${i},${j})`} className={`cell ${cell && "live"}`} onClick={()=>{props.toggleCell(i, j)}}></div>)
        })
      }
    </div>)
  })}
  </div>
)
};

export default Grid;
