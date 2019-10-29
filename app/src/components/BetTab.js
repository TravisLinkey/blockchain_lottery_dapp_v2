// default imports
import React from 'react'
import '../css/BetTab.css'

// util imports
import { Dropdown, Input } from 'semantic-ui-react';
import { Row } from 'react-bootstrap';

// compnent imports
import { Loader } from 'semantic-ui-react'
import ModalBasicExample from '../components/ModalBasicExample';

class BetTab extends React.Component {
    state = {
        accounts: [],
        selected_account: null,
        user_guess: '',
        loading: false,
        guess_made: false,
    }

    // lifecycle methods
    componentDidMount() {
        this.get_dropdown_accounts()
    }

    // contract functions
    get_dropdown_accounts = () => {
        var dropdown_selection = [];

        const accounts = Object.values(this.props.accounts)

        if (accounts.length > 0) {
            for (var i = 0; i < accounts.length; i++) {
                var element = { key: i, text: accounts[i].account, value: accounts[i].account, image: {} };
                dropdown_selection.push(element);
            }
        }

        this.setState({
            accounts: dropdown_selection,
        })
    }

    // component functions
    update_input_value = (event, value) => {
        let guess_made = value == null ? false : true
        this.setState({ user_guess: event.target.value, guess_made: guess_made })
    }
    update_selected_account = (event, data) => { this.setState({ selected_account: data.value }) }
    clear_fields = () => {
        this.setState({
            user_guess: '',
            selected_account: null,
            guess_made: false
        })
    }
    make_guess = async () => {
        this.setState({
            loading: true
        })

        let guess = this.state.user_guess;

        if (isNaN(guess)) {
            return
        }

        let value = (250000000000000000);

        await this.props.lottery_contract.methods.make_guess(guess).send(
            { from: this.state.selected_account, value: (value), gas: 3000000 })

        this.setState({
            loading: false
        })

        this.clear_fields()
    }
    handleItemClick = (e, { name }) => this.setState({ selected_address: name })

    render() {

        let dropdown

        if (this.state.accounts.length > 0) {
            dropdown = <Dropdown
                placeholder={"Select Address. . ."}
                fluid
                id="dropdown_menu"
                selection
                value={this.state.selected_account}
                options={this.state.accounts}
                onChange={this.update_selected_account}
            />
        }
        else { dropdown = <Loader>Loading Accounts. . . </Loader> }

        return (
            <div id="tab_segment">
                <div id="label_header">
                    <Row id="header_row">
                        <h2>Total ETH in Contract: </h2>
                        <div id="contract_balance">
                            {
                                this.props.contract_balance / 1000000000000000000
                            }
                        </div>

                    </Row>

                    <Row id="header_row">
                        <h3>Total number of guesses: </h3>
                        <div id="contract_guesses">
                            {
                                this.props.total_guesses
                            }
                        </div>
                    </Row>
                </div>

                <Row> {dropdown} </Row>
                <Row>
                    <ModalBasicExample
                        lottery_contract={this.props.lottery_contract}
                        contract_balance={this.props.contract_balance}
                    />
                </Row>

                <div id="guess_segment">

                    <p id="guess_label">Your Guess:</p>

                    <Input
                        type="number"
                        placeholder='your guess'
                        id="guess_input"
                        value={this.state.user_guess}
                        onChange={this.update_input_value}
                    />

                </div>

                <Loader size='big' active={this.state.loading} inline>Placing Guess...</Loader>

                <Row id="button_segment">
                    <button
                        className="ui button"
                        type="Reset"
                        onClick={this.clear_fields}
                        disabled={this.state.loading}>
                        Clear
                    </button>

                    <button
                        className="ui violet button"
                        type="button"
                        onClick={this.make_guess}
                        disabled={!this.state.guess_made || this.state.loading || this.state.selected_account == null}>
                        Place Guess
                    </button>
                </Row>
            </div>
        );
    }
};

export default BetTab;