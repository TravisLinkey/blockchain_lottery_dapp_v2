// defaults
import React from 'react';
import '../css/AccountList.css'

// components used
import AccountSegment from './AccountSegment';

class AccountList extends React.Component {
    state = {
        account_balance: {}
    };

    // lifecycle methods
    componentDidMount() {
        this.set_accounts(this.props.accounts)
    }

    // component functions
    calculate_balance(old_balance) {
        let balance = parseFloat(old_balance) / 10 ** 18;
        return balance;
    }

    set_accounts = (accountBalances) => {
        const accounts = Object.values(accountBalances)
        var account_balance = [];

        for (var i = 0; i < accounts.length; i++) {
            var address = accounts[i].account
            var balance = accounts[i].balance
            account_balance.push({ address: address, balance: balance })
        }

        this.setState({
            account_balance: account_balance
        })
    }

    render() {
        var size = Object.values(this.state.account_balance).length;

        if (size < 1) {
            return (
                <div>No Content Here</div>
            );
        }
        else {
            return (
                <ul id="account_list">
                    {
                        Object.values(this.state.account_balance).map((element, i) => {
                            return <AccountSegment
                                key={i}
                                account={element.address}
                                balance={this.calculate_balance(element.balance)}
                            />
                        })
                    }
                </ul>
            )
        }
    }
};

export default AccountList;