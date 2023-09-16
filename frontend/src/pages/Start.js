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
                <Link to="/game" className='start-button-container'>
                    <div className='start-button-text'>
                        Start Game
                    </div>
                    </Link>
            <div className='footer-message'>
                <Footer/>
            </div>
        </div>
    );
}

export default Start;