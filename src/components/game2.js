import React, { useState, useEffect ,useContext} from 'react';
import './game2.css'
import { GameContext } from '../Contexts/gameContext';
import { BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Game = () => {
  let {p1,p2,game,turn} = useContext(GameContext)

  let navigate=useNavigate();
  const [currentGame, setCurrentGame] = useState(1);
  const [scores, setScores] = useState({ [p1]: 0, [p2]: 0 });
  const [currentTurn, setCurrentTurn] = useState(p1);
  const [board, setBoard] = useState(Array(6).fill(null).map(() => Array(7).fill(null)));
  const [moves, setMoves] = useState([]);
  const [winner, setWinner] = useState(null);
  const [tournamentWinner,setTournamentWinner]=useState(null);
  useEffect(() => {
    if (turn === "Always Player 01") setCurrentTurn(p1);
    if (turn === "Always Player 02") setCurrentTurn(p2);
  }, [turn, p1, p2]);

  const resetBoard = () => {
    setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
    setMoves([]);
    setWinner(null);
  };

  const startNewGame = () => {
    if (currentGame < game) {
      resetBoard();
      

      if (turn === "Alternative Turn") {
        setCurrentTurn((prev) => (prev === p1 ? p2 : p1));
      } else if (turn === "Looser First") {
        
        setCurrentTurn( winner==p1 ? p2 : p1);
      } else if (turn === "Winner First") {
        //setCurrentTurn(scores[p1] > scores[p2] ? p1 : p2);
        setCurrentTurn( winner==p1 ? p1 : p2);
      }
      setCurrentGame(currentGame + 1);
    
    } else {
      if(scores[p1] > scores[p2]){
        setTournamentWinner(p1+" is winner of tournament");
      }
      else if(scores[p1] < scores[p2]){
        setTournamentWinner(p2+" is winner of tournament")
      }
      else{
        setTournamentWinner("Tournament is draw")
      }
    }
  };


  const checkWinner = (board, playerColor) => {
    const directions = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (board[row][col] === playerColor) {
          for (const { x, y } of directions) {
            let count = 1;
            for (let i = 1; i < 4; i++) {
              const newRow = row + y * i;
              const newCol = col + x * i;
              if (
                newRow >= 0 &&
                newRow < 6 &&
                newCol >= 0 &&
                newCol < 7 &&
                board[newRow][newCol] === playerColor
              ) {
                count++;
              } else {
                break;
              }
            }
            if (count === 4) return true;
          }
        }
      }
    }
    return false;
  };

  const makeMove = (col) => {
    if (winner) return;

    const newBoard = board.map(row => [...row]);
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][col]) {
        const playerColor = currentTurn === p1 ? "red" : "yellow";
        newBoard[row][col] = playerColor;
        setBoard(newBoard);
        setMoves([...moves, { board: newBoard, turn: currentTurn }]);

        if (checkWinner(newBoard, playerColor)) {
          setWinner(currentTurn);
          setScores((prevScores) => ({
            ...prevScores,
            [currentTurn]: prevScores[currentTurn] + 1,
          }));
          return;
        }

        setCurrentTurn(currentTurn === p1 ? p2 : p1);
        break;
      }
    }
  };

  const undoMove = () => {
    if (moves.length > 0) {
      const lastMove = moves.pop();
      setBoard(lastMove.board);
      setCurrentTurn(lastMove.turn==p1 ? p2:p1);
      setMoves([...moves]);
      setWinner(null);
    }
  };

  
  

  const endTournament = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    if (winner != null) startNewGame();
  }, [winner]);

  return (
    <div>
      <Link to="/dashboard" className='text-decoration-none text-dark'> <h4 className='lead'>Go To Previous Page</h4> </Link>
       <h4 className='text-center'>Two Players Game</h4>
    <div className="game dash w-50">
      <h2>{game} Games Tournament - Playing Game {currentGame}</h2>
    <div className='d-flex'>
    <div className="board">
        {board.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => makeMove(colIndex)}
              style={{ backgroundColor: cell || 'white' }}
            ></div>
          ))
        ))}
      </div>
      <div className="mt-5 ms-5">
        <div className={`player ${currentTurn === p1 ? 'active-player' : ''} mb-3`}>
          <h3>Player 01</h3>
          <p><BsPersonCircle/> {p1}</p>
          <p>Score: {scores[p1]}</p>
        </div>
        <div className={`player ${currentTurn === p2 ? 'active-player' : ''}`}>
          <h3>Player 02</h3>
          <p><BsPersonCircle/> {p2}</p>
          <p>Score: {scores[p2]}</p>
        </div>
      </div>
      </div>
      {winner && <h3>Congratulations {winner} you won game {currentGame}</h3> }
      {tournamentWinner && <h3>{tournamentWinner}</h3>}
      
      <div className="controls">
        <button onClick={undoMove} className='btn btn-primary'>Undo Step</button>
         
        <button onClick={endTournament} className='btn btn-primary'>End Tournament</button>
      </div>
      
      <style jsx>{`
        .game {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .scoreboard {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin-bottom: 20px;
        }

        .player {
          text-align: center;
          padding: 10px;
          border: 2px solid black;
        }

        .active-player {
          border-color: orange;
        }

        .board {
          display: grid;
          grid-template-columns: repeat(7, 50px);
          grid-template-rows: repeat(6, 50px);
          gap: 5px;
          margin-bottom: 20px;
        }

        .cell {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: white;
          cursor: pointer;
        }

        .controls button {
          margin: 5px;
        }
      `}</style>
      
    </div>
    </div>
  );
};

export default Game;
