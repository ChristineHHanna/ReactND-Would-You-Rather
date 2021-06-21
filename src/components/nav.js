import React, { Component } from 'react'
import { Fragment } from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Image, Menu, } from 'semantic-ui-react'
import {setAuthedUser} from '../actions/authedUser'


class Nav extends Component {
  /*   state = { 
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name }) */
    handleLogout = (e) => {
        e.preventDefault()
        this.props.setAuthedUser(null)
    }
    render() {
        /* const { activeItem } = this.state */
        const {users, authedUser} = this.props
     /*    console.log('user',authedUser) */

        return (
            <div>
                <Fragment>  
                     <Menu pointing>
                        <Menu.Item
                        name='home'
                        as={NavLink} to='/' exact
                        /* active={activeItem === 'home'} */
                        onClick={this.handleItemClick}
                        
                        />
                        <Menu.Item 
                        name='New Questions'
                        as={NavLink} to='/add'
                        /* active={activeItem === 'New Questions'} */
                        onClick={this.handleItemClick}
                        />
                        <Menu.Item
                        name='Leader Board'
                        as={NavLink} to='/leaderboard'
                        /* active={activeItem === 'Leader Board'} */
                        onClick={this.handleItemClick}
                        />

                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <span>
                                    <Image avatar spaced='right' src={users[authedUser].avatarURL} />
                                    Hello, {users[authedUser].name}
                                </span>
                            </Menu.Item>
                            <Menu.Item>
                                <Button content="Logout" labelPosition='right'  icon='log out' size='mini' basic compact onClick={this.handleLogout}/> 
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu> 

                </Fragment>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users}) {
    return{
        authedUser,
        users
    }
}




export default connect(mapStateToProps,{setAuthedUser})(Nav)