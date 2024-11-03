import React from 'react'
import './dashboard.css'
import { useState ,useContext} from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { GiPodiumWinner } from "react-icons/gi";
import { FaPersonRunning } from "react-icons/fa6";
import { GameContext } from '../Contexts/gameContext';
import { Link } from 'react-router-dom';

function Dashboard(){
    //let [p1,setP1]=useState('Ravi');
    // let [p2,setP2]=useState('Ramu');
    // let [game,setGame]=useState(2);
    // let [turn,setTurn]=useState("Alternative Turn");
    // let [showP1,setShowP1]=useState(false);
    // let [showP2,setShowP2]=useState(false);
    // let [showGame,setShowGame]=useState(false);
    // let [showTurn,setShowTurn]=useState(false);
    let {p1,setP1,p2,setP2,game,setGame,turn,setTurn,showP1,setShowP1,showP2,setShowP2,showGame,setShowGame,showTurn,setShowTurn} = useContext(GameContext)
    function P1_toogle(){
        setShowP1(!showP1);
    }
    function handleNameChangeP1(event){
        setP1(event.target.value);
    };
    function P2_toogle(){
        setShowP2(!showP2);
    }
    function handleNameChangeP2(event){
        setP2(event.target.value);
    };
    function game_toogle(){
        setShowGame(!showGame);
    }
    function game_toogle_cancel(){
        setShowGame(!showGame);
        setGame(2);
    }
    function handleNameChangeGame(event){
        setGame(parseInt(event.target.value));
    };
    function turn_toogle(){
        setShowTurn(!showTurn);
    }
    function turn_toogle_cancel(){
        setShowTurn(!showTurn);
        setTurn("Alternative Turn");
    }
    function handleNameChangeTurn(event){
        setTurn(event.target.value);
    };
    return(
        <div> 
           <Link to="/" className='text-decoration-none text-dark'> <h4 className='lead'>Go To Previous Page</h4> </Link>
            <h4 className='text-center'>Two Players Game</h4>
            <div className='dash'>
                
                {showP1 && <div className='overlay'>
                    <div className='p1_box'>
                        <p>Set Player1 Name</p>
                        <input type='text' onChange={handleNameChangeP1} className='form-control' />
                        <button className='btn btn-primary mt-2' onClick={P1_toogle}>Set Name</button>
                    </div>
                </div>}
                <div className='dash_c1' onClick={P1_toogle}>
                    <p>Player 01</p>
                    <h4><BsPersonCircle/> {p1}</h4>
                </div>
                {showP2 && <div className='overlay'>
                    <div className='p1_box'>
                        <p>Set Player2 Name</p>
                        <input type='text' onChange={handleNameChangeP2} className='form-control' />
                        <button className='btn btn-primary mt-2' onClick={P2_toogle}>Set Name</button>
                    </div>
                </div>}
                <div className='dash_c2' onClick={P2_toogle}>
                    <p>Player 02</p>
                    <h4><BsPersonCircle/> {p2}</h4>
                </div>
                {showGame && <div className='overlay'>
                    <div className='p1_box'>
                        
                        <p>Number of Game</p>
                       <div className='g_1'> <input type='radio' value='2' onClick={handleNameChangeGame}/> <label>2 Games</label> </div>
                       <div className='g_2'>  <input type='radio' value='3' onClick={handleNameChangeGame}/> <label>3 Games</label> </div>
                       <div className='g_3'>  <input type='radio' value='5' onClick={handleNameChangeGame}/> <label>5 Games</label></div>
                       <div className='g_4'>  <input type='radio' value='10' onClick={handleNameChangeGame}/> <label>10 Games</label></div>
                       <hr/>
                       <div className=' mt-2'><button className='btn btn-primary me-2' onClick={game_toogle_cancel}>Cancel</button>
                        <button className='btn btn-primary' onClick={game_toogle}>OK</button></div>
                        
                    </div>
                </div>}
                <div className='dash_c3' onClick={game_toogle}>
                    <p>Number of game</p>
                    <h4><GiPodiumWinner />{game}</h4>
                </div>
                {showTurn && <div className='overlay'>
                    <div className='p1_box'>
                        
                        <p>Who starts</p>
                       <div className='g_1'> <input type='radio' value='Alternative turn' onClick={handleNameChangeTurn}/> <label>Alternative Turn</label> </div>
                       <div className='g_2'>  <input type='radio' value='Looser First' onClick={handleNameChangeTurn}/> <label>Looser First</label> </div>
                       <div className='g_3'>  <input type='radio' value='Winner First' onClick={handleNameChangeTurn}/> <label>Winner First</label></div>
                       <div className='g_4'>  <input type='radio' value='Always Player 01' onClick={handleNameChangeTurn}/> <label>Always Player 01</label></div>
                       <div className='g_5'>  <input type='radio' value='Always Player 02' onClick={handleNameChangeTurn}/> <label>Always Player 02</label></div>
                       <hr/>
                       <div className=' mt-2'><button className='btn btn-primary me-2' onClick={turn_toogle_cancel}>Cancel</button>
                        <button className='btn btn-primary' onClick={turn_toogle}>OK</button></div>
                        
                    </div>
                </div>}
                <div className='dash_c4' onClick={turn_toogle}>
                    <p>Who starts</p>
                    <h4><FaPersonRunning />{turn}</h4>
                </div>
                <hr/>
               <Link to='game' className='text-decoration-none' > <div className='dash_s text-light'>
                    Start Game
                </div> </Link>
            </div>
        </div>
    )
}

export default Dashboard;