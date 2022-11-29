import React, { useState } from 'react'
import Board from './board';
import axios from 'axios';


function Game() {

  const [lobbyId, setlobbyId] = useState(false);
  const [playerId, setPlayerId] = useState(false);

  
  const createOrJoinLobby = (event) => {
    event.preventDefault();
    const playerId = event.target.playerId.value

    if (!event.target.lobbyId.value) {
      axios.post("http://188.166.41.192:8080/createLobby", {
        "playerId": playerId})
        .then(res => setlobbyId(res.data.lobbyId))
        .then(() => setPlayerId(playerId))
      } else {
      axios.post("http://188.166.41.192:8080/joinLobby/" + event.target.lobbyId.value, {
        "playerId": playerId})
        .then(() => setlobbyId(event.target.lobbyId.value))
        .then(() => setPlayerId(playerId))
      }
    }


  return (
<div className="game">
      <h2>Lobby ID: {lobbyId}</h2>
      <div className="game-board">
        {playerId && lobbyId && <Board lobbyId={lobbyId} playerId={playerId} />}
        {!playerId && !lobbyId && <form onSubmit={createOrJoinLobby}>
            <label>Name:</label>
            <input type='text' name='playerId'/>
            <label>Lobby ID:</label>
            <input type='text' name='lobbyId'/>
            <button type='submit'>Submit</button>
        </form>}
      </div>
    </div>
  );
  }

export default Game