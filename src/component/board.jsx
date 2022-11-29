import Square from "./square";
import axios from 'axios';
import React, { useEffect, useState } from "react";


function Board(props) {
  
  useEffect(() => {
    axios.get('http://188.166.41.192:8080/gamestate/' + props.lobbyId)
    .then(res => setGameState(res.data))
    .finally(() => {
      setIsLoading(false)
    })

    const interval = setInterval(() => {
      axios.get('http://188.166.41.192:8080/gamestate/' + props.lobbyId)
      .then(res => setGameState(res.data))
    }, 2000);
  
    return () => clearInterval(interval);
  }, []);


  const [gameState, setGameState] = useState(null)
  
  const find = (id) => {
    return gameState.board.tiles.filter(item => item.location == id).at(0).owner;
  }

  const makeMove = (locationId) => {
    if (!find(locationId) == 'null'){
      return
    }
    axios.post('http://188.166.41.192:8080/makeMove/' + props.lobbyId, {"playerId": props.playerId, "tileLocation": locationId})
    .then(res => setGameState(res.data))
  }

  const [isLoading, setIsLoading] = useState(true)

  return (
  !isLoading && 
    <div>
      {gameState.winner != 'null' && <h1>Winner: {gameState.winner}</h1>}
      <h2>Next turn: {gameState.board.nextToPlay}</h2>
      <h2>Players: {gameState.lobby.players.join(", ")}</h2>
      <div className="board-row">
        <Square owner={find(0)} me={props.playerId} handleMakeMove={makeMove} id={0} />
        <Square owner={find(1)} me={props.playerId} handleMakeMove={makeMove} id={1}/>
        <Square owner={find(2)} me={props.playerId} handleMakeMove={makeMove} id={2}/>
      </div>
      <div className="board-row">
        <Square owner={find(3)} me={props.playerId} handleMakeMove={makeMove} id={3}/>
        <Square owner={find(4)} me={props.playerId} handleMakeMove={makeMove} id={4}/>
        <Square owner={find(5)} me={props.playerId} handleMakeMove={makeMove} id={5}/>
      </div>
      <div className="board-row">
        <Square owner={find(6)} me={props.playerId} handleMakeMove={makeMove} id={6}/>
        <Square owner={find(7)} me={props.playerId} handleMakeMove={makeMove} id={7}/>
        <Square owner={find(8)} me={props.playerId} handleMakeMove={makeMove} id={8}/>
      </div>
    </div>
  );
}

export default Board
  