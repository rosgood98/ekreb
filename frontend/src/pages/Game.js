import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import '../styles/global.css';
import '../styles/game.css';
import '../styles/custom-alert.css';

function Game() {
    const [unscrambled, setUnscrambled] = useState(null);
    const [scrambled, setScrambled] = useState(null);
    const [hideButton, setHideButton] = useState(false);
    const [displayInputBar, setDisplayInputBar] = useState(false);
    const [userGuess, setUserGuess] = useState("");
    const [unexpectedError, setUnexpectedError] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showCorrectAlert, setShowCorrectAlert] = useState(false);
    const [showIncorrectAlert, setShowIncorrectAlert] = useState(false);

    var correctGuesses = 0;
    var totalGuesses = 0;


    const fetchWordFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:8080/word'); // get scrambled and unscrambled word from backend
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUnscrambled(data.unscrambled);
            setScrambled(data.scrambled);
            setHideButton(true);
            setDisplayInputBar(true);
            totalGuesses++;
        } catch (error) {
            console.error('Error fetching word from backend:', error);
            setUnexpectedError(true);
        }
    };

    const checkUserGuess = () => {
        if (userGuess.toLowerCase() === unscrambled.toLowerCase()) {
            setIsCorrect(true);
            correctGuesses++;
        } else {
            setIsCorrect(false);
        }
    };

    const handleInputChange = (event) => {
        setUserGuess(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            checkUserGuess();
        }
    };

    useEffect(() => {
        if (isCorrect !== null) {
            if (isCorrect) {
                setShowCorrectAlert(true);
            } else {
                setShowIncorrectAlert(true);
            }
            setUserGuess("");
        }
    }, [isCorrect]);

    const handleCloseAlert = () => {
        setShowCorrectAlert(false);
        setShowIncorrectAlert(false);
        fetchWordFromBackend();
    };

    const handleCloseAlertError = () => {
        setUnexpectedError(false);
    };

    return (
        <div className='page-background'>
            <div className='game-description-box'>
                <p className='game-description-text'>
                    When you are ready, press 'Get Word' to begin the game. The game will give you a random
                    English word that has been scrambled. Your goal is to determine the unscrambled word and enter it. 
                </p>
            </div>
            {!hideButton && (<button className='get-word-button' onClick={ fetchWordFromBackend } >
                <div className='get-word-text'>
                    Get Word
                </div>
            </button>)}
            {scrambled && (
                <div className='word-display'>
                    {scrambled}
                </div>
            )}
            {displayInputBar && (
                <div className='input-bar-container'>
                    <div className='input-instructions'>Type the word here</div>
                    <input
                        type='text'
                        className='input-bar'
                        value={userGuess}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
            <div className='footer-message'>
                <Footer/>
            </div>
            {showCorrectAlert && (
                <Alert message='Correct! Onto the next word.' onClose={ handleCloseAlert } status='correct' />
            )}
            {showIncorrectAlert && (
                <Alert message='Incorrect! Try again with a new word.' onClose={ handleCloseAlert } status='incorrect' />
            )}
            {unexpectedError && (
                <Alert message='Unknown error has occured. Try again later.' onClose={ handleCloseAlertError } />
            )}
        </div>
    );
}

export default Game;