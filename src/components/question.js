import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Header, Button, Form, Radio } from 'semantic-ui-react';
import  {handleSaveQuestionAnswer} from '../actions/users'
/* import authedUser from '../reducers/authedUser'; */

class Question extends Component {
    
    state = {
        value: ''
    }

    handleChange = (e, {value}) => {
        this.setState({ value })
    }

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.value !== '') {
            const {authedUser, question, handleSaveQuestionAnswer} = this.props;
            handleSaveQuestionAnswer(authedUser, question.id, this.state.value)
        }
    };
    

    render() { 
            const { question } = this.props
            const {value} = this.state
            const disabled = value === '' ? true : false;
            console.log('saveanswer', value)
        
        return(
            <Fragment>
                <Header as='h4' textAlign='center'>
                    Would You Rather
                </Header>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                            <Radio label={question.optionOne.text} name="radioGroup" checked={value === 'optionOne'} onChange={this.handleChange} value='optionOne'/>
                            <br/>
                            <Radio label={question.optionTwo.text} name="radioGroup" checked={value === 'optionTwo'} onChange={this.handleChange} value='optionTwo' />
                    </Form.Field>
                    <Form.Field>
                        <Button 
                            color='red'
                            size='small'
                            fluid positive
                            disabled={disabled}
                            content='Submit Answer'/>
                    </Form.Field>
                </Form>   
            </Fragment>
        )
    }
}

 function mapStateToProps({authedUser}, {match}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps, {handleSaveQuestionAnswer})(Question)