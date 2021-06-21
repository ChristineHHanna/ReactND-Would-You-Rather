import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Segment, Header, Grid, Image} from 'semantic-ui-react'
import QuestionTeaser from './questionTeaser'
import Question from './question'
import QuestionAnswer from './questionAnswered'
import { Redirect } from 'react-router-dom'


const questionTypes =  {
  QUESTION_Q: 'QUESTION_Q',
  QUESTION_RESULT: 'QUESTION_RESULT',
  QUESTION_TEASER: 'QUESTION_TEASER'
}

const QuestionContent = props => {

  const {questionType, question, unansweredQuestion} = props

  switch(questionType) {
      case questionTypes.QUESTION_TEASER:
        return <QuestionTeaser question = {question} unansweredQuestion = {unansweredQuestion} />;
      case questionTypes.QUESTION_Q:
        return <Question question = {question} />;
      case questionTypes.QUESTION_RESULT:
        return <QuestionAnswer question = {question} />;
      default:
        return;
}}

class UserCard extends Component {
  render(){
    const { questionType, question, unansweredQuestion = null, author, bPath} = this.props;
    const buttonColor= unansweredQuestion === true ? 'red' : '#2185d0';
    
    if (bPath === true) {
      return <Redirect to='/questions/bad_id' />
    }
   /*  console.log('ussssssss', author) */

    return(
      <Segment.Group >
        <Header as='h4'color='grey' textAlign='left' attached='top' block style={{borderTop: unansweredQuestion === null
          ? `1px solid {#d4d4d5}`
          : `2px solid ${buttonColor}`}}>
            {author.name} asks :
        </Header>
        <Grid divided padded>  
          <Grid.Row>
            <Grid.Column width={5}>
                <Image className='ui small circular image' src={author.avatarURL} alt='avatar of {user.name}'/>
              {/* <Image src={author.avatarURL} /> */}
            </Grid.Column>
            <Grid.Column width={11}>
              <QuestionContent
                questionType={questionType}
                question={question}
                unansweredQuestion={unansweredQuestion}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment.Group>
    )
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { match, question_id }) 
  {let question, questionType, author, bPath = false;
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    questionType = questionTypes.QUESTION_TEASER;
  } else {
    const { question_id } = match.params;
    question = questions[question_id];
    const user = users[authedUser];

      if (question === undefined) {
      bPath = true
    } else { 
    author = users[question.author];
    questionType = questionTypes.QUESTION_Q;
    if (Object.keys(user.answers).includes(question.id)) {
        questionType = questionTypes.QUESTION_RESULT;
    } 
  }
}

  return {
    question,
    author,
    questionType,
    bPath
  };
}

export default connect(mapStateToProps)(UserCard)