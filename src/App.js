import { useState } from "react";

const Square = ({ value, onSquareClick }) => (
  <button className="square" onClick={onSquareClick}>
    {value}
  </button>
);

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O"
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  const rowlist = [0, 1, 2].map((x) => {
    const sqrlist = [0, 1, 2].map((y) => (
      <Square
        value={squares[x * 3 + y]}
        onSquareClick={() => handleClick(x * 3 + y)}
      />
    ));
    return <div className="board-row">{sqrlist}</div>;
  });

  return (
    <div className="game-board">
      <div className="status">
        {winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O")}
      </div>
      {rowlist}
    </div>
  );
}
const order = true
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    const newHistory = history.slice(0, nextMove + 1);
    setXIsNext(nextMove % 2 === 0);
    setHistory(newHistory);
  }

  function reverseorder(order) {
    const newHistory = history.slice();
    console.lognewHistory.reverse
    setHistory(newHistory);
    order = !order
  }
  const moves = history.map((squares, move) => {
    
    if (move === history.length - 1) {
      return (
        <>
      <div className="status">You are at move # {move}</div>
      <button className='toggle' onClick={() => reverseorder(order)}>Reverse History</button>
        </>
      )
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {move > 0 ? "Go to move #" + move : "Go to game start"}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
