import Dashboard from './components/dashboard';
import Home from './components/home';
import {Routes,Route} from 'react-router-dom';
import Game from './components/game2.js';
import {useState} from 'react'
import {GameContext} from './Contexts/gameContext.js';
import './App.css'
function App() {
    let [p1,setP1]=useState('Ravi');
    let [p2,setP2]=useState('Ramu');
    let [game,setGame]=useState(2);
    let [turn,setTurn]=useState("Alternative Turn");
    let [showP1,setShowP1]=useState(false);
    let [showP2,setShowP2]=useState(false);
    let [showGame,setShowGame]=useState(false);
    let [showTurn,setShowTurn]=useState(false);
  return (
    <div className='b'>
      <GameContext.Provider value={{p1,setP1,p2,setP2,game,setGame,turn,setTurn,showP1,setShowP1,showP2,setShowP2,showGame,setShowGame,showTurn,setShowTurn}}> 
      <Routes>
         
          <Route path='' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/dashboard/game' element={<Game/>}/>
         
      </Routes>
      </GameContext.Provider> 
    </div>

  );
}

export default App;
