import React, { useState } from 'react';
import Footer from '../components/Footer'
import '../styles/global.css'
import '../styles/game.css'
import alertify from 'alertifyjs';

function Game() {
    const [unscrambled, setUnscrambled] = useState(null);
    const [scrambled, setScrambled] = useState(null);
    const [hideButton, setHideButton] = useState(false);
    const [displayInputBar, setDisplayInputBar] = useState(false);

    const fetchWordFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:8080/word'); // GET request
            if (!response.ok) {
                // console.log(response);
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Parse response
            setUnscrambled(data.unscrambled); // Update state with unscrambled word
            setScrambled(data.scrambled); // Update state with unscrambled word
            setHideButton(true);
            setDisplayInputBar(true);
        } catch (error) {
            console.error('Error fetching word from backend:', error);
            alertify.alert('Error', error.message).set('modal', true); // TODO: Fix alertify styling
        }
    };

    return (
        <div className='page-background'>
            <div className='game-description-box'>
                <p className='game-description-text'>
                    When you are ready, press 'Get Word' to begin the game. The game will give you a random
                    English word that has been scrambled. Your goal is to determine the unscrambled word and enter it. 
                </p>
            </div>
            {!hideButton && (<button className='start-game-text' onClick={ fetchWordFromBackend }>
                Get Word
            </button>)}
            {scrambled && (
                <div className='word-display'>
                    {scrambled}
                </div>
            )}
            {displayInputBar && (
                <input type={ 'text' } placeholder='Enter the unscrambled word' className='input-bar' />
            )}
            <div className='footer-message'>
                <Footer/>
            </div>
        </div>
    );
}

export default Game;