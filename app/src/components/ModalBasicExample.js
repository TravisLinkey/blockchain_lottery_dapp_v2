import React, { Component } from 'react'
import { Header, Segment, TransitionablePortal } from 'semantic-ui-react'
import '../css/ModalBasicExample.css'

export default class TransitionablePortalExamplePortal extends Component {
  state = { popup_is_open: false, balance: 0, contract_balance: this.props.contract_balance }
  handleOpen = () => this.setState({ popup_is_open: true })
  handleClose = () => this.setState({ popup_is_open: false })

  // lifecycle methods
  componentDidMount() {
    this.subscribe_to_events()
  }

  UNSAFE_componentWillReceiveProps() {
    if(this.props.contract_balance > 0) {
      this.setState({
        contract_balance: this.props.contract_balance
      })
    }
  }

  subscribe_to_events = async () => {
    this.subscription = this.props.lottery_contract.events.LotteryWon(() => {
      console.log('The lottery has been won!')

      this.handleOpen()

      setTimeout(() => {
        this.handleClose()
      }, 3500)
    })
  }

  render() {

    return (
      <div>
        {this.state.popup_is_open ? <div id="blockScreen" className="blockScreen"></div> : null}
        <TransitionablePortal
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          closeOnTriggerClick
          openOnTriggerClick
          open={this.state.popup_is_open}
        // open={true}
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
              <Header className="wrapper"><h1>Congratulations</h1></Header>
              
              <i className="ethereum icon" id="ethereum" />
              <h4>You have guessed the Magic Number!</h4>
              <h4>You will now receive the entire balance:</h4>
              <h2>{this.state.contract_balance / 1000000000000000000} ETH</h2>
            </div>
          </Segment>
        </TransitionablePortal>
      </div>
    )
  }
}
