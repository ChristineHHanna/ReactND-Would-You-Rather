import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Segment, Header, HeaderSubheader, Divider, Form, Grid, Dimmer, Loader} from'semantic-ui-react'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        optionO : '',
        optionT : '',
        isLoading: false,
        vSubmit : false,
    }

    onChange = e => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const {authedUser, handleAddQuestion} = this.props
        const { optionO, optionT } = this.state

        new Promise ((res, rej) => {
            this.setState({ isLoading : +true})
            handleAddQuestion(optionO, optionT, authedUser)
            setTimeout (() => res('success'), 800)
            }).then(() => {
                this.setState({
                    optionO: '',
                    optionT: ''
                })
            this.setState({ vSubmit : true})
            })
    }

    render() {

        const { isLoading } = this.state
        const disabled = this.state.optionO === '' || this.state.optionT === ''

        if (this.state.vSubmit === true ) {
            return <Redirect to='/' />
        }

        return(
            <div>
                <Segment.Group>
                    <Segment>
                        <Header as='h2'>
                            Create new Question
                        </Header>
                        <HeaderSubheader >
                            Complete the below question:
                        </HeaderSubheader>
                    </Segment>
                    <Grid padded>
                        <Grid.Column>
                            {isLoading === +true && (
                                        <Dimmer active>
                                        <Loader>Loading ... </Loader>
                                        </Dimmer>
                                    )}
                                <div style={{fontWeight: 'bold' }}>
                                    Would you rather ... ?
                                </div>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Input id='optionO' placeholder='Option One' onChange={this.onChange} value={this.state.optionO} required />
                                <Divider horizontal content='Or' />
                                <Form.Input id='optionT' placeholder='Option Two' onChange={this.onChange} value={this.state.optionT} required />
                                <Form.Button onSubmit={this.handleSubmit} disabled={disabled}> Submit </Form.Button>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Segment.Group>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps, {handleAddQuestion})(NewQuestion)