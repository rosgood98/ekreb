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
    const [lengthSliderValue, setLengthSliderValue] = useState(5);
    const [roundSliderValue, setRoundSliderValue] = useState(3);
    const [currentRound, setCurrentRound] = useState(1);
    const [isGameOver, setIsGameOver] = useState(null);
    const [remainingRounds, setRemainingRounds] = useState(null);
    const [score, setScore] = useState(0);

    const handleLengthSliderChange = (event) => {
        const newValue = parseInt(event.target.value);
        setLengthSliderValue(newValue);
    };

    const handleRoundSliderChange = (event) => {
        const newValue = parseInt(event.target.value);
        setRoundSliderValue(newValue);
    };

    const fetchWordFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:8080/word?length=' + lengthSliderValue); // get scrambled and unscrambled word from backend
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUnscrambled(data.unscrambled);
            setScrambled(data.scrambled);
            setHideButton(true);
            setDisplayInputBar(true);
            setIsCorrect(null); // Reset the correct guess status
            setUserGuess("");
        } catch (error) {
            console.error('Error fetching word from backend:', error);
            setUnexpectedError(true);
        }
    };

    const checkUserGuess = () => {
        if (userGuess.toLowerCase() === unscrambled.toLowerCase()) {
            setIsCorrect(true);
            setScore(score + 1);
        } else {
            setIsCorrect(false);
        }
        setCurrentRound(currentRound + 1);
        fetchWordFromBackend();
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
        if (currentRound > roundSliderValue) {
            setIsGameOver(true);
        }
    }, [currentRound]);

    useEffect(() => {
        setRemainingRounds(roundSliderValue - currentRound);
    }, [currentRound, roundSliderValue]);

    useEffect(() => {
        if (remainingRounds < 0) {
            setIsGameOver(true);
        }
    }, [remainingRounds]);

    useEffect(() => {
        if (isCorrect !== null) {
            if (isCorrect) {
                setCurrentRound(currentRound + 1);
                if (currentRound > roundSliderValue) {
                    setIsGameOver(true);
                }
                setShowCorrectAlert(true);
            } else {
                setShowIncorrectAlert(true);
            }
        }
    }, [isCorrect, currentRound, roundSliderValue]);

    useEffect(() => {
        // Add a condition to check if the component has mounted
        if (isGameOver !== null) {
            console.log("fetching gameover");
            fetchWordFromBackend();
        }
    }, [lengthSliderValue]);
    

    useEffect(() => {
        // When the current round changes, fetch a new word
        if (currentRound > 1 && currentRound <= roundSliderValue) {
            console.log("useeffect currentround");
            fetchWordFromBackend();
        }
    }, [currentRound, roundSliderValue]);

    const handleCloseAlert = () => {
        setShowCorrectAlert(false);
        setShowIncorrectAlert(false);
    };

    const handleCloseAlertError = () => {
        setUnexpectedError(false);
    };

    return (
        <div className='page-background'>
            <div className='page-header'>
                <div className='round-slider-container'>
                    <div className="round-input">
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={roundSliderValue}
                            onChange={handleRoundSliderChange}
                            className="round-slider"
                        />
                    </div>
                    <div>
                        <span className="round-tooltip">{roundSliderValue}</span>
                    </div>
                    <b># of rounds</b>
                </div>
                <div className='game-description-box'>
                    <p className='game-description-text'>
                        When you are ready, press 'Get Word' to begin the game. The game will give you a random
                        English word that has been scrambled. Your goal is to determine the unscrambled word and enter it. 
                    </p>
                </div>
                <div className='length-slider-container'>
                    <div className="length-input">
                        <input
                            type="range"
                            min="2"
                            max="15"
                            value={lengthSliderValue}
                            onChange={handleLengthSliderChange}
                            className="length-slider"
                        />
                    </div>
                    <div>
                        <span className="length-tooltip">{lengthSliderValue}</span>
                    </div>
                    <b>len(word)</b>
                </div>
            </div>
            {!hideButton && !isGameOver && (
                <button className='get-word-button' onClick={ fetchWordFromBackend } >
                    <div className='get-word-text'>
                        Get Words
                    </div>
                </button>
            )}
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
                        id='input-bar'
                        value={userGuess}
                        disabled={isGameOver}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
            {remainingRounds > -1 && (
                <div className='remaining-rounds-text'>
                    Remaning Rounds: {remainingRounds}
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
                <Alert message='Unknown error has occurred. Try again later.' onClose={ handleCloseAlertError } />
            )}
            {isGameOver && (
                <Alert message='Game over! View results.' status='game-over' />
            )}
        </div>
    );
}

export default Game;