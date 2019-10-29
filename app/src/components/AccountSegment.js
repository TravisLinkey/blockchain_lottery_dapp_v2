// defaults
import React from 'react';
import '../css/AccountSegment.css';
import user_icon from '../assets/user_icon.jpg';

// imports
import { Segment, Comment, Icon } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Col, Row } from 'react-bootstrap';

class AccountSegment extends React.Component {
    state = {
        hex_address: this.props.account,
        balance: parseFloat(this.props.balance),
        show_comment: false,
        icon_name: 'copy'
    };

    // lifecycle methods
    componentDidMount() {
        this.update_state()
    }

    // component methods
    update_state = () => {
        this.setState({
            hex_address: this.props.account,
            balance: parseFloat(this.props.balance),
            show_comment: false
        })
    }
    copy_animation = () => {
        setTimeout(() => {
            this.setState({ 
                hex_address: this.props.account,
                balance: parseFloat(this.props.balance),
                icon_name: 'copy'
             })
        }, 750)

        this.setState({ hex_address: 'Copied!', icon_name: '' })
    }

    render() {
        return (
            <div>
                <li>
                    <Segment id="segment">
                        <Comment.Group id="comment_group">
                            <Comment>
                                <Row>
                                    
                                    <Col xs={8}>
                                        <Comment.Avatar src={user_icon} id="comment_avatar" />
                                        <Comment.Content >
                                            <Comment.Text><strong>Address:</strong></Comment.Text>
                                            <Comment.Actions>
                                                <CopyToClipboard text={this.state.hex_address} >
                                                    <Comment.Action onClick={this.copy_animation}>
                                                        {this.state.hex_address}
                                                        <Icon name={this.state.icon_name} onClick={this.copy_animation} />
                                                    </Comment.Action>
                                                </CopyToClipboard>
                                            </Comment.Actions>
                                        </Comment.Content>
                                    </Col>

                                    <Col xs={4}>

                                        <Row id="currency_label_row">
                                            <p id="currency_label">ETH: </p><p id="currency_label">{parseFloat(this.state.balance)}</p>
                                        </Row>

                                        <Row id="currency_label_row">
                                            <p id="currency_label">GDC: </p><p id="currency_label">0.0</p>
                                        </Row>

                                    </Col>
                                </Row>

                            </Comment>
                        </Comment.Group>
                    </Segment>
                </li>
            </div>
        );
    }
};

export default AccountSegment;
