import React, { useState } from 'react';
import Footer from '../components/Footer'
import '../styles/global.css'
import '../styles/game.css'

function Game() {
    const [word, setWord] = useState(null); 

    const fetchWordFromBackend = async () => {
        try {
            const response = await fetch('/getWord'); // Make a GET request to your backend
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Parse the response JSON
            setWord(data); // Update the state with the fetched word
        } catch (error) {
            console.error('Error fetching word from backend:', error);
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
            <div className='start-game-text' onClick={ fetchWordFromBackend }>
                Get Word
            </div>
            <Footer className='footer-message' /> {/* TODO: Fix style */}
        </div>
    );
}

export default Game;