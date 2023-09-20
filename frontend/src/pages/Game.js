import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Alert from '../components/Alert';
import Timer from '../components/Timer';
import '../styles/global.css';
import '../styles/game.css';
import '../styles/custom-alert.css';
import '../styles/timer.css';

// Game page
function Game() {
    // State variables
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
    const [currentRound, setCurrentRound] = useState(0);
    const [isGameOver, setIsGameOver] = useState(null);
    const [remainingRounds, setRemainingRounds] = useState(null);
    const [score, setScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [timerValue, setTimerValue] = useState(null);
    const [timerKey, setTimerKey] = useState(null); // used to re-render Timer component 

    // adjust length slider value
    const handleLengthSliderChange = (event) => {
        const newValue = parseInt(event.target.value);
        setLengthSliderValue(newValue);
    };

    // adjust round slider value
    const handleRoundSliderChange = (event) => {
        const newValue = parseInt(event.target.value);
        setRoundSliderValue(newValue);
    };

    // method to fetch scrambled and unscrambled word from backend using a specified length
    const fetchWordFromBackend = async () => {
        try {
            const response = await fetch('http://localhost:8080/word?length=' + lengthSliderValue);
            const data = await response.json();
            // set state variables after 200 response
            setUnscrambled(data.unscrambled);
            setScrambled(data.scrambled);
            setHideButton(true);
            setDisplayInputBar(true);
            setIsCorrect(null)
            setUserGuess("");
            setGameStarted(true);
        } catch (error) {
            console.error('Error fetching word from backend:', error);
            setUnexpectedError(true);
        }
    };

    // upadte time
    const handleTimerTick = (newTimerValue) => {
        setTimerValue(newTimerValue - 1);
    };

    // method to check if the user guessed correctly, trigged by 'enter' key
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

    // method to update user's guess from input box
    const handleInputChange = (event) => {
        setUserGuess(event.target.value);
    };

    // method to handle submitting guess through 'enter' button
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            checkUserGuess();
        }
    };

    // watch currentRound and end game accordingly
    useEffect(() => {
        if (currentRound > roundSliderValue - 1) {
            setIsGameOver(true);
        }
    }, [currentRound]);

    // watch currentRound and the slider value of round to update the # of reminaing 
    // rounds accordingly
    useEffect(() => {
        setRemainingRounds(roundSliderValue - currentRound);
    }, [currentRound, roundSliderValue]);

    // once isCorrect has been assigned a value, update current round value accordingly
    // also display corresponding popup
    useEffect(() => {
        if (isCorrect !== null) {
            if (isCorrect) {
                if (currentRound > roundSliderValue - 1) {
                    setIsGameOver(true);
                }
                setShowCorrectAlert(true);
            } else {
                setShowIncorrectAlert(true);
            }
        }
    }, [isCorrect, currentRound, roundSliderValue]);

    // get a new word if the user changes the length slider value
    // only do so if the game has actually started, otherwise wait
    useEffect(() => {
        // set a timer value as a function of length of word
        setTimerValue(Math.round(0.0303 * -1 * lengthSliderValue ** 3 + 0.9387 * lengthSliderValue ** 2 + 0.5082 * lengthSliderValue + 5.1479));
        if (gameStarted) {
            fetchWordFromBackend();
        }
    }, [lengthSliderValue]);

    // if time expires, update round count and reset time
    useEffect(() => {
        if (timerValue === 0) {
            setCurrentRound(currentRound + 1);
            setTimerValue(Math.round(0.0303 * -1 * lengthSliderValue ** 3 + 0.9387 * lengthSliderValue ** 2 + 0.5082 * lengthSliderValue + 5.1479));
        }
    }, [timerValue]);

    // if the game isn't over yet and the user changes the word length, get a new word
    useEffect(() => {
        // Add a condition to check if the component has mounted
        if (isGameOver !== null) {
            fetchWordFromBackend();
        }
    }, [lengthSliderValue]);

    // re-render the Timer every time it updates (every second)
    useEffect(() => {
        // re-render the Timer component whenever timerValue changes
        const key = Math.random(); // get a random key
        setTimerKey(key); // update key prop for the Timer component
    }, [timerValue]);

    // if we move onto a new round and the game isn't over, get a new word
    useEffect(() => {
        // When the current round changes, fetch a new word
        if (currentRound > 0 && currentRound <= roundSliderValue) {
            fetchWordFromBackend();
        }
    }, [currentRound]);

    // update state variables when closing the correct or incorrect alert popup
    const handleCloseAlert = () => {
        setShowCorrectAlert(false);
        setShowIncorrectAlert(false);
    };

    // update state variable when closing the error alert
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
                        Use the sliders to adjust the number of rounds and the length of the word. They can be adjusted mid-game.
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
                <button className='get-word-button' onClick={fetchWordFromBackend} >
                    <div className='get-word-text'>
                        Get Word
                    </div>
                </button>
            )}
            {gameStarted && !isGameOver && (
                <Timer key={timerKey} initialTime={timerValue} onTimerTick={handleTimerTick} className='timer' />
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
            {remainingRounds > -1 && gameStarted && (
                <div className='remaining-rounds-text'>
                    Remaining Rounds: {remainingRounds}
                </div>
            )}
            <div className='footer-message'>
                <Footer />
            </div>
            {showCorrectAlert && (
                <Alert message='Correct! Onto the next word.' onClose={handleCloseAlert} status='correct' />
            )}
            {showIncorrectAlert && (
                <Alert message='Incorrect! Try again with a new word.' onClose={handleCloseAlert} status='incorrect' />
            )}
            {/* When the backend isn't responding/off */}
            {unexpectedError && (
                <Alert message='Unknown error has occurred. Try again later.' onClose={handleCloseAlertError} />
            )}
            {/* Pass ending round number and final score to alert page to ending page: Game.js->Alert.js->End.js */}
            {isGameOver && (
                <Alert message='Game over! View results.' status='game-over' data={{ round: currentRound, score: score }} />
            )}
        </div>
    );
}

export default Game;