import React from "react";
import "../App.css";
import { useState } from "react";

function Square(props) {

    const color = props.owner == props.me ? 'green' : props.owner != 'null' ? 'red' : 'white'

    return(
        <button className="square" style = {{"backgroundColor": color}} onClick={() => props.handleMakeMove(props.id)}>
        </button>
    )

}






  export default Square