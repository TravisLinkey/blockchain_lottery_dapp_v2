import React from 'react';
import { Header, Segment, TransitionablePortal } from 'semantic-ui-react'
import '../css/MetaMaskPopup.css';

class MetaMaskPopup extends React.Component {
    render() {
        return (
            <div>
                {<div id="blockScreen" className="blockScreen"></div>}
                <TransitionablePortal
                    closeOnTriggerClick
                    openOnTriggerClick
                    open={true}
                >
                    <Segment
                        style={{
                            position: 'fixed',
                            padding: '60px',
                            width: 'auto',
                            height: 'auto',
                            top: '45%',
                            left: '50%',
                            'zIndex': 101,
                            'marginTop': '-200px',
                            'marginLeft': '-250px'
                        }}
                    >
                        <div id="modal_segment">
                            <Header className="wrapper"><h2>MetaMask Required!</h2></Header>
                            <h4>Click to Navigate to MetaMask</h4>
                            <button className="ui primary button" onClick={() => {window.open("https://Metamask.io", '_blank')}}>Get MetaMask</button>
                        </div>
                    </Segment>
                </TransitionablePortal>
            </div>
        );
    } 
};

export default MetaMaskPopup;