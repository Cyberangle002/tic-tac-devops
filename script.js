const cells = document.querySelectorAll('[data-cell]');
const restartBtn = document.getElementById('restartBtn');
let isCircleTurn = false;
const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function startGame(){
  cells.forEach(cell=>{
    cell.classList.remove('x','o');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once:true });
  });
  isCircleTurn=false;
}
function handleClick(e){
  const cell = e.target;
  const currentClass = isCircleTurn ? 'o' : 'x';
  cell.classList.add(currentClass);
  if(checkWin(currentClass)){ alert(`${currentClass.toUpperCase()} Wins!`); startGame(); return; }
  if([...cells].every(c=>c.classList.contains('x')||c.classList.contains('o'))){ alert('Draw!'); startGame(); return; }
  isCircleTurn = !isCircleTurn;
}
function checkWin(currentClass){
  return winningCombinations.some(combo => combo.every(i => cells[i].classList.contains(currentClass)));
}
restartBtn.addEventListener('click', startGame);
startGame();
