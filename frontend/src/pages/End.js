import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/end.css';

// End page
function End(props) {
    // get final round number and score
    const { round, score } = useParams();

    let guessClass = '';
    // pick a color for final score depending how well user did
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
                        {/* conditional class based off score (>= 50% = green) */}
                        Correct Guesses: <span className={guessClass} > {score}</span>
                    </div>
                </div>
            </div>
            <div className='thanks'>
                Thanks for playing!
            </div>
            <div className='footer-message'>
                <Footer />
            </div>
        </div>
    );
}

export default End;