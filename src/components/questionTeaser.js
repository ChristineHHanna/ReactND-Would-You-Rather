import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { Header, Button, Grid } from 'semantic-ui-react';


class QuestionTeaser extends Component {

    state = {
        viewQuestion: false
    }
    handleClick = e => {
       this.setState(prevState => ({
            viewQuestion: !prevState.viewQuestion
        }));
    };

    render() {
        const { question, unansweredQuestion } = this.props;
         const { viewQuestion } = this.state;
        /* console.log('teaser', unansweredQuestion); */

        if ( viewQuestion === true ) {
            return <Redirect push to={`/questions/${question.id}`} />
        };

        return(
            <Fragment>                        
                <Grid.Column width={12} textAlign='center'>
                    <Header as='h4' textAlign='center'>
                        Would You Rather
                    </Header>
                    <p style={{ textAlign: 'center' }} >
                    {/* <input type="radio" name="radio" /> */}
                        <label>{question.optionOne.text}</label>
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        or ...
                    </p>
                    <Button onClick={this.handleClick} 
                        color={unansweredQuestion === true ? 'red' : 'blue'} 
                        size='small' fluid 
                        content={unansweredQuestion === true ? 'Answer Question' : 'Results'}/>
                </Grid.Column>     
            </Fragment>
        )
    }
}


export default QuestionTeaser