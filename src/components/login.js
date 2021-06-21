import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { Form, Grid, Dimmer, Loader, Header, Icon, Segment} from 'semantic-ui-react'

import { setAuthedUser } from '../actions/authedUser';


 class Login extends Component {
    state = {
        isLoading : false,
    }

    handleLoading = () => {
        this.setState({ isLoading:  true  })
    }

    render() {
        const { isLoading } = this.state

        return(
            <Fragment>
                <Segment.Group>
                    <div className="ui raised segment login" >
                        <div style={{backgroundColor:'cornsilk',display:'flex', justifyContent:'center',flexDirection:'column', paddingTop:'2.5rem', paddingBottom:'3.5rem'}} className='ui red raised segment centered'>
                            <Grid className='one centered column grid' width={14} doubling padded='vertically'>
                                <Grid.Row />
                            </Grid>
                            <div className='row centered'>
                            <Header as='h1' color='red' textAlign={'center'} >
                                Welcome
                            </Header>
                            </div>
                            <Header as='h5' color='black' textAlign={'center'}>Please Sign-in in order to Continue</Header>
                            <div className="ui one column centered grid">
                                <Icon.Group size='huge'>
                                    <Icon name='sign-in alternate' size='big' color={'red'} className='icon'/>
                                </Icon.Group>
                            </div>
                            <Header as='h2' color='red' textAlign={'center'}> Would You Rather? </Header>
                            <Header as='h2' color='red' textAlign={'center'}>
                                Sign-In
                            </Header>
                            <ConnectedLoginForm onLoading = { this.handleLoading } />
                            {isLoading === true && (
                                <Dimmer active>
                                <Loader>Loading ... </Loader>
                                </Dimmer>
                            )}
                            
                            
                        </div>
                    </div>
                </Segment.Group>

            </Fragment>
        
        )
    }
}

class LoginForm extends Component {

    state = {
        value: '',
    }

        generateDropdown = () => {
            const { users } = this.props
            return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
            }));
        };

        handleSubmit = (e) => {
            e.preventDefault();
            const { setAuthedUser, onLoading } = this.props;
            const authedUser  = this.state.value;
            
            new Promise ((res, rej) => {
                onLoading();
                setTimeout(() => res(),800)
            })
                .then((res) => setAuthedUser(authedUser))
               /*  console.log('usususu',authedUser) */
            }


        onChange = (e, {value}) => {
            this.setState(() => ({
                value,
              }))
          };

    render () {

        const { value } = this.state
        const disabled = (value === '' ? true : false ) 

        return (
            <Fragment>                
                 <Grid padded textAlign="center">
                    <Grid.Row width={14}>
                        <Grid.Column width={12}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Dropdown
                                    placeholder='Select a User'
                                    fluid selection
                                    scrolling required
                                    options={this.generateDropdown()}
                                    value={value}
                                    onChange={ this.onChange }
                                />
                                <Form.Button 
                                    content='Login' 
                                    fluid disabled={disabled} 
                                    color='red' type='submit'
                                    value='login'
                                />

                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                    <footer style={{textAlign:'center'}}>
                        Created By &copy; Christine Hanna
                    </footer>
            </Fragment>

        )
    }
}

const ConnectedLoginForm = connect(
    mapStateToProps,
    { setAuthedUser }
  )(LoginForm);

function mapStateToProps({users}) {
    return {
        users: Object.values(users)
    }
}

export default Login