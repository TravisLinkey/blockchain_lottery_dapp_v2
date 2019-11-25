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
                            'marginTop': '-150px',
                            'marginLeft': '-35%'
                        }}
                    >
                        <div id="modal_segment">
                            <Header className="wrapper"><h2>MetaMask Required!</h2></Header>
                            <h4>Click to Navigate to MetaMask</h4>
                            <button className="ui primary button" onClick={() => {window.open("https://Metamask.io", '_blank')}}>Get MetaMask</button>
                            <h3>Once Installed, Configure MetaMask to the following URL:</h3>
                            <h3>https://u0cb66q4mz:LyI3MwskVavHMiqVepLsyfOpOcgy5hNkJkoG07YKCGs@u0zhr6lcsn-u0o2i9fhop-rpc.us0-aws.kaleido.io</h3>
                        </div>
                    </Segment>
                </TransitionablePortal>
            </div>
        );
    } 
};

export default MetaMaskPopup;