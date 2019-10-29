// default imports
import React from 'react'
import '../css/HomeTab.css'

const HomeTab = () => {
    return (
        <div id="tab-segment">
            
            <div id="header">
                <h1>Welcome to the Lottery DApp</h1>
            </div>

            <div id="info">
                <p>From here you can check your wallet balances and place a bet to enter a lottery</p>
                <p>The winner of the lotter wins all of the ETH in the contract!</p>
            </div>

            <div id="rules">
                <h3>Lottery Rules:</h3>
                <h3>1. Bets cost 0.25 ETH</h3>
                <h3>2. Guesses must be in the range [1,9]</h3>
            </div>

        </div>
    );
};

export default HomeTab