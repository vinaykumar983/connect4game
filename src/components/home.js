import React from 'react'
import { Link ,NavLink } from 'react-router-dom';
import './home.css'
function Home()
{
  return (
    <div>
        <h2>CONNECT FOUR!</h2>
        <p className='lead'>Play with players around the world.</p>
        <div className='container dash'>
            <div className='h mb-3'>
                <h2 className='play display-5'>PLAY</h2>
                <img src='https://www.shutterstock.com/image-illustration/connect-four-board-game-vertical-600nw-2382396723.jpg' className='w-25 '/>
            </div>
            <hr/>
            <div className='text-light'>
                <div className='h'>
                    <p className='tog1'>Custom Game <span>comming soon</span></p>
                  <p className='tog2'>  <Link to="/dashboard" className='text-decoration-none text-light '>   Two Players </Link> </p>
                </div>
                <div className='h'>
                    <p className='tog3'>Game Online <span>comming soon</span></p>
                    <p className='tog4'>Training Game <span>comming soon</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;