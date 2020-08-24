import React from 'react';

const Rules = () => {

  return (
    <section>
      <h2>Rules</h2>
      <ul>
        <li>Start with a grid of cells.</li>
        <li>Each cell can either be alive or be dead.</li>
        <li>If a cell is alive and has 2 or 3 neighbors, then it remains alive. Otherwise it dies.</li>
        <li>If a cell is dead and has exactly 3 neighbors, then it comes to life. Otherwise it remains dead.</li>
      </ul>
    </section>
  )
}

export default Rules;
