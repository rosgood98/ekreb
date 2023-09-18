import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/end.css';

function End(props) {
    const { round, score } = useParams();

    let guessClass = '';
    if (score >= round / 2) {
        guessClass = 'green-text';
    } else {
        guessClass = 'red-text';
    }

    return (
        <div className='page-background'>
            <div className='score-container'>
                <div className='stats-header'>
                    Final Score
                </div>
                <div className='stats-body'>
                    <div>
                        Rounds Played: {round}
                    </div>
                    <div>
                        Correct Guesses: <span className={guessClass} > {score}</span>
                    </div>
                </div>
            </div>
            <div className='thanks'>
                Thanks for playing!
            </div>
            <div className='footer-message'>
                <Footer/>
            </div>
        </div>
    );
}

export default End;