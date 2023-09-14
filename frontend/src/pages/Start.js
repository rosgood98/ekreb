import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import '../styles/start.css'

function Start() {
    return (
        <div className="page-background">
            <div className="start-title">
                'ekreb' - the word guessing game!
            </div>
            <div className='start-button-container'>
                <Link to="/game" className='start-button-text'>Start Game</Link>
            </div>
            <div className='footer-message'>
                <Footer/> {/* TODO: Fix style */}
            </div>
        </div>
    );
}

export default Start;