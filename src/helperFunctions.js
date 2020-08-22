const checkNeighbors = (grid, x, y) => {
  let count = 0;
  if ((x > 0 && y > 0) && (x < grid.length-1 && y < grid.length-1)) {
    count += grid[x-1][y-1];
    count += grid[x-1][y];
    count += grid[x-1][y+1];
    count += grid[x][y-1];
    count += grid[x][y+1];
    count += grid[x+1][y+1];
    count += grid[x+1][y];
    count += grid[x+1][y-1];
  } else if ((x > 0) && (x < grid.length-1 && y < grid.length-1)) {
    count += grid[x-1][y];
    count += grid[x-1][y+1];
    count += grid[x][y+1];
    count += grid[x+1][y+1];
    count += grid[x+1][y];
  } else if ((y > 0) && (x < grid.length-1 && y < grid.length-1)) {
    count += grid[x][y-1];
    count += grid[x][y+1];
    count += grid[x+1][y+1];
    count += grid[x+1][y];
    count += grid[x+1][y-1];
  } else if ((x > 0 && y > 0) && (x < grid.length-1)) {
    count += grid[x-1][y-1];
    count += grid[x-1][y];
    count += grid[x][y-1];
    count += grid[x+1][y];
    count += grid[x+1][y-1];
  } else if ((x > 0 && y > 0) && (y < grid.length - 1)) {
    count += grid[x-1][y-1];
    count += grid[x-1][y];
    count += grid[x-1][y+1];
    count += grid[x][y-1];
    count += grid[x][y+1];
  } else if (x === grid.length-1 && y === grid.length-1 ) {
    count += grid[x-1][y-1];
    count += grid[x-1][y];
    count += grid[x][y-1];
  } else if (y === 0 && x === 0)  {
    count += grid[x][y+1];
    count += grid[x+1][y+1];
    count += grid[x+1][y];
  } else if (x === 0 && y === grid.length-1) {
    count += grid[x][y-1];
    count += grid[x+1][y];
    count += grid[x+1][y-1];
  } else if (y === 0 && x === grid.length-1) {
    count += grid[x-1][y];
    count += grid[x-1][y+1];
    count += grid[x][y+1];
  }
  return count;
}
module.exports = {
  checkNeighbors
}
