import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'
import '../styles/global.css'

function Start() {
    return (
        <div className="page-background">
            <div className="start-title">
                'ekreb' - the word guessing game!
            </div>
            <div>
                <Link to="/game" className='start-button-text'>Start Game</Link>
            </div>
            <Footer className='footer-message' /> {/* TODO: Fix style */}
        </div>
    );
}

export default Start;