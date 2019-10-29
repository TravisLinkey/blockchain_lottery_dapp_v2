// default imports
import React from 'react'
import '../css/TabMenu.css'

// utils imports
import { Menu, Segment } from 'semantic-ui-react'

// component imports
import HomeTab from './HomeTab'
import WalletTab from './WalletTab'
import BetTab from './BetTab'

class TabMenu extends React.Component {
  state = { active_item: 'home' }

  // lifecycle methods
  componentDidMount() {
    this.setState({
      active_item: 'home',
    })
  }

  // component functions
  handleItemClick = (e, { name }) => this.setState({ active_item: name })

  render() {
    const { active_item } = this.state
    let segment

    if (this.state.active_item === 'home') {
      segment = <HomeTab />
    }
    else if (this.state.active_item === 'wallet') {
      segment = <WalletTab
        lottery_contract={this.props.lottery_contract}
        accounts={this.props.accounts}
        />
    }
    else if (this.state.active_item === 'bet') {
      segment = <BetTab
        lottery_contract={this.props.lottery_contract}
        accounts={this.props.accounts}
        magic_number={this.props.magic_number}
        contract_balance={this.props.contract_balance}
        total_guesses={this.props.total_guesses}
      />
    }
    return (
      <div id="tab-menu">
        <Menu pointing inverted secondary>
          <Menu.Item name='home' icon='home' id="menu_item" active={active_item === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='wallet' icon='ethereum' id="menu_item" active={active_item === 'wallet'} onClick={this.handleItemClick} />
          <Menu.Item name='bet' icon='ticket' id="menu_item" active={active_item === 'bet'} onClick={this.handleItemClick} />
        </Menu>

        <Segment>{segment}</Segment>

      </div>
    )
  };
}
export default TabMenu;