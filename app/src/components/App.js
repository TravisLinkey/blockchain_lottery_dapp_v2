// defaults
import React from 'react';

// util imports
import "semantic-ui-css/semantic.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// component imports
import TabMenu from './TabMenu';
import MetaMaskPopup from './MetaMaskPopup';

// web3 imports
import LotteryFactory from "../contracts/LotteryFactory.json";
import getWeb3 from "../utils/getWeb3";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lottery_contract: null,
            account: null,
            total_guesses: null,
            contract_balance: null,
            web3: null,
            loading: true,
            has_metamask: false
        }
    }

    // lifecycle methods
    componentDidMount = async () => {
        try {
            // get network provider and web3 instance
            const web3 = await getWeb3();

            // use web3 to get user's accounts
            let accounts = await web3.eth.getAccounts();

            this.setState({
                has_metamask: true
            })

            // TODO - Combine the accounts and balances into an object
            accounts = await this.get_account_objects(accounts, web3);

            // get the contract instance
            const network_id = await web3.eth.net.getId();
            const deployed_network = LotteryFactory.networks[network_id];
            const instance = new web3.eth.Contract(LotteryFactory.abi, deployed_network && deployed_network.address);

            // Set web3, accounts and contract to the state
            this.setState({
                lottery_contract: instance,
                web3: web3,
                accounts: accounts,
            })

            this.update_values()
            this.addEventListener(this)

        } catch (error) {
            console.log("Possibly it worked!")
        }
    };

    get_account_objects = async (accounts, web3) => {
        let account_objects = [];

        accounts.forEach(async (account) => {
            let balance = await web3.eth.getBalance(account);
            account_objects.push({ "account": account, "balance": balance })
        })
        return account_objects;
    }

    update_values = async () => {
        let total_guesses = await this.state.lottery_contract.methods.get_total_guesses().call();
        let contract_balance = await this.state.lottery_contract.methods.get_balance().call();
        let magic_number = await this.state.lottery_contract.methods.get_magic_number().call();

        console.log("Magic Number", magic_number)

        this.setState({
            total_guesses: total_guesses,
            contract_balance: contract_balance,
            magic_number: magic_number,
            loading: false
        })
    }

    // listener methods
    addEventListener() {
        this.state.lottery_contract.events.GuessMade(async () => {
            await this.update_values()
        })
    }

    render() {
        if (!this.state.has_metamask) {
            return (
                <MetaMaskPopup />
            )
        }
        if (!this.state.web3 || this.state.loading) {
            return <div>Loading Web3, accounts, and contract. . .</div>
        }
        return (
            <TabMenu
                lottery_contract={this.state.lottery_contract}
                web3={this.state.web3}
                accounts={this.state.accounts}
                magic_number={this.state.magic_number}
                contract_balance={this.state.contract_balance}
                total_guesses={this.state.total_guesses}
            />
        )
    }
}

export default App;